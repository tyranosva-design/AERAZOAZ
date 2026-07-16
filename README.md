# AERAZOAZ — Next.js frontend

Real Next.js 16 (App Router), server-rendered, built to read content live from
your headless WordPress backend via GraphQL.

## 1. Set your GraphQL endpoint

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT=https://cms.aerazoaz.com/graphql
```

This already points at your subdomain by default (see `lib/wp-client.ts`),
so you only need `.env.local` if you want to override it (e.g. for local
testing against a staging WordPress site).

**Requirement:** your WordPress install needs the free **WPGraphQL** plugin
active at `cms.aerazoaz.com` so `/graphql` responds to queries. If you
haven't installed it yet: Plugins → Add New → search "WPGraphQL" → Install
→ Activate. No configuration needed beyond that for this code to work.

## 2. Match your real WordPress category slugs

Open `lib/site.ts`. Each category has a `wpSlug` — this must exactly match
the category slug in your WordPress admin (Posts → Categories). Defaults:

```
reports → wpSlug: "reports"
guides  → wpSlug: "guides"
tools   → wpSlug: "tools"
news    → wpSlug: "news"
```

If your actual WP category slugs differ, update them here — nothing else
in the codebase needs to change.

## 3. Install and run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 4. Deploy to Vercel

Push this folder to a GitHub repo, then import it in Vercel. Add the
`NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT` environment variable in Vercel's project
settings if you're overriding the default.

## What's implemented (vs. the previous Vite build)

- **Real server rendering** — every page (including post pages) renders full
  HTML on the server, so Google indexes actual content, not a blank shell.
- **Live GraphQL data** — `lib/posts.ts` fetches real posts from
  `cms.aerazoaz.com/graphql`. Nothing is hardcoded.
- **`app/sitemap.ts`** — dynamically lists every published post across all
  four categories, pulled from WordPress, plus all static pages.
- **`app/robots.ts`** — points crawlers to the sitemap.
- **Canonical tags** — every post and category page sets its own canonical
  URL via `generateMetadata`, pointing at itself on the main domain.
- **Per-page meta tags** — title and description generated from each post's
  actual WordPress data (not one static tag for the whole site).
- **Adobe Fonts** — the Typekit stylesheet (`otj5vse.css`) is loaded in
  `app/layout.tsx`. **Check the exact `font-family` name** Adobe assigned to
  "Clother" in your Typekit kit editor and confirm it matches the value used
  in `app/globals.css` (`--font-heading`) — Typekit sometimes assigns a
  kit-specific internal name rather than the font's display name.
- **News is its own category** — `/news` and `/news/[slug]` are real routes
  like the other three, not just a homepage section.
- **Full content styling** — headings, paragraphs, links, lists, blockquotes,
  code, and **tables** all render from WordPress content (the previous build
  silently deleted tables).
- **Favicon** — referenced as `/favicon.svg`; drop your file into `public/`
  with that exact name and it's picked up automatically.

## Round 2 changes

- Reading time removed everywhere (cards + post pages).
- Tags now consistently show for Reports/Guides/Tools and are hidden for News,
  controlled centrally by `hasTags` in `lib/site.ts`.
- Header is now a client component (`components/Header.tsx`) with a mobile
  hamburger menu, and the old Contact button is now **Subscribe** — it
  scrolls to the newsletter section (`#newsletter`) instead of navigating away.
- Nav links get an accent-colored underline on hover and on the active page,
  with the text turning white/silver (previously it just turned orange).
- New `components/Newsletter.tsx` section renders directly above the footer
  on every page (wired in `app/layout.tsx`), with a working `/api/subscribe`
  route.
  **Important:** that route currently only *validates* the email — it does
  not store or send it anywhere yet. Open `app/api/subscribe/route.ts` and
  follow the TODO comment to connect a real provider (Mailchimp, ConvertKit,
  Beehiiv, or a database table) before you launch, otherwise submitted
  emails are silently discarded.
- All `<h1>` text is uppercase site-wide via a single CSS rule in
  `app/globals.css`.
- Post-page `<h2>` now has a bolder weight and a left-to-right gradient
  underline (accent orange fading into silver). `<h3>` changed from orange
  to silver/white.
- Bulleted and numbered lists in post content now have custom accent-colored
  markers instead of default browser bullets/numbers.

- Removed the `lucide-react` dependency entirely (it was causing a
  "Module not found: Can't resolve './icons/minus.mjs'" build error on some
  npm/Node setups). The three icons it provided (menu, close, back-arrow)
  are now small inline SVGs in `components/icons.tsx` — zero dependencies,
  can't break this way again.

## Adjusting the design

Brand colors live as CSS variables in `app/globals.css`
(`--color-obsidian`, `--color-carbon`, `--color-silver`, `--color-steel`,
`--color-orange`) and are exposed as Tailwind utilities (`bg-obsidian`,
`text-orange`, `border-steel`, etc.) throughout the components.
