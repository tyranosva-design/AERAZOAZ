'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Globe
} from 'lucide-react';
import { CATEGORY_THEMES, CategoryType } from '../types';

interface AboutPageProps {
  onBackToStream?: () => void;
  onOpenGraphQLModal?: () => void;
  onSelectCategory?: (category: CategoryType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToStream,
  onSelectCategory
}) => {
  return (
    <div className="bg-white text-black min-h-screen font-body pb-20">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-3.5 px-4 sm:px-6 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {onBackToStream ? (
            <button
              onClick={onBackToStream}
              className="flex items-center space-x-2 text-black hover:bg-black hover:text-white px-3 py-1.5 border border-black font-extrabold transition-colors cursor-pointer min-h-[38px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO INTELLIGENCE STREAM</span>
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center space-x-2 text-black hover:bg-black hover:text-white px-3 py-1.5 border border-black font-extrabold transition-colors cursor-pointer min-h-[38px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO INTELLIGENCE STREAM</span>
            </Link>
          )}

          <div className="flex items-center space-x-2 text-[11px] font-bold text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
            <span className="uppercase">AERAZOAZ RESEARCH DESK</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="border-b-2 border-black bg-zinc-900 text-white py-16 sm:py-24 md:py-28 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 relative z-10">
          
          <div className="inline-flex items-center space-x-2 bg-white text-black px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border border-black">
            <ShieldCheck className="w-4 h-4" />
            <span>EMPIRICAL RESEARCH MANIFESTO</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight uppercase leading-tight">
            NO GURUS. NO GIMMICKS.<br />
            <span className="text-zinc-400">PURE FREELANCE DATA.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-body text-zinc-300 max-w-3xl leading-relaxed border-l-4 border-white pl-4 sm:pl-5 py-1">
            AERAZOAZ is an independent, research-driven digital intelligence platform mapping platform fee extraction rates, gig economy legislation, and AI market economics for global independent knowledge workers.
          </p>

          {/* Key Metrics Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 font-mono">
            <div className="border border-zinc-700 bg-zinc-800/80 p-6">
              <span className="block text-zinc-400 text-xs uppercase font-bold">MONITORED REGIONS</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1 block">99+</span>
              <span className="block text-xs text-zinc-400 mt-2">Global Coverage</span>
            </div>

            <div className="border border-zinc-700 bg-zinc-800/80 p-6">
              <span className="block text-zinc-400 text-xs uppercase font-bold">RESEARCH MODEL</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1 block">100%</span>
              <span className="block text-xs text-zinc-400 mt-2">Open Data Desk</span>
            </div>

            <div className="border border-zinc-700 bg-zinc-800/80 p-6">
              <span className="block text-zinc-400 text-xs uppercase font-bold">EDITORIAL INTEGRITY</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1 block">100%</span>
              <span className="block text-xs text-zinc-400 mt-2">Findings Never For Sale</span>
            </div>

            <div className="border border-zinc-700 bg-zinc-800/80 p-6">
              <span className="block text-zinc-400 text-xs uppercase font-bold">DATA VERIFICATION</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1 block">100%</span>
              <span className="block text-xs text-zinc-400 mt-2">Raw &amp; Sourced</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">

        {/* Section 1: Philosophy & Standards */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block border border-black bg-black text-white px-3.5 py-1.5 font-mono text-xs font-bold uppercase">
              01 • OUR PHILOSOPHY
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading uppercase tracking-tight text-black">
              WE DO NOT CLAIM AUTHORITY. WE COMPILE DATA.
            </h2>
            <p className="text-sm sm:text-base font-body text-zinc-700 leading-relaxed">
              The modern freelance economy is saturated with self-proclaimed "gurus," anecdotal advice, and platform marketing fluff. AERAZOAZ exists to replace subjective opinions with hard empirical data.
            </p>
          </div>

          <div className="lg:col-span-7 bg-zinc-50 border-2 border-black p-8 sm:p-12 space-y-8">
            <h3 className="font-heading font-bold text-lg sm:text-xl uppercase tracking-wide text-black border-b-2 border-black pb-4">
              THE THREE FOUNDATIONAL STANDARDS
            </h3>

            <div className="space-y-6 font-body text-sm sm:text-base">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-black text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-black uppercase font-heading text-lg">Quantitative Evidence Over Opinions</h4>
                  <p className="text-zinc-600 text-sm sm:text-base mt-1 leading-relaxed">
                    Every article, rate benchmark, or policy analysis published by AERAZOAZ is backed by empirical sample sizes, regulatory filings, or direct marketplace transaction metrics.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-t border-zinc-200 pt-6">
                <div className="w-8 h-8 bg-black text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  B
                </div>
                <div>
                  <h4 className="font-bold text-black uppercase font-heading text-lg">Strict Editorial Independence</h4>
                  <p className="text-zinc-600 text-sm sm:text-base mt-1 leading-relaxed">
                    Our findings are never for sale. Where partnerships or sponsored content exist, they are always clearly labeled and never influence our data, rankings, or conclusions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-t border-zinc-200 pt-6">
                <div className="w-8 h-8 bg-black text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-black uppercase font-heading text-lg">Transparent Sourcing</h4>
                  <p className="text-zinc-600 text-sm sm:text-base mt-1 leading-relaxed">
                    Every research publication links back to its original source — filings, official reports, and published datasets — so readers can verify the data themselves, not just take our word for it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Research Categories Breakdown */}
        <section className="space-y-8">
          <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <div className="inline-block border border-black bg-black text-white px-3 py-1 font-mono text-xs font-bold uppercase mb-2">
                02 • INTELLIGENCE COVERAGE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase tracking-tight text-black">
                CORE RESEARCH PILLARS
              </h2>
            </div>
            <p className="font-mono text-xs text-zinc-600 max-w-md">
              Explore how AERAZOAZ categorizes global digital labor market intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.keys(CATEGORY_THEMES) as CategoryType[]).map((catKey) => {
              const theme = CATEGORY_THEMES[catKey];
              return (
                <div 
                  key={catKey}
                  className="border-2 border-black p-5 flex flex-col justify-between space-y-4 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span 
                        className="font-heading font-extrabold text-xs uppercase px-2.5 py-1 tracking-wider inline-block"
                        style={{ 
                          backgroundColor: theme.colorHex,
                          color: theme.colorHex === '#00FF00' ? '#000000' : '#ffffff' 
                        }}
                      >
                        {catKey}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold">PILLAR</span>
                    </div>

                    <h3 className="font-heading font-extrabold text-lg uppercase text-black">
                      {catKey}
                    </h3>

                    <p className="text-xs font-body text-zinc-600 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCategory(catKey);
                      onBackToStream();
                    }}
                    className="w-full text-left font-mono text-xs font-bold uppercase py-2 border-t border-zinc-200 text-black hover:underline flex items-center justify-between pt-3 cursor-pointer"
                  >
                    <span>View {catKey} Stream</span>
                    <span>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Contact & Data Desk Disclosures */}
        <section className="border-t-2 border-black pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
          <div className="space-y-3">
            <h3 className="font-heading font-extrabold text-lg uppercase text-black">
              DATA DESK DISCLOSURE
            </h3>
            <p className="text-zinc-600 font-body text-xs leading-relaxed">
              All intelligence published on AERAZOAZ is compiled for informational and market research purposes only. AERAZOAZ is not a legal or tax advisor. Independent operators should verify local jurisdiction regulations. AERAZOAZ may participate in affiliate partnerships or sponsored placements — any such content is clearly labeled and does not influence our editorial findings.
            </p>
          </div>

          <div className="space-y-3 bg-zinc-50 border border-zinc-300 p-5">
            <h3 className="font-heading font-extrabold text-sm uppercase text-black flex items-center space-x-2">
              <Globe className="w-4 h-4 text-black" />
              <span>EDITORIAL INQUIRIES &amp; DATA SUBMISSIONS</span>
            </h3>
            <p className="text-zinc-600 font-body text-xs">
              To submit verified marketplace dataset research or report policy updates in your region:
            </p>
            <div className="font-mono text-xs font-bold text-black border-l-2 border-black pl-3 py-1 bg-white">
              desk@aerazoaz.com
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
