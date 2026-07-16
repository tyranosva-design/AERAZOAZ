"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { CATEGORY_LIST } from "@/lib/site";

const NAV_ITEMS = [
  ...CATEGORY_LIST.map((cat) => ({ href: `/${cat.path}`, label: cat.label })),
  { href: "/about", label: "ABOUT" },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative pb-1 font-mono text-xs tracking-[0.15em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange after:transition-all after:duration-300 after:content-[''] ${
        active
          ? "text-silver after:w-full"
          : "text-steel after:w-0 hover:text-silver hover:after:w-full"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/about" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-steel/20 bg-obsidian/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-silver"
          onClick={() => setOpen(false)}
        >
          AERAZOAZ
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#newsletter"
            className="hidden rounded-full border border-orange/50 px-5 py-2 font-mono text-xs tracking-[0.15em] text-orange transition-colors hover:bg-orange hover:text-obsidian md:inline-block"
            onClick={() => setOpen(false)}
          >
            SUBSCRIBE
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-full border border-steel/30 p-2 text-silver md:hidden"
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <nav className="border-t border-steel/20 bg-obsidian px-6 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  active={isActive(item.href)}
                  onClick={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
          <a
            href="#newsletter"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full border border-orange/50 px-5 py-3 text-center font-mono text-xs tracking-[0.15em] text-orange transition-colors hover:bg-orange hover:text-obsidian"
          >
            SUBSCRIBE
          </a>
        </nav>
      )}
    </header>
  );
}
