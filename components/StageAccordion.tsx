"use client";

import { useState } from "react";
import type { Stage } from "@/data/research";
import { FindingItem } from "./FindingItem";
import { QuoteBlock } from "./QuoteBlock";

// One Copilot color per stage (cycling through the palette)
const stageColors = ["#199FD7", "#8A50D8", "#EE5091", "#FC7942", "#99BD3C"];
const stageGradients = [
  "linear-gradient(135deg, #199FD7, #8A50D8)",
  "linear-gradient(135deg, #8A50D8, #EE5091)",
  "linear-gradient(135deg, #EE5091, #FC7942)",
  "linear-gradient(135deg, #FC7942, #99BD3C)",
  "linear-gradient(135deg, #99BD3C, #199FD7)",
];

interface StageAccordionProps {
  stages: Stage[];
}

function StageRow({ stage, isOpen, onToggle }: { stage: Stage; isOpen: boolean; onToggle: () => void }) {
  const highCount = stage.findings.filter((f) => f.priority === "HIGH").length;
  const medCount  = stage.findings.filter((f) => f.priority === "MEDIUM").length;
  const color    = stageColors[stage.number - 1];
  const gradient = stageGradients[stage.number - 1];

  return (
    <div
      className="rounded-2xl overflow-hidden mb-3 last:mb-0 transition-all duration-300"
      style={{
        background: "white",
        boxShadow: isOpen ? "0 8px 32px rgba(0,0,0,0.1)" : "0 2px 12px rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Gradient top strip (Copilot-color per stage) */}
      <div className="h-0.5" style={{ background: gradient }} />

      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-slate-50/70 transition-colors"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ background: gradient }}
        >
          {stage.number}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p className="eyebrow mb-0.5 text-slate-400">
            {stage.subtitle}
          </p>
          <p className="text-base font-bold text-slate-900 truncate">{stage.title}</p>
        </div>

        {/* Count chips */}
        <div className="shrink-0 hidden sm:flex items-center gap-2 mr-2">
          {highCount > 0 && (
            <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(238,80,145,0.1)", color: "#EE5091" }}>
              {highCount} HIGH
            </span>
          )}
          {medCount > 0 && (
            <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(252,121,66,0.1)", color: "#D96030" }}>
              {medCount} MED
            </span>
          )}
        </div>

        {/* Chevron */}
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-slate-100">
          <div className="pt-4 sm:pt-5">
            {stage.findings.map((f) => <FindingItem key={f.id} finding={f} />)}
            <QuoteBlock quote={stage.quote} attribution={stage.quoteAttribution} />
          </div>
        </div>
      )}
    </div>
  );
}

export function StageAccordion({ stages }: StageAccordionProps) {
  const [openStage, setOpenStage] = useState<number | null>(1);
  return (
    <div>
      {stages.map((stage) => (
        <StageRow
          key={stage.number}
          stage={stage}
          isOpen={openStage === stage.number}
          onToggle={() => setOpenStage(openStage === stage.number ? null : stage.number)}
        />
      ))}
    </div>
  );
}
