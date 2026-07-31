'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post, CATEGORY_THEMES } from '../types';
import { 
  ArrowLeft, 
  Check, 
  FileCheck, 
  Sliders, 
  Copy
} from 'lucide-react';

interface PostDetailProps {
  post: Post;
  onBack?: () => void;
  relatedPosts: Post[];
  onSelectPost?: (post: Post) => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  onBack,
  relatedPosts,
  onSelectPost
}) => {
  const theme = React.useMemo(() => {
    const norm = (post.category || '').toLowerCase().trim();
    if (norm === 'guides' || norm === 'guide') return CATEGORY_THEMES.Guides;
    if (norm === 'tools' || norm === 'tool') return CATEGORY_THEMES.Tools;
    if (norm === 'news') return CATEGORY_THEMES.News;
    if (norm === 'reports' || norm === 'report') return CATEGORY_THEMES.Reports;
    return CATEGORY_THEMES[post.category as keyof typeof CATEGORY_THEMES] || CATEGORY_THEMES.Reports;
  }, [post.category]);
  
  const [copied, setCopied] = useState(false);
  
  // Interactive Guide Checklist State
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Interactive Poll State for News
  const [pollVoted, setPollVoted] = useState<string | null>(null);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleChecklistStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const categorySlug = post.categorySlug || post.category.toLowerCase();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 md:py-20">
      {/* Back Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5 sm:pb-6 mb-8 sm:mb-14">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center justify-center space-x-2 text-white font-heading font-extrabold text-xs uppercase tracking-widest bg-black border border-black px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm active:scale-98 min-h-[46px]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>BACK TO INTELLIGENCE STREAM</span>
          </button>
        ) : (
          <Link
            href={`/${categorySlug}`}
            prefetch={true}
            className="flex items-center justify-center space-x-2 text-white font-heading font-extrabold text-xs uppercase tracking-widest bg-black border border-black px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm active:scale-98 min-h-[46px]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>BACK TO {post.category.toUpperCase()}</span>
          </Link>
        )}

        <div className="flex items-center justify-between sm:justify-end space-x-2.5 sm:space-x-3.5">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 text-xs font-mono bg-zinc-100 text-black border border-zinc-300 px-4 py-3 min-h-[46px] hover:border-black transition-colors cursor-pointer"
            title="Copy Share Link"
          >
            {copied ? <Check className="w-4 h-4 text-black shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
            <span>{copied ? 'COPIED SHARE LINK' : 'SHARE ARTICLE'}</span>
          </button>
        </div>
      </div>

      {/* Category Header Badge & Clickable Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8 font-mono text-xs">
        <Link 
          href={`/${categorySlug}`}
          prefetch={true}
          className="font-heading font-extrabold text-xs uppercase px-3.5 py-1.5 tracking-wider inline-block hover:opacity-90 min-h-[32px] flex items-center"
          style={{ 
            backgroundColor: theme.colorHex, 
            color: theme.colorHex === '#00FF00' ? '#000000' : '#ffffff' 
          }}
        >
          {post.category}
        </Link>

        {post.tags && post.tags.length > 0 ? (
          post.tags.map((t, idx) => (
            <Link
              key={idx}
              href={`/search?tag=${encodeURIComponent(t.slug || t.name)}`}
              prefetch={true}
              className="border border-zinc-300 bg-zinc-50 hover:bg-black hover:text-white hover:border-black px-3 py-1 text-black font-semibold uppercase text-xs transition-colors min-h-[32px] flex items-center"
            >
              #{t.name}
            </Link>
          ))
        ) : post.tag ? (
          <Link
            href={`/search?tag=${encodeURIComponent(post.tag.toLowerCase().replace(/\s+/g, '-'))}`}
            prefetch={true}
            className="border border-zinc-300 bg-zinc-50 hover:bg-black hover:text-white hover:border-black px-3 py-1 text-black font-semibold uppercase text-xs transition-colors min-h-[32px] flex items-center"
          >
            #{post.tag}
          </Link>
        ) : null}

        <span className="text-zinc-400 hidden xs:inline">•</span>
        <span className="text-zinc-600 font-medium text-xs">PUBLISHED: {post.date}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-fluid-h1 font-bold font-heading text-black tracking-tight leading-tight mb-6 sm:mb-8 uppercase break-words">
        {post.title}
      </h1>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full aspect-[851/315] overflow-hidden bg-zinc-100 border-2 border-black mb-8 sm:mb-12 shadow-sm">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Normal Introduction Paragraph (18px Body Text) */}
      {post.excerpt && (
        <p className="text-[18px] font-body text-zinc-800 leading-relaxed mb-6 sm:mb-10 font-normal">
          {post.excerpt}
        </p>
      )}

      {/* Category-Specific Interactive Action Widget */}
      {post.category === 'Guides' && (
        <div className="bg-zinc-50 border-2 border-black p-4 sm:p-6 mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3 mb-4">
            <FileCheck className="w-5 h-5 text-black shrink-0" />
            <h3 className="font-heading font-extrabold text-black text-sm sm:text-base uppercase tracking-wider">
              INTERACTIVE EXECUTION CHECKLIST
            </h3>
          </div>
          <p className="text-xs font-mono text-zinc-600 mb-4">
            Mark off steps as you implement this blueprint into your freelance operations:
          </p>
          <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
            {[
              'Audit active client contracts for platform fee lock-in clauses',
              'Set up Wise Business or Stripe ACH direct invoice banking',
              'Implement 50% upfront deposit terms on all estimates <$10,000',
              'Update client invoice templates with automated late-fee terms'
            ].map((stepText, idx) => {
              const isChecked = completedSteps.includes(idx);
              return (
                <label 
                  key={idx}
                  onClick={() => toggleChecklistStep(idx)}
                  className={`flex items-start space-x-3 p-3 sm:p-3.5 border cursor-pointer transition-colors min-h-[44px] ${
                    isChecked ? 'bg-zinc-100 border-black text-black font-bold' : 'bg-white border-zinc-300 text-zinc-800 hover:border-black'
                  }`}
                >
                  <input type="checkbox" checked={isChecked} readOnly className="mt-0.5 accent-black shrink-0" />
                  <span className={isChecked ? 'line-through text-zinc-500' : ''}>{stepText}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {post.category === 'News' && (
        <div className="bg-zinc-50 border-2 border-black p-4 sm:p-6 mb-8 sm:mb-12 font-mono text-xs">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3 mb-4">
            <Sliders className="w-4 h-4 text-black shrink-0" />
            <h3 className="font-heading font-extrabold text-black text-xs sm:text-sm uppercase tracking-wider">
              MARKET SIGNAL QUICK POLL
            </h3>
          </div>
          <p className="text-zinc-800 mb-4 font-body text-xs sm:text-sm">
            How will this regulatory/market update impact your freelance invoicing strategy?
          </p>
          {pollVoted ? (
            <div className="p-4 bg-zinc-100 border border-black text-black font-bold">
              ✓ Vote recorded: "{pollVoted}". Data aggregated into AERAZOAZ sentiment pulse.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {[
                'Positive impact: Enhances my rates',
                'Negative impact: Adds administrative overhead',
                'Neutral: Standard market adaptation',
                'Migrating off-platform immediately'
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPollVoted(opt)}
                  className="p-3 bg-white border border-zinc-300 text-left hover:border-black transition-colors cursor-pointer text-black font-medium min-h-[44px]"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content Body with Clean Editorial Markdown Typography (18px Body Text) & Responsive Tables */}
      <div className="border-b border-zinc-200 pb-8 sm:pb-12 text-zinc-900 font-body leading-relaxed text-[18px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // Styled Responsive Table Component
            table: ({ children }) => (
              <div className="my-6 sm:my-8 overflow-x-auto border-2 border-black bg-white shadow-xs">
                <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm min-w-[500px]">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-black text-white font-heading font-extrabold uppercase text-[11px] sm:text-xs tracking-wider border-b-2 border-black">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-zinc-200 bg-white">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-zinc-100 transition-colors odd:bg-white even:bg-zinc-50">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="p-3 sm:p-4 border-r border-zinc-700 last:border-r-0 whitespace-nowrap font-extrabold tracking-wider text-left text-white bg-black uppercase">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="p-3 sm:p-4 border-r border-zinc-200 last:border-r-0 text-zinc-900 font-mono text-xs sm:text-sm leading-relaxed">
                {children}
              </td>
            ),
            // Headings & Text Formatting (Blog post body strictly 18px)
            h1: ({ children }) => (
              <h1 className="text-fluid-h1 font-bold font-heading text-black uppercase tracking-tight mt-8 mb-4 border-b-2 border-black pb-2">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-fluid-h2 font-bold font-heading text-black uppercase tracking-tight mt-8 mb-3 border-b border-zinc-300 pb-1.5">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-fluid-h3 font-bold font-heading text-black uppercase tracking-tight mt-6 mb-2.5">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="font-body text-[18px] leading-relaxed text-zinc-800 mb-6 font-normal">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-black underline font-bold hover:bg-zinc-200 px-0.5 transition-colors">
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-outside space-y-2.5 my-6 font-body text-[18px] text-zinc-800 pl-6">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-outside space-y-2.5 my-6 font-body text-[18px] text-zinc-800 pl-6">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed pl-1 text-[18px]">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-black font-body">
                {children}
              </strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-black bg-zinc-50 p-5 sm:p-6 my-6 font-body text-[18px] text-zinc-800 border-y border-r border-zinc-200">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-zinc-100 text-black border border-zinc-300 font-mono text-xs px-1.5 py-0.5 font-semibold">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <div className="my-6 overflow-x-auto bg-zinc-950 text-zinc-200 p-4 sm:p-5 border-2 border-black font-mono text-xs sm:text-sm shadow-xs">
                <pre className="font-mono whitespace-pre-wrap">{children}</pre>
              </div>
            )
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Related Articles Stream */}
      {relatedPosts.length > 0 && (
        <section className="mt-14 pt-10 border-t-2 border-black">
          <h3 className="text-2xl font-extrabold font-heading text-black uppercase tracking-tight mb-8">
            RELATED RESEARCH REPORTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relPost) => {
              const relTheme = CATEGORY_THEMES[relPost.category] || CATEGORY_THEMES.Reports;
              const relCategorySlug = relPost.categorySlug || relPost.category.toLowerCase();
              return (
                <Link 
                  key={relPost.id}
                  href={`/${relCategorySlug}/${relPost.slug}`}
                  prefetch={true}
                  className="block bg-white border border-zinc-300 hover:border-black p-6 cursor-pointer transition-all shadow-sm hover:shadow-md"
                >
                  <span 
                    className="font-heading font-bold text-[10px] uppercase px-2.5 py-0.5 inline-block mb-3"
                    style={{ 
                      backgroundColor: relTheme.colorHex, 
                      color: relTheme.colorHex === '#00FF00' ? '#000000' : '#ffffff' 
                    }}
                  >
                    {relPost.category}
                  </span>
                  <h4 className="text-lg font-bold font-heading text-black uppercase leading-snug mb-2">
                    {relPost.title}
                  </h4>
                  <p className="text-xs font-body text-zinc-600 line-clamp-2">
                    {relPost.excerpt}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
};

