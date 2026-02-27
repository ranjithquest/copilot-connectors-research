import type React from "react";
import {
  stages,
  themes,
  chartPoints,
  adoPlanningItems,
  findingsForTheme,
} from "@/data/research";
import { ThemeCard }       from "@/components/ThemeCard";
import { StageAccordion }  from "@/components/StageAccordion";
import { JourneyPainChart } from "@/components/JourneyPainChart";
import { AdoSection }      from "@/components/AdoSection";
import { QuoteBlock }      from "@/components/QuoteBlock";

const PRIMARY_BTN = "#1a1a1a";

// Microsoft 365 Copilot CDN imagery
const CDN = "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp";
const IMG = {
  hero:    `${CDN}/629152-hero-workiq-desktop?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1600&hei=900&qlt=100&fit=constrain`,
  painMap: `${CDN}/176500-BG-Chat-EDIT?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1281&qlt=100&fit=constrain`,
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

const priorityColors: Record<string, string> = {
  HIGH: "#EE5091",
  MEDIUM: "#FC7942",
  LOW: "#94A3B8",
  INFO: "#94A3B8",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const isNewsletter = view !== "web";

  if (isNewsletter) {
    // Shared label style for section eyebrows
    const SL: React.CSSProperties = {
      fontSize: 10, fontWeight: 700, color: "#0078D4",
      letterSpacing: "0.08em", textTransform: "uppercase",
      display: "flex", alignItems: "center", gap: 6, marginBottom: 14,
    };
    const sectionCard: React.CSSProperties = {
      background: "#fff",
      border: "1px solid #e8edf2",
      borderRadius: 12,
      padding: "20px 22px",
    };

    return (
      <div style={{ background: "#f0f4f8", minHeight: "100vh" }}>

        {/* ── 1. HEADER ─────────────────────────────────── */}
        <div style={{
          background: "#fff",
          borderBottom: "1px solid #e8edf2",
          padding: "22px 32px",
        }}>
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
                  Connector Admin <span className="copilot-text">Experience</span>
                </h1>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0" }}>
                  Research Brief · EY, Alpha Bank &amp; more
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 32px 32px" }}>

          {/* ── 2. THEMES (full width, 2-col grid of cards) ── */}
          <div style={{ ...sectionCard, marginBottom: 20 }}>
            <p style={SL}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0078D4", display: "inline-block" }} />
              Cross-Stage Themes
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {themes.map((theme) => (
                <div key={theme.slug} style={{
                  borderLeft: `3px solid ${priorityColors[theme.priority] ?? "#94A3B8"}`,
                  background: `${priorityColors[theme.priority] ?? "#94A3B8"}08`,
                  borderRadius: "0 8px 8px 0",
                  padding: "10px 12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{theme.title}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      color: priorityColors[theme.priority],
                      background: `${priorityColors[theme.priority]}22`,
                      padding: "2px 7px", borderRadius: 999,
                    }}>
                      {theme.priority}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4, margin: 0 }}>{theme.subtitle}</p>
                  <p style={{ fontSize: 9, color: "#94a3b8", marginTop: 4 }}>
                    {theme.findingIds.length} findings · stages {theme.affectedStages.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. JOURNEY STAGES + PAIN MAP (full width) ──── */}
          <div style={{ ...sectionCard, marginBottom: 20 }}>
            <p style={SL}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0078D4", display: "inline-block" }} />
              Copilot Connector Experience Analysis
            </p>
            {/* 5 stage summary cards in a horizontal row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 20 }}>
              {stages.map((stage) => {
                const hc = stage.findings.filter(f => f.priority === "HIGH").length;
                const mc = stage.findings.filter(f => f.priority === "MEDIUM").length;
                return (
                  <div key={stage.number} style={{
                    background: "#f8fafc", border: "1px solid #e8edf2",
                    borderRadius: 10, padding: "12px 14px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: "#0078D4", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, flexShrink: 0,
                      }}>
                        {stage.number}
                      </span>
                      <div style={{ display: "flex", gap: 3 }}>
                        {hc > 0 && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#EE5091", background: "#EE509115", border: "1px solid #EE509130", padding: "1px 6px", borderRadius: 999 }}>
                            {hc}H
                          </span>
                        )}
                        {mc > 0 && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#FC7942", background: "#FC794215", border: "1px solid #FC794230", padding: "1px 6px", borderRadius: 999 }}>
                            {mc}M
                          </span>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", lineHeight: 1.3, margin: 0 }}>{stage.title}</p>
                  </div>
                );
              })}
            </div>
            {/* Pain map chart — full width */}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
              <JourneyPainChart points={chartPoints} />
            </div>
          </div>

          {/* ── 4. ALL FINDINGS ───────────────────────────── */}
          <div style={{ ...sectionCard, marginBottom: 20 }}>
            <p style={SL}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0078D4", display: "inline-block" }} />
              All Findings
            </p>
            {stages.map((stage, si) => (
              <div key={stage.number} style={{ marginBottom: si < stages.length - 1 ? 24 : 0 }}>
                {/* Stage header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "#f8fafc", borderRadius: 8,
                  padding: "8px 12px", marginBottom: 10,
                  border: "1px solid #e8edf2",
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "#243A5E", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, flexShrink: 0,
                  }}>
                    {stage.number}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#243A5E" }}>{stage.title}</span>
                </div>
                {/* 2-col findings grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
                  {stage.findings.map((f, fi) => (
                    <div key={f.id} style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      padding: "8px 10px",
                      background: fi % 2 === 0 ? "#fafbfc" : "#fff",
                      borderRadius: 6,
                      border: "1px solid #f1f5f9",
                    }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700,
                        color: priorityColors[f.priority],
                        background: `${priorityColors[f.priority]}15`,
                        border: `1px solid ${priorityColors[f.priority]}35`,
                        padding: "2px 6px", borderRadius: 999,
                        whiteSpace: "nowrap", marginTop: 1, flexShrink: 0,
                      }}>
                        {f.priority === "INFO" ? "CTX" : f.priority === "MEDIUM" ? "MED" : "HIGH"}
                      </span>
                      <span style={{ color: "#c0cad6", fontSize: 10, fontWeight: 700, minWidth: 28, marginTop: 1, flexShrink: 0 }}>{f.id}</span>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", lineHeight: 1.35, margin: 0 }}>{f.title}</p>
                        <p style={{ fontSize: 10, color: "#8A50D8", marginTop: 3, lineHeight: 1.35 }}>→ {f.fix}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── 5. CUSTOMER VOICES ────────────────────────── */}
          <div style={sectionCard}>
            <p style={SL}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0078D4", display: "inline-block" }} />
              Customer Voices
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
              {stages.map((stage) => (
                <QuoteBlock key={stage.number} quote={stage.quote} attribution={`${stage.quoteAttribution} · Stage ${stage.number}`} />
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ── WEB VIEW (default) ─────────────────────────────────────────────────────
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
