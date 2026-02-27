"use client";

import { useState } from "react";
import type { ChartDataPoint } from "@/data/research";

// Chart layout constants
const CHART_W = 920;
const CHART_H = 450;
const PAD_LEFT = 82;
const PAD_RIGHT = 100;
const PAD_TOP = 82;
const PAD_BOTTOM = 92;
const PLOT_W = CHART_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_H - PAD_TOP - PAD_BOTTOM;

// Stage X positions (evenly spaced across 5 stages)
const stageX = [0, 0.25, 0.5, 0.75, 1].map(
  (t) => PAD_LEFT + t * PLOT_W
);

// Severity Y positions (score 1-10, higher = worse)
function scoreToY(score: number): number {
  return PAD_TOP + ((10 - score) / 9) * PLOT_H;
}

// HIGH severity scores per stage
const highScores = [8, 8, 8, 9.5, 9];
// MEDIUM severity scores per stage
const medScores = [6, 5.5, 5.5, 6, 5];

// Copilot stage brand colors
const stageColors = ["#199FD7", "#8A50D8", "#EE5091", "#FC7942", "#99BD3C"];

// Points per stage (offset slightly for readability)
const pointOffsets: Record<number, { dx: number; dy: number }[]> = {
  1: [
    { dx: -20, dy: scoreToY(9.5) - scoreToY(8) },
    { dx: -7,  dy: 0 },
    { dx:  7,  dy: scoreToY(7.5) - scoreToY(8) },
    { dx:  20, dy: scoreToY(6) - scoreToY(8) },
  ],
  2: [
    { dx: -28, dy: scoreToY(9.5) - scoreToY(8) },
    { dx: -14, dy: 0 },
    { dx:   0, dy: scoreToY(7.5) - scoreToY(8) },
    { dx:  14, dy: scoreToY(6.5) - scoreToY(8) },
    { dx:  28, dy: scoreToY(5.5) - scoreToY(8) },
    { dx:  42, dy: scoreToY(5) - scoreToY(8) },
  ],
  3: [
    { dx: -28, dy: scoreToY(9.5) - scoreToY(8) },
    { dx: -14, dy: 0 },
    { dx:   0, dy: scoreToY(7.5) - scoreToY(8) },
    { dx:  14, dy: scoreToY(6) - scoreToY(8) },
    { dx:  28, dy: scoreToY(5.5) - scoreToY(8) },
  ],
  4: [
    { dx: -20, dy: scoreToY(10) - scoreToY(9.5) },
    { dx:  -7, dy: 0 },
    { dx:   7, dy: scoreToY(7.5) - scoreToY(9.5) },
    { dx:  20, dy: scoreToY(6) - scoreToY(9.5) },
  ],
  5: [
    { dx: -28, dy: scoreToY(10) - scoreToY(9) },
    { dx: -14, dy: 0 },
    { dx:   0, dy: scoreToY(7.5) - scoreToY(9) },
    { dx:  14, dy: scoreToY(7) - scoreToY(9) },
    { dx:  28, dy: scoreToY(5.5) - scoreToY(9) },
  ],
};

const stageLabels = ["Discovery", "Evaluation", "Setup", "Testing", "Maintenance"];

function getPointCoords(points: ChartDataPoint[]): Array<ChartDataPoint & { cx: number; cy: number }> {
  const counters: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  return points.map((p) => {
    const idx = counters[p.stage];
    counters[p.stage] = (counters[p.stage] ?? 0) + 1;
    const baseX = stageX[p.stage - 1];
    const baseY = p.severity === "HIGH" ? scoreToY(highScores[p.stage - 1]) : scoreToY(medScores[p.stage - 1]);
    const offsets = pointOffsets[p.stage];
    const off = offsets[idx] ?? { dx: idx * 14, dy: 0 };
    return { ...p, cx: baseX + off.dx, cy: baseY + off.dy };
  });
}

// Simple word-wrap for tooltip title
function wrapText(text: string, maxLen: number): [string, string] {
  if (text.length <= maxLen) return [text, ""];
  const cut = text.lastIndexOf(" ", maxLen);
  if (cut < 1) return [text.slice(0, maxLen), text.slice(maxLen)];
  return [text.slice(0, cut), text.slice(cut + 1)];
}

interface JourneyPainChartProps {
  points: ChartDataPoint[];
}

