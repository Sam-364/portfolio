import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Sambit Kumar Barik | Machine Learning Engineer',
  description:
    'Machine Learning Engineer specializing in production-grade AI systems, LLMs, computer vision, and high-performance inference optimization.',
  keywords: [
    'Machine Learning',
    'AI',
    'Deep Learning',
    'LLM',
    'Portfolio',
    'Sambit Kumar Barik',
  ],
  openGraph: {
    title: 'Sambit Kumar Barik | Machine Learning Engineer',
    description:
      'Building production-grade AI systems with expertise in LLMs, computer vision, and high-performance inference optimization.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
