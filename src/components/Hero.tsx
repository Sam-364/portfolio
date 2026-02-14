'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const roles = [
  'Machine Learning Engineer',
  'AI Systems Architect',
  'Deep Learning Researcher',
  'Performance Engineer',
  'LLM Infrastructure Builder',
];

// Mini neural network architecture diagram
function NeuralDiagram() {
  const layers = [3, 5, 6, 5, 3];
  const width = 280;
  const height = 200;
  const layerSpacing = width / (layers.length + 1);

  const nodes: { x: number; y: number; layer: number }[] = [];
  layers.forEach((count, layerIdx) => {
    const x = layerSpacing * (layerIdx + 1);
    for (let i = 0; i < count; i++) {
      const y = (height / (count + 1)) * (i + 1);
      nodes.push({ x, y, layer: layerIdx });
    }
  });

  // Build connections between adjacent layers
  const connections: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  let nodeIdx = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    const startIdx = nodeIdx;
    const nextStartIdx = startIdx + layers[l];
    for (let i = 0; i < layers[l]; i++) {
      for (let j = 0; j < layers[l + 1]; j++) {
        connections.push({
          x1: nodes[startIdx + i].x,
          y1: nodes[startIdx + i].y,
          x2: nodes[nextStartIdx + j].x,
          y2: nodes[nextStartIdx + j].y,
          delay: l * 0.8 + Math.random() * 0.5,
        });
      }
    }
    nodeIdx += layers[l];
  }

  const layerColors = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2"
    >
      <svg width={width} height={height} className="opacity-30 hover:opacity-60 transition-opacity duration-700">
        {/* Connections */}
        {connections.map((conn, i) => (
          <motion.line
            key={`c-${i}`}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#connGradient)"
            strokeWidth={0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: conn.delay }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={node.x}
            cy={node.y}
            r={3}
            fill={layerColors[node.layer]}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.5, delay: node.layer * 0.3 + 0.5 }}
          >
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="connGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Layer labels */}
        {['IN', 'H1', 'H2', 'H3', 'OUT'].map((label, i) => (
          <text
            key={label}
            x={layerSpacing * (i + 1)}
            y={height - 5}
            fill="#525252"
            fontSize="8"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {label}
          </text>
        ))}
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, text.length + 1));
          if (text === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setText(currentRole.slice(0, text.length - 1));
          if (text === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 neural-glow"
        >
          <span className="text-cyan-400 font-mono text-sm">
            {'>'} Hello, world! I&apos;m
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          Sambit Kumar
          <br />
          <span className="shimmer">Barik</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-neutral-400 mb-8 h-10 flex items-center justify-center"
        >
          <span className="font-mono">{text}</span>
          <span className="animate-pulse text-cyan-400 ml-0.5">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-neutral-500 max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
        >
          Building production-grade AI systems with expertise in LLMs,
          high-performance inference, and computer vision. Turning complex ML
          problems into scalable, real-world solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            View My Work
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-cyan-500/30 text-cyan-400 rounded-xl font-medium hover:bg-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      <NeuralDiagram />

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600 hover:text-cyan-400 transition-colors"
      >
        <FiArrowDown className="text-2xl animate-bounce" />
      </motion.a>
    </section>
  );
}
