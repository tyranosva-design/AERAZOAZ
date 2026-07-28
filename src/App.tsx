'use client';

import React, { useState, useEffect } from 'react';
import { Post, WordPressGraphQLConfig } from './types';
import { fetchPostsFromGraphQL, getGraphQLConfig } from './services/wordpressGql';
import { Header } from './components/Header';
import { WelcomeGlassSection } from './components/WelcomeGlassSection';
import { CategoryHighlightsSection } from './components/CategoryHighlightsSection';
import { AboutHomeSection } from './components/AboutHomeSection';
import { SitemapRobotsModal } from './components/SitemapRobotsModal';
import { GraphQLConsoleModal } from './components/GraphQLConsoleModal';
import { Footer } from './components/Footer';

interface AppProps {
  initialPosts?: Post[];
  initialGqlConfig?: WordPressGraphQLConfig;
}

export default function App({ initialPosts, initialGqlConfig }: AppProps = {}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [gqlConfig, setGqlConfig] = useState<WordPressGraphQLConfig>(initialGqlConfig || getGraphQLConfig());
  const [, setLoadingPosts] = useState<boolean>(!initialPosts);

  // Modal States
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [gqlModalOpen, setGqlModalOpen] = useState(false);

  // Fetch from WP GraphQL on Mount to ensure fresh live data
  const loadPostsFromGql = async (endpoint?: string) => {
    setLoadingPosts(true);
    const result = await fetchPostsFromGraphQL(endpoint, true);
    setPosts(result.posts);
    setGqlConfig(result.config);
    setLoadingPosts(false);
  };

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      loadPostsFromGql();
    }
  }, [initialPosts]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      {/* Top Navigation & Header */}
      <Header
        onOpenSitemapModal={() => setSitemapModalOpen(true)}
        onOpenGraphQLModal={() => setGqlModalOpen(true)}
        gqlConfig={gqlConfig}
      />

      {/* Main Content Area - Full Magazine Home Experience */}
      <main className="flex-1">
        <WelcomeGlassSection />
        <CategoryHighlightsSection posts={posts} />
        <AboutHomeSection />
      </main>

      {/* Modals & Tools */}
      {sitemapModalOpen && (
        <SitemapRobotsModal posts={posts} onClose={() => setSitemapModalOpen(false)} />
      )}

      {gqlModalOpen && (
        <GraphQLConsoleModal
          config={gqlConfig}
          onRefreshFromGql={loadPostsFromGql}
          onClose={() => setGqlModalOpen(false)}
        />
      )}

      {/* World Class Magazine Footer */}
      <Footer />
    </div>
  );
}
