import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLabMetrics } from "@/lib/lab";
import { fields, inventor, longTermGoal, materials, method, recordOfWork } from "@/content/home";
import { SpecRegister } from "./register";
import { ProgramFigure } from "./program-figure";
import { Arrow, ArrowDown, SheetSection } from "./sheet";

const N = 7;

export function HomeSpec() {
  const lab = getLabMetrics();

  const ticker = [
    "951 commits on ÆON",
    "282,092 lines of package Python",
    "6,458 test functions",
    "200 decision records",
    "281 violations found and published",
    `${lab.total_pieces} lab notes`,
    "0 external network calls in SIH26117",
    "32.8 s → 5.4 s turn latency",
    "3/10 on the first behavioural audit, published",
  ];

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)]">
      {/* ============================ SHEET 1 ============================ */}
      <section aria-labelledby="home-title" className="pt-16">
        <div className="sheet">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--ink)] py-3 numeral text-xs sm:text-sm">
            <span>Ashish Labs / Register of specifications</span>
            <span className="hidden sm:inline">Facts measured 7 Oct 2026</span>
            <span>SHEET 1 / {N}</span>
          </div>
          <div className="[container-type:inline-size] mt-6 sm:mt-8">
            <h1 id="home-title" className="display -ml-[0.03em] text-[21.6cqw] md:text-[13.45cqw]">
              <span className="block md:inline">Ashish</span>{" "}
              <span className="block md:inline">Dhankecha</span>
            </h1>
          </div>
        </div>

        <div className="sheet grid grid-cols-1 lg:grid-cols-12 gap-x-10 mt-8 lg:mt-10">
          <div className="lg:col-span-5 flex flex-col pb-10 lg:pb-0 md:grid md:grid-cols-2 md:gap-x-10 lg:flex">
            <p className="text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.08] font-extrabold condensed uppercase max-w-[20ch] md:row-span-2 lg:row-auto">
              {inventor.claim}
            </p>
            <div>
              <p className="mt-5 md:mt-0 lg:mt-5 text-[1.1rem] leading-snug text-[var(--ink-2)] max-w-[40ch]">
                {inventor.role[0].toUpperCase() + inventor.role.slice(1)}. {inventor.education}.
                Four systems on file, every failure included.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#register" className="btn btn-ink">
                  Read the specifications
                  <ArrowDown />
                </a>
                <a href="#correspondence" className="btn btn-line">
                  Write to me
                </a>
              </div>
            </div>
            <dl className="mt-10 md:col-span-2 lg:mt-auto grid grid-cols-3 border-t-2 border-[var(--ink)]">
              {(
                [
                  ["4", "systems on file"],
                  ["1,123", "commits across them"],
                  [String(lab.total_pieces), "lab notes"],
                ] as const
              ).map(([v, l], i) => (
                <div
                  key={l}
                  className={`pt-4 pb-1 ${i > 0 ? "pl-4 border-l border-[var(--rule-soft)]" : "pr-4"}`}
                >
                  <dd className="numeral text-[clamp(1.5rem,2.2vw,2rem)] leading-none">{v}</dd>
                  <dt className="mt-2 text-xs uppercase tracking-wide text-[var(--ink-3)]">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <figure className="lg:col-span-7 -mx-[var(--gutter)] lg:mx-0 lg:-mr-[var(--gutter)] field-cobalt">
            <div className="p-5 sm:p-8 pb-2 sm:pb-3">
              <ProgramFigure />
            </div>
            <figcaption className="mx-5 sm:mx-8 border-t border-[var(--on-cobalt)] py-4 flex items-end justify-between gap-4">
              <span className="display text-[3.25rem] sm:text-[4rem] whitespace-nowrap">
                FIG. 0
              </span>
              <span className="text-sm text-[var(--on-cobalt-2)] text-right max-w-[30ch]">
                The program, first commit to last. One line runs Leo → Vani → ÆON. Select a bar to
                open its specification.
              </span>
            </figcaption>
          </figure>
        </div>

        {/* measured facts, running */}
        <div
          className="bg-[var(--ink)] text-[var(--paper)] overflow-hidden border-y-2 border-[var(--ink)]"
          aria-label="Measured facts"
        >
          <ul className="ticker py-3">
            {[...ticker, ...ticker].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= ticker.length}
                className="flex items-center whitespace-nowrap"
              >
                <span className="font-extrabold condensed uppercase text-[1.05rem] px-6">{t}</span>
                <span aria-hidden="true" className="numeral opacity-60">
                  /
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ REGISTER ============================ */}
      <SheetSection id="register" title="Specifications" sheet={2} of={N}>
        <SpecRegister />
        <p className="mt-8">
          <Link href="/projects" className="link-ink font-semibold">
            All specifications on one sheet
          </Link>
        </p>
      </SheetSection>

      {/* ============================ INVENTOR ============================ */}
      <SheetSection id="inventor" title="Inventor" sheet={3} of={N}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <figure className="lg:col-span-5 group">
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-[var(--ink)] bg-[var(--paper-2)]">
              <Image
                src="/images/ashish-inventor.jpg"
                alt="Ashish Dhankecha standing on a cable-stayed bridge, in a black sweater and sunglasses"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[50%_35%] grayscale contrast-[1.1] transition-[filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:contrast-100"
                priority
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
              <span className="display text-[2.5rem]">FIG. 3</span>
              <span className="text-sm text-[var(--ink-3)]">{inventor.name}</span>
            </figcaption>
          </figure>
          <div className="lg:col-span-7 lg:pt-2">
            <div className="space-y-5 max-w-[62ch]">
              {inventor.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[clamp(1.3rem,2vw,1.7rem)] leading-snug font-medium"
                      : "prose-spec"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="display mt-10 text-[clamp(2.6rem,6vw,5.5rem)] text-[var(--cobalt)] max-w-[14ch]">
              {inventor.motto}
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase mb-6">
            Record of work
          </h3>
          <ol className="border-t-2 border-[var(--ink)]">
            {recordOfWork.map((r) => {
              const body = (
                <>
                  <p className="md:col-span-3 numeral text-sm pt-1">{r.period}</p>
                  <div className="md:col-span-9">
                    <h4 className="font-extrabold condensed uppercase text-[1.6rem] leading-tight">
                      {r.title}
                      <span className="text-[var(--ink-3)] font-bold text-[1.1rem] normal-case tracking-normal [font-stretch:100%] ml-3">
                        {r.subtitle}
                      </span>
                    </h4>
                    <p className="mt-3 text-[1rem] leading-relaxed text-[var(--ink-2)] max-w-[70ch]">
                      {r.summary}
                    </p>
                    <p className="mt-3 font-semibold">{r.takeaway}</p>
                  </div>
                </>
              );
              return (
                <li key={r.title} className="border-b border-[var(--rule-soft)]">
                  {r.href ? (
                    <Link
                      href={r.href}
                      className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 hover:bg-[var(--paper-2)] transition-colors -mx-[var(--gutter)] px-[var(--gutter)]"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </SheetSection>

      {/* ============================ FIELDS ============================ */}
      <SheetSection id="fields" title="Field" sheet={4} of={N} tone="cobalt">
        <p className="text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.1] font-extrabold condensed uppercase max-w-[30ch]">
          {longTermGoal}
        </p>
        <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-[var(--on-cobalt)] border-2 border-[var(--on-cobalt)]">
          {fields.map((f, i) => (
            <li
              key={f.title}
              className="bg-[var(--cobalt)] p-6 sm:p-7 flex flex-col gap-3 min-h-[13rem]"
            >
              <span className="numeral text-sm text-[var(--on-cobalt-2)]">{(i + 1) * 10}</span>
              <h3 className="display text-[clamp(2.75rem,4.5vw,4rem)] !text-[var(--on-cobalt)]">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--on-cobalt-2)]">{f.subtitle}</p>
              <p className="mt-auto text-[1.05rem] leading-snug">{f.line}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-[var(--on-cobalt-2)] max-w-[60ch]">
          Read in order: each field rests on the one before it.
        </p>
      </SheetSection>

      {/* ============================ METHOD ============================ */}
      <SheetSection id="method" title="Method" sheet={5} of={N}>
        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 border-2 border-[var(--ink)]">
          {method.map((m, i) => (
            <li
              key={m.title}
              className={`relative p-5 sm:p-6 flex flex-col gap-3 border-[var(--ink)] ${i > 0 ? "border-t-2 md:border-t-0" : ""} ${
                i % 2 === 1 ? "md:border-l-2" : ""
              } ${i >= 2 ? "md:border-t-2 xl:border-t-0" : ""} ${i > 0 ? "xl:border-l-2" : ""}`}
            >
              <span className="numeral text-sm">{(i + 1) * 10}</span>
              <h3 className="display text-[clamp(2.25rem,2vw,2.75rem)] xl:text-[clamp(1.75rem,2vw,2.5rem)] break-words">
                {m.title}
              </h3>
              <p className="font-bold leading-snug">{m.line}</p>
              <p className="text-[0.925rem] leading-relaxed text-[var(--ink-2)]">{m.detail}</p>
            </li>
          ))}
        </ol>
        <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
          <span className="display text-[clamp(2.5rem,6vw,4.5rem)]">FIG. 5</span>
          <span className="text-sm text-[var(--ink-2)] max-w-md">
            The loop every system here went through: once step 60 is done, the work returns to step
            10.
          </span>
        </figcaption>

        <div className="mt-20">
          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold condensed uppercase mb-6">
            Materials
          </h3>
          <dl className="border-t-2 border-[var(--ink)]">
            {materials.map((m) => (
              <div
                key={m.category}
                className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-3 py-4 border-b border-[var(--rule-soft)]"
              >
                <dt className="md:col-span-3 label pt-1">{m.category}</dt>
                <dd className="md:col-span-9 flex flex-wrap gap-2">
                  {m.items.map((it) => (
                    <span key={it} className="numeral text-xs border border-[var(--ink)] px-2 py-1">
                      {it}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </SheetSection>

      {/* ============================ LAB ============================ */}
      <SheetSection id="lab" title="The Lab" sheet={6} of={N} tone="ink">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <div className="lg:col-span-5">
            <p className="text-[clamp(1.3rem,2.2vw,1.8rem)] leading-snug">
              {lab.total_pieces} notes written while building: decisions, debugging sessions,
              post-mortems and experiments. Nothing is tidied up after the fact.
            </p>
            <Link href="/lab" className="btn btn-paper mt-8">
              Open the Lab
              <Arrow />
            </Link>
          </div>
          <dl className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:rgb(128_128_128/0.4)] border border-[color:rgb(128_128_128/0.4)]">
            {Object.entries(lab.by_category)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <div
                  key={k}
                  className="bg-[var(--ink)] p-5 flex flex-col-reverse justify-end gap-2"
                >
                  <dt className="label opacity-80">{k}</dt>
                  <dd className="numeral text-[2rem] leading-none">{v}</dd>
                </div>
              ))}
            <div className="bg-[var(--paper)] text-[var(--ink)] p-5 flex flex-col-reverse justify-end gap-2">
              <dt className="label">All notes</dt>
              <dd className="numeral text-[2rem] leading-none">{lab.total_pieces}</dd>
            </div>
          </dl>
        </div>
      </SheetSection>

      {/* ============================ CORRESPONDENCE ============================ */}
      <section
        id="correspondence"
        aria-labelledby="correspondence-h"
        className="field-cobalt scroll-mt-16"
      >
        <div className="sheet py-16 sm:py-24">
          <div className="border-t-2 border-[var(--on-cobalt)] pt-4 flex flex-wrap justify-between gap-4">
            <h2
              id="correspondence-h"
              className="display text-[clamp(3rem,9vw,7.5rem)] !text-[var(--on-cobalt)]"
            >
              Correspondence
            </h2>
            <span className="numeral text-sm pt-2 opacity-80">
              SHEET {N} / {N}
            </span>
          </div>
          <p className="mt-8 text-[clamp(1.2rem,2vw,1.6rem)] leading-snug max-w-[46ch]">
            Roles, internships, research, or building something together.
          </p>
          <div className="[container-type:inline-size] mt-10">
            <a
              href="mailto:ashishdhankecha256@gmail.com"
              aria-label="Email ashishdhankecha256@gmail.com"
              className="group display block text-[11.4cqw] !leading-[0.86]"
            >
              <span className="block">ashishdhankecha256</span>
              <span className="flex items-end justify-between gap-6">
                <span>@gmail.com</span>
                <span className="mb-[0.12em] inline-flex items-center justify-center w-[0.75em] h-[0.75em] border-[0.06em] border-current transition-colors group-hover:bg-[var(--on-cobalt)] group-hover:text-[var(--cobalt)]">
                  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" aria-hidden="true">
                    <path
                      d="M7 17L17 7M9 7h8v8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </span>
            </a>
          </div>
          <ul className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--on-cobalt)] border-2 border-[var(--on-cobalt)]">
            {[
              { t: "GitHub", h: "https://github.com/Ashish-Dhankecha", d: "Ashish-Dhankecha" },
              {
                t: "LinkedIn",
                h: "https://www.linkedin.com/in/ashish-dhankecha-a993703a5/",
                d: "Ashish Dhankecha",
              },
              { t: "X", h: "https://x.com/Ashishdhankecha", d: "@Ashishdhankecha" },
            ].map((l) => (
              <li key={l.t} className="bg-[var(--cobalt)]">
                <a
                  href={l.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-5 sm:p-6 h-full hover:bg-[var(--on-cobalt)] hover:text-[var(--cobalt)] transition-colors duration-300"
                >
                  <span>
                    <span className="display text-[2.5rem] block">{l.t}</span>
                    <span className="numeral text-xs opacity-80 block mt-1">{l.d}</span>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
