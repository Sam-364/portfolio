'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    color: 'from-cyan-400 to-cyan-600',
    borderColor: 'border-cyan-500/20',
    glowColor: 'group-hover:shadow-cyan-500/10',
    skills: ['Python', 'Bash', 'Rust', 'C++'],
  },
  {
    title: 'AI / ML Stack',
    color: 'from-blue-400 to-blue-600',
    borderColor: 'border-blue-500/20',
    glowColor: 'group-hover:shadow-blue-500/10',
    skills: ['PyTorch', 'TensorFlow/Keras', 'ONNX'],
  },
  {
    title: 'LLM / RAG / Agents',
    color: 'from-violet-400 to-violet-600',
    borderColor: 'border-violet-500/20',
    glowColor: 'group-hover:shadow-violet-500/10',
    skills: [
      'Transformers',
      'LangChain',
      'LlamaIndex',
      'CrewAI',
      'DSPy',
      'Firecrawl',
      'JinaAI',
    ],
  },
  {
    title: 'Vector Databases',
    color: 'from-emerald-400 to-emerald-600',
    borderColor: 'border-emerald-500/20',
    glowColor: 'group-hover:shadow-emerald-500/10',
    skills: ['Qdrant', 'Milvus', 'Weaviate'],
  },
  {
    title: 'Computer Vision',
    color: 'from-orange-400 to-orange-600',
    borderColor: 'border-orange-500/20',
    glowColor: 'group-hover:shadow-orange-500/10',
    skills: ['OpenCV', 'Pytesseract', 'TensorRT', 'OpenVINO'],
  },
  {
    title: 'Infrastructure',
    color: 'from-pink-400 to-pink-600',
    borderColor: 'border-pink-500/20',
    glowColor: 'group-hover:shadow-pink-500/10',
    skills: ['Docker', 'vLLM', 'Triton', 'CUDA/cuDNN', 'Ollama', 'llama.cpp', 'W&B'],
  },
  {
    title: 'Deployment',
    color: 'from-amber-400 to-amber-600',
    borderColor: 'border-amber-500/20',
    glowColor: 'group-hover:shadow-amber-500/10',
    skills: ['Linux', 'AWS', 'CI/CD', 'Git'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-wider uppercase">
            tools of the trade
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group p-6 rounded-2xl border ${category.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${category.glowColor}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                <h3
                  className={`text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                >
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + j * 0.03 }}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-neutral-300 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
