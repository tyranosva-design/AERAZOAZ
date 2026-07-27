import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutHomeSectionProps {
  onOpenAbout?: () => void;
}

export const AboutHomeSection: React.FC<AboutHomeSectionProps> = () => {
  return (
    <section className="bg-zinc-900 text-white border-y-2 border-black py-16 sm:py-24 md:py-28 px-4 sm:px-8 my-12 md:my-16 font-body">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        
        {/* Top Tag & Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-800 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white text-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider border border-black">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>ABOUT AERAZOAZ RESEARCH DESK</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight uppercase leading-tight text-white">
              NO GURUS. NO GIMMICKS. <span className="text-zinc-400">PURE FREELANCE DATA.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed border-l-2 border-white pl-4">
              AERAZOAZ is an independent, research-driven intelligence platform mapping platform fee extraction, gig economy legislation, and AI market economics for freelancers and independent workers worldwide.
            </p>
          </div>

          <Link
            href="/about"
            className="bg-white text-black hover:bg-zinc-200 font-mono font-extrabold text-xs sm:text-sm uppercase px-6 py-4 border-2 border-white transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-md min-h-[48px]"
          >
            <span>READ FULL DESK MANIFESTO</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
          
          <div className="bg-zinc-800/90 border border-zinc-700 p-6 sm:p-8 space-y-4">
            <div className="w-8 h-8 bg-white text-black font-extrabold flex items-center justify-center font-heading text-sm">
              01
            </div>
            <h3 className="font-heading font-extrabold text-sm uppercase text-white tracking-wide">
              QUANTITATIVE EVIDENCE
            </h3>
            <p className="text-zinc-400 font-body text-xs leading-relaxed">
              Every rate benchmark, platform take-rate report, and regulatory synthesis is backed by empirical sample sizes, official filings, and published data — not opinion.
            </p>
          </div>

          <div className="bg-zinc-800/90 border border-zinc-700 p-6 sm:p-8 space-y-4">
            <div className="w-8 h-8 bg-white text-black font-extrabold flex items-center justify-center font-heading text-sm">
              02
            </div>
            <h3 className="font-heading font-extrabold text-sm uppercase text-white tracking-wide">
              EDITORIAL INDEPENDENCE
            </h3>
            <p className="text-zinc-400 font-body text-xs leading-relaxed">
              Our findings are never for sale. Partnerships and placements, where they exist, are always clearly labeled — they never influence our data, our rankings, or our conclusions.
            </p>
          </div>

          <div className="bg-zinc-800/90 border border-zinc-700 p-6 sm:p-8 space-y-4">
            <div className="w-8 h-8 bg-white text-black font-extrabold flex items-center justify-center font-heading text-sm">
              03
            </div>
            <h3 className="font-heading font-extrabold text-sm uppercase text-white tracking-wide">
              OPEN DATA ARCHITECTURE
            </h3>
            <p className="text-zinc-400 font-body text-xs leading-relaxed">
              All research is synchronized through live, verifiable data pipelines — full transparency, raw and checkable, not just a claim.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
