import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostsByCategory, getAllCategorySlugs } from '@/src/services/wordpressGql';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { PostCard } from '@/src/components/PostCard';
import { CATEGORY_THEMES, CategoryType } from '@/src/types';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ tag?: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map(category => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catLower = category.toLowerCase();
  
  const matchedThemeKey = (Object.keys(CATEGORY_THEMES) as CategoryType[]).find(
    k => k.toLowerCase() === catLower
  );
  
  const titleCategory = matchedThemeKey || category.charAt(0).toUpperCase() + category.slice(1);
  const themeDesc = matchedThemeKey ? CATEGORY_THEMES[matchedThemeKey].description : `Empirical research reports and datasets for ${titleCategory}.`;

  return {
    title: `${titleCategory} | Digital Intelligence & Research - AERAZOAZ`,
    description: `${themeDesc} Peer-audited empirical insights for freelancers globally.`,
    openGraph: {
      title: `${titleCategory} Intelligence | AERAZOAZ`,
      description: themeDesc,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const activeTag = resolvedSearchParams.tag ? resolvedSearchParams.tag.toLowerCase() : '';

  const categoryPosts = await getPostsByCategory(category);

  // Validate category existence
  const allCategorySlugs = await getAllCategorySlugs();
  if (!allCategorySlugs.includes(category.toLowerCase()) && categoryPosts.length === 0) {
    notFound();
  }

  // Filter by tag if search param exists
  const filteredPosts = activeTag 
    ? categoryPosts.filter(p => 
        (p.tag && p.tag.toLowerCase().includes(activeTag)) ||
        (p.tags && p.tags.some(t => t.slug.toLowerCase().includes(activeTag) || t.name.toLowerCase().includes(activeTag)))
      )
    : categoryPosts;

  const matchedThemeKey = (Object.keys(CATEGORY_THEMES) as CategoryType[]).find(
    k => k.toLowerCase() === category.toLowerCase()
  );

  const theme = matchedThemeKey ? CATEGORY_THEMES[matchedThemeKey] : {
    name: category.toUpperCase() as CategoryType,
    colorHex: '#000000',
    bgClass: 'bg-black text-white',
    textClass: 'text-black',
    borderClass: 'border-black',
    description: `Empirical research dataset and reports under ${category}.`
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header selectedCategory={matchedThemeKey || 'All'} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Hero Header */}
        <div className="border-b-2 border-black pb-8 mb-10">
          <div className="flex items-center space-x-2 font-mono text-xs uppercase mb-3 text-zinc-500">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="font-bold text-black">{category.toUpperCase()}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span 
              className="font-heading font-extrabold text-xs sm:text-sm uppercase px-3 py-1 tracking-wider inline-block"
              style={{ 
                backgroundColor: theme.colorHex, 
                color: theme.colorHex === '#00FF00' ? '#000000' : '#ffffff' 
              }}
            >
              {theme.name}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {filteredPosts.length} RESEARCH REPORTS AVAILABLE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading uppercase tracking-tight text-black leading-tight mb-4">
            {theme.name} INTELLIGENCE
          </h1>
          <p className="text-base sm:text-lg font-body text-zinc-700 max-w-3xl leading-relaxed">
            {theme.description}
          </p>

          {activeTag && (
            <div className="mt-4 flex items-center space-x-2 font-mono text-xs">
              <span className="text-zinc-500">FILTERED BY TAG:</span>
              <span className="bg-black text-white px-2.5 py-1 font-bold uppercase">#{activeTag}</span>
              <Link href={`/${category}`} className="text-zinc-600 underline hover:text-black">
                Clear tag filter
              </Link>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-black p-12 text-center bg-zinc-50 my-12">
            <h2 className="text-xl font-heading font-bold uppercase text-black mb-2">
              NO REPORTS MATCHING THIS CATEGORY FILTER
            </h2>
            <p className="text-sm font-body text-zinc-600 mb-6">
              There are currently no empirical research reports matching the specified criteria.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-black text-white px-6 py-3 font-heading font-bold text-xs uppercase tracking-wider hover:bg-zinc-800"
            >
              RETURN TO MAIN INTELLIGENCE STREAM
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
