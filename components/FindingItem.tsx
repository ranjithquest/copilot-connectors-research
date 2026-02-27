import type { Finding } from "@/data/research";

// Copilot-palette priority config
const priorityConfig = {
  HIGH: {
    bg: "#ffffff",
    border: "#D4789A",
    idBg: "rgba(238,80,145,0.10)",
    idColor: "#c0437a",
    label: "HIGH",
    labelBg: "rgba(238,80,145,0.10)",
    labelColor: "#c0437a",
    fixColor: "#64748B",
  },
  MEDIUM: {
    bg: "#ffffff",
    border: "#D48B65",
    idBg: "rgba(252,121,66,0.10)",
    idColor: "#b85a28",
    label: "MEDIUM",
    labelBg: "rgba(252,121,66,0.10)",
    labelColor: "#b85a28",
    fixColor: "#64748B",
  },
  LOW: {
    bg: "#ffffff",
    border: "#94A3B8",
    idBg: "rgba(148,163,184,0.10)",
    idColor: "#64748B",
    label: "CONTEXT",
    labelBg: "rgba(148,163,184,0.10)",
    labelColor: "#64748B",
    fixColor: "#94A3B8",
  },
  INFO: {
    bg: "#ffffff",
    border: "#CBD5E1",
    idBg: "rgba(148,163,184,0.08)",
    idColor: "#94A3B8",
    label: "CONTEXT",
    labelBg: "rgba(148,163,184,0.08)",
    labelColor: "#94A3B8",
    fixColor: "#94A3B8",
  },
};

interface FindingItemProps {
  finding: Finding;
  showId?: boolean;
}

export function FindingItem({ finding, showId = true }: FindingItemProps) {
  const cfg = priorityConfig[finding.priority];

  return (
    <div
      className="rounded-xl px-4 py-4 mb-3 last:mb-0"
      style={{ backgroundColor: cfg.bg, borderTop: "1px solid #E2E8F0", borderRight: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", borderLeft: `3px solid ${cfg.border}` }}
    >
      <div className="flex items-start gap-3">
        {showId && (
          <span
            className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold mt-0.5 tabular-nums"
            style={{ backgroundColor: cfg.idBg, color: cfg.idColor }}
          >
            {finding.id}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <span
            className="inline-block text-[0.6rem] font-bold rounded-full px-2 py-0.5 uppercase tracking-widest mb-2"
            style={{ backgroundColor: cfg.labelBg, color: cfg.labelColor }}
          >
            {cfg.label} PRIORITY
          </span>
          <p className="text-sm font-semibold text-slate-900 leading-snug mb-1.5">
            {finding.title}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mb-2.5">
            {finding.description}
          </p>
          <div className="flex items-start gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={cfg.fixColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <p className="text-xs font-medium leading-relaxed" style={{ color: cfg.fixColor }}>
              Fix: {finding.fix}
            </p>
          </div>
          {finding.customers && finding.customers.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 pt-2.5" style={{ borderTop: "1px solid #F1F5F9" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="flex flex-wrap gap-1">
                {finding.customers.map((c) => (
                  <span key={c} className="text-[0.6rem] font-semibold px-1.5 py-0.5 rounded" style={{ background: "#F1F5F9", color: "#475569" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
