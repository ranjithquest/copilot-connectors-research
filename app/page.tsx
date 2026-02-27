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
import { FindingItem }     from "@/components/FindingItem";

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


export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const isNewsletter = view !== "web";

  if (isNewsletter) {
    // Shared label style for section titles — Fluent Title3
    const SL: React.CSSProperties = {
      fontSize: 15, fontWeight: 700, color: "#0f172a",
      letterSpacing: "-0.01em",
      display: "block", textAlign: "center", marginBottom: 20,
    };
    const sectionCard: React.CSSProperties = {
      background: "rgba(255,255,255,0.97)",
      borderRadius: 16,
      padding: "28px 28px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
    };

    return (
      <div style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(248,250,255,0.86), rgba(248,250,255,0.86)), url(https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1076601-WhyMicrosoftBackground-1600x1020?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1600&hei=1020&qlt=100&fit=constrain)`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}>

        {/* ── 1. HEADER / HERO ──────────────────────────── */}
        <div className="nl-outer-pad" style={{ paddingBottom: 0 }}>
          <div style={{
            backgroundImage: `url(https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1076601-HeroBackground-1600x720?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1600&hei=720&qlt=100&fit=constrain)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "clamp(32px, 7vw, 56px) 28px",
            textAlign: "center",
            borderRadius: 14,
            overflow: "hidden",
          }}>
            {/* Main title */}
            <h1 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0, color: "rgb(42,68,111)" }}>
              Copilot Connector Research
            </h1>
            {/* Sub-heading + session count */}
            <p style={{ fontSize: 16, color: "rgb(42,68,111)", margin: "10px 0 0", fontWeight: 500, opacity: 0.90 }}>
              Admin Experience
            </p>
            <p style={{ fontSize: 16, color: "rgb(42,68,111)", margin: "4px 0 0", fontWeight: 400, opacity: 0.65 }}>
              12 Admin sessions · 8 Companies · Jan &amp; Feb
            </p>
            {/* Customer logo strip */}
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "8px 14px" }}>
              {[
                { name: "COHESITY",       color: "#1B1B1B", accent: "#00B140", accentOn: "S" },
                { name: "nationalgrid",   color: "#005EB8"                                    },
                { name: "EY",             color: "#1B1B1B", bg: "#FFE600", pad: true          },
                { name: "ABB",            color: "#FF000F"                                    },
                { name: "charles schwab", color: "#fff",    bg: "#00A0DF", pad: true          },
                { name: "ARM",            color: "#00A9CE"                                    },
                { name: "DOW",            color: "#fff",    bg: "#CC0000", pad: true          },
                { name: "UCB",            color: "#003087"                                    },
                { name: "BNY",            color: "#003087"                                    },
              ].map((co) => (
                <span key={co.name} style={{
                  display: "inline-flex", alignItems: "center",
                  fontSize: co.pad ? 11 : 12,
                  fontWeight: 700,
                  letterSpacing: co.name === co.name.toUpperCase() ? "0.04em" : 0,
                  color: co.color,
                  background: co.bg ?? "rgba(255,255,255,0.72)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  backdropFilter: "blur(4px)",
                  border: co.bg ? "none" : "1px solid rgba(0,0,0,0.08)",
                }}>
                  {co.accentOn
                    ? co.name.split(co.accentOn).map((part, i) =>
                        i === 0
                          ? <span key={i}>{part}<span style={{ color: co.accent }}>{co.accentOn}</span></span>
                          : <span key={i}>{part}</span>
                      )
                    : co.name
                  }
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="nl-outer-pad">

          {/* ── 2. JOURNEY STAGES + PAIN MAP (full width) ──── */}
          <div style={{ ...sectionCard, marginBottom: 24 }}>
            <p style={SL} className="copilot-text">Customer Experience Analysis</p>
            {/* 5 stage summary cards in a horizontal row */}
            <div className="nl-stages-grid">
              {stages.map((stage) => {
                const hc = stage.findings.filter(f => f.priority === "HIGH").length;
                const mc = stage.findings.filter(f => f.priority === "MEDIUM").length;
                return (
                  <div key={stage.number} style={{
                    background: "#f8fafc",
                    border: "1px solid #e8edf2",
                    borderLeft: `3px solid ${(["#199FD7","#8A50D8","#EE5091","#FC7942","#99BD3C"])[stage.number - 1]}`,
                    borderRadius: 10, padding: "14px 16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 3 }}>
                        {hc > 0 && (
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#EE5091", background: "#EE509115", border: "1px solid #EE509130", padding: "1px 7px", borderRadius: 999 }}>
                            {hc}H
                          </span>
                        )}
                        {mc > 0 && (
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#FC7942", background: "#FC794215", border: "1px solid #FC794230", padding: "1px 7px", borderRadius: 999 }}>
                            {mc}M
                          </span>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.35, margin: 0 }}>{stage.title}</p>
                  </div>
                );
              })}
            </div>
            {/* Pain map chart — full width */}
            <div>
              <JourneyPainChart points={chartPoints} />
            </div>
          </div>

          {/* ── 3. THEMES (full width, 2-col grid of cards) ── */}
          <div style={{ ...sectionCard, marginBottom: 24 }}>
            <p style={SL} className="copilot-text">Critical Themes Identified</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {themes.map((theme) => (
                <ThemeCard key={theme.slug} theme={theme} findingCount={findingsForTheme(theme.slug).length} />
              ))}
            </div>
          </div>

          {/* ── 4. ALL FINDINGS ───────────────────────────── */}
          <div style={{ ...sectionCard, marginBottom: 24 }}>
            <p style={SL} className="copilot-text">All Findings</p>
            {stages.map((stage, si) => (
              <div key={stage.number} style={{ marginBottom: si < stages.length - 1 ? 24 : 0 }}>
                {/* Stage header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "#f8fafc", borderRadius: 8,
                  padding: "10px 14px", marginBottom: 14,
                  border: "1px solid #e8edf2",
                }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#243A5E" }}>{stage.title}</span>
                </div>
                <div className="nl-findings-grid">
                  {stage.findings.map((f) => <FindingItem key={f.id} finding={f} />)}
                </div>
              </div>
            ))}
          </div>

          {/* ── 5. CUSTOMER VOICES ────────────────────────── */}
          <div style={{
            ...sectionCard,
            marginBottom: 20,
            backgroundImage: `linear-gradient(rgba(248,244,255,0.92), rgba(248,244,255,0.92)), url(https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1076601-CustomerStoriesBackground-1600x1268?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1600&hei=1268&qlt=100&fit=constrain)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <p style={SL} className="copilot-text">Customer Voices</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
              {stages.map((stage) => (
                <QuoteBlock key={stage.number} quote={stage.quote} attribution={stage.quoteAttribution} />
              ))}
            </div>
          </div>

          {/* ── 6. ADO PLANNING ───────────────────────────── */}
          <div style={{ ...sectionCard, marginBottom: 24 }}>
            <p style={SL} className="copilot-text">Product Roadmap Record</p>
            <AdoSection items={adoPlanningItems} />
          </div>

          {/* ── 7. RESEARCH TEAM ─────────────────────────── */}
          <div style={sectionCard}>
            <p style={SL} className="copilot-text">Research Team</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, marginTop: 12 }}>
              {[
                { name: "Mansi Pakhale",    title: "Product Manager II",        initials: "MP", color: "#8A50D8" },
                { name: "Ranjith Ravi",     title: "Senior Product Designer",   initials: "RR", color: "#199FD7" },
                { name: "Saugata Pramanik", title: "Product Designer",          initials: "SP", color: "#EE5091" },
                { name: "Gargy Shekhar",    title: "Principal Product Manager", initials: "GS", color: "#FC7942" },
                { name: "Rohan Baruah",     title: "Principal Design Manager",  initials: "RB", color: "#99BD3C" },
              ].map((person) => (
                <div key={person.name} style={{ textAlign: "center", width: 96 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${person.color}, #8A50D8)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: 18, fontWeight: 700, color: "#fff",
                    boxShadow: `0 4px 16px ${person.color}55`,
                  }}>
                    {person.initials}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>{person.name}</p>
                  <p style={{ fontSize: 12, color: "#64748b", margin: "3px 0 0", lineHeight: 1.4 }}>{person.title}</p>
                </div>
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
          <h1 className="font-bold text-white leading-[1.1] tracking-tight mb-2"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Copilot Connector{" "}
            <span className="copilot-text">Research</span>
          </h1>
          <p className="text-white/90 text-lg font-medium mb-1">Admin Experience</p>
          <p className="text-white/55 text-sm mb-8">12 Admin sessions · 8 Companies · Jan &amp; Feb</p>
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

      {/* ── CUSTOMER EXPERIENCE ANALYSIS ────────────────── */}
      <section id="pain-map" className="py-10 sm:py-16"
        style={bgImage(IMG.painMap, "rgba(255,255,255,0.82), rgba(255,255,255,0.82)")}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-3 text-slate-500">Customer Experience Analysis</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
            Where Customers Are Struggling Most
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Pain severity mapped across all 5 stages. Hover each circle for the full finding.
          </p>
          {/* Stage summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 text-left">
            {stages.map((stage) => {
              const hc = stage.findings.filter(f => f.priority === "HIGH").length;
              const mc = stage.findings.filter(f => f.priority === "MEDIUM").length;
              return (
                <div key={stage.number} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {hc > 0 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: "#EE5091", background: "#EE509115", border: "1px solid #EE509130" }}>{hc}H</span>}
                      {mc > 0 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: "#FC7942", background: "#FC794215", border: "1px solid #FC794230" }}>{mc}M</span>}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{stage.title}</p>
                </div>
              );
            })}
          </div>
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
