import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getPostsByCategory } from "@/lib/posts";
import { CATEGORIES, CATEGORY_LIST, isCategoryKey } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORY_LIST.map((cat) => ({ category: cat.path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategoryKey(category)) return {};

  const config = CATEGORIES[category];
  return {
    title: config.label,
    description: config.description,
    alternates: { canonical: `/${config.path}` },
    openGraph: {
      title: `${config.label} — AERAZOAZ`,
      description: config.description,
      url: `/${config.path}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategoryKey(category)) notFound();

  const config = CATEGORIES[category];
  const posts = await getPostsByCategory(category, 30);

  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs tracking-[0.2em] text-accent">
          {config.label}
        </p>
        <h1 className="font-heading mt-4 max-w-2xl text-3xl font-bold text-foreground md:text-4xl">
          {config.description}
        </h1>

        {posts.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} category={config} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-steel">
            No {config.label.toLowerCase()} published yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}