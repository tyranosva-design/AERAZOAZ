import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AERAZOAZ research team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">
          CONTACT
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-silver md:text-4xl">
          Talk to the research team.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-steel">
          For methodology questions, data requests, partnership inquiries, or
          corrections, reach us directly.
        </p>

        <div className="mt-10 rounded-lg border border-steel/20 bg-carbon p-8">
          <p className="font-mono text-xs tracking-wider text-steel">EMAIL</p>
          <a
            href="mailto:hello@aerazoaz.com"
            className="mt-2 block text-lg font-semibold text-orange hover:underline"
          >
            hello@aerazoaz.com
          </a>
        </div>

        <p className="mt-6 text-sm text-steel">
          We read every message. Response times are typically 1–2 business
          days.
        </p>
      </div>
    </section>
  );
}