export function JourneyPainChart({ points }: JourneyPainChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const plotted = getPointCoords(points);
  const hoveredPoint = plotted.find((p) => p.id === hoveredId) ?? null;

  const highLine = stageX.map((x, i) => `${x},${scoreToY(highScores[i])}`).join(" ");
  const medLine  = stageX.map((x, i) => `${x},${scoreToY(medScores[i])}`).join(" ");

  const TIP_W = 240;
  const TIP_H = 52;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full h-auto"
        style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}
        aria-label="Journey Pain Severity Chart"
      >
        {/* Title + subtitle */}
        <text x={CHART_W / 2} y={24} fontSize={16} fill="#1E3A5F" textAnchor="middle" fontWeight={700}>
          Customer friction in admin journey
        </text>
        <text x={CHART_W / 2} y={43} fontSize={12} fill="#64748B" textAnchor="middle">
          Each circle = one reported problem · Solid line = HIGH avg · Dashed = MEDIUM avg · Hover for details
        </text>

        {/* Alternating column bands */}
        {stageX.map((x, i) => {
          const x1 = i === 0 ? PAD_LEFT : (stageX[i - 1] + x) / 2;
          const x2 = i === 4 ? CHART_W - PAD_RIGHT : (x + stageX[i + 1]) / 2;
          return (
            <rect key={i} x={x1} y={PAD_TOP} width={x2 - x1} height={PLOT_H}
              fill={i % 2 === 0 ? "rgba(241,245,249,0.55)" : "transparent"}
            />
          );
        })}

        {/* Severity background bands */}
        <rect x={PAD_LEFT} y={PAD_TOP}                      width={PLOT_W} height={PLOT_H * 0.28} fill="rgba(238,80,145,0.05)" />
        <rect x={PAD_LEFT} y={PAD_TOP + PLOT_H * 0.28}      width={PLOT_W} height={PLOT_H * 0.28} fill="rgba(252,121,66,0.04)" />
        <rect x={PAD_LEFT} y={PAD_TOP + PLOT_H * 0.56}      width={PLOT_W} height={PLOT_H * 0.44} fill="rgba(148,163,184,0.03)" />

        {/* Severity band labels (right side) */}
        <text x={CHART_W - PAD_RIGHT + 10} y={PAD_TOP + PLOT_H * 0.14}   fontSize={9} fill="#EE5091" fontWeight={700} dominantBaseline="middle">HIGH</text>
        <text x={CHART_W - PAD_RIGHT + 10} y={PAD_TOP + PLOT_H * 0.42}   fontSize={9} fill="#FC7942" fontWeight={700} dominantBaseline="middle">MED</text>
        <text x={CHART_W - PAD_RIGHT + 10} y={PAD_TOP + PLOT_H * 0.78}   fontSize={9} fill="#94A3B8" fontWeight={700} dominantBaseline="middle">LOW</text>

        {/* Grid lines + numeric labels */}
        {[10, 9, 8, 7, 6, 5, 4, 3].map((score) => (
          <g key={score}>
            <line
              x1={PAD_LEFT} y1={scoreToY(score)}
              x2={CHART_W - PAD_RIGHT} y2={scoreToY(score)}
              stroke={score % 2 === 0 ? "#E2E8F0" : "#F0F3F7"}
              strokeWidth={score % 2 === 0 ? 0.8 : 0.4}
              strokeDasharray={score % 2 === 0 ? "4,3" : "2,4"}
            />
            <text x={PAD_LEFT - 8} y={scoreToY(score) + 1} fontSize={8.5} fill="#94A3B8" textAnchor="end" dominantBaseline="middle">
              {score}
            </text>
          </g>
        ))}

        {/* Axes */}
        <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={CHART_H - PAD_BOTTOM} stroke="#CBD5E1" strokeWidth={1.5} />
        <line x1={PAD_LEFT} y1={CHART_H - PAD_BOTTOM} x2={CHART_W - PAD_RIGHT} y2={CHART_H - PAD_BOTTOM} stroke="#CBD5E1" strokeWidth={1.5} />

        {/* Y-axis title */}
        <text
          transform={`rotate(-90, 18, ${PAD_TOP + PLOT_H / 2})`}
          x={18} y={PAD_TOP + PLOT_H / 2}
          fontSize={10} fill="#64748B" textAnchor="middle" fontWeight={600}
        >
          Pain Severity
        </text>

        {/* Stage vertical guides + labels */}
        {stageX.map((x, i) => (
          <g key={i}>
            <line
              x1={x} y1={PAD_TOP} x2={x} y2={CHART_H - PAD_BOTTOM}
              stroke={stageColors[i]} strokeWidth={1} strokeDasharray="4,4" opacity={0.35}
            />
            <text x={x} y={CHART_H - PAD_BOTTOM + 18} fontSize={11.5} fill="#1e293b" textAnchor="middle" fontWeight={700}>
              {stageLabels[i]}
            </text>
            <text x={x} y={CHART_H - PAD_BOTTOM + 34} fontSize={9.5} fill={stageColors[i]} textAnchor="middle" fontWeight={600}>
              Stage {i + 1}
            </text>
          </g>
        ))}

        {/* HIGH area fill */}
        <polygon
          points={`${stageX[0]},${scoreToY(highScores[0])} ${stageX[1]},${scoreToY(highScores[1])} ${stageX[2]},${scoreToY(highScores[2])} ${stageX[3]},${scoreToY(highScores[3])} ${stageX[4]},${scoreToY(highScores[4])} ${stageX[4]},${CHART_H - PAD_BOTTOM} ${stageX[0]},${CHART_H - PAD_BOTTOM}`}
          fill="rgba(238,80,145,0.04)"
        />

        {/* HIGH avg line */}
        <polyline points={highLine} fill="none" stroke="#EE5091" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.72} />

        {/* MEDIUM avg line */}
        <polyline points={medLine} fill="none" stroke="#FC7942" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6,3" opacity={0.72} />

        {/* Data points */}
        {plotted.map((p) => {
          const isHigh   = p.severity === "HIGH";
          const color    = isHigh ? "#EE5091" : "#FC7942";
          const isHovered = hoveredId === p.id;
          return (
            <g
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: "pointer" }}
            >
              {isHovered && (
                <circle cx={p.cx} cy={p.cy} r={22} fill={color} opacity={0.09} />
              )}
              <circle
                cx={p.cx} cy={p.cy}
                r={isHovered ? 14 : 11}
                fill="white"
                stroke={color}
                strokeWidth={isHovered ? 2.5 : 2}
                style={{ filter: isHovered ? `drop-shadow(0 2px 8px ${color}55)` : undefined }}
              />
              <text
                x={p.cx} y={p.cy + 4}
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

        {/* SVG-native tooltip */}
        {hoveredPoint && (() => {
          const [line1, line2] = wrapText(hoveredPoint.title, 38);
          const tipH = line2 ? TIP_H : TIP_H - 14;
          const tx = Math.min(Math.max(hoveredPoint.cx - TIP_W / 2, PAD_LEFT + 4), CHART_W - PAD_RIGHT - TIP_W - 4);
          const ty = hoveredPoint.cy > PAD_TOP + PLOT_H * 0.55
            ? hoveredPoint.cy - tipH - 16
            : hoveredPoint.cy + 18;
          return (
            <g style={{ pointerEvents: "none" }}>
              <rect x={tx} y={ty} width={TIP_W} height={tipH} rx={7} fill="#1E293B" opacity={0.94} />
              <text x={tx + 12} y={ty + 17} fontSize={10.5} fill="#F8FAFC" fontWeight={600}>{line1}</text>
              {line2 && (
                <text x={tx + 12} y={ty + 33} fontSize={10} fill="#94A3B8">{line2}</text>
              )}
            </g>
          );
        })()}
      </svg>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5 text-xs px-1">
        <div>
          <p className="font-bold mb-1.5" style={{ color: "#EE5091" }}>● HIGH SEVERITY (H1–H16)</p>
          {plotted.filter((p) => p.severity === "HIGH").slice(0, 8).map((p) => (
            <p key={p.id} className="text-slate-500 mb-0.5 leading-snug">
              <span className="font-bold" style={{ color: "#EE5091" }}>{p.id}</span>{" "}
              {p.title.slice(0, 55)}{p.title.length > 55 ? "…" : ""}
            </p>
          ))}
        </div>
        <div>
          <p className="font-bold mb-1.5" style={{ color: "#EE5091" }}>— continued</p>
          {plotted.filter((p) => p.severity === "HIGH").slice(8).map((p) => (
            <p key={p.id} className="text-slate-500 mb-0.5 leading-snug">
              <span className="font-bold" style={{ color: "#EE5091" }}>{p.id}</span>{" "}
              {p.title.slice(0, 55)}{p.title.length > 55 ? "…" : ""}
            </p>
          ))}
          <p className="font-bold mt-3 mb-1.5" style={{ color: "#FC7942" }}>● MEDIUM SEVERITY (M1–M7)</p>
          {plotted.filter((p) => p.severity === "MEDIUM").map((p) => (
            <p key={p.id} className="text-slate-500 mb-0.5 leading-snug">
              <span className="font-bold" style={{ color: "#FC7942" }}>{p.id}</span>{" "}
              {p.title.slice(0, 55)}{p.title.length > 55 ? "…" : ""}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
