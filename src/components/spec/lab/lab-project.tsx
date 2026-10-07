import React from "react";
import Link from "next/link";
import type { LabPiece, LabProject } from "@/types/lab";
import { Arrow } from "../sheet";

export function LabProjectFile({ project, pieces }: { project: LabProject; pieces: LabPiece[] }) {
  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] pt-16 pb-24">
      <div className="sheet">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--ink)] py-3 numeral text-xs sm:text-sm">
          <span>
            <Link href="/lab" className="link-ink">Lab</Link> / {project.short_name}
          </span>
          <span>
            {project.pieces_count} notes · {project.documented_period}
          </span>
        </div>
        <h1 className="display mt-6 sm:mt-8 -ml-[0.04em] text-[34vw] md:text-[22vw] 2xl:text-[20rem]">{project.short_name}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 mt-8">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug">{project.one_line_summary}</p>
            <p className="prose-spec mt-6">{project.project_story}</p>
            <p className="prose-spec mt-6">{project.problem_statement}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#notes" className="btn btn-ink">
                Read the notes
              </a>
              <Link href={`/projects/${project.id}`} className="btn btn-line">
                Specification <Arrow />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="label mb-3">Milestones</h2>
            <ol className="border-t-2 border-[var(--ink)]">
              {project.documented_milestones.map((m, i) => (
                <li key={i} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3 border-b border-[var(--rule-soft)]">
                  <span className="numeral text-xs pt-1">{m.date}</span>
                  <span>
                    <span className="block font-bold">{m.label}</span>
                    <span className="block text-[0.9rem] leading-relaxed text-[var(--ink-2)]">{m.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {project.logical_sequence?.length > 0 && (
          <ol className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[var(--on-cobalt)] field-cobalt border-2 border-[var(--cobalt)]">
            {project.logical_sequence.map((s, i) => (
              <li key={i} className="bg-[var(--cobalt)] p-6 flex flex-col gap-2">
                <span className="numeral text-sm text-[var(--on-cobalt-2)]">{(i + 1) * 10}</span>
                <h3 className="font-extrabold condensed uppercase text-[1.3rem] leading-tight">{s.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-[var(--on-cobalt-2)]">{s.desc}</p>
              </li>
            ))}
          </ol>
        )}

        {project.cross_project_connections?.length > 0 && (
          <div className="mt-16 max-w-[80ch]">
            <h2 className="label mb-3">Connections to the other systems</h2>
            <ul className="space-y-3">
              {project.cross_project_connections.map((c, i) => (
                <li key={i} className="grid grid-cols-[1.5rem_1fr] text-[1rem] leading-relaxed text-[var(--ink-2)]">
                  <span aria-hidden="true" className="numeral">→</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <section id="notes" aria-labelledby="notes-h" className="mt-20 scroll-mt-16">
          <h2 id="notes-h" className="display text-[clamp(3rem,9vw,7.5rem)] mb-8">Notes</h2>
          <ol className="border-t-2 border-[var(--ink)]">
            {pieces.map((p) => (
              <li key={p.slug} className="border-b border-[var(--rule-soft)]">
                <Link
                  href={`/lab/${p.project_slug}/${p.slug}`}
                  className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[4rem_1fr_12rem] gap-x-5 gap-y-1 py-5 hover:bg-[var(--paper-2)] transition-colors -mx-[var(--gutter)] px-[var(--gutter)]"
                >
                  <span className="numeral text-sm text-[var(--ink-3)] pt-1">{String(p.order).padStart(3, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-extrabold condensed uppercase text-[1.2rem] leading-tight group-hover:text-[var(--cobalt)] transition-colors">
                      {p.title}
                    </span>
                    <span className="block mt-1 text-[0.925rem] leading-relaxed text-[var(--ink-2)] line-clamp-2">{p.one_line_summary}</span>
                  </span>
                  <span className="label text-[var(--ink-3)] col-start-2 md:col-start-auto md:pt-1.5">{p.content_type_display}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
