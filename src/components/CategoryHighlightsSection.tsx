import React from 'react';
import Link from 'next/link';
import { Post, CategoryType, CATEGORY_THEMES } from '../types';
import { SAMPLE_POSTS } from '../data/samplePosts';
import { PostCard } from './PostCard';
import { ArrowRight, Triangle, Layers } from 'lucide-react';

interface CategoryHighlightsSectionProps {
  posts: Post[];
  onSelectPost?: (post: Post) => void;
  onSelectCategory?: (category: CategoryType) => void;
}

const CATEGORIES: CategoryType[] = ['Reports', 'Guides', 'Tools', 'News'];

export const CategoryHighlightsSection: React.FC<CategoryHighlightsSectionProps> = ({
  posts,
}) => {
  return (
    <section className="bg-zinc-100 border-b-2 border-black py-16 sm:py-24 md:py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-black pb-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">
              <Triangle className="w-3.5 h-3.5 text-black fill-black shrink-0 rotate-90" />
              <span>CATEGORY BREAKDOWN • LATEST DIGEST</span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-black uppercase tracking-tight">
              Latest From Each Stream
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-600 bg-white border border-black p-3 shadow-xs shrink-0 max-w-fit">
            <span className="font-bold text-black">1 LATEST ARTICLE</span> PER CATEGORY
          </div>
        </div>

        {/* 2-2 Stacked Layout on Desktop: 2 columns, 2 rows for the 4 stream categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {CATEGORIES.map((category) => {
            const theme = CATEGORY_THEMES[category];
            const categoryPosts = posts.filter((p) => p.category === category);
            // First attempt to get latest post from current posts list, otherwise fallback to SAMPLE_POSTS
            const latestPost = categoryPosts[0] || SAMPLE_POSTS.find((p) => p.category === category);
            const count = Math.max(categoryPosts.length, latestPost ? 1 : 0);

            return (
              <div 
                key={category}
                className="bg-white border-2 border-black p-3 sm:p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full"
              >
                <div className="flex flex-col flex-1">
                  {/* Category Header Banner */}
                  <div 
                    className="p-2.5 mb-3 border border-black flex items-center justify-between font-mono shrink-0"
                    style={{ 
                      backgroundColor: theme.colorHex,
                      color: theme.colorHex === '#00FF00' ? '#000000' : '#ffffff'
                    }}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <Layers className="w-4 h-4 shrink-0" />
                      <span className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider truncate">
                        {category} STREAM
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-black/20 px-2 py-0.5 border border-black/30 shrink-0 ml-1">
                      {count} {count === 1 ? 'Post' : 'Posts'}
                    </span>
                  </div>

                  {/* Category Post Card Wrapper */}
                  {latestPost ? (
                    <div className="flex-1 flex flex-col">
                      <PostCard
                        post={latestPost}
                      />
                    </div>
                  ) : (
                    <div className="flex-1 p-8 text-center border border-zinc-200 bg-zinc-50 font-mono text-xs text-zinc-500 flex items-center justify-center min-h-[250px]">
                      No posts available in this stream.
                    </div>
                  )}
                </div>

                {/* Direct Category Access Button */}
                <Link
                  href={`/${category.toLowerCase()}`}
                  className="w-full mt-4 sm:mt-5 py-3 px-3 sm:px-4 bg-black text-white hover:bg-zinc-800 font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-between border-2 border-black transition-all cursor-pointer shadow-xs active:scale-[0.98] shrink-0"
                  style={{
                    borderLeftWidth: '6px',
                    borderLeftColor: theme.colorHex,
                  }}
                >
                  <span className="flex items-center space-x-1 truncate">
                    <span className="truncate">EXPLORE ALL {category.toUpperCase()}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 ml-1.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
