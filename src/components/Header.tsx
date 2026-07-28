'use client';

import React, { useState } from 'react';
import { Search, Menu, X, ArrowLeft, FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CategoryType, CATEGORY_THEMES, WordPressGraphQLConfig } from '../types';

interface HeaderProps {
  selectedCategory?: CategoryType | 'All';
  onSelectCategory?: (category: CategoryType | 'All') => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onOpenSitemapModal?: () => void;
  onOpenGraphQLModal?: () => void;
  onOpenAbout?: () => void;
  onOpenSearchPage?: () => void;
  onBackToStream?: () => void;
  activeView?: 'stream' | 'about' | 'policy' | 'search';
  gqlConfig?: WordPressGraphQLConfig;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory = 'All',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onOpenSitemapModal,
  onOpenGraphQLModal,
  onOpenAbout,
  onOpenSearchPage,
  onBackToStream,
  activeView = 'stream',
  gqlConfig
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isSearchActive = activeView === 'search';

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (onBackToStream) {
      onBackToStream();
    } else {
      router.push('/');
    }
  };

  const handleCategoryClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="border-b-2 border-black bg-white sticky top-0 z-40 shadow-sm">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo - Links to Home Page */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/"
            prefetch={true}
            onClick={() => setMenuOpen(false)}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight cursor-pointer hover:opacity-80 font-heading select-none uppercase text-black border-none bg-transparent p-0 text-left"
            title="Return to AERAZOAZ Home Page"
          >
            AERAZOAZ
          </Link>
        </div>

        {/* Right Header Action Controls - SEARCH & MENU buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          
          {/* SEPARATE SEARCH BUTTON */}
          <Link
            href={isSearchActive ? '/' : '/search'}
            prefetch={true}
            onClick={() => setMenuOpen(false)}
            className={`inline-flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-wider border-2 border-black whitespace-nowrap transition-all cursor-pointer shadow-xs active:scale-95 min-h-[44px] ${
              isSearchActive 
                ? 'bg-zinc-900 text-white hover:bg-black' 
                : 'bg-white text-black hover:bg-zinc-100'
            }`}
            aria-label="Search articles"
            title={isSearchActive ? "Return to Home Stream" : "Open Search Page"}
          >
            {isSearchActive ? (
              <>
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                <span>HOME</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
                <span>SEARCH</span>
              </>
            )}
          </Link>

          {/* SEPARATE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`inline-flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-wider border-2 border-black whitespace-nowrap transition-all cursor-pointer shadow-xs active:scale-95 min-h-[44px] ${
              menuOpen 
                ? 'bg-black text-white' 
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
            aria-label="Toggle Navigation Menu"
            title="Open Site Navigation Menu"
          >
            {menuOpen ? (
              <>
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                <span>CLOSE</span>
              </>
            ) : (
              <>
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                <span>MENU</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Navigation Drawer / Modal (Opened via MENU Button) */}
      {menuOpen && (
        <div className="border-t-2 border-black bg-zinc-900 text-white animate-in slide-in-from-top-2 duration-150 py-8 px-4 sm:px-8 shadow-2xl">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header in Menu */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                AERAZOAZ NAVIGATION CENTER
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-zinc-400 hover:text-white text-xs font-mono underline cursor-pointer py-1"
              >
                CLOSE MENU
              </button>
            </div>

            {/* Categories Navigation Grid */}
            <div className="space-y-3">
              <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-zinc-300 block">
                INTELLIGENCE STREAMS BY CATEGORY
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  href="/"
                  prefetch={true}
                  onClick={handleCategoryClick}
                  className={`p-4 border text-left font-mono text-xs uppercase font-extrabold cursor-pointer transition-all block min-h-[48px] flex items-center justify-between ${
                    selectedCategory === 'All' && activeView === 'stream'
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-white hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>ALL STREAMS</span>
                    <span className="text-[10px] opacity-70">MAIN</span>
                  </div>
                </Link>

                {(Object.keys(CATEGORY_THEMES) as CategoryType[]).map((catKey) => {
                  const theme = CATEGORY_THEMES[catKey];
                  const isSelected = selectedCategory === catKey && activeView === 'stream';

                  return (
                    <Link
                      key={catKey}
                      href={`/${catKey.toLowerCase()}`}
                      prefetch={true}
                      onClick={handleCategoryClick}
                      className={`p-4 border text-left font-mono text-xs uppercase font-extrabold cursor-pointer transition-all block min-h-[48px] flex items-center justify-between ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-white hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <span 
                            className="w-2.5 h-2.5 inline-block shrink-0 border border-white/20"
                            style={{ backgroundColor: theme.colorHex }}
                          />
                          <span>{catKey}</span>
                        </div>
                        <span className="text-[10px] opacity-70">STREAM</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Direct Page Links */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-zinc-300 block">
                QUICK ACCESS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/about"
                  prefetch={true}
                  onClick={() => setMenuOpen(false)}
                  className="p-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-white text-left font-mono text-xs text-white uppercase font-bold flex items-center space-x-2 cursor-pointer transition-all min-h-[48px]"
                >
                  <FileText className="w-4 h-4 text-zinc-300 shrink-0 inline-block mr-2" />
                  <span>ABOUT AERAZOAZ DESK</span>
                </Link>

                <Link
                  href="/policy"
                  prefetch={true}
                  onClick={() => setMenuOpen(false)}
                  className="p-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-white text-left font-mono text-xs text-white uppercase font-bold flex items-center space-x-2 cursor-pointer transition-all min-h-[48px]"
                >
                  <FileText className="w-4 h-4 text-zinc-300 shrink-0 inline-block mr-2" />
                  <span>POLICIES & GOVERNANCE</span>
                </Link>

                <Link
                  href="/contact"
                  prefetch={true}
                  onClick={() => setMenuOpen(false)}
                  className="p-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-white text-left font-mono text-xs text-white uppercase font-bold flex items-center space-x-2 cursor-pointer transition-all min-h-[48px]"
                >
                  <Mail className="w-4 h-4 text-zinc-300 shrink-0 inline-block mr-2" />
                  <span>CONTACT DESK</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

