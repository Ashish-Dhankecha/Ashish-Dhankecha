import React from "react";
import Link from "next/link";
import type {
  ProjectCaseStudy,
  ProjectLink,
  VerificationMetric,
} from "@/types/project-case-study";
import type { ProjectSpec } from "@/data/projects/spec";
import { ArchitectureFigure, numberLayers } from "./figure-draw";
import { FigurePlate } from "./figure";
import { Arrow, ArrowDown, Entry, ExternalArrow, SheetSection } from "./sheet";
import { ArrowLeft, ArrowRight, Check, CircleDashed, CornerDownRight, FlaskConical, Minus, Plus, Sparkles, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STATUS_WORD: Record<string, string> = {
  ACTIVE: "Active",
  MAINTAINED: "Maintained",
  EXPERIMENTAL: "Experimental",
  ARCHIVED: "Archived",
  SUPERSEDED: "Superseded",
};

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

function SpecLink({ link, tone = "ink" }: { link: ProjectLink; tone?: "ink" | "paper" }) {
  const external = isExternal(link.url);
  const cls =
    tone === "paper"
      ? "inline-flex items-center gap-2 py-2 border-b border-[var(--on-cobalt)] hover:border-transparent font-semibold"
      : "inline-flex items-center gap-2 py-2 border-b border-[var(--ink)] hover:text-[var(--cobalt)] hover:border-[var(--cobalt)] font-semibold transition-colors";
  if (external) {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <ExternalArrow />
      </a>
    );
  }
  return (
    <Link href={link.url} className={cls}>
      {link.label}
      <Arrow />
    </Link>
  );
}

/* ------------------------------------------------------------------ */

