// Thin fetch-based GraphQL client for the headless WordPress backend.
// No extra dependency (graphql-request, Apollo, etc.) needed — Next.js's
// extended `fetch` already gives us caching / ISR control via `next.revalidate`.
//
// Resilience features:
// - Request timeout (30s default) to prevent hanging
// - Retry logic with exponential backoff for transient failures
// - Fallback endpoint support for API routing issues

const WP_GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT ??
  "https://cms.aerazoaz.com/graphql";

const WP_GRAPHQL_ENDPOINT_FALLBACK = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT_FALLBACK;

const DEFAULT_TIMEOUT = 30_000; // 30 seconds
const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY = 1_000; // 1 second

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

interface WpFetchOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  revalidate?: number;
}

/**
 * Creates a timeout promise that rejects after the specified duration.
 */
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Request timeout after ${ms}ms`));
    }, ms);
  });
}

/**
 * Sleeps for the specified duration.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Attempts to fetch from the primary endpoint, falling back to the fallback
 * endpoint if provided and the primary fails.
 */
async function fetchWithFallback(
  endpoint: string,
  fallback: string | undefined,
  options: RequestInit
): Promise<Response> {
  try {
    return await fetch(endpoint, options);
  } catch (error) {
    if (fallback) {
      console.warn(`Primary endpoint failed, trying fallback: ${fallback}`, error);
      return await fetch(fallback, options);
    }
    throw error;
  }
}

/**
 * Runs a GraphQL query/mutation against the WPGraphQL endpoint with
 * timeout, retry, and fallback support.
 *
 * @param query GraphQL document string
 * @param variables Query variables
 * @param options Configuration options (timeout, retries, retryDelay, revalidate)
 */
export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: WpFetchOptions = {}
): Promise<T> {
  const {
    timeout: timeoutMs = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    revalidate = 300,
  } = options;

  const body = JSON.stringify({ query, variables });
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    next: { revalidate },
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Race between fetch and timeout
      const res = await Promise.race([
        fetchWithFallback(WP_GRAPHQL_ENDPOINT, WP_GRAPHQL_ENDPOINT_FALLBACK, fetchOptions),
        timeout(timeoutMs),
      ]);

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
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx) or on the last attempt
      const isClientError = error instanceof Error && 
        /WPGraphQL request failed: 4\d\d/.test(error.message);
      
      if (isClientError || attempt === retries) {
        break;
      }

      // Wait before retrying (exponential backoff)
      const delay = retryDelay * Math.pow(2, attempt);
      console.warn(
        `WPGraphQL request failed (attempt ${attempt + 1}/${retries + 1}), retrying in ${delay}ms...`,
        error
      );
      await sleep(delay);
    }
  }

  // If we get here, all retries failed
  console.error("WPGraphQL request failed after all retries:", lastError);
  throw lastError || new Error("WPGraphQL request failed: unknown error");
}