import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Copilot Connector Research | UX Research Readout",
  description:
    "Enterprise admin research findings across the full Microsoft 365 Copilot Connectors adoption journey — from discovery to ongoing maintenance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F5F7FA] text-slate-900 antialiased">
        <Navigation />
        <main>{children}</main>

        {/* Footer — light */}
        <footer className="bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Site name */}
            <p className="text-slate-700 text-sm font-semibold">Copilot Connector Research</p>
            <p className="text-slate-400 text-xs text-center sm:text-right">
              UX Research Readout · Internal use only
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
