import { Metadata } from 'next';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { AboutPage as AboutContent } from '@/src/components/AboutPage';

export const metadata: Metadata = {
  title: 'About Desk & Operational Charter | AERAZOAZ',
  description: 'Learn about AERAZOAZ Data Desk — an independent research platform publishing peer-audited empirical insights for freelancers globally.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header activeView="about" />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
