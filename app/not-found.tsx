import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-orange">404</p>
      <h1 className="font-heading mt-4 text-3xl font-bold text-silver md:text-4xl">
        This page could not be found.
      </h1>
      <p className="mt-4 max-w-md text-sm text-steel">
        The report, guide, or page you&rsquo;re looking for doesn&rsquo;t
        exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-orange/50 px-6 py-3 font-mono text-xs tracking-[0.15em] text-orange transition-colors hover:bg-orange hover:text-obsidian"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
