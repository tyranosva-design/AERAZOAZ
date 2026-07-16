import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of AERAZOAZ.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          LEGAL
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-silver md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 font-mono text-xs text-steel">
          Last updated: July 2026
        </p>

        <div className="wp-content mt-10">
          <h2>Acceptance of terms</h2>
          <p>
            By accessing AERAZOAZ, you agree to these terms. If you do not
            agree, please discontinue use of the site.
          </p>

          <h2>Use of content</h2>
          <p>
            Reports, guides, tool comparisons, and news content are provided
            for informational purposes. You may reference and link to our
            content with attribution; you may not republish full articles
            without written permission.
          </p>

          <h2>No professional advice</h2>
          <p>
            Content on AERAZOAZ is research and analysis, not financial,
            legal, or tax advice. See our{" "}
            <a href="/disclaimer">Disclaimer</a> for full detail.
          </p>

          <h2>Accuracy of data</h2>
          <p>
            We publish methodology alongside every report so our numbers can
            be independently verified. Markets and platform policies change;
            data reflects the sample period stated in each piece.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            AERAZOAZ is not liable for decisions made based on published
            research. Use of any statistic, guide, or tool recommendation is
            at your own discretion and risk.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may revise these terms periodically. Continued use of the
            site after changes constitutes acceptance of the revised terms.
          </p>
        </div>
      </div>
    </section>
  );
}