export function ProjectSpecView({
  project,
  spec,
  links,
  previous,
  next,
}: {
  project: ProjectCaseStudy;
  spec: ProjectSpec;
  links: ProjectLink[];
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
}) {
  const numbered = numberLayers(project.architecture.layers);
  const partCount = numbered.reduce((n, l) => n + l.parts.length, 0);
  const title = project.title.toUpperCase();
  const len = Math.max(title.length, 3);

  const sourced = (m: VerificationMetric) => !!spec.evidence[m.label]?.href;
  const claims = project.verification.metrics.filter((m) => m.status === "pass" && sourced(m));
  const examined = project.verification.metrics.filter((m) => m.status !== "pass" && sourced(m));
  const reported = project.verification.metrics.filter((m) => !sourced(m));
  const hasAppendix =
    project.verification.auditResults.length > 0 ||
    !!project.performance ||
    !!project.security;

  const sheets = [
    { id: "abstract", title: "Abstract" },
    { id: "background", title: "Background" },
    { id: "summary", title: "Summary" },
    { id: "description", title: "Description" },
    { id: "embodiment", title: "In operation" },
    { id: "claims", title: "Claims" },
    { id: "decisions", title: "Decisions" },
    { id: "deficiencies", title: "Deficiencies" },
    { id: "history", title: "History" },
    ...(hasAppendix ? [{ id: "measurements", title: "Measurements" }] : []),
    { id: "status", title: "Status" },
    ...(project.codeExploration?.localSnippets.length ? [{ id: "source", title: "Source" }] : []),
  ];
  const N = sheets.length + 1;
  const sheetNo = (id: string) => sheets.findIndex((s) => s.id === id) + 2;

  const primaryNotes = links.find((l) => l.type === "notes") ?? links.find((l) => !isExternal(l.url));
  const repo = links.find((l) => l.type === "github");

  return (
    <article className="bg-[var(--paper)] text-[var(--ink)]">
      {/* ============================ SHEET 1 ============================ */}
      <section aria-labelledby="spec-title" className="relative pt-16">
        <div className="sheet">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--ink)] py-3 numeral text-xs sm:text-sm">
            <span>
              <Link href="/projects" className="link-ink">
                Projects
              </Link>{" "}
              / {spec.specNo}
            </span>
            <span className="hidden sm:inline">
              {project.startDate} – {project.endDate}
            </span>
            <span>
              {STATUS_WORD[project.status]} · SHEET 1 / {N}
            </span>
          </div>
        </div>

        <div className="sheet grid grid-cols-1 lg:grid-cols-12 gap-x-10">
          <div className="lg:col-span-7 pt-8 sm:pt-12 lg:pb-16 flex flex-col">
            <h1
              id="spec-title"
              className="display text-[length:var(--t-m)] lg:text-[length:var(--t-d)] -ml-[0.04em]"
              style={
                {
                  "--t-m": `min(${177 / len}vw, 20rem)`,
                  "--t-d": `min(${106 / len}vw, 15rem)`,
                } as React.CSSProperties
              }
            >
              {title}
            </h1>
            <p className="mt-6 text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.12] font-extrabold condensed uppercase max-w-[22ch]">
              {project.subtitle}
            </p>
            <p className="mt-5 text-[1.125rem] sm:text-[1.25rem] leading-snug text-[var(--ink-2)] max-w-[44ch]">
              {spec.claim}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#abstract" className="btn btn-ink">
                Read the specification
                <ArrowDown />
              </a>
              {primaryNotes && (
                <Link href={primaryNotes.url} className="btn btn-line">
                  Lab notes
                  <Arrow />
                </Link>
              )}
            </div>
            {repo && (
              <p className="mt-5 text-sm text-[var(--ink-3)]">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="link-ink">
                  Source on GitHub
                </a>
                {spec.sourceNote ? <> · {spec.sourceNote}</> : null}
              </p>
            )}
          </div>

          {/* FIG. 1 on a flat cobalt field that runs to the sheet edge */}
          <figure className="lg:col-span-5 mt-10 lg:mt-0 -mx-[var(--gutter)] lg:mx-0 lg:-mr-[var(--gutter)] field-cobalt flex flex-col">
            <div className="p-5 sm:p-8 lg:pt-10 flex-1 flex items-center">
              <ArchitectureFigure
                layers={numbered}
                tone="paper"
                animate
                title={`FIG. 1: ${project.title}, section through the architecture`}
              />
            </div>
            <figcaption className="px-5 sm:px-8 pb-6 flex items-end justify-between gap-4 border-t border-[var(--on-cobalt)] pt-4 mx-5 sm:mx-8 !px-0">
              <span className="display text-[3.25rem] sm:text-[4rem] whitespace-nowrap">FIG. 1</span>
              <span className="text-sm text-[var(--on-cobalt-2)] text-right max-w-[26ch]">
                {numbered.length} layers, {partCount} parts.{" "}
                <a href="#description" className="underline underline-offset-4 text-[var(--on-cobalt)]">
                  Open the numerals
                </a>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Measured facts */}
        <div className="sheet">
          <dl className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-px bg-[var(--rule-soft)] border-y-2 border-[var(--ink)]">
            {spec.facts.map((f) => (
              <div key={f.label} className="bg-[var(--paper)] p-4 flex flex-col-reverse justify-end">
                <dt className="mt-2 text-xs text-[var(--ink-3)] uppercase tracking-wide">{f.label}</dt>
                <dd className="numeral text-[1.5rem] sm:text-[1.75rem] leading-none">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="numeral text-[0.6875rem] text-[var(--ink-3)] mt-2">
            Measured from the repository on {spec.measuredOn} ({spec.method}).
          </p>
        </div>

        {/* Contents */}
        <nav aria-label="Contents of this specification" className="sheet mt-10">
          <ol className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--rule-soft)] pt-4">
            {sheets.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group inline-flex items-baseline gap-2">
                  <span className="numeral text-xs text-[var(--ink-3)]">{sheetNo(s.id)}</span>
                  <span className="font-semibold condensed uppercase group-hover:text-[var(--cobalt)] transition-colors">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* ============================ ABSTRACT ============================ */}
      <SheetSection id="abstract" title="Abstract" sheet={sheetNo("abstract")} of={N}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.35] font-medium max-w-[38ch]">
              {project.summary}
            </p>
            <p className="prose-spec mt-8">{project.tagline}</p>
          </div>
          <dl className="lg:col-span-5 border-t-2 border-[var(--ink)]">
            {(
              [
                ["Type", project.snapshot.type],
                ["Started", project.snapshot.started],
                ["Status", project.snapshot.status],
                ["Language", project.snapshot.primaryLanguage],
                ["Domain", project.snapshot.domain],
                ["Architecture", project.snapshot.architectureStyle],
                ["Scale", project.snapshot.scale],
                ["Verification", project.snapshot.verificationRatio],
              ] as const
            )
              .filter(([, v]) => !!v)
              .map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 border-b border-[var(--rule-soft)]">
                  <dt className="label text-[var(--ink-3)] pt-0.5">{k}</dt>
                  <dd className="text-[0.95rem]">{v}</dd>
                </div>
              ))}
            <div className="py-4">
              <dt className="label text-[var(--ink-3)] mb-3">Materials</dt>
              <dd className="flex flex-wrap gap-2">
                {project.snapshot.stack.map((s) => (
                  <span key={s} className="numeral text-xs border border-[var(--ink)] px-2 py-1">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </SheetSection>

      {/* ============================ BACKGROUND ============================ */}
      <SheetSection id="background" title="Background" sheet={sheetNo("background")} of={N}>
        <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase leading-[1.05] max-w-[30ch]">
          {project.problem.headline}
        </h3>
        <blockquote className="mt-10 border-l-0 pl-0">
          <p className="text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.12] font-semibold max-w-[34ch] text-[var(--cobalt)]">
            “{project.problem.coreQuestion}”
          </p>
        </blockquote>
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <div className="lg:col-span-6 space-y-6 prose-spec">
            <p>{project.problem.whyNotChatbot}</p>
            <p>{project.problem.contextSummary}</p>
          </div>
          <div className="lg:col-span-6">
            <h4 className="label mb-4">Where earlier approaches fall short</h4>
            <ol className="border-t-2 border-[var(--ink)]">
              {project.problem.existingLimitations.map((l, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3 border-b border-[var(--rule-soft)]">
                  <span className="numeral text-sm text-[var(--ink-3)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.975rem] leading-relaxed">{l}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-2 border-[var(--ink)] p-5 sm:p-6">
              <h4 className="label mb-2">Working hypothesis</h4>
              <p className="text-[1.05rem] leading-relaxed">{project.problem.originalHypothesis}</p>
            </div>
          </div>
        </div>
      </SheetSection>

      {/* ============================ SUMMARY ============================ */}
      <SheetSection id="summary" title="Summary" sheet={sheetNo("summary")} of={N}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6">
          <h3 className="lg:col-span-5 text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase leading-[1.05]">
            {project.concept.headline}
          </h3>
          <p className="lg:col-span-7 prose-spec text-[1.15rem]">{project.concept.coreIdea}</p>
        </div>
        <figure className="mt-14">
          <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] border-2 border-[var(--ink)]">
            {project.concept.flowSteps.map((s, i) => (
              <li
                key={i}
                className={`relative p-5 sm:p-6 flex flex-col gap-3 border-[var(--ink)] ${
                  i > 0 ? "border-t-2 md:border-t-0 xl:border-l-2" : ""
                } ${i % 2 === 1 ? "md:border-l-2" : ""} ${i >= 2 ? "md:border-t-2 xl:border-t-0" : ""}`}
              >
                <span className="numeral text-sm">{(i + 1) * 10}</span>
                <h4 className="font-extrabold condensed uppercase text-[1.35rem] leading-tight">{s.title}</h4>
                <p className="text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{s.description}</p>
              </li>
            ))}
          </ol>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
            <span className="display text-[clamp(2.5rem,6vw,4.5rem)]">FIG. 2</span>
            <span className="text-sm text-[var(--ink-2)] max-w-md">
              {project.concept.diagramTitle ?? "The cycle, step by step"}. Steps run 10 → {project.concept.flowSteps.length * 10}.
            </span>
          </figcaption>
        </figure>
      </SheetSection>

      {/* ============================ DESCRIPTION ============================ */}
      <SheetSection id="description" title="Description" sheet={sheetNo("description")} of={N}>
        <p className="prose-spec text-[1.15rem] mb-12">{project.architecture.overview}</p>
        <FigurePlate
          layers={project.architecture.layers}
          figLabel="FIG. 1A"
          caption={`${project.title} enlarged. Select any numeral to read the part it labels; every numeral has its own link.`}
        />
      </SheetSection>

      {/* ============================ EMBODIMENT ============================ */}
      <SheetSection id="embodiment" title="In operation" sheet={sheetNo("embodiment")} of={N}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6 mb-12">
          <h3 className="lg:col-span-5 text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase leading-[1.05]">
            {project.executionFlow.title}
          </h3>
          <p className="lg:col-span-7 prose-spec">{project.executionFlow.description}</p>
        </div>
        <div className="field-cobalt p-6 sm:p-10">
          <p className="label text-[var(--on-cobalt-2)]">Input · illustrative, not a captured log</p>
          <p className="mt-2 text-[clamp(1.25rem,2.6vw,2rem)] leading-snug font-semibold max-w-[48ch]">
            {project.executionFlow.concreteExample.input}
          </p>
        </div>
        <ol className="border-x-2 border-b-2 border-[var(--ink)]">
          {project.executionFlow.concreteExample.steps.map((s, i) => (
            <li
              key={i}
              className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_14rem_1fr_1fr] gap-x-6 gap-y-2 p-5 sm:p-6 border-t border-[var(--rule-soft)] first:border-t-0"
            >
              <span className="numeral text-sm pt-1 row-span-3 md:row-span-1">{(i + 1) * 10}</span>
              <div>
                <p className="font-extrabold condensed uppercase leading-tight">{s.phase.replace(/^\d+\.\s*/, "")}</p>
                <p className="numeral text-xs text-[var(--ink-3)] mt-1">{s.subsystem}</p>
              </div>
              <p className="text-[0.95rem] leading-relaxed">{s.action}</p>
              <p className="text-[0.875rem] leading-relaxed text-[var(--ink-3)]">
                <span className="label mr-2 text-[var(--ink-3)]">State</span>
                {s.stateChange}
              </p>
            </li>
          ))}
        </ol>
        <div className="border-x-2 border-b-2 border-[var(--ink)] p-6 sm:p-10 bg-[var(--ink)] text-[var(--paper)]">
          <p className="label opacity-75">Output</p>
          <p className="mt-2 text-[1.15rem] sm:text-[1.35rem] leading-snug max-w-[60ch]">
            {project.executionFlow.concreteExample.output}
          </p>
        </div>
      </SheetSection>

      {/* ============================ CLAIMS ============================ */}
      <SheetSection id="claims" title="Claims" sheet={sheetNo("claims")} of={N}>
        <p className="prose-spec mb-12">{project.verification.headline}</p>
        <ol>
          {claims.map((m, i) => (
            <ClaimRow key={m.label} metric={m} n={i + 1} evidence={spec.evidence[m.label]} />
          ))}
        </ol>
        {examined.length > 0 && (
          <div className="mt-16">
            <h3 className="font-extrabold condensed uppercase text-[1.4rem] leading-tight mb-4">Open findings, on the record</h3>
            <ol>
              {examined.map((m, i) => (
                <ClaimRow key={m.label} metric={m} n={claims.length + i + 1} evidence={spec.evidence[m.label]} />
              ))}
            </ol>
          </div>
        )}
        {reported.length > 0 && (
          <div className="mt-16">
            <h3 className="font-extrabold condensed uppercase text-[1.4rem] leading-tight">Reported, not re-measured</h3>
            <p className="mt-2 text-[0.95rem] text-[var(--ink-3)] max-w-[60ch]">
              These figures come from the project&apos;s own records. They are not claimed here because there is no public note to check them against yet.
            </p>
            <dl className="mt-5 border-t-2 border-[var(--ink)]">
              {reported.map((m) => (
                <div key={m.label} className="grid grid-cols-1 md:grid-cols-[16rem_10rem_1fr] gap-x-6 gap-y-1 py-4 border-b border-[var(--rule-soft)]">
                  <dt className="font-bold">{m.label}</dt>
                  <dd className="numeral">{m.value}</dd>
                  <dd className="text-[0.925rem] leading-relaxed text-[var(--ink-2)]">
                    {m.context} <span className="text-[var(--ink-3)]">Source: {spec.evidence[m.label]?.source ?? "project record"}.</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Entry label="Test suite">{project.verification.testSuiteSummary}</Entry>
          <Entry label="Method">{project.verification.methodology}</Entry>
        </div>
      </SheetSection>

      {/* ============================ DECISIONS ============================ */}
      <SheetSection id="decisions" title="Decisions" sheet={sheetNo("decisions")} of={N}>
        <div className="space-y-20">
          {project.engineeringDecisions.map((d) => (
            <article key={d.id} id={`adr-${d.id}`} className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
              <header className="lg:col-span-4">
                <p className="numeral text-sm text-[var(--ink-3)]">{d.adrNumber ?? "Decision"}</p>
                <h3 className="mt-2 text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold condensed uppercase leading-[1.05]">
                  {d.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{d.context}</p>
              </header>
              <div className="lg:col-span-8 min-w-0">
                <div className="overflow-x-auto border-2 border-[var(--ink)]">
                  <table className="w-full min-w-[560px] text-left text-[0.9rem]">
                    <thead>
                      <tr className="border-b-2 border-[var(--ink)]">
                        <th scope="col" className="label p-3 w-[30%]">Option</th>
                        <th scope="col" className="label p-3">For</th>
                        <th scope="col" className="label p-3">Against</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.optionsConsidered.map((o, i) => (
                        <tr key={i} className="border-t border-[var(--rule-soft)] align-top">
                          <th scope="row" className="p-3 font-bold">{o.option}</th>
                          <td className="p-3 text-[var(--ink-2)]">{o.pros}</td>
                          <td className="p-3 text-[var(--ink-2)]">{o.cons}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 field-cobalt p-5 sm:p-6">
                  <p className="label text-[var(--on-cobalt-2)]">Chosen</p>
                  <p className="mt-1 text-[1.1rem] font-semibold leading-snug">{d.choice}</p>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Entry label="Why">{d.why}</Entry>
                  <Entry label="Cost accepted">{d.tradeoff}</Entry>
                </div>
                {d.evidencePath && (
                  <p className="mt-6 numeral text-xs text-[var(--ink-3)] break-all">Evidence: {d.evidencePath}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </SheetSection>

      {/* ============================ DEFICIENCIES ============================ */}
      <SheetSection
        id="deficiencies"
        title="Deficiencies"
        sheet={sheetNo("deficiencies")}
        of={N}
        aside={<span className="stamp">Shown in full</span>}
      >
        <p className="prose-spec mb-12">
          What broke, why, and what changed because of it. These stay on the record next to everything that worked.
        </p>
        <div className="space-y-6">
          {project.failuresAndLessons.map((f, i) => (
            <article key={i} className="border-2 border-[var(--stamp-ink)]">
              <header className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 border-b-2 border-[var(--stamp-ink)]">
                <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] font-extrabold condensed uppercase leading-[1.05] max-w-[36ch]">
                  {f.title}
                </h3>
                <span className="stamp">{f.badge ?? `Deficiency ${i + 1}`}</span>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[var(--rule-soft)]">
                {(
                  [
                    ["Failure", f.failure],
                    ["Root cause", f.rootCause],
                    ["First attempt", f.attemptedFix],
                    ["Fix that held", f.finalFix],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="bg-[var(--paper)] p-5 sm:p-6">
                    <h4 className="label text-[var(--ink-3)] mb-2">{k}</h4>
                    <p className="text-[0.95rem] leading-relaxed">{v}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 sm:p-6 border-t-2 border-[var(--stamp-ink)] flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                <h4 className="label text-[var(--stamp-ink)] shrink-0">Lesson</h4>
                <p className="text-[1.1rem] font-semibold leading-snug">{f.lesson}</p>
              </div>
              {f.verifiedEvidence && (
                <p className="px-5 sm:px-6 pb-5 numeral text-xs text-[var(--ink-3)] break-words">
                  Evidence: {f.verifiedEvidence}
                </p>
              )}
            </article>
          ))}
        </div>

        {project.hardProblems.length > 0 && (
          <div className="mt-20">
            <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase mb-8">Hard problems</h3>
            <div className="border-t-2 border-[var(--ink)]">
              {project.hardProblems.map((h, i) => (
                <details key={i} className="group border-b border-[var(--rule-soft)]">
                  <summary className="cursor-pointer list-none flex items-baseline gap-5 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="numeral text-sm text-[var(--ink-3)] w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-extrabold condensed uppercase text-[1.25rem] leading-tight group-hover:text-[var(--cobalt)] transition-colors">
                      {h.title}
                    </span>
                    <Plus aria-hidden="true" className="ml-auto shrink-0 w-5 h-5 transition-transform duration-300 group-open:rotate-45" strokeWidth={2.5} />
                  </summary>
                  <div className="pb-8 pl-0 sm:pl-13 grid grid-cols-1 md:grid-cols-2 gap-8 sm:ml-[3.25rem]">
                    <Entry label="Why it is hard">{h.whyDifficult}</Entry>
                    <Entry label="First approach">{h.initialApproach}</Entry>
                    <Entry label="What failed">{h.whatFailed}</Entry>
                    <Entry label="Final approach">{h.finalApproach}</Entry>
                    <Entry label="Where it stands" className="md:col-span-2">{h.currentState}</Entry>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </SheetSection>

      {/* ============================ HISTORY ============================ */}
      <SheetSection id="history" title="History" sheet={sheetNo("history")} of={N}>
        <ol className="border-t-2 border-[var(--ink)]">
          {project.timeline.map((t, i) => (
            <li key={i} className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-3 py-8 border-b border-[var(--rule-soft)]">
              <div className="md:col-span-3">
                <p className="numeral text-sm">{t.date}</p>
                <p className="text-sm text-[var(--ink-3)] mt-1">
                  {t.phase} ·{" "}
                  <span className={t.status === "PIVOT" ? "text-[var(--stamp-ink)] font-bold" : ""}>{t.status.toLowerCase()}</span>
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-[1.35rem] font-extrabold condensed uppercase leading-tight">{t.title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-[var(--ink-2)] max-w-[70ch]">{t.whatChanged}</p>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Entry label="Why">{t.why}</Entry>
                  <Entry label="How">{t.implementation}</Entry>
                  <Entry label="Result">{t.result}</Entry>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </SheetSection>

      {/* ============================ MEASUREMENTS ============================ */}
      {hasAppendix && (
        <SheetSection id="measurements" title="Measurements" sheet={sheetNo("measurements")} of={N}>
          {project.verification.auditResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {project.verification.auditResults.map((a, i) => (
                <article key={i} className="border-2 border-[var(--ink)] p-5 sm:p-6">
                  <h3 className={`leading-tight ${/\d/.test(a.scoreOrVerdict) ? "numeral text-[1.6rem]" : "display text-[2.25rem]"}`}>{a.scoreOrVerdict}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-3)]">{a.auditName}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{a.details}</p>
                  {a.uncoveredFlaws && a.uncoveredFlaws.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-[var(--rule-soft)] pt-4">
                      {a.uncoveredFlaws.map((u, j) => (
                        <li key={j} className="text-[0.9rem] leading-relaxed flex gap-3">
                          <X aria-hidden="true" className="w-4 h-4 mt-1 shrink-0 text-[var(--stamp-ink)]" strokeWidth={2.5} />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          )}

          {project.performance && (
            <div className="mb-16">
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase mb-3">Performance</h3>
              <p className="prose-spec mb-2">{project.performance.summary}</p>
              <p className="text-sm text-[var(--ink-3)] mb-6">Reported in the project&apos;s soak and benchmark records; not re-measured for this page.</p>
              <div className="overflow-x-auto border-2 border-[var(--ink)]">
                <table className="w-full min-w-[640px] text-left text-[0.9rem]">
                  <thead>
                    <tr className="border-b-2 border-[var(--ink)]">
                      <th scope="col" className="label p-3">Metric</th>
                      <th scope="col" className="label p-3">Before</th>
                      <th scope="col" className="label p-3">After</th>
                      <th scope="col" className="label p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.performance.benchmarks.map((b, i) => (
                      <tr key={i} className="border-t border-[var(--rule-soft)] align-top">
                        <th scope="row" className="p-3 font-bold">{b.metric}</th>
                        <td className="p-3 numeral">{b.before} {b.unit}</td>
                        <td className="p-3 numeral font-bold">{b.after} {b.unit}</td>
                        <td className="p-3 text-[var(--ink-2)]">{b.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {project.performance.resourceFootprint && (
                <div className="mt-6 overflow-x-auto border-2 border-[var(--ink)]">
                  <table className="w-full min-w-[640px] text-left text-[0.9rem]">
                    <thead>
                      <tr className="border-b-2 border-[var(--ink)]">
                        <th scope="col" className="label p-3">Component</th>
                        <th scope="col" className="label p-3">Memory</th>
                        <th scope="col" className="label p-3">CPU / latency</th>
                        <th scope="col" className="label p-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.performance.resourceFootprint.map((r, i) => (
                        <tr key={i} className="border-t border-[var(--rule-soft)] align-top">
                          <th scope="row" className="p-3 font-bold">{r.component}</th>
                          <td className="p-3 numeral">{r.memory}</td>
                          <td className="p-3 numeral">{r.cpuOrLatency}</td>
                          <td className="p-3 text-[var(--ink-2)]">{r.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {project.security && (
            <div>
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase mb-3">Safeguards</h3>
              <p className="prose-spec mb-8">{project.security.threatModel}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-[var(--ink)] p-5 sm:p-6">
                  <h4 className="label mb-3">Allowed</h4>
                  <ul className="space-y-2">
                    {project.security.accessControls.allowed.map((a, i) => (
                      <li key={i} className="text-[0.95rem] leading-relaxed flex gap-3">
                        <Check aria-hidden="true" className="w-4 h-4 mt-1 shrink-0" strokeWidth={2.5} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-2 border-[var(--stamp-ink)] p-5 sm:p-6">
                  <h4 className="label mb-3 text-[var(--stamp-ink)]">Refused</h4>
                  <ul className="space-y-2">
                    {project.security.accessControls.disallowed.map((a, i) => (
                      <li key={i} className="text-[0.95rem] leading-relaxed flex gap-3">
                        <X aria-hidden="true" className="w-4 h-4 mt-1 shrink-0 text-[var(--stamp-ink)]" strokeWidth={2.5} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Entry label="Sandbox" className="mt-8 max-w-[70ch]">{project.security.sandboxingMechanism}</Entry>
            </div>
          )}
        </SheetSection>
      )}

      {/* ============================ STATUS ============================ */}
      <SheetSection id="status" title="Status" sheet={sheetNo("status")} of={N}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <div className="lg:col-span-5">
            <p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-medium">{project.currentState.summary}</p>
            <p className="mt-8 text-[var(--ink-3)] text-[0.95rem] leading-relaxed">{project.next.statusNotice}</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatusList label="Works today" items={project.currentState.whatWorks} icon={Check} />
            <StatusList label="Incomplete" items={project.currentState.whatIsIncomplete} icon={Minus} />
            <StatusList label="Remaining" items={project.currentState.whatRemains} icon={CircleDashed} />
            <StatusList label="I would change today" items={project.currentState.whatIWouldChangeToday} icon={CornerDownRight} />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase mb-6">Next</h3>
          <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-t-2 border-[var(--ink)]">
            {project.next.items.map((it, i) => (
              <li key={i} className="py-5 pr-6 border-b border-[var(--rule-soft)]">
                <h4 className="font-extrabold condensed uppercase text-[1.15rem] leading-tight">{it.title}</h4>
                <p className="tag text-[var(--ink-3)] mt-1.5">{it.type.replace(/_/g, " ").toLowerCase()}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{it.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
          <div className="lg:col-span-5">
            <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase">{project.research.title}</h3>
            <p className="mt-4 prose-spec">{project.research.existingEngineering}</p>
            {project.research.unimplementedClaimsNotes && (
              <p className="mt-6 text-[0.9rem] leading-relaxed border-2 border-[var(--ink)] p-4">
                <span className="label block mb-1">Not yet built</span>
                {project.research.unimplementedClaimsNotes}
              </p>
            )}
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatusList label="Directions under study" items={project.research.experimentalDirections} icon={FlaskConical} />
            <StatusList label="Possible contributions" items={project.research.potentialContributions} icon={Sparkles} />
          </div>
        </div>

        <figure className="mt-20 field-cobalt p-6 sm:p-12">
          <blockquote>
            <p className="display text-[clamp(2.25rem,5.5vw,5rem)] !leading-[0.95] max-w-[20ch]">“{project.lessons.quote}”</p>
          </blockquote>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6 border-t border-[var(--on-cobalt)] pt-6">
            {project.lessons.takeaways.map((t, i) => (
              <li key={i}>
                <h4 className="font-extrabold condensed uppercase text-[1.1rem]">{t.title}</h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--on-cobalt-2)]">{t.insight}</p>
              </li>
            ))}
          </ol>
        </figure>
      </SheetSection>

      {/* ============================ SOURCE ============================ */}
      {project.codeExploration && project.codeExploration.localSnippets.length > 0 && (
        <SheetSection id="source" title="Source" sheet={sheetNo("source")} of={N}>
          <div className="space-y-14">
            {project.codeExploration.localSnippets.map((c, i) => (
              <figure key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-5">
                <figcaption className="lg:col-span-4">
                  <h3 className="font-extrabold condensed uppercase text-[1.35rem] leading-tight">{c.title}</h3>
                  <p className="numeral text-xs text-[var(--ink-3)] mt-2 break-all">{c.filename}</p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{c.explanation}</p>
                </figcaption>
                <pre className="lg:col-span-8 bg-[var(--ink)] text-[var(--paper)] p-5 sm:p-6 text-[0.8125rem] leading-relaxed overflow-x-auto numeral">
                  <code>{c.code}</code>
                </pre>
              </figure>
            ))}
          </div>
        </SheetSection>
      )}

      {/* ============================ PRIOR ART & CLOSE ============================ */}
      <section aria-labelledby="close-h" className="field-cobalt">
        <div className="sheet py-16 sm:py-24">
          <div className="border-t-2 border-[var(--on-cobalt)] pt-4 flex flex-wrap justify-between gap-4">
            <h2 id="close-h" className="display text-[clamp(3rem,9vw,7.5rem)] !text-[var(--on-cobalt)]">
              Prior art
            </h2>
            <span className="numeral text-sm pt-2 opacity-80">SHEET {N} / {N}</span>
          </div>
          <p className="mt-8 text-[clamp(1.2rem,2vw,1.6rem)] leading-snug max-w-[50ch]">{project.lineage.roleInEvolution}</p>

          <LineageStrip current={project.slug} />
          {(project.lineage.predecessor || project.lineage.successor) && (
            <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-[110ch]">
              {project.lineage.predecessor && (
                <div>
                  <dt className="font-extrabold condensed uppercase text-[1.15rem]">
                    Cites {project.lineage.predecessor.name}
                  </dt>
                  <dd className="mt-1 text-[1rem] leading-relaxed text-[var(--on-cobalt-2)]">{project.lineage.predecessor.relationship}</dd>
                </div>
              )}
              {project.lineage.successor && (
                <div>
                  <dt className="font-extrabold condensed uppercase text-[1.15rem]">
                    Cited by {project.lineage.successor.name}
                  </dt>
                  <dd className="mt-1 text-[1rem] leading-relaxed text-[var(--on-cobalt-2)]">{project.lineage.successor.relationship}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-14 flex flex-wrap items-center gap-3">
            {primaryNotes && (
              <Link href={primaryNotes.url} className="btn btn-paper">
                Read the lab notes
                <Arrow />
              </Link>
            )}
            <Link href="/#contact" className="btn btn-on-cobalt">
              Write to Ashish
              <Arrow />
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            {links.map((l) => (
              <li key={l.url + l.label}>
                <SpecLink link={l} tone="paper" />
              </li>
            ))}
          </ul>

          <nav aria-label="Other specifications" className="mt-16 grid grid-cols-2 border-t-2 border-[var(--on-cobalt)] pt-5">
            <div>
              {previous && (
                <Link href={`/projects/${previous.slug}`} className="group inline-flex flex-col" aria-label={`Previous specification: ${previous.title}`}>
                  <span className="display text-[clamp(2rem,5vw,3.5rem)] group-hover:underline underline-offset-8 decoration-2">
                    <ArrowLeft aria-hidden="true" className="inline w-[0.7em] h-[0.7em] mr-2 align-[-0.02em]" strokeWidth={3} />
                    {previous.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col items-end" aria-label={`Next specification: ${next.title}`}>
                  <span className="display text-[clamp(2rem,5vw,3.5rem)] group-hover:underline underline-offset-8 decoration-2">
                    {next.title}
                    <ArrowRight aria-hidden="true" className="inline w-[0.7em] h-[0.7em] ml-2 align-[-0.02em]" strokeWidth={3} />
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </section>
    </article>
  );
}

function ClaimRow({
  metric,
  n,
  evidence,
}: {
  metric: VerificationMetric;
  n: number;
  evidence?: { source: string; href?: string };
}) {
  const failed = metric.status === "fail";
  const audit = metric.status !== "pass" && !failed;
  return (
    <li
      id={`claim-${n}`}
      className="scroll-mt-20 grid grid-cols-[3.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-x-6 gap-y-3 py-7 border-t-2 border-[var(--ink)] last:border-b-2"
    >
      <a
        href={`#claim-${n}`}
        className="display text-[clamp(3rem,6vw,5rem)] !leading-[0.8] hover:text-[var(--cobalt)] transition-colors"
        aria-label={`Link to claim ${n}`}
      >
        {n}.
      </a>
      <div className="min-w-0 max-w-[72ch]">
        <h4 className="font-extrabold condensed uppercase text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.1]">
          {metric.label}:{" "}
          <span className={`numeral normal-case [font-stretch:100%] font-medium ${failed ? "text-[var(--stamp-ink)]" : "text-[var(--cobalt)]"}`}>
            {metric.value}
          </span>
          {failed && <span className="stamp ml-3 align-middle">Failed</span>}
          {audit && <span className="stamp ml-3 align-middle !border-[var(--ink)] !text-[var(--ink)]">Under audit</span>}
        </h4>
        <p className="mt-3 text-[1rem] leading-relaxed text-[var(--ink-2)]">{metric.context}</p>
        {evidence?.href && (
          <Link
            href={evidence.href}
            className="mt-4 inline-flex items-center gap-2 font-bold border-b-2 border-[var(--ink)] hover:text-[var(--cobalt)] hover:border-[var(--cobalt)] transition-colors"
          >
            Evidence: {evidence.source}
            <Arrow />
          </Link>
        )}
      </div>
    </li>
  );
}

const LINE = [
  { slug: "leo", name: "Leo" },
  { slug: "vani", name: "Vani" },
  { slug: "ashi", name: "ÆON" },
];

/** The one continuous lineage line, Leo → Vani → ÆON, with SIH26117 filed apart. */
function LineageStrip({ current }: { current: string }) {
  const onLine = LINE.some((l) => l.slug === current);
  return (
    <div className="mt-12">
      <ol className="relative grid grid-cols-3 gap-4 sm:gap-10" aria-label="Lineage: Leo, then Vani, then ÆON">
        <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-[var(--on-cobalt)]" />
        {LINE.map((l) => {
          const here = l.slug === current;
          return (
            <li key={l.slug} className="relative">
              <Link
                href={`/projects/${l.slug}`}
                aria-current={here ? "page" : undefined}
                className={`block border-2 border-[var(--on-cobalt)] px-3 sm:px-6 py-4 sm:py-6 text-center transition-colors duration-300 ${
                  here ? "bg-[var(--on-cobalt)] text-[var(--cobalt)]" : "bg-[var(--cobalt)] hover:bg-[var(--on-cobalt)] hover:text-[var(--cobalt)]"
                }`}
              >
                <span className="display text-[clamp(2.25rem,7vw,5.5rem)] block">{l.name}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm text-[var(--on-cobalt-2)]">
        {onLine
          ? "Each system cites the one before it as prior art."
          : "SIH26117 was built apart from this line, in a single hackathon day, with no predecessor of its own."}
      </p>
    </div>
  );
}

function StatusList({ label, items, icon: Icon }: { label: string; items: string[]; icon: LucideIcon }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="label mb-3 pb-2 border-b-2 border-[var(--ink)]">{label}</h4>
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-2 text-[0.95rem] leading-relaxed">
            <Icon aria-hidden="true" className="w-4 h-4 mt-1 text-[var(--ink-3)]" strokeWidth={2.25} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
