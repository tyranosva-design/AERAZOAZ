// Thin fetch-based GraphQL client for the headless WordPress backend.
// No extra dependency (graphql-request, Apollo, etc.) needed — Next.js's
// extended `fetch` already gives us caching / ISR control via `next.revalidate`.

const WP_GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT ??
  "https://cms.aerazoaz.com/graphql";

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

/**
 * Runs a GraphQL query/mutation against the WPGraphQL endpoint.
 *
 * @param query GraphQL document string
 * @param variables Query variables
 * @param revalidate ISR revalidation window in seconds (default: 5 min)
 */
export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 300
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `WPGraphQL request failed: ${res.status} ${res.statusText}`
    );
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(
      `WPGraphQL returned errors: ${json.errors.map((e) => e.message).join("; ")}`
    );
  }

  if (!json.data) {
    throw new Error("WPGraphQL returned no data");
  }

  return json.data;
}
