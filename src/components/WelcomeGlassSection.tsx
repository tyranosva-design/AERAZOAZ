import React from 'react';
import Link from 'next/link';
import { FileText, Cpu, BookOpen, Newspaper, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { CATEGORY_THEMES } from '../types';

interface WelcomeGlassSectionProps {
  onSelectCategory?: (category: any) => void;
}

export const WelcomeGlassSection: React.FC<WelcomeGlassSectionProps> = () => {
  return (
    <section className="bg-zinc-50 text-black border-b-2 border-black py-12 sm:py-20 md:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Main Editorial Header Box */}
        <div className="bg-white border-2 border-black p-8 sm:p-12 md:p-16 shadow-sm space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold uppercase tracking-widest text-zinc-600">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>AERAZOAZ • DIGITAL INTELLIGENCE STREAM</span>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
              100% UNBIASED DATA
            </span>
          </div>

          <div className="space-y-4 sm:space-y-5 max-w-4xl pt-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-black tracking-tight uppercase leading-tight">
              Digital wealth, decoded.
            </h1>
            <p className="text-zinc-700 font-body text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl">
              The freelance world moves fast, and most advice out there is either outdated or trying to sell you something. AERAZOAZ cuts through that — real rates, real platform fees, real tool comparisons, sourced and broken down so you can actually make sense of it. No fluff. No gatekeeping. Just what's true, made easy to understand.
            </p>
          </div>

          {/* Four Primary Category Navigation Buttons */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* REPORTS BUTTON (#0000FF) */}
            <Link
              href="/reports"
              className="group flex items-center justify-between p-4 bg-white hover:bg-black text-black hover:text-white border-2 border-black transition-all duration-200 text-left cursor-pointer active:scale-98 shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 border border-black group-hover:border-[#0000FF] bg-[#0000FF]/10 group-hover:bg-[#0000FF] flex items-center justify-center shrink-0 transition-colors"
                >
                  <FileText className="w-5 h-5 text-[#0000FF] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-heading font-extrabold text-sm uppercase tracking-wider group-hover:text-[#3366FF] transition-colors">
                      REPORTS
                    </span>
                    <span className="w-2.5 h-2.5 inline-block shrink-0 border border-black/30" style={{ backgroundColor: '#0000FF' }} />
                  </div>
                  <p className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-mono">Market & Rates</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#0000FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </Link>

            {/* GUIDES BUTTON (#00FF00) */}
            <Link
              href="/guides"
              className="group flex items-center justify-between p-4 bg-white hover:bg-black text-black hover:text-white border-2 border-black transition-all duration-200 text-left cursor-pointer active:scale-98 shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 border border-black group-hover:border-[#00FF00] bg-[#00FF00]/15 group-hover:bg-[#00FF00] flex items-center justify-center shrink-0 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-[#008000] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-heading font-extrabold text-sm uppercase tracking-wider group-hover:text-[#00FF00] transition-colors">
                      GUIDES
                    </span>
                    <span className="w-2.5 h-2.5 inline-block shrink-0 border border-black/30" style={{ backgroundColor: '#00FF00' }} />
                  </div>
                  <p className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-mono">Blueprints & Billing</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#00FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </Link>

            {/* TOOLS BUTTON (#FF00FF) */}
            <Link
              href="/tools"
              className="group flex items-center justify-between p-4 bg-white hover:bg-black text-black hover:text-white border-2 border-black transition-all duration-200 text-left cursor-pointer active:scale-98 shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 border border-black group-hover:border-[#FF00FF] bg-[#FF00FF]/10 group-hover:bg-[#FF00FF] flex items-center justify-center shrink-0 transition-colors"
                >
                  <Cpu className="w-5 h-5 text-[#D000D0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-heading font-extrabold text-sm uppercase tracking-wider group-hover:text-[#FF66FF] transition-colors">
                      TOOLS
                    </span>
                    <span className="w-2.5 h-2.5 inline-block shrink-0 border border-black/30" style={{ backgroundColor: '#FF00FF' }} />
                  </div>
                  <p className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-mono">Tech Stack</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#FF00FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </Link>

            {/* NEWS BUTTON (#FF6600) */}
            <Link
              href="/news"
              className="group flex items-center justify-between p-4 bg-white hover:bg-black text-black hover:text-white border-2 border-black transition-all duration-200 text-left cursor-pointer active:scale-98 shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 border border-black group-hover:border-[#FF6600] bg-[#FF6600]/15 group-hover:bg-[#FF6600] flex items-center justify-center shrink-0 transition-colors"
                >
                  <Newspaper className="w-5 h-5 text-[#FF6600] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-heading font-extrabold text-sm uppercase tracking-wider group-hover:text-[#FF8833] transition-colors">
                      NEWS
                    </span>
                    <span className="w-2.5 h-2.5 inline-block shrink-0 border border-black/30" style={{ backgroundColor: '#FF6600' }} />
                  </div>
                  <p className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-mono">Market Updates</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#FF6600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
};
