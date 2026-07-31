'use client';

import React from 'react';
import Link from 'next/link';
import { Post, CATEGORY_THEMES } from '../types';
import { decodeHtmlEntities } from '../services/wordpressGql';
import { Calendar, ArrowUpRight, Tag } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onSelectPost?: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onSelectPost
}) => {
  const theme = React.useMemo(() => {
    const norm = (post.category || '').toLowerCase().trim();
    if (norm === 'guides' || norm === 'guide') return CATEGORY_THEMES.Guides;
    if (norm === 'tools' || norm === 'tool') return CATEGORY_THEMES.Tools;
    if (norm === 'news') return CATEGORY_THEMES.News;
    if (norm === 'reports' || norm === 'report') return CATEGORY_THEMES.Reports;
    return CATEGORY_THEMES[post.category as keyof typeof CATEGORY_THEMES] || {
      name: post.category,
      colorHex: '#000000',
      bgClass: 'bg-black text-white',
      textClass: 'text-black',
      borderClass: 'border-black',
      description: ''
    };
  }, [post.category]);

  const categorySlug = (post.categorySlug || post.category.toLowerCase()).toLowerCase().trim();
  const postUrl = `/${categorySlug}/${post.slug}`;

  // Tag name fetched directly from WordPress (if present)
  const hasTag = Boolean(post.tag && post.tag.trim());
  const displayTag = React.useMemo(() => {
    return hasTag ? decodeHtmlEntities(post.tag).trim().toUpperCase() : '';
  }, [post.tag, hasTag]);

  // Truncate title strictly to max 70 chars
  const formattedTitle = React.useMemo(() => {
    if (!post.title) return '';
    const clean = decodeHtmlEntities(post.title);
    return clean.length > 70 ? `${clean.slice(0, 70).trim()}…` : clean;
  }, [post.title]);

  // Truncate excerpt/description strictly to max 250 chars
  const formattedExcerpt = React.useMemo(() => {
    if (!post.excerpt) return '';
    const clean = decodeHtmlEntities(post.excerpt);
    return clean.length > 250 ? `${clean.slice(0, 250).trim()}…` : clean;
  }, [post.excerpt]);

  return (
    <article className="group bg-white border border-zinc-300 hover:border-black transition-all flex flex-col justify-between h-full w-full p-3.5 sm:p-4.5 relative shadow-sm hover:shadow-md space-y-3">
      <div className="flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Card Header: Category Badge & WordPress Tag Name */}
          <div className="flex items-center justify-between mb-2.5 border-b border-zinc-200 pb-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Category Exact Accent Color Badge */}
              <Link
                href={`/${categorySlug}`}
                prefetch={true}
                className="font-heading font-extrabold text-[11px] sm:text-xs uppercase px-2.5 py-1 tracking-wider inline-block shrink-0 hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: theme.colorHex, 
                  color: theme.colorHex === '#00FF00' ? '#000000' : '#ffffff' 
                }}
              >
                {post.category}
              </Link>

              {/* Tag Name Badge fetched from WordPress */}
              {hasTag && (
                <Link 
                  href={`/search?tag=${encodeURIComponent(post.tag.toLowerCase().replace(/\s+/g, '-'))}`}
                  prefetch={true}
                  className="text-[11px] sm:text-xs font-mono font-bold border border-zinc-300 text-zinc-800 bg-zinc-100 hover:bg-black hover:text-white hover:border-black px-2 py-0.5 uppercase shrink-0 truncate max-w-[150px] inline-flex items-center space-x-1 transition-colors"
                  title={`Tag: ${displayTag}`}
                >
                  <Tag className="w-3 h-3 shrink-0 mr-0.5" />
                  <span>{displayTag}</span>
                </Link>
              )}
            </div>
          </div>

          {/* WordPress Featured Image - Scaled to 851x315 Aspect Ratio, Responsive & No Cutout */}
          {post.featuredImage && (
            <Link 
              href={postUrl}
              prefetch={true}
              className="w-full aspect-[851/315] overflow-hidden bg-zinc-100 border border-zinc-300 mb-3 cursor-pointer relative group/img shrink-0 block"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
              />
            </Link>
          )}

          {/* Title - Max 70 characters with crisp, prominent font size & weight */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold font-heading text-black tracking-tight leading-snug mb-2.5 hover:underline cursor-pointer uppercase break-words line-clamp-3">
            <Link href={postUrl} prefetch={true} title={post.title}>
              {formattedTitle}
            </Link>
          </h3>

          {/* Excerpt - Max 250 characters with larger, highly legible body font */}
          <p className="text-zinc-700 text-sm sm:text-base font-body leading-relaxed mb-3.5 break-words line-clamp-4">
            {formattedExcerpt}
          </p>
        </div>
      </div>

      {/* Footer Meta: Published Date + View Data */}
      <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between font-mono text-xs sm:text-[13px] text-zinc-600 mt-auto shrink-0 min-h-[36px]">
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
          <span>{post.date}</span>
        </div>

        <Link
          href={postUrl}
          prefetch={true}
          className="flex items-center space-x-1 text-black font-heading font-extrabold hover:underline cursor-pointer uppercase tracking-wider min-h-[36px] px-1 py-0.5"
        >
          <span>VIEW DATA</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </Link>
      </div>
    </article>
  );
};


