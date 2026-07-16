import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import type { CategoryConfig } from "@/lib/site";

function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

export default function PostCard({
  post,
  category,
}: {
  post: PostSummary;
  category: CategoryConfig;
}) {
  const showTags = category.hasTags;

  return (
    <Link
      href={`/${category.path}/${post.slug}`}
      className="group flex flex-col rounded-lg border border-steel/20 bg-carbon p-6 transition-colors hover:border-orange/50"
    >
      <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-wider text-steel">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {showTags && post.tags.length > 0 && (
          <>
            <span aria-hidden>/</span>
            <span className="flex flex-wrap gap-x-2 text-orange">
              {post.tags.slice(0, 2).map((tag) => tag.name).join(" · ")}
            </span>
          </>
        )}
      </div>

      <h3 className="font-heading mt-4 text-lg font-bold leading-snug text-silver transition-colors group-hover:text-orange">
        {post.title}
      </h3>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-steel">
        {post.excerpt}
      </p>
    </Link>
  );
}
