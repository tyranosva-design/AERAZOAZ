'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post, CategoryType, CATEGORY_THEMES } from '../types';
import { Search, X, ArrowLeft, Filter, Tag } from 'lucide-react';
import { PostCard } from './PostCard';

interface SearchPageProps {
  posts?: Post[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: CategoryType | 'All';
  onSelectCategory?: (category: CategoryType | 'All') => void;
  onSelectPost?: (post: Post) => void;
  onBackToStream?: () => void;
  onOpenAbout?: () => void;
  initialTag?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  posts = [],
  searchQuery = '',
  onSearchChange,
  selectedCategory = 'All',
  onSelectCategory,
  onSelectPost,
  onBackToStream,
  onOpenAbout,
  initialTag = 'All'
}) => {
  const router = useRouter();
  const [internalQuery, setInternalQuery] = useState(searchQuery);
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [activeFilterCategory, setActiveFilterCategory] = useState<CategoryType | 'All'>(selectedCategory);

  const queryToUse = onSearchChange ? searchQuery : internalQuery;

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  // Sync state if selectedCategory changes externally
  useEffect(() => {
    setActiveFilterCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (initialTag) setSelectedTag(initialTag);
  }, [initialTag]);

  // Extract all available tags
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(p => {
      if (p.tag) tagsSet.add(p.tag);
      if (p.tags) {
        p.tags.forEach(t => {
          if (t.name) tagsSet.add(t.name);
        });
      }
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Perform multi-field search & filtering
  const searchResults = useMemo(() => {
    let list = [...posts];

    // Filter by Category
    if (activeFilterCategory !== 'All') {
      list = list.filter(p => p.category === activeFilterCategory);
    }

    // Filter by Tag
    if (selectedTag !== 'All') {
      const lowerTag = selectedTag.toLowerCase();
      list = list.filter(p => 
        (p.tag && p.tag.toLowerCase() === lowerTag) ||
        (p.tags && p.tags.some(t => t.name.toLowerCase() === lowerTag || t.slug.toLowerCase() === lowerTag))
      );
    }

    // Filter by Text Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const excerptMatch = p.excerpt.toLowerCase().includes(q);
        const contentMatch = p.content.toLowerCase().includes(q);
        const categoryMatch = p.category.toLowerCase().includes(q);
        const tagMatch = p.tag ? p.tag.toLowerCase().includes(q) : false;
        const authorMatch = p.author.toLowerCase().includes(q);
        const methodologyMatch = p.methodology ? p.methodology.toLowerCase().includes(q) : false;
        const keyDataMatch = p.keyDataPoints?.some(pt => 
          pt.label.toLowerCase().includes(q) || pt.value.toLowerCase().includes(q)
        );

        return titleMatch || excerptMatch || contentMatch || categoryMatch || tagMatch || authorMatch || methodologyMatch || keyDataMatch;
      });
    }

    return list;
  }, [posts, searchQuery, activeFilterCategory, selectedTag]);

  // Helper function to detect where the query matched
  const getMatchReason = (p: Post, q: string) => {
    if (!q.trim()) return null;
    const query = q.toLowerCase().trim();

    if (p.title.toLowerCase().includes(query)) return 'Title Match';
    if (p.keyDataPoints?.some(pt => pt.label.toLowerCase().includes(query) || pt.value.toLowerCase().includes(query))) return 'Data Highlight Match';
    if (p.excerpt.toLowerCase().includes(query)) return 'Summary Match';
    if (p.content.toLowerCase().includes(query)) return 'Article Text Match';
    if (p.tag && p.tag.toLowerCase().includes(query)) return 'Tag Match';
    if (p.author.toLowerCase().includes(query)) return 'Author Match';
    if (p.methodology && p.methodology.toLowerCase().includes(query)) return 'Methodology Match';
    return 'Keyword Match';
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-black animate-in fade-in duration-200">
      
      {/* Search Header Banner */}
      <section className="bg-zinc-900 text-white border-b-2 border-black py-10 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            {onBackToStream ? (
              <button
                onClick={onBackToStream}
                className="inline-flex items-center space-x-2 bg-white text-black hover:bg-zinc-200 font-heading font-extrabold text-xs uppercase px-4 py-2 border border-black cursor-pointer transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>RETURN TO HOME STREAM</span>
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-white text-black hover:bg-zinc-200 font-heading font-extrabold text-xs uppercase px-4 py-2 border border-black cursor-pointer transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>RETURN TO HOME STREAM</span>
              </Link>
            )}

            <span className="font-mono text-xs text-zinc-400 hidden sm:inline-block">
              AERAZOAZ INTELLIGENCE SEARCH ENGINE
            </span>
          </div>

          {/* Header Title */}
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading uppercase tracking-tight text-white leading-tight">
              SEARCH & EXPLORE
            </h1>
            <p className="text-sm sm:text-base font-body text-zinc-300 mt-2 max-w-3xl">
              Query the full AERAZOAZ research ledger across all categories, datasets, and verified transaction metrics.
            </p>
          </div>

          {/* Prominent Search Input Box */}
          <div className="relative max-w-4xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-6 h-6 text-black absolute left-4 z-10" />
              <input
                type="text"
                placeholder="Type keywords, categories, tools, rates, or legislation..."
                value={queryToUse}
                onChange={(e) => handleQueryChange(e.target.value)}
                autoFocus
                className="w-full bg-white text-black font-mono text-base sm:text-lg pl-14 pr-12 py-4 sm:py-5 border-2 border-black shadow-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-zinc-500"
              />
              {queryToUse && (
                <button
                  onClick={() => handleQueryChange('')}
                  className="absolute right-4 text-black hover:bg-zinc-200 p-2 border border-black text-sm font-bold cursor-pointer"
                  title="Clear search query"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Query Metrics Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-xs font-mono text-zinc-400 px-1">
              <span>
                {searchQuery.trim() ? (
                  <>FOUND <strong className="text-white">{searchResults.length}</strong> MATCHES FOR "{searchQuery}"</>
                ) : (
                  <>ENTER A SEARCH TERM TO QUERY ALL <strong className="text-white">{posts.length}</strong> RESEARCH REPORTS</>
                )}
              </span>

              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-zinc-300 hover:text-white underline cursor-pointer"
                >
                  RESET SEARCH QUERY
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Main Search Controls & Filter Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">

        {/* Category Filters Row */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-sm space-y-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3">
            <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-black flex items-center space-x-2">
              <Filter className="w-4 h-4 text-black shrink-0" />
              <span>FILTER BY CATEGORY</span>
            </span>

            <span className="text-zinc-500 text-[11px]">
              SHOWING: {activeFilterCategory.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setActiveFilterCategory('All');
                onSelectCategory('All');
              }}
              className={`px-3.5 py-2 border font-bold uppercase cursor-pointer transition-all ${
                activeFilterCategory === 'All'
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-zinc-50 text-zinc-800 border-zinc-300 hover:border-black'
              }`}
            >
              ALL CATEGORIES ({posts.length})
            </button>

            {(Object.keys(CATEGORY_THEMES) as CategoryType[]).map((catKey) => {
              const theme = CATEGORY_THEMES[catKey];
              const isSelected = activeFilterCategory === catKey;
              const catCount = posts.filter(p => p.category === catKey).length;

              return (
                <button
                  key={catKey}
                  onClick={() => {
                    setActiveFilterCategory(catKey);
                    onSelectCategory(catKey);
                  }}
                  className={`px-3.5 py-2 border flex items-center space-x-2 font-bold uppercase cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-zinc-50 text-zinc-800 border-zinc-300 hover:border-black'
                  }`}
                >
                  <span 
                    className="w-2.5 h-2.5 inline-block shrink-0 border border-black/20"
                    style={{ backgroundColor: theme.colorHex }}
                  />
                  <span>{catKey} ({catCount})</span>
                </button>
              );
            })}
          </div>

          {/* Tags Filters Row */}
          {availableTags.length > 0 && (
            <div className="pt-3 border-t border-zinc-200 flex flex-wrap items-center gap-2">
              <span className="text-zinc-500 font-bold uppercase text-[11px] flex items-center space-x-1 mr-1">
                <Tag className="w-3.5 h-3.5" />
                <span>TAGS:</span>
              </span>

              <button
                onClick={() => setSelectedTag('All')}
                className={`px-2.5 py-1 border text-[11px] font-bold uppercase cursor-pointer ${
                  selectedTag === 'All' ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                }`}
              >
                All Tags
              </button>

              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? 'All' : tag)}
                  className={`px-2.5 py-1 border text-[11px] font-bold uppercase cursor-pointer ${
                    selectedTag === tag ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results Display Area */}
        <div>
          {searchResults.length === 0 ? (
            <div className="bg-white border-2 border-black p-8 sm:p-12 text-center space-y-4">
              <p className="font-heading font-extrabold text-xl text-black uppercase">
                NO RESEARCH REPORTS FOUND MATCHING YOUR QUERY
              </p>
              <p className="font-mono text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto">
                No matching results were found for "{searchQuery}". Try broadening your search query or removing category filters.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    onSearchChange('');
                    setActiveFilterCategory('All');
                    onSelectCategory('All');
                    setSelectedTag('All');
                  }}
                  className="bg-black text-white font-heading font-extrabold text-xs uppercase px-5 py-3 border border-black hover:bg-zinc-800 cursor-pointer shadow-sm"
                >
                  Clear All Filters & Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-heading font-extrabold text-base uppercase tracking-wider text-black">
                  {searchQuery.trim() ? `SEARCH RESULTS (${searchResults.length})` : `ALL RESEARCH REPORTS (${searchResults.length})`}
                </span>
                <span className="font-mono text-xs text-zinc-600">
                  CLICK ANY REPORT TO READ FULL DATA
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {searchResults.map((post) => {
                  const matchReason = searchQuery.trim() ? getMatchReason(post, searchQuery) : null;
                  return (
                    <div key={post.id} className="relative flex flex-col">
                      {matchReason && (
                        <div className="bg-black text-white font-mono text-[10px] font-bold uppercase px-2.5 py-1 border border-black inline-block self-start mb-1 tracking-wider">
                          ✓ {matchReason}
                        </div>
                      )}
                      <div className="flex-1">
                        <PostCard
                          post={post}
                          onSelectPost={onSelectPost}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
