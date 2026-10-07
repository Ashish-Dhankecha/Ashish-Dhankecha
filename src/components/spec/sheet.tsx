import React from "react";

/**
 * A sheet of the specification: a full-width rule, the heading set large on
 * the left, and the sheet position noted at the right edge of the frame.
 */
export function SheetSection({
  id,
  title,
  sheet,
  of,
  aside,
  children,
  tone = "paper",
  className = "",
}: {
  id: string;
  title: string;
  sheet?: number;
  of?: number;
  aside?: React.ReactNode;
  children: React.ReactNode;
  tone?: "paper" | "cobalt" | "ink";
  className?: string;
}) {
  const toneClass =
    tone === "cobalt"
      ? "field-cobalt"
      : tone === "ink"
        ? "bg-[var(--ink)] text-[var(--paper)]"
        : "";
  const ruleColor =
    tone === "paper" ? "border-[var(--ink)]" : tone === "cobalt" ? "border-[var(--on-cobalt)]" : "border-[var(--paper)]";
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-16 ${toneClass} ${className}`}>
      <div className="sheet pt-14 sm:pt-20 pb-16 sm:pb-24">
        <header className={`border-t-2 ${ruleColor} pt-4 mb-10 sm:mb-14 flex flex-wrap items-start justify-between gap-x-8 gap-y-3`}>
          <h2
            id={`${id}-h`}
            className={`display text-[clamp(3rem,9vw,7.5rem)] ${tone !== "paper" ? "!text-current" : ""}`}
          >
            {title}
          </h2>
          <div className="flex flex-col items-end gap-2 pt-2">
            {sheet !== undefined && of !== undefined && (
              <span className="numeral text-xs sm:text-sm opacity-80">
                SHEET {sheet} / {of}
              </span>
            )}
            {aside}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

/** A labelled block of running text inside a sheet. */
export function Entry({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="label text-[var(--ink-3)] mb-2">{label}</h4>
      <div className="text-[1rem] leading-relaxed text-[var(--ink-2)]">{children}</div>
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={className}>
      <path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className={className}>
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}
