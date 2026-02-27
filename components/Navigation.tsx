"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { ViewToggle } from "./ViewToggle";

const navLinks = [
  { href: "/#pain-map", label: "Pain Map" },
  { href: "/#themes",   label: "Themes"   },
  { href: "/#stages",   label: "Stages"   },
  { href: "/#ado",      label: "Planning" },
];

export function Navigation() {
  const pathname = usePathname();
  const isThemePage = pathname?.startsWith("/themes/");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4" style={{ height: "3.25rem" }}>
        {/* Site name + view toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="text-slate-900 text-sm font-semibold tracking-tight hover:text-slate-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Copilot Connector Research
          </Link>
          {!isThemePage && (
            <div className="hidden sm:block">
              <Suspense>
                <ViewToggle />
              </Suspense>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 shrink-0">
          {isThemePage ? (
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Overview
            </Link>
          ) : (
            <>
              {/* Desktop nav links */}
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hidden md:block text-slate-500 hover:text-slate-900 text-[0.8125rem] font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && !isThemePage && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {/* View toggle on mobile */}
          <div className="flex justify-center pb-3 mb-1 border-b border-slate-100">
            <Suspense>
              <ViewToggle />
            </Suspense>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-slate-600 hover:text-slate-900 text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
