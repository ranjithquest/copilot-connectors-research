import { notFound } from "next/navigation";
import Link from "next/link";
import {
  themes,
  findingsForTheme,
  getStagesForTheme,
} from "@/data/research";
import { FindingItem } from "@/components/FindingItem";
import { QuoteBlock }  from "@/components/QuoteBlock";

// Official Copilot brand colors per theme — with light hero backgrounds
const themeColors: Record<string, { color: string; gradient: string; glow: string; lightBg: string }> = {
  discoverability:          { color: "#199FD7", gradient: "linear-gradient(135deg, #199FD7, #8A50D8)", glow: "rgba(25,159,215,0.12)",  lightBg: "linear-gradient(160deg, #f0f9ff 0%, #ede8ff 50%, #fce8f5 100%)" },
  observability:            { color: "#8A50D8", gradient: "linear-gradient(135deg, #8A50D8, #EE5091)", glow: "rgba(138,80,216,0.10)", lightBg: "linear-gradient(160deg, #f5f0ff 0%, #fce4f2 50%, #fff0eb 100%)" },
  "auth-permissions":       { color: "#EE5091", gradient: "linear-gradient(135deg, #EE5091, #FC7942)", glow: "rgba(238,80,145,0.10)", lightBg: "linear-gradient(160deg, #fdf0f6 0%, #fff0eb 50%, #fef9f0 100%)" },
  "feedback-loop":          { color: "#FC7942", gradient: "linear-gradient(135deg, #FC7942, #EE5091)", glow: "rgba(252,121,66,0.09)", lightBg: "linear-gradient(160deg, #fff5f0 0%, #fde8f2 50%, #f5f0ff 100%)" },
  "configuration-rigidity": { color: "#99BD3C", gradient: "linear-gradient(135deg, #99BD3C, #199FD7)", glow: "rgba(153,189,60,0.09)", lightBg: "linear-gradient(160deg, #f5fbee 0%, #ebf7fb 50%, #edf5ff 100%)" },
  documentation:            { color: "#8A50D8", gradient: "linear-gradient(135deg, #8A50D8, #199FD7)", glow: "rgba(138,80,216,0.10)", lightBg: "linear-gradient(160deg, #f5f0ff 0%, #e8f6ff 50%, #eef8ff 100%)" },
};

const RIBBON = "linear-gradient(90deg, #199FD7 0%, #8A50D8 40%, #EE5091 72%, #FC7942 100%)";

const priorityConfig = {
  HIGH:   { label: "HIGH",   color: "#EE5091", bg: "rgba(238,80,145,0.08)",  border: "rgba(238,80,145,0.22)" },
  MEDIUM: { label: "MEDIUM", color: "#FC7942", bg: "rgba(252,121,66,0.07)",  border: "rgba(252,121,66,0.18)" },
  LOW:    { label: "LOW",    color: "#94A3B8", bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.16)" },
  INFO:   { label: "INFO",   color: "#94A3B8", bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.16)" },
};

