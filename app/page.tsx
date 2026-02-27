import {
  stages,
  themes,
  chartPoints,
  impactStats,
  recommendedActions,
  adoPlanningItems,
  findingsForTheme,
} from "@/data/research";
import { ThemeCard }       from "@/components/ThemeCard";
import { StageAccordion }  from "@/components/StageAccordion";
import { JourneyPainChart } from "@/components/JourneyPainChart";
import { AdoSection }      from "@/components/AdoSection";
import Link from "next/link";

const PRIMARY_BTN = "#1a1a1a";

// Microsoft 365 Copilot CDN imagery
const CDN = "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp";
const IMG = {
  hero:    `${CDN}/629152-hero-workiq-desktop?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1600&hei=900&qlt=100&fit=constrain`,
  painMap: `${CDN}/176500-BG-Chat-EDIT?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1281&qlt=100&fit=constrain`,
  summary: `${CDN}/6-BG-What_s-New?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1210&qlt=100&fit=constrain`,
  themes:  `${CDN}/176500-BG-Agent-EDIT?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1281&qlt=100&fit=constrain`,
  stages:  `${CDN}/176500-BG-Notebooks-EDIT?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1281&qlt=100&fit=constrain`,
  ado:     `${CDN}/BG%20-%20Get%20Started?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=657&qlt=100&fit=constrain`,
};

const LIGHT_OVERLAY = "rgba(255,255,255,0.78), rgba(255,255,255,0.78)";

function bgImage(url: string, overlay = LIGHT_OVERLAY) {
  return {
    backgroundImage: `linear-gradient(${overlay}), url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section
        id="overview"
        className="relative overflow-hidden"
        style={{
          height: "33vh",
          minHeight: "260px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: `url(${IMG.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full text-center">
          <h1 className="font-bold text-white leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Connector Admin{" "}
            <span className="copilot-text">Experience</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-8 mx-auto" style={{ maxWidth: "34rem" }}>
            Deep-dive research across the full admin journey — from first discovery to ongoing
            management — spanning enterprise customers including EY, Alpha Bank, and more.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#pain-map"
              className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: PRIMARY_BTN, boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
              Explore Findings
            </a>
            <a href="#themes"
              className="px-7 py-3 rounded-full text-sm font-medium text-white transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
              View Themes
            </a>
          </div>
        </div>
      </section>

      {/* ── JOURNEY PAIN MAP ───────────────────────────── */}
      <section id="pain-map" className="py-10 sm:py-16"
        style={bgImage(IMG.painMap, "rgba(255,255,255,0.82), rgba(255,255,255,0.82)")}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-3 text-slate-500">Journey Pain Map</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
            Where Customers Are Struggling Most
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Pain severity mapped across all 5 stages. Hover each circle for the full finding.
          </p>
          <JourneyPainChart points={chartPoints} />
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY ──────────────────────────── */}
      <section id="summary" className="py-10 sm:py-16"
        style={bgImage(IMG.summary, "rgba(248,244,255,0.78), rgba(248,244,255,0.78)")}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-3 text-slate-500">Executive Summary</p>

          <div className="max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="font-light text-slate-800 leading-relaxed mb-4"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.375rem)" }}>
              Enterprise admins face{" "}
              <strong className="font-semibold text-slate-900">compounding friction at every stage</strong>{" "}
              of the Copilot Connectors journey.{" "}
              <span className="text-slate-500">
                What should be a 1–2 week setup routinely stretches into months — or ends in abandonment.
              </span>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Root causes: poor discoverability · zero observability · auth failures · no feedback loops
            </p>
          </div>

          {/* Impact stats */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.07] mb-10 sm:mb-14 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
          >
            {impactStats.map((s) => (
              <div key={s.label} className="py-6 sm:py-8 px-6 sm:px-8">
                <div className="stat-number copilot-text">
                  {s.value}
                  <span className="text-xl sm:text-2xl font-light text-slate-400 ml-1">{s.unit}</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Three bets */}
          <p className="eyebrow mb-4 text-slate-500">Three Bets That Would Move the Needle</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {recommendedActions.map((action) => (
              <div key={action.number}
                className="group rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-3 sm:mb-4"
                  style={{ background: PRIMARY_BTN }}>
                  {action.number}
                </div>
                <p className="text-slate-900 font-semibold text-sm leading-snug mb-2">{action.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{action.description}</p>
                <Link href={`/themes/${action.themeSlug}`}
                  className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wide transition-all group-hover:gap-2.5"
                  style={{ color: "#8A50D8" }}>
                  View theme
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THEMES ─────────────────────────────────────── */}
      <section id="themes" className="py-10 sm:py-16" style={bgImage(IMG.themes)}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-3 text-slate-500">Cross-Stage Pain Themes</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
            Six Themes Across the Entire Journey
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Each theme appears repeatedly across multiple stages. Click a card for a full deep dive.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 text-left">
            {themes.map((theme) => (
              <ThemeCard key={theme.slug} theme={theme} findingCount={findingsForTheme(theme.slug).length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STAGE-BY-STAGE ─────────────────────────────── */}
      <section id="stages" className="py-10 sm:py-16"
        style={bgImage(IMG.stages, "rgba(245,247,250,0.8), rgba(245,247,250,0.8)")}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-3 text-slate-500">Stage-by-Stage Findings</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
            All 5 Stages — Detailed Findings
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-5 max-w-xl mx-auto">
            Click any stage to expand findings and a verbatim customer quote.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs shadow-sm">
            <span className="text-slate-400 font-bold uppercase tracking-wide">Priority:</span>
            <span className="flex items-center gap-1.5 font-bold" style={{ color: "#EE5091" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#EE5091" }} /> HIGH
            </span>
            <span className="flex items-center gap-1.5 font-bold" style={{ color: "#FC7942" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#FC7942" }} /> MEDIUM
            </span>
            <span className="flex items-center gap-1.5 font-bold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> CONTEXT
            </span>
          </div>

          <div className="text-left">
            <StageAccordion stages={stages} />
          </div>
        </div>
      </section>

      {/* ── ADO PLANNING ───────────────────────────────── */}
      <section id="ado" className="py-10 sm:py-16" style={bgImage(IMG.ado)}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-3 text-slate-500">ADO Planning Links</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
            Planning & Backlog
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Work items linked to each research theme. Replace placeholder URLs in{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">data/research.ts</code>.
          </p>
          <div className="text-left">
            <AdoSection items={adoPlanningItems} />
          </div>
        </div>
      </section>
    </>
  );
}
