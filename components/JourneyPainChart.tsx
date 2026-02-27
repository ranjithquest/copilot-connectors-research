"use client";

import { useState } from "react";
import type { ChartDataPoint } from "@/data/research";

// Chart layout constants
const CHART_W = 760;
const CHART_H = 320;
const PAD_LEFT = 75;
const PAD_RIGHT = 35;
const PAD_TOP = 55;
const PAD_BOTTOM = 80;
const PLOT_W = CHART_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_H - PAD_TOP - PAD_BOTTOM;

// Stage X positions (evenly spaced across 5 stages)
const stageX = [0, 0.25, 0.5, 0.75, 1].map(
  (t) => PAD_LEFT + t * PLOT_W
);

// Severity Y positions (score 1-10, higher = worse)
// Y = PAD_TOP + (10 - score) / 9 * PLOT_H
function scoreToY(score: number): number {
  return PAD_TOP + ((10 - score) / 9) * PLOT_H;
}

// HIGH severity scores per stage (from newsletter data)
const highScores = [8, 8, 8, 9.5, 9];
// MEDIUM severity scores per stage
const medScores = [6, 5.5, 5.5, 6, 5];

// Points per stage (offset slightly for readability)
const pointOffsets: Record<number, { dx: number; dy: number }[]> = {
  1: [
    { dx: -16.5, dy: scoreToY(9.5) - scoreToY(8) },
    { dx: -5.5, dy: 0 },
    { dx: 5.5, dy: scoreToY(7.5) - scoreToY(8) },
    { dx: 16.5, dy: scoreToY(6) - scoreToY(8) },
  ],
  2: [
    { dx: -22, dy: scoreToY(9.5) - scoreToY(8) },
    { dx: -11, dy: 0 },
    { dx: 0, dy: scoreToY(7.5) - scoreToY(8) },
    { dx: 11, dy: scoreToY(6.5) - scoreToY(8) },
    { dx: 22, dy: scoreToY(5.5) - scoreToY(8) },
    { dx: 33, dy: scoreToY(5) - scoreToY(8) },
  ],
  3: [
    { dx: -22, dy: scoreToY(9.5) - scoreToY(8) },
    { dx: -11, dy: 0 },
    { dx: 0, dy: scoreToY(7.5) - scoreToY(8) },
    { dx: 11, dy: scoreToY(6) - scoreToY(8) },
    { dx: 22, dy: scoreToY(5.5) - scoreToY(8) },
  ],
  4: [
    { dx: -16.5, dy: scoreToY(10) - scoreToY(9.5) },
    { dx: -5.5, dy: 0 },
    { dx: 5.5, dy: scoreToY(7.5) - scoreToY(9.5) },
    { dx: 16.5, dy: scoreToY(6) - scoreToY(9.5) },
  ],
  5: [
    { dx: -22, dy: scoreToY(10) - scoreToY(9) },
    { dx: -11, dy: 0 },
    { dx: 0, dy: scoreToY(7.5) - scoreToY(9) },
    { dx: 11, dy: scoreToY(7) - scoreToY(9) },
    { dx: 22, dy: scoreToY(5.5) - scoreToY(9) },
  ],
};

const stageLabels = ["Discovery", "Evaluation", "Setup", "Testing", "Maintenance"];

// Assign chart points to their stage positions
function getPointCoords(points: ChartDataPoint[]): Array<ChartDataPoint & { cx: number; cy: number }> {
  const counters: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  return points.map((p) => {
    const idx = counters[p.stage];
    counters[p.stage] = (counters[p.stage] ?? 0) + 1;
    const baseX = stageX[p.stage - 1];
    const baseY = p.severity === "HIGH" ? scoreToY(highScores[p.stage - 1]) : scoreToY(medScores[p.stage - 1]);
    const offsets = pointOffsets[p.stage];
    const off = offsets[idx] ?? { dx: idx * 11, dy: 0 };

    return {
      ...p,
      cx: baseX + off.dx,
      cy: baseY + off.dy,
    };
  });
}

interface JourneyPainChartProps {
  points: ChartDataPoint[];
}

