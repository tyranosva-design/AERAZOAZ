import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparency & Affiliate Policy",
  description: "How AERAZOAZ handles affiliate relationships and research independence.",
  alternates: { canonical: "/transparency" },
};

export default function TransparencyPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          LEGAL
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-silver md:text-4xl">
          Transparency &amp; Affiliate Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-steel">
          Last updated: July 2026
        </p>

        <div className="wp-content mt-10">
          <h2>Research first, affiliate relationships second</h2>
          <p>
            AERAZOAZ&rsquo;s Tools category evaluates software and platforms
            on hard metrics — pricing, fees, feature-to-cost math, and
            transaction spreads. Our conclusions are formed before any
            affiliate relationship is considered. We do not accept payment to
            change a ranking, rating, or recommendation.
          </p>

          <h2>Disclosure</h2>
          <p>
            Where an affiliate link exists, it is disclosed at the point it
            appears in an article. Using an affiliate link may earn AERAZOAZ
            a commission at no additional cost to you.
          </p>

          <h2>What affiliate relationships never influence</h2>
          <ul>
            <li>Whether a tool is included in a comparison at all</li>
            <li>The numbers presented in any Methodology section</li>
            <li>The final &ldquo;winner&rdquo; verdict in any comparison</li>
          </ul>

          <h2>Questions about a specific piece</h2>
          <p>
            If you want to know whether a specific article contains an
            affiliate relationship, contact us at{" "}
            <a href="mailto:hello@aerazoaz.com">hello@aerazoaz.com</a> and
            we&rsquo;ll confirm directly.
          </p>
        </div>
      </div>
    </section>
  );
}
