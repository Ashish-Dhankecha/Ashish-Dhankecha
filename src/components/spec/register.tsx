import React from "react";
import Link from "next/link";
import { allProjects } from "@/data/projects";
import { projectSpecs } from "@/data/projects/spec";
import { ArchitectureFigure, numberLayers } from "./figure-draw";
import { Arrow } from "./sheet";

const ORDER = ["aeon", "sih", "vani", "leo"];

export function SpecRegister() {
  const ordered = ORDER.map((s) => allProjects.find((p) => p.slug === s)).filter(
    (p): p is NonNullable<typeof p> => !!p
  );
  return (
    <ol className="border-t-2 border-[var(--ink)]">
      {ordered.map((p) => {
        const spec = projectSpecs[p.slug];
        const layers = numberLayers(p.architecture.layers);
        return (
          <li key={p.slug} className="border-b-2 border-[var(--ink)]">
            <Link
              href={`/projects/${p.slug}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6 py-8 sm:py-10 transition-colors duration-300 hover:bg-[var(--paper-2)] -mx-[var(--gutter)] px-[var(--gutter)]"
            >
              <div className="md:col-span-7 min-w-0">
                <p className="numeral text-xs sm:text-sm flex flex-wrap gap-x-5 gap-y-1 text-[var(--ink-3)]">
                  <span>{spec.specNo}</span>
                  <span>
                    {p.startDate} – {p.endDate}
                  </span>
                  <span className={p.status === "ACTIVE" ? "text-[var(--cobalt)] font-bold" : ""}>
                    {p.status === "ACTIVE"
                      ? "Active"
                      : p.status === "SUPERSEDED"
                        ? "Superseded"
                        : "Complete"}
                  </span>
                </p>
                <h3 className="display mt-3 text-[clamp(4rem,9vw,8.5rem)] group-hover:text-[var(--cobalt)] transition-colors duration-300 break-words">
                  {p.title}
                </h3>
                <p className="mt-4 font-extrabold condensed uppercase text-[1.3rem] leading-tight">
                  {p.subtitle}
                </p>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
                  {spec.claim}
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  {spec.facts.slice(0, 4).map((f) => (
                    <div key={f.label} className="flex flex-col-reverse">
                      <dt className="text-xs uppercase tracking-wide text-[var(--ink-3)] mt-1">
                        {f.label}
                      </dt>
                      <dd className="numeral text-[1.35rem] leading-none">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {(p.slug === "ashi" || p.slug === "aeon") && (
                  <p className="numeral text-xs text-[var(--ink-3)] mt-3">
                    282,092 lines of package Python
                  </p>
                )}
                <span className="mt-7 inline-flex items-center gap-2 font-extrabold condensed uppercase border-b-2 border-[var(--ink)] group-hover:border-[var(--cobalt)] group-hover:text-[var(--cobalt)] transition-colors">
                  Open specification <Arrow />
                </span>
              </div>
              <div className="md:col-span-5 self-center">
                <div className="border-2 border-[var(--ink)] p-4 sm:p-5 group-hover:border-[var(--cobalt)] transition-colors">
                  <ArchitectureFigure layers={layers} compact title={`FIG. 1 of ${p.title}`} />
                </div>
                <p className="numeral text-xs text-[var(--ink-3)] mt-2">
                  FIG. 1 · {layers.length} layers · {layers.reduce((n, l) => n + l.parts.length, 0)}{" "}
                  parts
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
