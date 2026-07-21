import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AERAZOAZ collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          LEGAL
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-foreground md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-steel">
          Last updated: July 2026
        </p>

        <div className="wp-content mt-10">
          <h2>What we collect</h2>
          <p>
            AERAZOAZ collects standard analytics data (pages visited, device
            and browser type, approximate location) to understand how our
            research is used. If you contact us directly, we retain your
            email address and message solely to respond to your inquiry.
          </p>

          <h2>How we use it</h2>
          <p>
            Data is used to improve site performance, understand which
            reports and guides are most valuable to readers, and respond to
            direct inquiries. We do not sell personal data to third parties.
          </p>

          <h2>Cookies</h2>
          <p>
            We use a limited set of cookies for analytics and site
            functionality. See our <a href="/cookie-policy">Cookie Policy</a>{" "}
            for full detail on what is set and why.
          </p>

          <h2>Third-party services</h2>
          <p>
            Our content delivery, analytics, and hosting providers may
            process data on our behalf under their own privacy terms. We
            select providers that meet reasonable industry data-protection
            standards.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of any
            personal data we hold about you by contacting us at{" "}
            <a href="mailto:hello@aerazoaz.com">hello@aerazoaz.com</a>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as our practices evolve. Material
            changes will be reflected by updating the date above.
          </p>
        </div>
      </div>
    </section>
  );
}
