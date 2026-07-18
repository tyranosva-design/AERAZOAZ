import { wpFetch } from "./wp-client";
import { CATEGORIES, type CategoryKey } from "./site";

export interface WPTag {
  name: string;
  slug: string;
}

export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: WPImage | null;
  tags: WPTag[];
  categorySlug: string;
}

export interface PostFull extends PostSummary {
  content: string;
}

/** Strips WordPress excerpt markup down to plain text for cards / meta descriptions. */
export function toPlainText(html: string, maxLength = 160): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\[&hellip;\]|\[…\]/g, "…")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

const POST_SUMMARY_FIELDS = `
  slug
  title
  excerpt
  date
  modified
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  tags(first: 2) {
    nodes {
      name
      slug
    }
  }
  categories(first: 1) {
    nodes {
      slug
    }
  }
`;

interface RawPostNode {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: { node: WPImage } | null;
  tags: { nodes: WPTag[] } | null;
  categories: { nodes: { slug: string }[] } | null;
}

function toSummary(node: RawPostNode): PostSummary {
  return {
    slug: node.slug,
    title: node.title,
    excerpt: toPlainText(node.excerpt ?? ""),
    date: node.date,
    modified: node.modified,
    featuredImage: node.featuredImage?.node ?? null,
    tags: node.tags?.nodes ?? [],
    categorySlug: node.categories?.nodes?.[0]?.slug ?? "",
  };
}

/** Fetches published posts for a single category, most recent first. */
export async function getPostsByCategory(
  categoryKey: CategoryKey,
  first = 24
): Promise<PostSummary[]> {
  const wpSlug = CATEGORIES[categoryKey].wpSlug;

  const query = `
    query PostsByCategory($category: String!, $first: Int!) {
      posts(
        first: $first
        where: { categoryName: $category, orderby: { field: DATE, order: DESC } }
      ) {
        nodes {
          ${POST_SUMMARY_FIELDS}
        }
      }
    }
  `;

  try {
    const data = await wpFetch<{ posts: { nodes: RawPostNode[] } }>(query, {
      category: wpSlug,
      first,
    });
    return data.posts.nodes.map(toSummary);
  } catch (err) {
    console.error(`getPostsByCategory(${categoryKey}) failed:`, err);
    return [];
  }
}

/** Fetches a handful of recent posts across every category, for the homepage feed. */
export async function getRecentPosts(first = 9): Promise<PostSummary[]> {
  const query = `
    query RecentPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${POST_SUMMARY_FIELDS}
        }
      }
    }
  `;

  try {
    const data = await wpFetch<{ posts: { nodes: RawPostNode[] } }>(query, {
      first,
    });
    return data.posts.nodes.map(toSummary);
  } catch (err) {
    console.error("getRecentPosts failed:", err);
    return [];
  }
}

/** Fetches a single full post by slug, for detail pages. */
export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const query = `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ${POST_SUMMARY_FIELDS}
        content
      }
    }
  `;

  try {
    const data = await wpFetch<{ post: (RawPostNode & { content: string }) | null }>(
      query,
      { slug }
    );
    if (!data.post) return null;
    return { ...toSummary(data.post), content: data.post.content ?? "" };
  } catch (err) {
    console.error(`getPostBySlug(${slug}) failed:`, err);
    return null;
  }
}

/** Fetches every published post (slug + category + modified date) for the sitemap. */
export async function getAllPostsForSitemap(): Promise<
  { slug: string; categorySlug: string; modified: string }[]
> {
  const query = `
    query AllPostsForSitemap($after: String) {
      posts(first: 100, after: $after, where: { status: PUBLISH }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          slug
          modified
          categories(first: 1) {
            nodes {
              slug
            }
          }
        }
      }
    }
  `;

  const results: { slug: string; categorySlug: string; modified: string }[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const data: {
        posts: {
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
          nodes: RawPostNode[];
        };
      } = await wpFetch(query, { after }, { revalidate: 3600 });

      for (const node of data.posts.nodes) {
        results.push({
          slug: node.slug,
          categorySlug: node.categories?.nodes?.[0]?.slug ?? "",
          modified: node.modified,
        });
      }

      hasNextPage = data.posts.pageInfo.hasNextPage;
      after = data.posts.pageInfo.endCursor;
    }
  } catch (err) {
    console.error("getAllPostsForSitemap failed:", err);
  }

  return results;
}
