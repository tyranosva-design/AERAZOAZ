import App from '@/src/App';
import { fetchPostsFromGraphQL } from '@/src/services/wordpressGql';

export const revalidate = 3600;

export default async function Home() {
  const result = await fetchPostsFromGraphQL();
  return <App initialPosts={result.posts} initialGqlConfig={result.config} />;
}
