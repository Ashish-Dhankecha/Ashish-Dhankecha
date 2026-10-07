import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getLabMetrics, getAllProjects, getAllLabPieces } from "@/lib/lab";
import { LabIndex } from "@/components/spec/lab/lab-index";
import { Arrow } from "@/components/spec/sheet";

export const metadata: Metadata = {
  title: "The Lab: engineering notes | Ashish Labs",
  description:
    "Engineering notes, decision records, debugging sessions and post-mortems from building ÆON, Leo and Vani. Written while building, not tidied afterwards.",
  alternates: { canonical: "https://ashishdhankecha.com/lab" },
};

export default function LabPage() {
  const metrics = getLabMetrics();
  const projects = getAllProjects();
  const pieces = getAllLabPieces();

  const rows = pieces.map((p) => ({
    slug: p.slug,
    order: p.order,
    title: p.title,
    project: p.project,
    project_slug: p.project_slug,
    category: p.category_group,
    type: p.content_type_display,
    date: p.date && p.date !== "null" ? p.date : null,
    summary: p.one_line_summary,
  }));
  const categories = Object.entries(metrics.by_category)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] pt-16 pb-24">
      <div className="sheet">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--ink)] py-3 numeral text-xs sm:text-sm">
          <span>Ashish Labs / The Lab</span>
          <span>
            {metrics.total_pieces} notes · {metrics.total_projects} projects
          </span>
        </div>
        <div className="[container-type:inline-size] mt-6 sm:mt-8"><h1 className="display -ml-[0.03em] text-[33.5cqw]">The Lab</h1></div>
        <p className="mt-6 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug max-w-[48ch]">
          Notes written while building: decisions and what they cost, debugging sessions, experiments and post-mortems.
          Each one is filed against the system it came from.
        </p>
      </div>

      <div className="sheet mt-14">
        <ul className="grid grid-cols-1 md:grid-cols-3 border-2 border-[var(--ink)]">
          {projects.map((p, i) => (
            <li key={p.id} className={`${i > 0 ? "border-t-2 md:border-t-0 md:border-l-2" : ""} border-[var(--ink)]`}>
              <Link href={`/lab/${p.id}`} className="group flex flex-col gap-3 p-6 h-full hover:bg-[var(--cobalt)] hover:text-[var(--on-cobalt)] transition-colors duration-300">
                <span className="numeral text-xs opacity-80">
                  {p.pieces_count} notes · {p.documented_period}
                </span>
                <span className="display text-[clamp(3.5rem,6vw,5.5rem)]">{p.short_name}</span>
                <span className="text-[0.95rem] leading-relaxed">{p.one_line_summary}</span>
                <span className="mt-auto pt-3 inline-flex items-center gap-2 font-extrabold condensed uppercase">
                  Open the file <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section aria-labelledby="index-h" className="sheet mt-20">
        <h2 id="index-h" className="display text-[clamp(3rem,9vw,7.5rem)] mb-8">Index</h2>
        <LabIndex rows={rows} projects={projects.map((p) => ({ id: p.id, name: p.short_name }))} categories={categories} />
      </section>
    </div>
  );
}
