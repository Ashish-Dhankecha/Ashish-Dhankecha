import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 bg-[var(--paper)] text-[var(--ink)] pt-16">
      <div className="sheet py-16 sm:py-24">
        <div className="border-t-2 border-[var(--ink)] pt-4 numeral text-sm">404 · no such sheet</div>
        <h1 className="display mt-6 text-[clamp(4rem,16vw,14rem)]">Not on file</h1>
        <p className="mt-6 text-[1.25rem] leading-snug max-w-[44ch] text-[var(--ink-2)]">
          This page was moved or never existed. The specifications and the Lab are where everything lives now.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-ink">Specifications</Link>
          <Link href="/lab" className="btn btn-line">The Lab</Link>
        </div>
      </div>
    </div>
  );
}
