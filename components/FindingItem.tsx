import type { Finding } from "@/data/research";

// Copilot-palette priority config
const priorityConfig = {
  HIGH: {
    bg: "rgba(238, 80, 145, 0.05)",
    border: "#EE5091",
    idBg: "rgba(238, 80, 145, 0.12)",
    idColor: "#EE5091",
    label: "HIGH",
    labelBg: "rgba(238, 80, 145, 0.1)",
    labelColor: "#D03B82",
    fixColor: "#8A50D8",
  },
  MEDIUM: {
    bg: "rgba(252, 121, 66, 0.05)",
    border: "#FC7942",
    idBg: "rgba(252, 121, 66, 0.12)",
    idColor: "#D96030",
    label: "MEDIUM",
    labelBg: "rgba(252, 121, 66, 0.1)",
    labelColor: "#C05520",
    fixColor: "#199FD7",
  },
  LOW: {
    bg: "rgba(148, 163, 184, 0.04)",
    border: "#CBD5E1",
    idBg: "rgba(148, 163, 184, 0.08)",
    idColor: "#64748B",
    label: "CONTEXT",
    labelBg: "rgba(148, 163, 184, 0.07)",
    labelColor: "#64748B",
    fixColor: "#64748B",
  },
  INFO: {
    bg: "rgba(148, 163, 184, 0.04)",
    border: "#E2E8F0",
    idBg: "rgba(148, 163, 184, 0.07)",
    idColor: "#94A3B8",
    label: "CONTEXT",
    labelBg: "rgba(148, 163, 184, 0.06)",
    labelColor: "#94A3B8",
    fixColor: "#64748B",
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
      style={{ backgroundColor: cfg.bg, borderLeft: `3px solid ${cfg.border}` }}
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
        </div>
      </div>
    </div>
  );
}
