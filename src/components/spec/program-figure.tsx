import React from "react";

/**
 * FIG. 0: the program. Every project on one time axis, with the single
 * unbroken lineage line Leo → Vani → ÆON, and SIH26117 filed independently.
 * Dates are first and last commits (ÆON still open).
 */

const DAY0 = Date.UTC(2026, 5, 1); // 1 Jun 2026
const SPAN = 140; // days shown
const X0 = 70;
const X1 = 960;
const x = (iso: string) => {
  const d = (Date.parse(iso) - DAY0) / 86_400_000;
  return X0 + (d / SPAN) * (X1 - X0);
};

const BAR_H = 54;

const items = [
  { slug: "leo", name: "LEO", n: 10, from: "2026-06-18", to: "2026-07-10", y: 60, note: "152 commits", kind: "closed" as const },
  { slug: "vani", name: "VANI", n: 20, from: "2026-07-10", to: "2026-07-15", y: 180, note: "4 commits", kind: "closed" as const },
  { slug: "ashi", name: "ÆON", n: 30, from: "2026-07-16", to: "2026-10-07", y: 300, note: "951 commits · open", kind: "open" as const },
  { slug: "sih", name: "SIH26117", n: 40, from: "2026-08-30", to: "2026-09-02", y: 462, note: "16 commits · 1 day", kind: "parallel" as const },
];

const months = [
  { label: "JUN", iso: "2026-06-01" },
  { label: "JUL", iso: "2026-07-01" },
  { label: "AUG", iso: "2026-08-01" },
  { label: "SEP", iso: "2026-09-01" },
  { label: "OCT", iso: "2026-10-01" },
];

export function ProgramFigure({ className = "" }: { className?: string }) {
  const c = "var(--on-cobalt)";
  const leo = items[0];
  const vani = items[1];
  const ashi = items[2];

  // One continuous stroke: through Leo, down into Vani, down into ÆON, onward.
  const lineage = [
    `M ${x(leo.from)} ${leo.y + BAR_H / 2}`,
    `L ${x(leo.to)} ${leo.y + BAR_H / 2}`,
    `C ${x(leo.to) + 30} ${leo.y + BAR_H / 2} ${x(vani.from) - 30} ${vani.y + BAR_H / 2} ${x(vani.from)} ${vani.y + BAR_H / 2}`,
    `L ${x(vani.to)} ${vani.y + BAR_H / 2}`,
    `C ${x(vani.to) + 34} ${vani.y + BAR_H / 2} ${x(ashi.from) - 34} ${ashi.y + BAR_H / 2} ${x(ashi.from)} ${ashi.y + BAR_H / 2}`,
    `L ${X1 + 18} ${ashi.y + BAR_H / 2}`,
  ].join(" ");

  return (
    <svg
      viewBox="0 0 1000 630"
      className={`block w-full h-auto draw-in ${className}`}
      role="group"
      aria-label="FIG. 0: the program. Leo, then Vani, then ÆON on one lineage; SIH26117 built independently."
    >
      <defs>
        <pattern id="p-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={c} strokeWidth="1.6" />
        </pattern>
        <marker id="p-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={c} />
        </marker>
      </defs>

      {/* time axis */}
      <line x1={X0} y1={578} x2={X1} y2={578} stroke={c} strokeWidth="1.6" />
      {months.map((m) => (
        <g key={m.label}>
          <line x1={x(m.iso)} y1={570} x2={x(m.iso)} y2={586} stroke={c} strokeWidth="1.6" />
          <text x={x(m.iso) + 6} y={614} fill={c} fontSize="22" className="numeral">
            {m.label}
          </text>
        </g>
      ))}
      <text x={X1} y={614} fill={c} fontSize="22" textAnchor="end" className="numeral">
        2026
      </text>

      {/* the lineage, one stroke */}
      <path
        d={lineage}
        fill="none"
        stroke={c}
        strokeWidth="3"
        markerEnd="url(#p-arrow)"
        className="lead"
        style={{ strokeDasharray: 2400, strokeDashoffset: 2400, animationDuration: "1.8s" }}
      />

      {items.map((it, i) => {
        const x0 = x(it.from);
        const w = Math.max(x(it.to) - x0, 16);
        const labelX = x0;
        const anchor = "start";
        return (
          <a key={it.slug} href={`/projects/${it.slug}`} aria-label={`${it.name}: open specification`} className="group">
            <rect x={x0} y={it.y} width={w} height={BAR_H} fill="var(--cobalt)" />
            {it.kind === "open" && <rect x={x0} y={it.y} width={w} height={BAR_H} fill="url(#p-hatch)" />}
            <rect
              x={x0}
              y={it.y}
              width={w}
              height={BAR_H}
              fill="none"
              stroke={c}
              strokeWidth="2.4"
              strokeDasharray={it.kind === "parallel" ? "7 5" : undefined}
              className="transition-[stroke-width] duration-200 group-hover:[stroke-width:5]"
            />
            <text
              x={labelX}
              y={it.y - 14}
              textAnchor={anchor}
              fill={c}
              fontSize="50"
              className="display numeral-fade"
              style={{ animationDelay: `${0.25 + i * 0.12}s` }}
            >
              <tspan className="group-hover:underline">{it.name}</tspan>
            </text>
            <text
              x={it.slug === "sih" ? x0 + w : it.kind === "open" ? x0 : x0 + w + 14}
              y={it.slug === "sih" || it.kind === "open" ? it.y + BAR_H + 30 : it.y + BAR_H / 2 + 8}
              textAnchor={it.slug === "sih" ? "end" : "start"}
              fill={c}
              fontSize="21"
              className="numeral numeral-fade"
              style={{ animationDelay: `${0.45 + i * 0.12}s` }}
            >
              {it.n} · {it.note}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
