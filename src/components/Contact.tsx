'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight } from 'react-icons/fi';

const socials = [
  {
    name: 'Email',
    handle: 'sambitbarik70@gmail.com',
    href: 'mailto:sambitbarik70@gmail.com',
    icon: FiMail,
    color: 'hover:border-red-400/40 hover:text-red-400',
  },
  {
    name: 'LinkedIn',
    handle: 'sambit-kumar-barik',
    href: 'https://www.linkedin.com/in/sambit-kumar-barik',
    icon: FiLinkedin,
    color: 'hover:border-blue-400/40 hover:text-blue-400',
  },
  {
    name: 'GitHub',
    handle: 'Sam-364',
    href: 'https://github.com/Sam-364',
    icon: FiGithub,
    color: 'hover:border-white/40 hover:text-white',
  },
  {
    name: 'Twitter',
    handle: '@Sambitk_7',
    href: 'https://twitter.com/Sambitk_7',
    icon: FiTwitter,
    color: 'hover:border-sky-400/40 hover:text-sky-400',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-neutral-400 max-w-lg mx-auto text-lg">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or collaborations in the AI/ML space. Let&apos;s connect!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 ${social.color}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Icon className="text-xl" />
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-neutral-500">{social.name}</div>
                  <div className="text-white font-medium text-sm">
                    {social.handle}
                  </div>
                </div>
                <FiArrowUpRight className="text-neutral-600 group-hover:text-current transition-colors" />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="mailto:sambitbarik70@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FiMail />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
