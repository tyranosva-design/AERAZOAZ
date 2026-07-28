import { NextResponse } from 'next/server';
import { fetchPostsFromGraphQL } from '@/src/services/wordpressGql';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const result = await fetchPostsFromGraphQL(undefined, true);
    return NextResponse.json({
      posts: result.posts,
      config: result.config
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch posts';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

