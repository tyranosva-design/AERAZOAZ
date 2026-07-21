import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "AERAZOAZ content is research and analysis, not financial advice.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          LEGAL
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-foreground md:text-4xl">
          Disclaimer
        </h1>
        <p className="mt-2 font-mono text-xs text-steel">
          Last updated: July 2026
        </p>

        <div className="wp-content mt-10">
          <h2>Not financial or legal advice</h2>
          <p>
            Nothing published on AERAZOAZ — including Reports, Guides, Tools
            comparisons, or News Flashes — constitutes financial, legal, tax,
            or investment advice. Our content is independent research and
            analysis intended for informational purposes only.
          </p>

          <h2>No guaranteed outcomes</h2>
          <p>
            Statistics on earnings, conversion rates, or platform performance
            reflect historical data collected during a stated sample period.
            Past performance and observed data trends do not guarantee future
            results for any individual or business.
          </p>

          <h2>Independent verification</h2>
          <p>
            We publish methodology alongside every report so you can assess
            data quality and applicability to your own situation. We
            encourage independent verification before making significant
            business or financial decisions.
          </p>

          <h2>Third-party platforms and tools</h2>
          <p>
            References to third-party platforms (such as Upwork, Fiverr, or
            payment processors) reflect data available at the time of
            publication. Pricing, fees, and policies on those platforms may
            change after publication.
          </p>
        </div>
      </div>
    </section>
  );
}
