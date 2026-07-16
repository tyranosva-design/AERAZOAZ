import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPostsByCategory } from "@/lib/posts";
import { CATEGORIES } from "@/lib/site";

export const revalidate = 300;

export default async function HomePage() {
  const [reports, guides, tools, news] = await Promise.all([
    getPostsByCategory("reports", 3),
    getPostsByCategory("guides", 3),
    getPostsByCategory("tools", 3),
    getPostsByCategory("news", 4),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-steel/20 px-6 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs tracking-[0.2em] text-orange">
            THE INSIGHT TO ACTION ENGINE
          </p>
          <h1 className="font-heading mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-silver md:text-6xl">
            Cold, verifiable data for entrepreneurs building a global business.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel md:text-lg">
            AERAZOAZ replaces guru opinions with platform API data,
            statistical reports, and mathematical tool comparisons — so every
            decision you make is backed by numbers, not a hunch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {Object.values(CATEGORIES)
              .filter((c) => c.key !== "news")
              .map((cat) => (
                <Link
                  key={cat.key}
                  href={`/${cat.path}`}
                  className="rounded-full border border-steel/30 px-6 py-3 font-mono text-xs tracking-[0.15em] text-silver transition-colors hover:border-orange hover:text-orange"
                >
                  {cat.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Category feeds */}
      {[
        { config: CATEGORIES.reports, posts: reports },
        { config: CATEGORIES.guides, posts: guides },
        { config: CATEGORIES.tools, posts: tools },
      ].map(({ config, posts }) => (
        <section
          key={config.key}
          className="border-b border-steel/20 px-6 py-16 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.15em] text-orange">
                  {config.label}
                </p>
                <p className="mt-2 max-w-xl text-sm text-steel">
                  {config.description}
                </p>
              </div>
              <Link
                href={`/${config.path}`}
                className="whitespace-nowrap font-mono text-xs tracking-[0.15em] text-silver transition-colors hover:text-orange"
              >
                VIEW ALL →
              </Link>
            </div>

            {posts.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {posts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    category={config}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-steel">
                No {config.label.toLowerCase()} published yet — check back
                soon.
              </p>
            )}
          </div>
        </section>
      ))}

      {/* News flashes */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-orange">
                NEWS FLASHES
              </p>
              <p className="mt-2 max-w-xl text-sm text-steel">
                {CATEGORIES.news.description}
              </p>
            </div>
            <Link
              href="/news"
              className="whitespace-nowrap font-mono text-xs tracking-[0.15em] text-silver transition-colors hover:text-orange"
            >
              VIEW ALL →
            </Link>
          </div>

          {news.length > 0 ? (
            <div className="mt-8 divide-y divide-steel/20 border-t border-b border-steel/20">
              {news.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-carbon md:flex-row md:items-center md:gap-6 md:px-4"
                >
                  <time
                    dateTime={item.date}
                    className="w-32 shrink-0 font-mono text-xs tracking-wider text-steel"
                  >
                    {new Date(item.date)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </time>
                  <h3 className="font-heading font-semibold text-silver transition-colors group-hover:text-orange">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-steel">
              No news flashes published yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
