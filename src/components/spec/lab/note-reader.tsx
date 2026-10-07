import React from "react";
import Link from "next/link";
import type { LabPiece } from "@/types/lab";
import { getAdjacentPiecesInProject, getRelatedPieces } from "@/lib/lab";
import { MarkdownRenderer } from "@/components/lab/markdown-renderer";
import { Arrow } from "../sheet";

export function NoteReader({ piece }: { piece: LabPiece }) {
  const { prev, next } = getAdjacentPiecesInProject(piece);
  const { sameProject } = getRelatedPieces(piece, 3);
  const ref = `${piece.project_slug.slice(0, 1).toUpperCase()}${String(piece.order).padStart(3, "0")}`;
  const fail = piece.failure_sequence;
  const date = piece.date && piece.date !== "null" ? piece.date : null;

  return (
    <article className="bg-[var(--paper)] text-[var(--ink)] pt-16 pb-24">
      <div className="sheet">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--ink)] py-3 numeral text-xs sm:text-sm">
          <span>
            <Link href="/lab" className="link-ink">Lab</Link> /{" "}
            <Link href={`/lab/${piece.project_slug}`} className="link-ink">{piece.project}</Link> / {ref} ·{" "}
            <span className="text-[var(--cobalt)]">{piece.content_type_display}</span>
          </span>
          <span>{date ?? "Undated"}</span>
        </div>

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 mt-10">
          <div className="lg:col-span-9">
            <h1 className="display text-[clamp(2.75rem,6.5vw,6rem)] !leading-[0.9]">{piece.title}</h1>
            {piece.one_line_summary && (
              <p className="mt-8 text-[clamp(1.2rem,2vw,1.55rem)] leading-snug max-w-[52ch] text-[var(--ink-2)]">
                {piece.one_line_summary}
              </p>
            )}
          </div>
          <dl className="lg:col-span-3 mt-10 lg:mt-2 border-t-2 border-[var(--ink)] text-sm self-start">
            {(
              [
                ["Reference", ref],
                ["Project", piece.project],
                ["Status", piece.status],
                ["Evidence", piece.evidence_level],
                ["Source", piece.source_file_basename],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 py-2.5 border-b border-[var(--rule-soft)]">
                <dt className="label text-[var(--ink-3)] pt-0.5">{k}</dt>
                <dd className="numeral text-xs break-all pt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 mt-16">
          <div className="lg:col-span-8 lg:col-start-1 min-w-0">
            {piece.sections && piece.sections.length > 0 ? (
              piece.sections.map((s, i) => (
                <section key={i} className="mb-12">
                  {s.title && (
                    <h2 className="font-extrabold condensed uppercase text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight border-t-2 border-[var(--ink)] pt-4 mb-5">
                      {s.title}
                    </h2>
                  )}
                  <MarkdownRenderer content={s.content} />
                </section>
              ))
            ) : (
              <MarkdownRenderer content={piece.raw_body} />
            )}

            {fail && (
              <section aria-label="Failure sequence" className="mt-12 border-2 border-[var(--stamp-ink)]">
                <header className="flex items-center justify-between gap-4 p-5 border-b-2 border-[var(--stamp-ink)]">
                  <h2 className="font-extrabold condensed uppercase text-[1.4rem]">Failure sequence</h2>
                  <span className="stamp">On the record</span>
                </header>
                <dl className="divide-y divide-[var(--rule-soft)]">
                  {(
                    [
                      ["Attempt", fail.attempt],
                      ["Failure", fail.failure],
                      ["Diagnosis", fail.diagnosis],
                      ["Lesson", fail.lesson],
                      ["Next iteration", fail.next_iteration],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 p-5">
                      <dt className="label text-[var(--ink-3)] pt-0.5">{k}</dt>
                      <dd className="text-[0.975rem] leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-10">
              {piece.topics?.length > 0 && (
                <div>
                  <h2 className="label mb-3">Topics</h2>
                  <ul className="flex flex-wrap gap-2">
                    {piece.topics.map((t) => (
                      <li key={t} className="numeral text-xs border border-[var(--ink)] px-2 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {piece.technical_references?.length > 0 && (
                <div>
                  <h2 className="label mb-3">References</h2>
                  <ul className="space-y-2">
                    {piece.technical_references.map((r, i) => (
                      <li key={i} className="numeral text-xs break-all text-[var(--ink-2)]">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sameProject.length > 0 && (
                <div>
                  <h2 className="label mb-3">Read next from {piece.project}</h2>
                  <ul className="border-t-2 border-[var(--ink)]">
                    {sameProject.map((p) => (
                      <li key={p.slug} className="border-b border-[var(--rule-soft)]">
                        <Link href={`/lab/${p.project_slug}/${p.slug}`} className="block py-3 font-bold leading-snug hover:text-[var(--cobalt)] transition-colors">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        <nav aria-label="Adjacent notes" className="mt-20 grid grid-cols-1 md:grid-cols-2 border-2 border-[var(--ink)]">
          <div className="p-5 sm:p-6">
            {prev ? (
              <Link href={`/lab/${prev.project_slug}/${prev.slug}`} className="group block">
                <span className="label text-[var(--ink-3)]">Previous</span>
                <span className="block mt-2 font-extrabold condensed uppercase text-[1.3rem] leading-tight group-hover:text-[var(--cobalt)]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="label text-[var(--ink-3)]">First note in {piece.project}</span>
            )}
          </div>
          <div className="p-5 sm:p-6 border-t-2 md:border-t-0 md:border-l-2 border-[var(--ink)] md:text-right">
            {next ? (
              <Link href={`/lab/${next.project_slug}/${next.slug}`} className="group block">
                <span className="label text-[var(--ink-3)]">Next</span>
                <span className="block mt-2 font-extrabold condensed uppercase text-[1.3rem] leading-tight group-hover:text-[var(--cobalt)]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span className="label text-[var(--ink-3)]">Last note in {piece.project}</span>
            )}
          </div>
        </nav>
        <p className="mt-8">
          <Link href={`/projects/${piece.project_slug}`} className="inline-flex items-center gap-2 font-extrabold condensed uppercase border-b-2 border-[var(--ink)] hover:text-[var(--cobalt)] hover:border-[var(--cobalt)]">
            Open the {piece.project} specification <Arrow />
          </Link>
        </p>
      </div>
    </article>
  );
}
