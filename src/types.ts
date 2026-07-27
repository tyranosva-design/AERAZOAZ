export type CategoryType = 'Reports' | 'Guides' | 'Tools' | 'News';

export interface KeyDataPoint {
  label: string;
  value: string;
  change?: string;
  neutralOrGood?: 'good' | 'bad' | 'neutral';
}

export interface TagItem {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  databaseId?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: CategoryType;
  categorySlug?: string;
  tag: string;
  tags?: TagItem[];
  date: string;
  readTime: string;
  author: string;
  sampleSize?: string;
  methodology: string;
  datasetInfo?: string;
  featuredImage?: string;
  keyDataPoints?: KeyDataPoint[];
  viewsCount?: number;
  featured?: boolean;
}

export interface WordPressGraphQLConfig {
  endpoint: string;
  status: 'idle' | 'loading' | 'connected' | 'error' | 'fallback';
  lastQueryTime?: string;
  errorMessage?: string;
  rawResponse?: unknown;
}

export interface FilterState {
  category: CategoryType | 'All';
  searchQuery: string;
  tag: string;
  sortBy: 'latest' | 'trending' | 'sample_size';
}

export interface RateBenchmarkInput {
  discipline: string;
  experienceYears: number;
  weeklyHours: number;
  platform: 'direct' | 'upwork' | 'fiverr' | 'toptal' | 'contra';
  region: string;
}

export interface CategoryTheme {
  name: CategoryType;
  colorHex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  description: string;
}

export const CATEGORY_THEMES: Record<CategoryType, CategoryTheme> = {
  Reports: {
    name: 'Reports',
    colorHex: '#0000FF',
    bgClass: 'cat-bg-reports',
    textClass: 'cat-text-reports',
    borderClass: 'cat-border-reports',
    description: 'Deep data analysis on freelance rates, platform fees, and market trends.'
  },
  Guides: {
    name: 'Guides',
    colorHex: '#00FF00',
    bgClass: 'cat-bg-guides',
    textClass: 'cat-text-guides',
    borderClass: 'cat-border-guides',
    description: 'Practical step-by-step execution blueprints based on verified outcomes.'
  },
  Tools: {
    name: 'Tools',
    colorHex: '#FF00FF',
    bgClass: 'cat-bg-tools',
    textClass: 'cat-text-tools',
    borderClass: 'cat-border-tools',
    description: 'Unbiased software evaluations with transparent research metrics.'
  },
  News: {
    name: 'News',
    colorHex: '#FF6600',
    bgClass: 'cat-bg-news',
    textClass: 'cat-text-news',
    borderClass: 'cat-border-news',
    description: 'Short, high-signal market updates and regulatory movements.'
  }
};
