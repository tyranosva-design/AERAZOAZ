import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/site";

const POLICY_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/transparency", label: "Transparency & Affiliate Policy" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-steel/20 bg-carbon">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-heading text-lg font-bold text-silver">
              AERAZOAZ
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel">
              A global, data-driven Business Intelligence and Digital Market
              Research platform. Zero hype. Verifiable statistics, platform
              API data, and objective analysis only.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-silver">
              RESEARCH
            </p>
            <ul className="mt-4 space-y-3">
              {CATEGORY_LIST.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href={`/${cat.path}`}
                    className="text-sm text-steel transition-colors hover:text-orange"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-silver">
              COMPANY
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-steel transition-colors hover:text-orange"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-steel transition-colors hover:text-orange"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-steel/20 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-steel">
            © {new Date().getFullYear()} AERAZOAZ. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-steel transition-colors hover:text-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
