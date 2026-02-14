'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'FinRexent',
    subtitle: 'AI-Powered Financial Investment Agent',
    description:
      'Sophisticated financial agent using Ollama with Llama 3.1-8B for Indian stock markets (NSE/BSE). Features real-time news crawling from 4+ sources, advanced technical analysis with 8+ indicators (RSI, MACD, Bollinger Bands), persistent memory, and automated risk assessment.',
    tech: [
      'Python',
      'LangChain',
      'Llama 3.1',
      'Firecrawl',
      'SQLite',
      'Multi-Agent',
    ],
    github: 'https://github.com/Sam-364/FinRexent',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'hover:border-cyan-500/40',
  },
  {
    title: 'Inferno',
    subtitle: 'High-Performance LLM Inference Engine',
    description:
      'Production-grade LLM inference engine integrating vLLM and SGLang concepts. Implements PagedAttention, RadixTree-based prefix caching, continuous batching, speculative decoding, and OpenAI-compatible REST API. Supports multi-model inference with INT8/FP8 quantization.',
    tech: [
      'Python',
      'Rust/C++',
      'REST API',
      'PagedAttention',
      'Quantization',
    ],
    github: 'https://github.com/Sam-364/Inferno',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500/40',
  },
  {
    title: 'Speech Recognizer',
    subtitle: 'Speech-to-Text & Semantic Analysis',
    description:
      'Speech recognition and speech-to-text conversion tool built for semantic analysis. Processes audio inputs and converts them into structured text for downstream NLP tasks.',
    tech: ['Python', 'Speech Recognition', 'NLP', 'Semantic Analysis'],
    github: 'https://github.com/Sam-364/Speech-Recognizer',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500/40',
  },
  {
    title: 'PyTorch Forward-Forward',
    subtitle: "Hinton's Forward-Forward Algorithm",
    description:
      "Implementation of Geoffrey Hinton's forward-forward algorithm as an alternative to backpropagation. Explores a novel training paradigm for neural networks without the need for backward passes.",
    tech: ['Python', 'PyTorch', 'Research', 'Neural Networks'],
    github: 'https://github.com/Sam-364/pytorch_forward_forward',
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'hover:border-violet-500/40',
  },
  {
    title: 'NNPACK',
    subtitle: 'Neural Network Acceleration Package',
    description:
      'Acceleration package for neural network computations on multi-core CPUs. Optimizes core operations like convolutions and matrix multiplications for maximum throughput on CPU architectures.',
    tech: ['C', 'CPU Optimization', 'SIMD', 'Multi-core'],
    github: 'https://github.com/Sam-364/NNPACK',
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'hover:border-pink-500/40',
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-neutral-400 mt-6 max-w-xl mx-auto">
            A selection of projects that demonstrate my expertise in ML systems,
            inference optimization, and AI engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl border border-white/5 ${project.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 flex flex-col`}
            >
              {/* Gradient glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
              />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-0.5">
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

              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-neutral-400 font-mono"
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