const stageLabels: Record<number, string> = {
  1: "Discovery", 2: "Evaluation", 3: "Setup", 4: "Testing", 5: "Maintenance",
};

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);
  if (!theme) return {};
  return {
    title: `${theme.title} | Copilot Connector Research`,
    description: theme.description.slice(0, 155),
  };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);
  if (!theme) notFound();

  const tc      = themeColors[theme.slug] ?? themeColors.discoverability;
  const pCfg    = priorityConfig[theme.priority];
  const findings       = findingsForTheme(theme.slug);
  const affectedStages = getStagesForTheme(theme);
  const relatedQuotes  = affectedStages.map((s) => ({
    quote: s.quote, attribution: s.quoteAttribution,
    stageNumber: s.number, stageTitle: s.title,
  }));

  const currentIdx = themes.findIndex((t) => t.slug === theme.slug);
  const prevTheme  = themes[currentIdx - 1];
  const nextTheme  = themes[currentIdx + 1];

  return (
    <>
      {/* ─── Hero — light gradient per theme ────────────────── */}
      <div className="relative overflow-hidden" style={{ background: tc.lightBg }}>
        {/* Ribbon stripe top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: RIBBON }} />

        {/* Subtle glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 25% 60%, ${tc.glow} 0%, transparent 55%)` }} />

        {/* Gradient line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: tc.gradient }} />

        <div className="relative max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm" style={{ color: "rgba(0,0,0,0.35)" }}>
            <Link href="/" className="hover:text-slate-600 transition-colors">Overview</Link>
            <span>/</span>
            <Link href="/#themes" className="hover:text-slate-600 transition-colors">Themes</Link>
            <span>/</span>
            <span className="text-slate-600">{theme.title}</span>
          </nav>

          {/* Priority chip */}
          <div className="mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: pCfg.bg, border: `1px solid ${pCfg.border}`, color: pCfg.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: pCfg.color }} />
              {pCfg.label} PRIORITY
            </span>
          </div>

          <h1 className="font-bold text-slate-900 leading-tight mb-3"
            style={{ fontSize: "clamp(1.875rem, 4.5vw, 3.25rem)" }}>
            {theme.title}
          </h1>
          <p className="text-slate-500 text-xl font-light mb-8">{theme.subtitle}</p>

          {/* Stage chips */}
          <div className="flex flex-wrap gap-2">
            {theme.affectedStages.map((s) => (
              <span
                key={s}
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: `${tc.color}10`,
                  border: `1px solid ${tc.color}28`,
                  color: tc.color,
                }}
              >
                Stage {s}: {stageLabels[s]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ribbon divider */}
      <div className="h-px" style={{ background: RIBBON }} />

      {/* ─── Body ────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Overview */}
        <div
          className="rounded-2xl p-7 mb-6"
          style={{ background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <p className="eyebrow mb-3 text-slate-500">Overview</p>
          <p className="text-base text-slate-700 leading-relaxed">{theme.description}</p>
        </div>

        {/* Recommended fix */}
        <div
          className="rounded-2xl p-7 mb-10"
          style={{
            background: `linear-gradient(135deg, ${tc.glow}, rgba(255,255,255,0.6))`,
            border: `1px solid ${tc.color}22`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={tc.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <p className="eyebrow" style={{ color: tc.color }}>Recommended Fix</p>
          </div>
          <p className="text-slate-800 text-base leading-relaxed font-medium">{theme.recommendedFix}</p>
        </div>

        {/* Findings */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
            Related Findings
            <span
              className="text-sm font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: `${tc.color}12`, color: tc.color }}
            >
              {findings.length}
            </span>
          </h2>
          {findings.length > 0
            ? findings.map((f) => <FindingItem key={f.id} finding={f} />)
            : <p className="text-slate-400 text-sm">No findings tagged to this theme.</p>}
        </div>

        {/* Customer voices */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">What Customers Said</h2>
          <div className="space-y-6">
            {relatedQuotes.map((q) => (
              <div key={q.stageNumber}>
                <p className="eyebrow mb-2 text-slate-500">
                  Stage {q.stageNumber}: {q.stageTitle}
                </p>
                <QuoteBlock quote={q.quote} attribution={q.attribution} />
              </div>
            ))}
          </div>
        </div>

        {/* ADO + Feedback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            {
              icon: <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />,
              icon2: <><path d="M15 3h6v6" /><path d="M10 14L21 3" /></>,
              label: "ADO Work Item",
              url: theme.adoUrl,
              cta: "Open in Azure DevOps →",
            },
            {
              icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
              icon2: null,
              label: "User Feedback",
              url: theme.feedbackUrl,
              cta: "View participant feedback →",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl p-6"
              style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {card.icon}
                  {card.icon2}
                </svg>
                <h3 className="text-sm font-bold text-slate-900">{card.label}</h3>
              </div>
              {card.url.startsWith("PLACEHOLDER") ? (
                <code className="text-xs text-slate-400 font-mono break-all">{card.url}</code>
              ) : (
                <a href={card.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline" style={{ color: tc.color }}>
                  {card.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Theme nav */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: "1px solid #E2E8F0" }}>
          {prevTheme ? (
            <Link href={`/themes/${prevTheme.slug}`} className="group flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-400">Previous</div>
                <div className="font-semibold">{prevTheme.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextTheme ? (
            <Link href={`/themes/${nextTheme.slug}`} className="group flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors text-right">
              <div>
                <div className="text-xs text-slate-400">Next</div>
                <div className="font-semibold">{nextTheme.title}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </>
  );
}
