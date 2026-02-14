'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number;
  pulsePhase: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

const LAYER_COLORS = [
  [16, 185, 129],  // emerald
  [6, 182, 212],   // cyan
  [59, 130, 246],  // blue
  [139, 92, 246],  // violet
  [236, 72, 153],  // pink
];

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let time = 0;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 10000),
        180
      );
      particles = Array.from({ length: count }, () => {
        const y = Math.random() * canvas.height;
        const layer = Math.min(
          Math.floor((y / canvas.height) * LAYER_COLORS.length),
          LAYER_COLORS.length - 1
        );
        const isHub = Math.random() < 0.08;
        return {
          x: Math.random() * canvas.width,
          y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.2,
          radius: isHub ? Math.random() * 2.5 + 2 : Math.random() * 1.5 + 0.5,
          layer,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
      pulses = [];
    };

    const spawnPulse = () => {
      if (pulses.length > 15) return;
      const i = Math.floor(Math.random() * particles.length);
      let closest = -1;
      let closestDist = Infinity;
      for (let j = 0; j < particles.length; j++) {
        if (j === i) continue;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist < closestDist && Math.abs(particles[i].layer - particles[j].layer) <= 1) {
          closest = j;
          closestDist = dist;
        }
      }
      if (closest !== -1) {
        pulses.push({
          fromIdx: i,
          toIdx: closest,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
        });
      }
    };

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new pulses periodically
      if (Math.random() < 0.08) spawnPulse();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Keep layer assignment updated
        p.layer = Math.min(
          Math.floor((p.y / canvas.height) * LAYER_COLORS.length),
          LAYER_COLORS.length - 1
        );

        const [r, g, b] = LAYER_COLORS[p.layer];
        const pulse = 0.5 + 0.3 * Math.sin(time * 2 + p.pulsePhase);

        // Draw glow halo for larger particles
        if (p.radius > 1.8) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.15 * pulse})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.6 * pulse + 0.2})`;
        ctx.fill();

        // Connect nearby same-layer / adjacent-layer particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (Math.abs(p.layer - q.layer) > 1) continue;

          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const [r2, g2, b2] = LAYER_COLORS[q.layer];
            const alpha = 0.1 * (1 - dist / 160);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${(r + r2) >> 1}, ${(g + g2) >> 1}, ${(b + b2) >> 1}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction with ripple glow
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 250) {
          const intensity = 1 - mDist / 250;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.3 * intensity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Glow on interaction
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 * intensity})`);
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fill();

          p.vx += (mouse.x - p.x) * 0.00005;
          p.vy += (mouse.y - p.y) * 0.00005;
        }
      }

      // Update and draw pulses (data signals)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const from = particles[pulse.fromIdx];
        const to = particles[pulse.toIdx];
        if (!from || !to) { pulses.splice(i, 1); continue; }

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;
        const [r, g, b] = LAYER_COLORS[from.layer];

        // Draw pulse glow
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        pGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
        pGrad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.3)`);
        pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw pulse core
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.fill();

        // Trail
        const trail = 0.15;
        for (let t = 1; t <= 3; t++) {
          const tp = pulse.progress - trail * t * pulse.speed * 10;
          if (tp < 0) continue;
          const tx = from.x + (to.x - from.x) * tp;
          const ty = from.y + (to.y - from.y) * tp;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.5 - t * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 - t * 0.15})`;
          ctx.fill();
        }
      }

      // Draw mouse cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
        mGrad.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
        mGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          'linear-gradient(180deg, #0a0a0a 0%, #0d1520 30%, #0f1729 50%, #0d1520 70%, #0a0a0a 100%)',
      }}
    />
  );
}
