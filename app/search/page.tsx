import { Metadata } from 'next';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { SearchPage as SearchContent } from '@/src/components/SearchPage';
import { getAllPosts } from '@/src/services/wordpressGql';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Search & Explore Intelligence Reports | AERAZOAZ',
  description: 'Search the full AERAZOAZ research ledger across categories, datasets, tags, and verified metrics.',
};

interface SearchPageProps {
  searchParams?: Promise<{ q?: string; tag?: string; category?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = resolvedSearchParams.q || '';
  const tag = resolvedSearchParams.tag || 'All';

  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header activeView="search" />
      <main className="flex-1">
        <SearchContent 
          posts={posts} 
          searchQuery={query}
          initialTag={tag}
        />
      </main>
      <Footer />
    </div>
  );
}
