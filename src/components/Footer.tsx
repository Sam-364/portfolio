'use client';

import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} Sambit. Built with Next.js
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sam-364"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-cyan-400 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub className="text-lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/sambit-kumar-barik-1237ba204/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="text-lg" />
          </a>
          <a
            href="https://twitter.com/Sambitk_7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-cyan-400 transition-colors"
            aria-label="Twitter"
          >
            <FiTwitter className="text-lg" />
          </a>
          <a
            href="mailto:sambitbarik70@gmail.com"
            className="text-neutral-500 hover:text-cyan-400 transition-colors"
            aria-label="Email"
          >
            <FiMail className="text-lg" />
          </a>
        </div>
      </div>
    </footer>
  );
}
