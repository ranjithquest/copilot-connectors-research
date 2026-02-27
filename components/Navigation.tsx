"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { ViewToggle } from "./ViewToggle";

export function Navigation() {
  const pathname = usePathname();
  const isThemePage = pathname?.startsWith("/themes/");

  return (
    <nav className="nav-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center" style={{ height: "3.25rem" }}>
        {!isThemePage ? (
          <Suspense>
            <ViewToggle />
          </Suspense>
        ) : (
          <div className="w-full flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Overview
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
