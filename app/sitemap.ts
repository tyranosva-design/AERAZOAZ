import type { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/lib/posts";
import { CATEGORY_LIST, SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...CATEGORY_LIST.map((cat) => ({
      url: `${SITE_URL}/${cat.path}`,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/terms-of-service`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/transparency`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/editorial-policy`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  const posts = await getAllPostsForSitemap();
  const categoryPathBySlug = new Map(CATEGORY_LIST.map((c) => [c.wpSlug, c.path]));

  const postPages: MetadataRoute.Sitemap = posts
    .filter((p) => categoryPathBySlug.has(p.categorySlug))
    .map((p) => ({
      url: `${SITE_URL}/${categoryPathBySlug.get(p.categorySlug)}/${p.slug}`,
      lastModified: p.modified,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticPages, ...postPages];
}
