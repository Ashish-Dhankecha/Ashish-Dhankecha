"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 bg-[var(--paper)] text-[var(--ink)] pt-16">
      <div className="sheet py-16 sm:py-24">
        <div className="border-t-2 border-[var(--ink)] pt-4 numeral text-sm">500 · this sheet failed to render</div>
        <h1 className="display mt-6 text-[clamp(4rem,14vw,12rem)]">Deficiency</h1>
        <p className="mt-6 text-[1.25rem] leading-snug max-w-[46ch] text-[var(--ink-2)]">
          Something broke while loading this page. Try again; if it keeps failing, the specifications and the Lab still work.
        </p>
        {error.digest && <p className="mt-3 numeral text-xs text-[var(--ink-3)]">Reference {error.digest}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-ink">Try again</button>
          <Link href="/projects" className="btn btn-line">Specifications</Link>
        </div>
      </div>
    </div>
  );
}
