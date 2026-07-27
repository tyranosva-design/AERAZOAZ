import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const restEndpoint = 'https://cms.aerazoaz.com/wp-json/wp/v2/posts?per_page=100&_embed=1';
    const res = await fetch(restEndpoint, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `WP API returned status ${res.status}` }, { status: res.status });
    }

    const posts = await res.json();
    return NextResponse.json(posts);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch posts';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
