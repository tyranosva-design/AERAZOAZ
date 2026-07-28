import { Post, CategoryType, WordPressGraphQLConfig } from '../types';

export const WP_GRAPHQL_ENDPOINT = 'https://cms.aerazoaz.com/graphql';

const GET_POSTS_QUERY = `
query GetPosts {
  posts(first: 100) {
    nodes {
      id
      databaseId
      title
      slug
      excerpt
      content
      date
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      terms {
        nodes {
          name
          slug
          taxonomyName
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
}
`;

let currentConfig: WordPressGraphQLConfig = {
  endpoint: WP_GRAPHQL_ENDPOINT,
  status: 'idle'
};

let cachedResult: { posts: Post[]; config: WordPressGraphQLConfig } | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 5 * 1000; // 5 seconds short cache for rapid repeat calls within single render

export function getGraphQLConfig(): WordPressGraphQLConfig {
  return currentConfig;
}

export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#038;/g, '&')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseWpCategoryNode(
  categoryNodes: Array<{ name: string; slug: string }> | undefined
): { category: CategoryType; categorySlug: string } {
  if (categoryNodes && categoryNodes.length > 0) {
    const firstCat = categoryNodes[0];
    const rawName = decodeHtmlEntities(firstCat.name || '').trim();
    const rawSlug = (firstCat.slug || '').toLowerCase().trim();
    const lowerName = rawName.toLowerCase();

    // Map common case variations of the 4 standard categories
    if (lowerName === 'guides' || lowerName === 'guide') {
      return { category: 'Guides', categorySlug: 'guides' };
    }
    if (lowerName === 'reports' || lowerName === 'report') {
      return { category: 'Reports', categorySlug: 'reports' };
    }
    if (lowerName === 'tools' || lowerName === 'tool') {
      return { category: 'Tools', categorySlug: 'tools' };
    }
    if (lowerName === 'news') {
      return { category: 'News', categorySlug: 'news' };
    }

    // Preserve exact WP Category Name (capitalized first letter) and Slug
    const formattedCategory = (rawName.charAt(0).toUpperCase() + rawName.slice(1)) as CategoryType;
    return {
      category: formattedCategory,
      categorySlug: rawSlug || lowerName.replace(/\s+/g, '-')
    };
  }

  return { category: 'Uncategorized' as CategoryType, categorySlug: 'uncategorized' };
}

function parseWpTag(
  tagNodes: Array<{ name: string; slug?: string }> | undefined,
  termNodes: Array<{ name: string; slug?: string; taxonomyName?: string }> | undefined
): string {
  if (tagNodes && tagNodes.length > 0) {
    const firstTag = tagNodes.map(t => decodeHtmlEntities(t.name)).find(Boolean);
    if (firstTag) {
      return firstTag.trim().toUpperCase();
    }
  }

  if (termNodes && termNodes.length > 0) {
    const postTag = termNodes.find(
      t => (t.taxonomyName === 'post_tag' || t.taxonomyName === 'tag' || t.taxonomyName === 'tags') && t.name
    );
    if (postTag && postTag.name) {
      return decodeHtmlEntities(postTag.name).trim().toUpperCase();
    }
  }

  return '';
}

function parseWpDate(dateStr: string): string {
  if (!dateStr) return 'Recently Published';
  try {
    const normalized = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
    const d = new Date(normalized);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr || 'Recently Published';
  }
}

