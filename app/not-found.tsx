import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-orange">404</p>
        <h1 className="font-heading mt-4 text-3xl font-bold text-foreground md:text-4xl">
          This page could not be found.
        </h1>
        <p className="mt-4 max-w-md text-sm text-steel">
          The report, guide, or page you&rsquo;re looking for doesn&rsquo;t
          exist or may have been moved. Try heading back to the{" "}
          <Link href="/" className="text-foreground underline underline-offset-2 decoration-foreground/30 transition-colors hover:text-orange hover:decoration-orange">
            homepage
          </Link>
          .
        </p>
      </div>
    </section>
  );
}