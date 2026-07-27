'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryType, CATEGORY_THEMES } from '../types';
import { ShieldCheck, Lock, Scale, Cookie, Database, Mail } from 'lucide-react';
import { PolicyTab } from './PolicyPage';

interface FooterProps {
  onSelectCategory?: (category: CategoryType | 'All') => void;
  onOpenAbout?: () => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
  onNavigate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAbout,
  onOpenPolicy,
  onNavigate
}) => {
  return (
    <footer className="border-t-2 border-black bg-white pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 font-mono text-xs text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 pb-12 sm:pb-16 border-b border-zinc-200">
          
          {/* Brand Manifesto Column */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-black tracking-tight uppercase">
              AERAZOAZ
            </h2>
            <p className="text-zinc-700 font-body text-xs sm:text-sm leading-relaxed border-l-2 border-black pl-3">
              AERAZOAZ is a research-based digital intelligence platform for freelancers worldwide. We're not built around gurus or personal opinions — we compile data, verify sources, and present findings clearly.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-zinc-600 font-bold">
                <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                <span>100% UNBIASED • EDITORIALLY INDEPENDENT • OPEN DATA</span>
              </div>
              <Link
                href="/about"
                onClick={onOpenAbout}
                className="bg-black text-white hover:bg-zinc-800 text-[10px] sm:text-xs font-mono font-bold uppercase px-3 py-1.5 border border-black transition-colors cursor-pointer inline-block"
              >
                READ ABOUT OUR DESK →
              </Link>
            </div>

            {/* Official Social Channels */}
            <div className="pt-4 border-t border-zinc-200">
              <p className="font-heading font-extrabold uppercase text-black text-[11px] tracking-wider mb-2.5">
                OFFICIAL SOCIAL DESKS
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/aerazoaz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AERAZOAZ Instagram"
                  title="Instagram"
                  className="flex items-center space-x-1.5 bg-zinc-50 hover:bg-black hover:text-white text-black border border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/AERAZOAZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AERAZOAZ Facebook"
                  title="Facebook"
                  className="flex items-center space-x-1.5 bg-zinc-50 hover:bg-black hover:text-white text-black border border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href="https://x.com/aerazoaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AERAZOAZ X (Twitter)"
                  title="X (Twitter)"
                  className="flex items-center space-x-1.5 bg-zinc-50 hover:bg-black hover:text-white text-black border border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X</span>
                </a>

                <a
                  href="https://www.youtube.com/@AERAZOAZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AERAZOAZ YouTube"
                  title="YouTube"
                  className="flex items-center space-x-1.5 bg-zinc-50 hover:bg-black hover:text-white text-black border border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/aerazoaz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AERAZOAZ LinkedIn"
                  title="LinkedIn"
                  className="flex items-center space-x-1.5 bg-zinc-50 hover:bg-black hover:text-white text-black border border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-heading font-bold uppercase text-black tracking-wider text-xs sm:text-sm border-b border-zinc-200 pb-2">
              INTELLIGENCE CATEGORIES
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              {(Object.keys(CATEGORY_THEMES) as CategoryType[]).map((catKey) => {
                const theme = CATEGORY_THEMES[catKey];
                return (
                  <Link
                    key={catKey}
                    href={`/${catKey.toLowerCase()}`}
                    className="flex items-center space-x-2.5 hover:underline text-zinc-800 hover:text-black cursor-pointer uppercase font-heading text-xs py-1 min-h-[32px] w-full text-left"
                  >
                    <span className="w-2.5 h-2.5 inline-block shrink-0 border border-black/20" style={{ backgroundColor: theme.colorHex }} />
                    <span className="font-bold">{catKey}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Governance & Policy Column */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-heading font-extrabold uppercase text-black tracking-wider text-xs sm:text-sm border-b border-zinc-200 pb-2">
              GOVERNANCE & POLICIES
            </p>
            <div className="space-y-2 text-xs">
              <Link
                href="/policy?tab=privacy"
                onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
                className="flex items-center space-x-2 hover:underline text-zinc-800 hover:text-black cursor-pointer font-mono py-0.5"
              >
                <Lock className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Privacy Policy</span>
              </Link>

              <Link
                href="/policy?tab=terms"
                onClick={() => onOpenPolicy && onOpenPolicy('terms')}
                className="flex items-center space-x-2 hover:underline text-zinc-800 hover:text-black cursor-pointer font-mono py-0.5"
              >
                <Scale className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Terms of Service</span>
              </Link>

              <Link
                href="/policy?tab=cookie-policy"
                onClick={() => onOpenPolicy && onOpenPolicy('cookie-policy')}
                className="flex items-center space-x-2 hover:underline text-zinc-800 hover:text-black cursor-pointer font-mono py-0.5"
              >
                <Cookie className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Cookie Policy</span>
              </Link>

              <Link
                href="/policy?tab=methodology"
                onClick={() => onOpenPolicy && onOpenPolicy('methodology')}
                className="flex items-center space-x-2 hover:underline text-zinc-800 hover:text-black cursor-pointer font-mono py-0.5"
              >
                <Database className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Editorial Methodology</span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center space-x-2 hover:underline text-zinc-800 hover:text-black cursor-pointer font-mono py-0.5 font-bold pt-1 text-black"
              >
                <Mail className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Contact Data Desk</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] sm:text-[11px] font-bold">
          <div>
            © 2026 AERAZOAZ. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-4">
            <span>NO HYPE. NO GURUS. JUST DATA.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