export async function fetchPostsFromGraphQL(endpoint = WP_GRAPHQL_ENDPOINT, forceRefresh = true): Promise<{ posts: Post[]; config: WordPressGraphQLConfig }> {
  if (!forceRefresh && cachedResult && (Date.now() - lastCacheTime < CACHE_TTL_MS)) {
    return cachedResult;
  }

  currentConfig = {
    ...currentConfig,
    endpoint,
    status: 'loading',
    lastQueryTime: new Date().toLocaleTimeString()
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store',
      signal: controller.signal,
      body: JSON.stringify({ query: GET_POSTS_QUERY })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GraphQL endpoint returned status ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message || 'GraphQL Query returned errors');
    }

    const nodes = json?.data?.posts?.nodes;
    if (!Array.isArray(nodes) || nodes.length === 0) {
      throw new Error('GraphQL response contained 0 posts or empty nodes');
    }

    // Map WP GraphQL Nodes to Post Types
    const fetchedPosts: Post[] = nodes.map((node: any, idx: number) => {
      const cleanTitle = decodeHtmlEntities(node.title || '');
      const { category, categorySlug } = parseWpCategoryNode(node.categories?.nodes);
      const tag = parseWpTag(
        node.tags?.nodes,
        node.terms?.nodes
      );
      const tagsList = (node.tags?.nodes || []).map((t: any) => ({
        name: decodeHtmlEntities(t.name),
        slug: t.slug || t.name?.toLowerCase().replace(/\s+/g, '-') || 'tag'
      }));
      
      const cleanExcerpt = decodeHtmlEntities(node.excerpt || '');
      
      return {
        id: node.id || `wp-${node.databaseId || idx}`,
        databaseId: node.databaseId || idx,
        title: cleanTitle || 'Untitled Research Report',
        slug: node.slug || `post-${idx}`,
        excerpt: cleanExcerpt || 'Research summary and empirical analysis.',
        content: node.content || '<p>Detailed empirical data compiled by AERAZOAZ Data Desk.</p>',
        category,
        categorySlug,
        tag,
        tags: tagsList.length > 0 ? tagsList : (tag ? [{ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }] : []),
        date: parseWpDate(node.date),
        readTime: '6 min read',
        author: node.author?.node?.name || 'AERAZOAZ Research Desk',
        methodology: 'Empirical research compiled from verified client-contractor datasets and public disclosures.',
        datasetInfo: `WP Stream ID: ${node.databaseId || idx}`,
        featuredImage: node.featuredImage?.node?.sourceUrl || undefined,
        viewsCount: 1200 + (idx * 340),
        keyDataPoints: [
          { label: 'Research Status', value: 'Peer Audited', neutralOrGood: 'neutral' }
        ]
      };
    });

    currentConfig = {
      endpoint,
      status: 'connected',
      lastQueryTime: new Date().toLocaleTimeString(),
      rawResponse: json
    };

    cachedResult = { posts: fetchedPosts, config: currentConfig };
    lastCacheTime = Date.now();
    return cachedResult;

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('WordPress GraphQL request failed. Attempting WordPress REST API fallback...', errorMsg);

    try {
      // Fallback: Fetch directly from WordPress REST API (/wp-json/wp/v2/posts)
      const restEndpoint = 'https://cms.aerazoaz.com/wp-json/wp/v2/posts?per_page=100&_embed=1';
      const restRes = await fetch(restEndpoint, { cache: 'no-store' });
      if (restRes.ok) {
        const restPosts = await restRes.json();
        if (Array.isArray(restPosts) && restPosts.length > 0) {
          const mappedRestPosts: Post[] = restPosts.map((item: any, idx: number) => {
            const cleanTitle = decodeHtmlEntities(item.title?.rendered || '');
            const cleanExcerpt = decodeHtmlEntities(item.excerpt?.rendered || '');
            const embeddedTerms = item._embedded?.['wp:term'] || [];
            const categoryNodes = (embeddedTerms[0] || []).map((t: any) => ({ name: t.name, slug: t.slug }));
            const tagNodes = (embeddedTerms[1] || []).map((t: any) => ({ name: t.name, slug: t.slug }));
            const { category, categorySlug } = parseWpCategoryNode(categoryNodes);
            const tag = parseWpTag(
              tagNodes,
              undefined
            );
            const tagsList = tagNodes.map((t: any) => ({
              name: decodeHtmlEntities(t.name),
              slug: t.slug || t.name?.toLowerCase().replace(/\s+/g, '-') || 'tag'
            }));
            const featuredImage = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;

            return {
              id: `wp-rest-${item.id || idx}`,
              databaseId: item.id || idx,
              title: cleanTitle || 'Untitled Research Report',
              slug: item.slug || `post-${idx}`,
              excerpt: cleanExcerpt || 'Research summary and empirical analysis.',
              content: item.content?.rendered || '<p>Detailed empirical data compiled by AERAZOAZ Data Desk.</p>',
              category,
              categorySlug,
              tag,
              tags: tagsList.length > 0 ? tagsList : (tag ? [{ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }] : []),
              date: parseWpDate(item.date),
              readTime: '6 min read',
              author: item._embedded?.author?.[0]?.name || 'AERAZOAZ Research Desk',
              methodology: 'Empirical research compiled from verified client-contractor datasets and public disclosures.',
              datasetInfo: `WP REST Stream ID: ${item.id || idx}`,
              featuredImage: featuredImage || undefined,
              viewsCount: 1400 + (idx * 210),
              keyDataPoints: [
                { label: 'Research Status', value: 'Peer Audited', neutralOrGood: 'neutral' }
              ]
            };
          });

          currentConfig = {
            endpoint: restEndpoint,
            status: 'connected',
            lastQueryTime: new Date().toLocaleTimeString(),
            rawResponse: restPosts
          };

          cachedResult = { posts: mappedRestPosts, config: currentConfig };
          lastCacheTime = Date.now();
          return cachedResult;
        }
      }
    } catch (restErr) {
      console.warn('REST API fallback also failed:', restErr);
    }

    currentConfig = {
      endpoint,
      status: 'fallback',
      lastQueryTime: new Date().toLocaleTimeString(),
      errorMessage: errorMsg || 'Unable to reach WordPress endpoints.'
    };

    // Return empty posts array on failure - NO sample posts injection
    cachedResult = { posts: [], config: currentConfig };
    lastCacheTime = Date.now();
    return cachedResult;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await fetchPostsFromGraphQL(WP_GRAPHQL_ENDPOINT, true);
  return result.posts;
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  const lowerCat = categorySlug.toLowerCase().trim();
  return posts.filter(post => {
    return (
      (post.categorySlug && post.categorySlug.toLowerCase().trim() === lowerCat) ||
      post.category.toLowerCase().trim() === lowerCat
    );
  });
}

export async function getPostBySlug(categorySlug: string, postSlug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  const lowerCat = (categorySlug || '').toLowerCase().trim();
  const lowerPost = (postSlug || '').toLowerCase().trim();
  
  // 1. Exact match on slug and category
  let matched = posts.find(p => {
    const slugMatch = p.slug.toLowerCase() === lowerPost || String(p.databaseId) === lowerPost || p.id === lowerPost;
    const catMatch = (p.categorySlug && p.categorySlug.toLowerCase() === lowerCat) || p.category.toLowerCase() === lowerCat;
    return slugMatch && catMatch;
  });

  // 2. Fallback to slug match if category slug differed in query
  if (!matched) {
    matched = posts.find(p => p.slug.toLowerCase() === lowerPost || String(p.databaseId) === lowerPost || p.id === lowerPost);
  }

  return matched || null;
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>(['reports', 'guides', 'tools', 'news']);
  posts.forEach(p => {
    if (p.categorySlug) set.add(p.categorySlug.toLowerCase());
    if (p.category) set.add(p.category.toLowerCase());
  });
  return Array.from(set);
}

export async function getAllPostParams(): Promise<Array<{ category: string; slug: string }>> {
  const posts = await getAllPosts();
  return posts.map(p => ({
    category: p.categorySlug || p.category.toLowerCase(),
    slug: p.slug
  }));
}
