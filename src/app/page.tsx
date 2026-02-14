import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import NeuralNetwork from '@/components/NeuralNetwork';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <NeuralNetwork />
      <Navbar />
      <Hero />
      <div className="section-divider max-w-4xl mx-auto" />
      <About />
      <div className="section-divider max-w-4xl mx-auto" />
      <Experience />
      <div className="section-divider max-w-4xl mx-auto" />
      <Skills />
      <div className="section-divider max-w-4xl mx-auto" />
      <Projects />
      <div className="section-divider max-w-4xl mx-auto" />
      <Blog />
      <div className="section-divider max-w-4xl mx-auto" />
      <Contact />
      <Footer />
    </main>
  );
}
