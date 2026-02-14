'use client';

import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

const experiences = [
  {
    title: 'Machine Learning Engineer - I',
    company: 'Skylark Labs',
    location: 'Pune, Maharashtra, India',
    period: 'January 2024 — Present',
    type: 'Full-time',
    highlights: [
      'Engineered 8+ production-grade AI pipelines using open-source LLMs (Llama, Llava, nllb) for multi-modal processing with 95%+ accuracy',
      'Architected vLLM migration on Nvidia Triton, achieving 3.2x throughput improvement and 40% latency reduction across 50+ concurrent requests',
      'Led Python-to-Rust server migration achieving 360% performance boost (5 → 23 FPS) and 60% memory reduction using PyO3 bindings',
      'Implemented precision quantization (FP16, INT8, INT4) for 4.8x faster inference and 65% memory reduction with 100% accuracy retention',
      'Developed Docker containerization with CUDA/cuDNN for horizontal scaling across 10+ GPU instances',
      'Spearheading custom VLA model development for robotics, inspired by OpenVLA and LeRobot architectures',
    ],
  },
  {
    title: 'Data Scientist Intern',
    company: 'Rupeek Finance',
    location: 'Bengaluru, Karnataka, India',
    period: 'June 2023 — August 2023',
    type: 'Full-time',
    highlights: [
      'Built fraud detection pipeline using Random Forest, XGBoost, and Gradient Boosting on 75,000+ credit reports — 96.8% precision, F1 = 0.94',
      'Developed multi-class default risk models with attention-based DNNs, achieving AUC of 0.93 and reducing loan approval errors by 34%',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-blue-500/50 to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative pl-10 md:pl-20 mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-8 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#0a0a0a] shadow-lg shadow-cyan-400/30" />

              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-cyan-400 font-medium mt-1">
                      <FiBriefcase className="text-sm" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <div className="text-sm text-neutral-400">{exp.period}</div>
                    <div className="text-xs text-neutral-500">
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * j }}
                      className="text-sm text-neutral-400 leading-relaxed flex gap-3"
                    >
                      <span className="text-cyan-400/60 mt-1.5 shrink-0">
                        ▹
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
