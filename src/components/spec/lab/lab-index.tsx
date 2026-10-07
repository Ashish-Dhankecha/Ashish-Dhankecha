"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

export interface IndexRow {
  slug: string;
  order: number;
  title: string;
  project: string;
  project_slug: string;
  category: string;
  type: string;
  date: string | null;
  summary: string;
}

export function LabIndex({
  rows,
  projects,
  categories,
}: {
  rows: IndexRow[];
  projects: { id: string; name: string }[];
  categories: string[];
}) {
  const [project, setProject] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (project === "all" || r.project_slug === project) &&
        (category === "all" || r.category === category) &&
        (!needle || r.title.toLowerCase().includes(needle) || r.summary.toLowerCase().includes(needle))
    );
  }, [rows, project, category, q]);

  const chip = (on: boolean) =>
    `h-9 px-3 border-2 border-[var(--ink)] font-bold condensed uppercase text-[0.875rem] transition-colors ${
      on ? "bg-[var(--ink)] text-[var(--paper)]" : "hover:bg-[var(--paper-2)]"
    }`;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t-2 border-[var(--ink)] pt-6">
        <div className="lg:col-span-5">
          <label htmlFor="lab-q" className="label block mb-2">
            Search titles and summaries
          </label>
          <input
            id="lab-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. llama.cpp, audit, SQLite"
            className="w-full h-12 px-4 bg-transparent border-2 border-[var(--ink)] text-[1rem] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--cobalt)]"
          />
        </div>
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div role="group" aria-label="Filter by project" className="flex flex-wrap gap-2">
            <button type="button" className={chip(project === "all")} aria-pressed={project === "all"} onClick={() => setProject("all")}>
              All projects
            </button>
            {projects.map((p) => (
              <button key={p.id} type="button" className={chip(project === p.id)} aria-pressed={project === p.id} onClick={() => setProject(p.id)}>
                {p.name}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter by kind" className="flex flex-wrap gap-2">
            <button type="button" className={chip(category === "all")} aria-pressed={category === "all"} onClick={() => setCategory("all")}>
              Every kind
            </button>
            {categories.map((c) => (
              <button key={c} type="button" className={chip(category === c)} aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="numeral text-xs text-[var(--ink-3)] mt-6" aria-live="polite">
        {shown.length} of {rows.length} notes
      </p>

      {shown.length === 0 ? (
        <div className="mt-4 border-2 border-[var(--ink)] p-8">
          <p className="font-extrabold condensed uppercase text-[1.4rem]">No note matches that.</p>
          <p className="mt-2 text-[var(--ink-2)]">Clear the search or pick another project or kind.</p>
          <button
            type="button"
            className="btn btn-line mt-5"
            onClick={() => {
              setQ("");
              setProject("all");
              setCategory("all");
            }}
          >
            Show every note
          </button>
        </div>
      ) : (
        <ol className="mt-3 border-t-2 border-[var(--ink)]">
          {shown.map((r) => (
            <li key={r.slug} className="border-b border-[var(--rule-soft)]">
              <Link
                href={`/lab/${r.project_slug}/${r.slug}`}
                className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[4rem_1fr_12rem_7rem] gap-x-5 gap-y-1 py-5 hover:bg-[var(--paper-2)] transition-colors -mx-[var(--gutter)] px-[var(--gutter)]"
              >
                <span className="numeral text-sm text-[var(--ink-3)] pt-1 row-span-2 md:row-span-1">
                  {r.project_slug.slice(0, 1).toUpperCase()}
                  {String(r.order).padStart(3, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-extrabold condensed uppercase text-[1.2rem] leading-tight group-hover:text-[var(--cobalt)] transition-colors">
                    {r.title}
                  </span>
                  <span className="block mt-1 text-[0.925rem] leading-relaxed text-[var(--ink-2)] line-clamp-2 max-w-[80ch]">
                    {r.summary}
                  </span>
                </span>
                <span className="label text-[var(--ink-3)] md:pt-1.5">
                  {r.project} · {r.type}
                </span>
                <span className="numeral text-xs text-[var(--ink-3)] md:pt-1.5 md:text-right">{r.date ?? "undated"}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
