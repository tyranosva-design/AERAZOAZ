import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllPostParams, getAllPosts } from '@/src/services/wordpressGql';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { SinglePostView } from './SinglePostView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SinglePostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const postParams = await getAllPostParams();
  return postParams;
}

export async function generateMetadata({ params }: SinglePostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return {
      title: 'Report Not Found | AERAZOAZ',
      description: 'The requested empirical research report could not be located.',
    };
  }

  return {
    title: `${post.title} | AERAZOAZ Data Desk`,
    description: post.excerpt || `Empirical dataset and research analysis on ${post.title}.`,
    openGraph: {
      title: `${post.title} | AERAZOAZ`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'AERAZOAZ Research Desk'],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function SinglePostPage({ params }: SinglePostPageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category.toLowerCase() === category.toLowerCase() || p.categorySlug === category.toLowerCase()))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header selectedCategory={post.category} />

      <main className="flex-1">
        <SinglePostView post={post} relatedPosts={relatedPosts} categorySlug={category} />
      </main>

      <Footer />
    </div>
  );
}
