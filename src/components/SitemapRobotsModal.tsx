import React, { useState } from 'react';
import { X, Globe, Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { Post, CATEGORY_THEMES } from '../types';

interface SitemapRobotsModalProps {
  posts: Post[];
  onClose: () => void;
}

export const SitemapRobotsModal: React.FC<SitemapRobotsModalProps> = ({ posts, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema'>('sitemap');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://aerazoaz.com';

  // Dynamic Sitemap XML Generation
  const generateSitemapXml = () => {
    const postUrls = posts.map(p => `  <url>
    <loc>${baseUrl}/${(p.categorySlug || p.category).toLowerCase()}/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

    const categoryUrls = Object.keys(CATEGORY_THEMES).map(cat => `  <url>
    <loc>${baseUrl}/${cat.toLowerCase()}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- AERAZOAZ Root -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${categoryUrls}
${postUrls}
</urlset>`;
  };

  // Robots.txt content
  const robotsTxtContent = `# AERAZOAZ Digital Intelligence Crawl Rules
User-agent: *
Allow: /
Allow: /reports/
Allow: /guides/
Allow: /tools/
Allow: /news/
Allow: /sitemap.xml

# GraphQL API Endpoint
Allow: /graphql

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}`;

  // JSON-LD Schema.org metadata example for the lead article
  const leadPost = posts[0] || {} as Post;
  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": leadPost.title,
    "description": leadPost.excerpt,
    "publisher": {
      "@type": "Organization",
      "name": "AERAZOAZ",
      "url": baseUrl,
      "description": "Research-based digital intelligence platform for freelancers worldwide."
    },
    "author": {
      "@type": "Organization",
      "name": "AERAZOAZ Research Desk"
    },
    "datePublished": "2026-07-24",
    "mainEntityOfPage": `${baseUrl}/${leadPost.category?.toLowerCase()}/${leadPost.slug}`
  }, null, 2);

  const currentText = activeTab === 'sitemap' ? generateSitemapXml() : activeTab === 'robots' ? robotsTxtContent : jsonLdContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'sitemap' ? 'sitemap.xml' : activeTab === 'robots' ? 'robots.txt' : 'schema-article.json';
    const blob = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border-2 border-black w-full max-w-4xl p-4 sm:p-6 font-mono text-xs text-black shadow-2xl max-h-[92vh] overflow-y-auto my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3 sm:pb-4 mb-3 sm:mb-4 sticky top-0 bg-white z-10 pt-1">
          <div className="flex items-center space-x-2 sm:space-x-3 pr-2">
            <Globe className="w-5 h-5 text-black shrink-0" />
            <h2 className="font-heading font-extrabold text-sm sm:text-lg uppercase tracking-wider text-black">
              SEO, SITEMAPS & ROBOTS.TXT ENGINE
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 border border-zinc-300 hover:border-black transition-colors cursor-pointer text-black shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close SEO modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:space-x-2 border-b border-zinc-200 pb-3 mb-4">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-3 py-2 sm:py-1.5 border font-heading font-extrabold uppercase text-[11px] sm:text-xs cursor-pointer min-h-[38px] ${
              activeTab === 'sitemap' ? 'bg-black text-white border-black' : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:text-black hover:border-black'
            }`}
          >
            sitemap.xml ({posts.length + 5} URLs)
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-3 py-2 sm:py-1.5 border font-heading font-extrabold uppercase text-[11px] sm:text-xs cursor-pointer min-h-[38px] ${
              activeTab === 'robots' ? 'bg-black text-white border-black' : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:text-black hover:border-black'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-2 sm:py-1.5 border font-heading font-extrabold uppercase text-[11px] sm:text-xs cursor-pointer min-h-[38px] ${
              activeTab === 'schema' ? 'bg-black text-white border-black' : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:text-black hover:border-black'
            }`}
          >
            Schema.org JSON-LD
          </button>
        </div>

        {/* Code Content Container */}
        <div className="relative mb-4">
          <pre className="bg-zinc-50 border border-zinc-300 p-4 rounded-none max-h-96 overflow-auto font-mono text-[11px] text-zinc-800 leading-relaxed selection:bg-black selection:text-white">
            {currentText}
          </pre>

          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 bg-white text-black border border-zinc-300 px-2.5 py-1 text-[10px] hover:border-black cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 bg-black text-white font-bold px-2.5 py-1 text-[10px] hover:bg-zinc-800 cursor-pointer shadow-sm"
            >
              <Download className="w-3 h-3" />
              <span>DOWNLOAD</span>
            </button>
          </div>
        </div>

        {/* Explanatory Footer */}
        <div className="bg-zinc-50 border border-zinc-300 p-3 text-[11px] text-zinc-600 flex items-center justify-between">
          <span>✓ Clean indexation structure configured for Google Search Console, Bing Webmaster, and AI Crawlers.</span>
          <button 
            onClick={onClose}
            className="bg-black text-white font-heading font-bold px-3 py-1 text-xs uppercase cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
