import App from '@/src/App';
import { fetchPostsFromGraphQL } from '@/src/services/wordpressGql';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const result = await fetchPostsFromGraphQL(undefined, true);
  return <App initialPosts={result.posts} initialGqlConfig={result.config} />;
}

