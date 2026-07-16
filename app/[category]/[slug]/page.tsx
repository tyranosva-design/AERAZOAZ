import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { getPostBySlug, getPostsByCategory } from "@/lib/posts";
import { CATEGORIES, isCategoryKey } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];

  for (const config of Object.values(CATEGORIES)) {
    const posts = await getPostsByCategory(config.key, 100);
    for (const post of posts) {
      params.push({ category: config.path, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategoryKey(category)) return {};

  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `/${category}/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage.sourceUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!isCategoryKey(category)) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const config = CATEGORIES[category];

  return (
    <article className="px-6 pt-16 pb-24 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${config.path}`}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-steel transition-colors hover:text-orange"
        >
          <ArrowLeftIcon size={14} />
          BACK TO {config.label}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider text-steel">
          <span className="text-orange">{config.label}</span>
          {config.hasTags &&
            post.tags.slice(0, 2).map((tag) => (
              <span key={tag.slug}>
                <span aria-hidden className="mr-3">/</span>
                {tag.name}
              </span>
            ))}
        </div>

        <h1 className="font-heading mt-4 text-3xl font-bold leading-tight tracking-tight text-silver md:text-4xl">
          {post.title}
        </h1>

        <time
          dateTime={post.date}
          className="mt-4 block font-mono text-xs tracking-wider text-steel"
        >
          {new Date(post.date)
            .toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
            .toUpperCase()}
        </time>

        <div
          className="wp-content mt-10 border-t border-steel/20 pt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 border-t border-steel/20 pt-8">
          <p className="text-sm text-steel">
            Published by AERAZOAZ Research Division. All data is sourced from
            verified APIs and public datasets — methodology available on
            request via our{" "}
            <Link href="/contact" className="text-orange underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
