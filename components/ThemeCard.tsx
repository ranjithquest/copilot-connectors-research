import Link from "next/link";
import type { Theme } from "@/data/research";

// Each theme maps to a Copilot brand color
const themeColors: Record<string, { color: string; gradient: string; glow: string }> = {
  discoverability:        { color: "#199FD7", gradient: "linear-gradient(135deg, #199FD7, #8A50D8)", glow: "rgba(25,159,215,0.12)" },
  observability:          { color: "#8A50D8", gradient: "linear-gradient(135deg, #8A50D8, #EE5091)", glow: "rgba(138,80,216,0.1)" },
  "auth-permissions":     { color: "#EE5091", gradient: "linear-gradient(135deg, #EE5091, #FC7942)", glow: "rgba(238,80,145,0.1)" },
  "feedback-loop":        { color: "#FC7942", gradient: "linear-gradient(135deg, #FC7942, #EE5091)", glow: "rgba(252,121,66,0.1)" },
  "configuration-rigidity": { color: "#99BD3C", gradient: "linear-gradient(135deg, #99BD3C, #199FD7)", glow: "rgba(153,189,60,0.1)" },
  documentation:          { color: "#8A50D8", gradient: "linear-gradient(135deg, #8A50D8, #199FD7)", glow: "rgba(138,80,216,0.1)" },
};

const priorityLabel: Record<string, string> = {
  HIGH: "HIGH",
  MEDIUM: "MED",
  LOW: "LOW",
  INFO: "INFO",
};

const stageLabels: Record<number, string> = {
  1: "Discovery",
  2: "Evaluation",
  3: "Setup",
  4: "Testing",
  5: "Maintenance",
};

interface ThemeCardProps {
  theme: Theme;
  findingCount: number;
}

export function ThemeCard({ theme, findingCount }: ThemeCardProps) {
  const tc = themeColors[theme.slug] ?? themeColors.discoverability;
  const pLabel = priorityLabel[theme.priority] ?? theme.priority;

  return (
    <Link
      href={`/themes/${theme.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: "white",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Copilot-colored gradient top bar */}
      <div className="h-1" style={{ background: tc.gradient }} />

      <div className="p-5">
        {/* Priority badge + count */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="eyebrow flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6rem] text-slate-500"
            style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tc.color }} />
            {pLabel}
          </span>
          <span className="text-xs text-slate-400 font-medium tabular-nums">
            {findingCount} findings
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[0.9375rem] font-bold text-slate-900 leading-snug mb-1.5 transition-colors duration-200"
          style={{ ["--hover-color" as string]: tc.color }}
        >
          <span className="group-hover:opacity-0 absolute inset-0 pointer-events-none" />
          {theme.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {theme.subtitle}
        </p>

        {/* Affected stage chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {theme.affectedStages.map((s) => (
            <span
              key={s}
              className="text-[0.6875rem] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${tc.color}12`,
                color: tc.color,
                border: `1px solid ${tc.color}28`,
              }}
            >
              {stageLabels[s]}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wide transition-all group-hover:gap-2.5"
          style={{ color: tc.color }}
        >
          Deep dive
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
