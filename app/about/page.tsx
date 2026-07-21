import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AERAZOAZ is a global Business Intelligence platform built on the Insight to Action Engine — Reports, Guides, and Tools, backed by hard data.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] text-accent">
          ABOUT AERAZOAZ
        </p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-foreground md:text-4xl">
          A digital economic journal, not another guru blog.
        </h1>

        <div className="wp-content mt-10">
          <p>
            AERAZOAZ is a global, data-driven Business Intelligence and
            Digital Market Research platform designed to teach modern
            entrepreneurs how to earn money online, grow, and scale their
            businesses globally using hard, raw, real-world data.
          </p>
          <p>
            Unlike traditional online business blogs that rely on generic
            &ldquo;guru opinions,&rdquo; AERAZOAZ operates like a digital
            economic journal. We filter out internet fluff and replace it
            with cold, verifiable statistics, platform API data, and
            objective analysis.
          </p>

          <h2>The Insight to Action Engine</h2>
          <p>
            To turn insight into immediate financial action, our research is
            structurally split into three distinct categories:
          </p>
          <ul>
            {CATEGORY_LIST.filter((c) => c.key !== "news").map((cat) => (
              <li key={cat.key}>
                <Link href={`/${cat.path}`}>
                  <strong>{cat.label}</strong>
                </Link>{" "}
                — {cat.description}
              </li>
            ))}
          </ul>
          <p>
            A complementary <Link href="/news">NEWS</Link> layer keeps the
            whole ecosystem synchronized with the fast-moving digital
            economy, using a strict 3-Sentence Rule — Fact, Mechanism, Wallet
            Impact — to explain how each development affects your income.
          </p>

          <h2>Editorial standard</h2>
          <p>
            Every report carries a Methodology section detailing sample
            sizes, source APIs, and calculation factors. Every guide is
            dictated by data, not opinion. Every tool comparison is
            mathematical — down to the currency unit. Where affiliate
            relationships exist, they are disclosed and always follow our
            research conclusions, never precede them. Read our{" "}
            <Link href="/editorial-policy">Editorial Policy</Link> and{" "}
            <Link href="/transparency">Transparency &amp; Affiliate Policy</Link>{" "}
            for full detail.
          </p>
        </div>
      </div>
    </section>
  );
}
