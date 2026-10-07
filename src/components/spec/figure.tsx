"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { ArchitectureLayer } from "@/types/project-case-study";
import { ArchitectureFigure, STATUS_KEY, numberLayers } from "./figure-draw";

/* ------------------------------------------------------------------ */
/* Interactive plate: drawing + reference list + entry                  */
/* ------------------------------------------------------------------ */

export function FigurePlate({
  layers,
  figLabel = "FIG. 1",
  caption,
}: {
  layers: ArchitectureLayer[];
  figLabel?: string;
  caption: string;
}) {
  const numbered = useMemo(() => numberLayers(layers), [layers]);
  const allParts = useMemo(() => numbered.flatMap((l) => l.parts), [numbered]);
  const [selected, setSelected] = useState<number | null>(allParts[0]?.numeral ?? null);
  const [hovered, setHovered] = useState<number | null>(null);

  const select = useCallback((n: number) => {
    setSelected(n);
    try {
      window.history.replaceState(null, "", `#n-${n}`);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const m = window.location.hash.match(/^#n-(\d+)$/);
    if (m) {
      const n = Number(m[1]);
      if (allParts.some((p) => p.numeral === n)) {
        setSelected(n);
        document.getElementById("fig-detail")?.scrollIntoView({ block: "start" });
      }
    }
  }, [allParts]);

  const part = allParts.find((p) => p.numeral === selected) ?? allParts[0];
  const statusesInUse = Array.from(new Set(allParts.map((p) => p.status)));

  return (
    <div id="fig-detail" className="grid grid-cols-1 xl:grid-cols-12 gap-x-10 gap-y-10">
      <figure className="xl:col-span-7 min-w-0">
        <div className="border-2 border-[var(--ink)] p-3 sm:p-6">
          <ArchitectureFigure
            layers={numbered}
            interactive
            selected={selected}
            hovered={hovered}
            onSelect={select}
            onHover={setHovered}
            title={`${figLabel}: ${caption}`}
          />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <span className="display text-[clamp(2.5rem,6vw,4.5rem)]">{figLabel}</span>
          <span className="text-sm text-[var(--ink-2)] max-w-md">{caption}</span>
        </figcaption>
        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-[var(--rule-soft)] pt-5">
          {statusesInUse.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <svg width="34" height="18" aria-hidden="true" className="shrink-0">
                <defs>
                  <pattern id={`k-${s}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="1.2" />
                  </pattern>
                </defs>
                {s === "VERIFIED" && <rect x="1" y="1" width="32" height="16" fill={`url(#k-${s})`} />}
                {s === "PARTIAL" && <rect x="1" y="1" width="16" height="16" fill={`url(#k-${s})`} />}
                <rect
                  x="1"
                  y="1"
                  width="32"
                  height="16"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                  strokeDasharray={s === "EXPERIMENTAL" ? "5 3" : s === "PLANNED" ? "1.5 3" : undefined}
                />
                {(s === "FAILED" || s === "DEPRECATED") && (
                  <line x1="1" y1="17" x2="33" y2="1" stroke="var(--stamp)" strokeWidth="2" />
                )}
              </svg>
              <dt className="label">{STATUS_KEY[s].label}</dt>
              <dd className="text-xs text-[var(--ink-3)] hidden sm:block">{STATUS_KEY[s].meaning.split(":")[0]}</dd>
            </div>
          ))}
        </dl>
      </figure>

      <div className="xl:col-span-5 min-w-0 flex flex-col gap-8">
        {part && (
          <article
            aria-live="polite"
            className="field-cobalt p-6 sm:p-8 flex flex-col gap-5"
          >
            <header className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="display text-[clamp(2.25rem,4.4vw,3.75rem)] !text-[var(--on-cobalt)] break-words">
                  {part.displayName}
                </h3>
                <p className="numeral text-sm text-[var(--on-cobalt-2)] mt-2">
                  {part.numeral} · in {part.layerNumeral} {part.layerName}
                </p>
              </div>
              <span className="tag border border-[var(--on-cobalt)] px-2 py-1.5 mt-1 shrink-0">
                {STATUS_KEY[part.status].label}
              </span>
            </header>
            <p className="text-[1.0625rem] leading-relaxed">{part.purpose}</p>
            <dl className="grid gap-4 text-[0.95rem] leading-relaxed">
              <div>
                <dt className="label text-[var(--on-cobalt-2)]">How it works</dt>
                <dd className="mt-1">{part.howItWorks}</dd>
              </div>
              <div>
                <dt className="label text-[var(--on-cobalt-2)]">Trade-off</dt>
                <dd className="mt-1">{part.tradeoff}</dd>
              </div>
              {part.path && (
                <div>
                  <dt className="label text-[var(--on-cobalt-2)]">Source</dt>
                  <dd className="mt-1 numeral text-sm break-all">{part.path}</dd>
                </div>
              )}
            </dl>
          </article>
        )}

        <div>
          <h3 className="label mb-3">Reference numerals</h3>
          <ol className="border-t-2 border-[var(--ink)] max-h-[440px] overflow-y-auto">
            {numbered.map((layer) => (
              <li key={layer.numeral}>
                <p className="flex gap-4 py-2 border-b border-[var(--rule-soft)] text-[var(--ink-3)]">
                  <span className="numeral text-sm w-10 shrink-0">{layer.numeral}</span>
                  <span className="label">{layer.name}</span>
                </p>
                <ol>
                  {layer.parts.map((p) => {
                    const on = selected === p.numeral;
                    return (
                      <li key={p.numeral}>
                        <button
                          type="button"
                          onClick={() => select(p.numeral)}
                          onMouseEnter={() => setHovered(p.numeral)}
                          onMouseLeave={() => setHovered(null)}
                          aria-pressed={on}
                          className={`w-full text-left flex items-baseline gap-4 py-2.5 border-b border-[var(--rule-soft)] transition-colors duration-200 ${
                            on ? "bg-[var(--ink)] text-[var(--paper)]" : "hover:bg-[var(--paper-2)]"
                          }`}
                        >
                          <span className="numeral text-sm w-10 shrink-0 pl-0">{p.numeral}</span>
                          <span className="font-semibold text-[0.95rem] min-w-0 truncate">{p.displayName}</span>
                          <span className={`tag ml-auto pr-2 ${on ? "" : "text-[var(--ink-3)]"}`}>
                            {STATUS_KEY[p.status].label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