export function JourneyPainChart({ points }: JourneyPainChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const plotted = getPointCoords(points);

  // Build polylines for HIGH and MEDIUM averages
  const highLine = stageX.map((x, i) => `${x},${scoreToY(highScores[i])}`).join(" ");
  const medLine = stageX.map((x, i) => `${x},${scoreToY(medScores[i])}`).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full h-auto"
        style={{ fontFamily: '"Segoe UI", Arial, sans-serif', maxWidth: 760 }}
        aria-label="Journey Pain Severity Chart"
      >
        {/* Title */}
        <text x={CHART_W / 2} y={22} fontSize={13.5} fill="#1E3A5F" textAnchor="middle" fontWeight={700}>
          Customer-Reported Pain Severity Across the Connector Admin Journey
        </text>
        <text x={CHART_W / 2} y={38} fontSize={9} fill="#64748B" textAnchor="middle">
          Each circle = one reported problem · Solid line = HIGH severity avg · Dashed = MEDIUM avg · Hover for description
        </text>

        {/* Background bands */}
        <rect x={PAD_LEFT} y={PAD_TOP} width={PLOT_W} height={PLOT_H * 0.28} fill="rgba(220,38,38,0.08)" rx={3} />
        <rect x={PAD_LEFT} y={PAD_TOP + PLOT_H * 0.28} width={PLOT_W} height={PLOT_H * 0.28} fill="rgba(217,119,6,0.06)" />
        <rect x={PAD_LEFT} y={PAD_TOP + PLOT_H * 0.56} width={PLOT_W} height={PLOT_H * 0.44} fill="rgba(148,163,184,0.04)" />

        {/* Y axis labels */}
        {["HIGH", "MED", "LOW"].map((label, i) => (
          <text key={label} x={PAD_LEFT - 6} y={PAD_TOP + (i * PLOT_H * 0.36) + PLOT_H * 0.14} fontSize={8} fill={i === 0 ? "#DC2626" : i === 1 ? "#D97706" : "#94A3B8"} fontWeight={700} textAnchor="end" dominantBaseline="middle">
            {label}
          </text>
        ))}

        {/* Grid lines */}
        {[10, 9, 8, 7, 6, 5, 4, 3].map((score) => (
          <g key={score}>
            <line x1={PAD_LEFT} y1={scoreToY(score)} x2={CHART_W - PAD_RIGHT} y2={scoreToY(score)} stroke={score % 3 === 1 ? "#94A3B8" : "#E8EDF3"} strokeWidth={score % 3 === 1 ? 1 : 0.5} strokeDasharray={score % 3 === 1 ? "0" : "3,2"} />
            <text x={PAD_LEFT - 6} y={scoreToY(score) + 1} fontSize={8} fill="#94A3B8" textAnchor="end" dominantBaseline="middle">{score}</text>
          </g>
        ))}

        {/* Axes */}
        <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={CHART_H - PAD_BOTTOM} stroke="#94A3B8" strokeWidth={1.5} />
        <line x1={PAD_LEFT} y1={CHART_H - PAD_BOTTOM} x2={CHART_W - PAD_RIGHT} y2={CHART_H - PAD_BOTTOM} stroke="#94A3B8" strokeWidth={1.5} />

        {/* Y axis title */}
        <text transform={`rotate(-90, 22, ${PAD_TOP + PLOT_H / 2})`} x={22} y={PAD_TOP + PLOT_H / 2} fontSize={10} fill="#475569" textAnchor="middle" fontWeight={600}>
          Severity Score
        </text>

        {/* Stage vertical guides */}
        {stageX.map((x, i) => (
          <g key={i}>
            <line x1={x} y1={PAD_TOP} x2={x} y2={CHART_H - PAD_BOTTOM} stroke="#DDE5EE" strokeWidth={1} strokeDasharray="3,3" />
            <text x={x} y={CHART_H - PAD_BOTTOM + 16} fontSize={9.5} fill="#374151" textAnchor="middle" fontWeight={700}>
              {stageLabels[i]}
            </text>
          </g>
        ))}

        {/* HIGH severity area fill */}
        <polygon
          points={`${stageX[0]},${scoreToY(highScores[0])} ${stageX[1]},${scoreToY(highScores[1])} ${stageX[2]},${scoreToY(highScores[2])} ${stageX[3]},${scoreToY(highScores[3])} ${stageX[4]},${scoreToY(highScores[4])} ${stageX[4]},${CHART_H - PAD_BOTTOM} ${stageX[0]},${CHART_H - PAD_BOTTOM}`}
          fill="rgba(220,38,38,0.04)"
        />

        {/* HIGH avg line */}
        <polyline points={highLine} fill="none" stroke="#DC2626" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.75} />
        <text x={CHART_W - PAD_RIGHT + 6} y={scoreToY(highScores[4]) + 3} fontSize={8} fill="#DC2626" fontWeight={700}>avg HIGH</text>

        {/* MEDIUM avg line */}
        <polyline points={medLine} fill="none" stroke="#D97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,3" opacity={0.75} />
        <text x={CHART_W - PAD_RIGHT + 6} y={scoreToY(medScores[4]) + 3} fontSize={8} fill="#D97706" fontWeight={700}>avg MED</text>

        {/* Data points */}
        {plotted.map((p) => {
          const isHigh = p.severity === "HIGH";
          const color = isHigh ? "#DC2626" : "#D97706";
          const isHovered = hoveredId === p.id;
          return (
            <g
              key={p.id}
              onMouseEnter={(e) => {
                setHoveredId(p.id);
                const rect = (e.currentTarget.closest("svg") as SVGSVGElement)?.getBoundingClientRect();
                if (rect) {
                  const svgX = ((p.cx / CHART_W) * rect.width) + rect.left;
                  const svgY = ((p.cy / CHART_H) * rect.height) + rect.top;
                  setTooltip({ x: svgX, y: svgY, text: p.title });
                }
              }}
              onMouseLeave={() => { setHoveredId(null); setTooltip(null); }}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={p.cx}
                cy={p.cy}
                r={isHovered ? 12 : 10}
                fill="white"
                stroke={color}
                strokeWidth={isHovered ? 3 : 2.2}
              />
              <text
                x={p.cx}
                y={p.cy + 3.5}
                fontSize={p.id.length > 2 ? 7.5 : 8.5}
                fill={color}
                textAnchor="middle"
                fontWeight={700}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && hoveredId && (
          <g>
            <rect
              x={Math.min(tooltip.x - PAD_LEFT, CHART_W - 200)}
              y={Math.max(tooltip.y - PAD_TOP - 40, 4)}
              width={180}
              height={36}
              rx={4}
              fill="#1E3A5F"
              opacity={0.95}
            />
            <foreignObject
              x={Math.min(tooltip.x - PAD_LEFT + 6, CHART_W - 196)}
              y={Math.max(tooltip.y - PAD_TOP - 36, 8)}
              width={168}
              height={28}
            >
              <div style={{ fontSize: 10, color: "#e8f0f8", lineHeight: "1.4", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {tooltip.text}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-bold text-red-600 mb-1">● HIGH SEVERITY (H1–H16)</p>
          {plotted.filter(p => p.severity === "HIGH").slice(0, 8).map(p => (
            <p key={p.id} className="text-slate-600 mb-0.5">
              <span className="font-bold text-red-600">{p.id}</span> {p.title.slice(0, 50)}{p.title.length > 50 ? "…" : ""}
            </p>
          ))}
        </div>
        <div>
          <p className="font-bold text-red-600 mb-1">(continued)</p>
          {plotted.filter(p => p.severity === "HIGH").slice(8).map(p => (
            <p key={p.id} className="text-slate-600 mb-0.5">
              <span className="font-bold text-red-600">{p.id}</span> {p.title.slice(0, 50)}{p.title.length > 50 ? "…" : ""}
            </p>
          ))}
          <p className="font-bold text-amber-600 mt-3 mb-1">● MEDIUM SEVERITY (M1–M7)</p>
          {plotted.filter(p => p.severity === "MEDIUM").map(p => (
            <p key={p.id} className="text-slate-600 mb-0.5">
              <span className="font-bold text-amber-600">{p.id}</span> {p.title.slice(0, 50)}{p.title.length > 50 ? "…" : ""}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
