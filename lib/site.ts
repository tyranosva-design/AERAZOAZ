// Central site configuration.
// If your WordPress category slugs differ from these, just update the
// `wpSlug` values below — nothing else in the codebase needs to change.

export const SITE_URL = "https://aerazoaz.com";
export const SITE_NAME = "AERAZOAZ";
export const SITE_DESCRIPTION =
  "AERAZOAZ is a global, data-driven Business Intelligence and Digital Market Research platform for modern entrepreneurs — hard numbers, zero hype.";

export type CategoryKey = "reports" | "guides" | "tools" | "news";

export interface CategoryConfig {
  key: CategoryKey;
  /** URL segment, e.g. aerazoaz.com/reports */
  path: string;
  /** The category slug as it exists in WordPress */
  wpSlug: string;
  /** Display label */
  label: string;
  /** Short one-line description used on listing pages */
  description: string;
  /** Whether this category shows tags on its post cards */
  hasTags: boolean;
}

export const CATEGORIES: Record<CategoryKey, CategoryConfig> = {
  reports: {
    key: "reports",
    path: "reports",
    wpSlug: "reports",
    label: "REPORTS",
    description:
      "Deep-dive statistical analyses and platform data exposing exactly where global money is moving.",
    hasTags: true,
  },
  guides: {
    key: "guides",
    path: "guides",
    wpSlug: "guides",
    label: "GUIDES",
    description:
      "Fluff-free, data-dictated blueprints that translate raw insight into exact execution steps.",
    hasTags: true,
  },
  tools: {
    key: "tools",
    path: "tools",
    wpSlug: "tools",
    label: "TOOLS",
    description:
      "Unbiased software math — pricing, fees, and performance evaluated down to the decimal.",
    hasTags: true,
  },
  news: {
    key: "news",
    path: "news",
    wpSlug: "news",
    label: "NEWS",
    description:
      "Daily punchy briefs on platform policy, algorithm shifts, and payment changes — Fact, Mechanism, Wallet Impact.",
    hasTags: true,
  },
};

export const CATEGORY_LIST: CategoryConfig[] = Object.values(CATEGORIES);

export function isCategoryKey(value: string): value is CategoryKey {
  return value in CATEGORIES;
}
