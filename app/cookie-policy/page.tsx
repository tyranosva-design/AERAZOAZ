import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies AERAZOAZ uses and why.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          LEGAL
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-silver md:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-steel">
          Last updated: July 2026
        </p>

        <div className="wp-content mt-10">
          <h2>What are cookies</h2>
          <p>
            Cookies are small text files stored on your device that help
            websites remember information about your visit.
          </p>

          <h2>What we use</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential</td>
                <td>Core site functionality (navigation, security)</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>Understand which content is most useful to readers</td>
              </tr>
            </tbody>
          </table>

          <h2>Managing cookies</h2>
          <p>
            Most browsers let you block or delete cookies in their settings.
            Blocking essential cookies may affect site functionality.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about our cookie use can be directed to{" "}
            <a href="mailto:hello@aerazoaz.com">hello@aerazoaz.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
