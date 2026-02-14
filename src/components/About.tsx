'use client';

import { motion } from 'framer-motion';
import { FiAward, FiCpu, FiTrendingUp, FiTarget } from 'react-icons/fi';

const stats = [
  { icon: FiAward, value: '2+', label: 'Years Experience', color: 'cyan' },
  { icon: FiCpu, value: '8+', label: 'Production AI Pipelines', color: 'blue' },
  { icon: FiTrendingUp, value: '360%', label: 'Performance Boost', color: 'violet' },
  { icon: FiTarget, value: '95%+', label: 'Model Accuracy', color: 'emerald' },
];

const colorMap: Record<string, string> = {
  cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-wider uppercase">
            who i am
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-neutral-300 text-base leading-relaxed mb-5">
              I&apos;m Sambit, a Machine Learning Engineer at{' '}
              <span className="text-cyan-400 font-medium">Skylark Labs</span>,
              where I build production-grade AI systems that push the boundaries
              of performance and scalability. My work spans multi-modal AI
              pipelines, high-performance inference optimization, and
              cutting-edge model deployment.
            </p>
            <p className="text-neutral-300 text-base leading-relaxed mb-5">
              With a background from{' '}
              <span className="text-cyan-400 font-medium">
                NIT Rourkela
              </span>
              , I specialize in taking complex ML research and transforming it
              into real-world solutions — from migrating Python servers to
              Rust for 360% performance gains, to implementing tensor
              parallelism for 3.2x throughput improvements on Triton
              Inference Server.
            </p>
            <p className="text-neutral-300 text-base leading-relaxed">
              I&apos;m deeply passionate about LLMs, reinforcement learning,
              graph neural networks, and building the infrastructure that
              makes AI practical and powerful at scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className={`group relative p-6 rounded-2xl border ${colorMap[stat.color]} backdrop-blur-sm hover:scale-105 transition-transform duration-300 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="text-2xl mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
