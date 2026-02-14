'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'FinRexent',
    subtitle: 'AI-Powered Financial Investment Agent',
    description:
      'Multi-agent financial system for Indian stock markets (NSE/BSE) powered by Llama 3.1-8B via Ollama. Implements real-time news crawling from 4+ sources using Firecrawl, advanced technical analysis with 8+ indicators (RSI, MACD, Bollinger Bands, EMA crossovers), and a persistent SQLite-backed memory system for investment tracking across sessions.',
    highlights: [
      'Multi-agent architecture with specialized analysis roles',
      'Real-time market data pipeline with <2s latency',
      'Automated stop-loss & portfolio diversification engine',
    ],
    tech: [
      'Python',
      'LangChain',
      'Llama 3.1-8B',
      'Firecrawl',
      'SQLite',
      'Multi-Agent',
      'Ollama',
    ],
    github: 'https://github.com/Sam-364/FinRexent',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'hover:border-cyan-500/40',
    accentColor: 'text-cyan-400',
  },
  {
    title: 'Inferno',
    subtitle: 'Production-Grade LLM Inference Engine',
    description:
      'High-performance LLM serving engine combining core innovations from vLLM and SGLang. Features PagedAttention for memory-efficient KV cache management, RadixTree-based prefix caching for prompt reuse, continuous batching for maximizing GPU utilization, and speculative decoding for faster autoregressive generation.',
    highlights: [
      'OpenAI-compatible REST API for drop-in replacement',
      'INT8/FP8 quantization with <1% accuracy degradation',
      'Multi-model support: Llama, Mistral, Qwen, Phi',
    ],
    tech: [
      'Python',
      'Rust/C++',
      'PagedAttention',
      'RadixTree',
      'Speculative Decoding',
      'CUDA',
      'REST API',
    ],
    github: 'https://github.com/Sam-364/Inferno',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500/40',
    accentColor: 'text-orange-400',
  },
  {
    title: 'Speech Recognizer',
    subtitle: 'Speech-to-Text & Semantic Analysis Pipeline',
    description:
      'End-to-end speech processing pipeline that converts audio input into structured text, enabling downstream semantic analysis. Implements noise-robust feature extraction, beam search decoding, and supports real-time streaming inference for continuous audio input.',
    highlights: [
      'Streaming inference with chunked audio processing',
      'Noise-robust feature extraction pipeline',
      'Structured output for downstream NLP tasks',
    ],
    tech: ['Python', 'Speech Recognition', 'NLP', 'Beam Search', 'Audio DSP'],
    github: 'https://github.com/Sam-364/Speech-Recognizer',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500/40',
    accentColor: 'text-emerald-400',
  },
  {
    title: 'PyTorch Forward-Forward',
    subtitle: "Hinton's Forward-Forward Algorithm",
    description:
      "Research implementation of Geoffrey Hinton's forward-forward algorithm — a novel training paradigm that replaces backpropagation with two forward passes (positive and negative). Each layer learns locally by maximizing goodness for real data and minimizing it for negative data, eliminating the need for backward pass gradient computation.",
    highlights: [
      'Local layer-wise learning without backpropagation',
      'Positive/negative pass contrastive training',
      'Comparable accuracy to backprop on MNIST benchmarks',
    ],
    tech: [
      'Python',
      'PyTorch',
      'Contrastive Learning',
      'Neural Networks',
      'Research',
    ],
    github: 'https://github.com/Sam-364/pytorch_forward_forward',
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'hover:border-violet-500/40',
    accentColor: 'text-violet-400',
  },
  {
    title: 'NNPACK',
    subtitle: 'Neural Network Acceleration Package',
    description:
      'Low-level acceleration library for neural network computations on multi-core CPUs. Optimizes convolutions, fully-connected layers, and pooling operations using SIMD intrinsics, Winograd transforms for convolutions, and cache-oblivious algorithms for maximum throughput on x86 architectures.',
    highlights: [
      'SIMD-optimized matrix multiplication kernels',
      'Winograd transform for fast convolutions',
      'Cache-oblivious algorithms for memory efficiency',
    ],
    tech: ['C', 'SIMD/AVX', 'Winograd', 'Multi-core', 'CPU Optimization'],
    github: 'https://github.com/Sam-364/NNPACK',
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'hover:border-pink-500/40',
    accentColor: 'text-pink-400',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-wider uppercase">
            what i&apos;ve built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-neutral-400 mt-6 max-w-2xl mx-auto">
            From production LLM inference engines to multi-agent financial
            systems — projects that demonstrate deep expertise in ML systems
            engineering and performance optimization.
          </p>
        </motion.div>

        {/* Featured top 2 projects - larger cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.slice(0, 2).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className={`group relative p-8 rounded-2xl border border-white/5 ${project.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 flex flex-col animated-border`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
              />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-2xl font-bold text-white group-hover:${project.accentColor} transition-colors`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {project.subtitle}
                  </p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-cyan-400 transition-colors p-1"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FiGithub className="text-xl" />
                </a>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Key highlights */}
              <div className="mb-5 space-y-2 flex-grow">
                {project.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm">
                    <span className={`${project.accentColor} mt-0.5`}>&#x25B8;</span>
                    <span className="text-neutral-300">{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-neutral-400 font-mono border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remaining projects - 3 column grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.slice(2).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl border border-white/5 ${project.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 flex flex-col`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
              />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {project.subtitle}
                  </p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-cyan-400 transition-colors p-1"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FiGithub className="text-xl" />
                </a>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              <div className="mb-4 space-y-1.5">
                {project.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs">
                    <span className={`${project.accentColor} mt-0.5`}>&#x25B8;</span>
                    <span className="text-neutral-300">{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-neutral-400 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Sam-364?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            View all projects on GitHub
            <FiExternalLink />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
