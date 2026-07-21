import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "The editorial standards behind every AERAZOAZ Report, Guide, Tool comparison, and News Flash.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          LEGAL
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-foreground md:text-4xl">
          Editorial Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-steel">
          Last updated: July 2026
        </p>

        <div className="wp-content mt-10">
          <h2>Radical neutrality</h2>
          <p>
            AERAZOAZ writes for beginner, intermediate, and advanced
            entrepreneurs alike, in one universal voice. We do not modulate
            our findings for any specific demographic, age group, or skill
            level — the data is presented the same way for everyone.
          </p>

          <h2>Reports standard</h2>
          <p>
            Every Report includes a Methodology section stating sample size,
            source APIs, time period, and calculation factors, so any finding
            can be independently checked.
          </p>

          <h2>Guides standard</h2>
          <p>
            Every Guide is dictated by data, not opinion. Recommendations are
            stated as direct commands backed by a specific statistic, not
            generic advice.
          </p>

          <h2>Tools standard</h2>
          <p>
            Every Tools comparison is evaluated mathematically — pricing,
            fee structures, and currency-conversion spreads calculated to the
            smallest relevant unit.
          </p>

          <h2>News Flashes: the 3-Sentence Rule</h2>
          <p>
            Every News Flash follows a strict three-sentence structure:
          </p>
          <ol>
            <li>
              <strong>Fact</strong> — what changed, stated plainly.
            </li>
            <li>
              <strong>Mechanism</strong> — how the change actually works.
            </li>
            <li>
              <strong>Wallet Impact</strong> — what it means for a
              freelancer&rsquo;s income, directly.
            </li>
          </ol>

          <h2>Corrections</h2>
          <p>
            If a factual error is identified in a published piece, we correct
            it and note the correction date. Report a possible error at{" "}
            <a href="mailto:hello@aerazoaz.com">hello@aerazoaz.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
