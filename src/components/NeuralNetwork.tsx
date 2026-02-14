'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: [number, number, number];
  pulseOffset: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: [number, number, number];
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let time = 0;
    const mouse = { x: -9999, y: -9999 };

    const palette: [number, number, number][] = [
      [6, 182, 212],    // cyan
      [59, 130, 246],   // blue
      [99, 102, 241],   // indigo
      [139, 92, 246],   // violet
      [16, 185, 129],   // emerald
    ];

    const pickColor = (): [number, number, number] =>
      palette[Math.floor(Math.random() * palette.length)];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const area = canvas.width * canvas.height;
      const count = Math.min(Math.floor(area / 6000), 250);

      nodes = [];
      for (let i = 0; i < count; i++) {
        const isHub = Math.random() < 0.12;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseRadius: isHub ? 2.5 + Math.random() * 2 : 1 + Math.random() * 1.5,
          radius: 0,
          color: pickColor(),
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      signals = [];
    };

    const spawnSignal = () => {
      if (signals.length > 25) return;
      const i = Math.floor(Math.random() * nodes.length);
      let bestJ = -1;
      let bestDist = Infinity;

      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = dx * dx + dy * dy;
        if (d < 220 * 220 && d < bestDist) {
          bestDist = d;
          bestJ = j;
        }
      }
      if (bestJ !== -1) {
        signals.push({
          fromIdx: i,
          toIdx: bestJ,
          progress: 0,
          speed: 0.006 + Math.random() * 0.014,
          color: nodes[i].color,
        });
      }
    };

    const maxConnDist = 200;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn signals
      if (Math.random() < 0.12) spawnSignal();

      // --- Draw connections first (behind nodes) ---
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDist) {
            const fade = 1 - dist / maxConnDist;
            const [r1, g1, b1] = a.color;
            const [r2, g2, b2] = b.color;
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, `rgba(${r1},${g1},${b1},${fade * 0.25})`);
            gradient.addColorStop(1, `rgba(${r2},${g2},${b2},${fade * 0.25})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = fade * 1.2;
            ctx.stroke();
          }
        }
      }

      // --- Update and draw nodes ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = canvas.width + 20;
        if (n.x > canvas.width + 20) n.x = -20;
        if (n.y < -20) n.y = canvas.height + 20;
        if (n.y > canvas.height + 20) n.y = -20;

        const pulse = 0.7 + 0.3 * Math.sin(time * 1.5 + n.pulseOffset);
        n.radius = n.baseRadius * pulse;

        const [r, g, b] = n.color;

        // Outer glow halo
        const glowSize = n.radius * 5;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        glow.addColorStop(0, `rgba(${r},${g},${b},${0.2 * pulse})`);
        glow.addColorStop(0.5, `rgba(${r},${g},${b},${0.05 * pulse})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.7 + 0.3 * pulse})`;
        ctx.fill();

        // Bright center dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.5 * pulse})`;
        ctx.fill();

        // Mouse interaction
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 300) {
          const intensity = 1 - mDist / 300;

          // Connection line to cursor
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.4 * intensity})`;
          ctx.lineWidth = 1.5 * intensity;
          ctx.stroke();

          // Expanded glow
          const mGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 8);
          mGlow.addColorStop(0, `rgba(${r},${g},${b},${0.35 * intensity})`);
          mGlow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 8, 0, Math.PI * 2);
          ctx.fillStyle = mGlow;
          ctx.fill();

          // Gentle attraction
          n.vx += (mouse.x - n.x) * 0.00008 * intensity;
          n.vy += (mouse.y - n.y) * 0.00008 * intensity;
        }

        // Speed damping
        n.vx *= 0.999;
        n.vy *= 0.999;
      }

      // --- Draw signals (data pulses) ---
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(i, 1);
          continue;
        }

        const from = nodes[sig.fromIdx];
        const to = nodes[sig.toIdx];
        if (!from || !to) { signals.splice(i, 1); continue; }

        const px = from.x + (to.x - from.x) * sig.progress;
        const py = from.y + (to.y - from.y) * sig.progress;
        const [r, g, b] = sig.color;

        // Large soft glow
        const sg = ctx.createRadialGradient(px, py, 0, px, py, 14);
        sg.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
        sg.addColorStop(0.3, `rgba(${r},${g},${b},0.2)`);
        sg.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = sg;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,0.95)`;
        ctx.fill();

        // Trail particles
        for (let t = 1; t <= 5; t++) {
          const tp = sig.progress - t * 0.025;
          if (tp < 0) continue;
          const tx = from.x + (to.x - from.x) * tp;
          const ty = from.y + (to.y - from.y) * tp;
          const tAlpha = 0.6 - t * 0.1;
          const tSize = 2 - t * 0.3;
          if (tSize <= 0) continue;
          ctx.beginPath();
          ctx.arc(tx, ty, tSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${tAlpha})`;
          ctx.fill();
        }
      }

      // Cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
        cg.addColorStop(0, 'rgba(139,92,246,0.12)');
        cg.addColorStop(0.5, 'rgba(59,130,246,0.04)');
        cg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { resize(); init(); };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, #080c14 0%, #0c1222 40%, #0e1a2e 60%, #0c1222 80%, #080c14 100%)',
      }}
    />
  );
}
