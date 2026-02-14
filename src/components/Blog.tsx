'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiBookOpen, FiCalendar } from 'react-icons/fi';
import { SiMedium } from 'react-icons/si';

const blogs = [
  {
    title:
      'Decoding Rotary Positional Embeddings (RoPE): The Secret Sauce for Smarter Transformers',
    description:
      'A deep dive into how RoPE encodes position information through rotation matrices, enabling transformers to understand relative positions without absolute positional encodings. Covers the mathematical foundations, implementation details, and why models like LLaMA and Mistral chose RoPE over alternatives like ALiBi and learned embeddings.',
    date: 'September 21, 2024',
    tags: [
      'Positional Encoding',
      'NLP',
      'Transformer Architecture',
      'LLM',
      'Embedding Layer',
    ],
    href: 'https://medium.com/@DataDry/decoding-rotary-positional-embeddings-rope-the-secret-sauce-for-smarter-transformers-193cbc01e4ed',
    color: 'from-violet-500/20 to-blue-500/20',
    borderColor: 'hover:border-violet-500/40',
  },
  {
    title:
      'Understanding KL Divergence for NLP Fundamentals: A Comprehensive Guide with PyTorch Implementation',
    description:
      'Comprehensive walkthrough of Kullback-Leibler divergence and its critical role in NLP — from training language models and knowledge distillation to VAE latent space regularization. Includes hands-on PyTorch implementations with code for computing forward/reverse KL divergence and understanding its asymmetric properties.',
    date: 'September 15, 2024',
    tags: [
      'KL Divergence',
      'NLP',
      'PyTorch',
      'LLM',
      'Information Theory',
    ],
    href: 'https://medium.com/@DataDry/understanding-kl-divergence-for-nlp-fundamentals-a-comprehensive-guide-with-pytorch-implementation-c88867ded737',
    color: 'from-cyan-500/20 to-emerald-500/20',
    borderColor: 'hover:border-cyan-500/40',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-wider uppercase">
            what i write
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Blog</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-neutral-400 mt-6 max-w-xl mx-auto">
            Deep dives into ML/NLP concepts — breaking down complex
            mathematics and architectures into intuitive explanations with
            hands-on PyTorch implementations.
          </p>
        </motion.div>

        <div className="space-y-6">
          {blogs.map((blog, i) => (
            <motion.a
              key={blog.title}
              href={blog.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group block relative p-8 rounded-2xl border border-white/5 ${blog.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${blog.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
              />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                    <FiBookOpen className="text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <FiCalendar className="text-xs" />
                    {blog.date}
                  </div>
                </div>
                <FiExternalLink className="text-neutral-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                {blog.title}
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                {blog.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-neutral-400 font-mono border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@DataDry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            <SiMedium />
            Read more on Medium
            <FiExternalLink className="text-sm" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
