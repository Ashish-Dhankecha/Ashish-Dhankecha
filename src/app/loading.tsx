export default function Loading() {
  return (
    <div className="flex-1 bg-[var(--paper)] pt-16" aria-busy="true" aria-label="Loading">
      <div className="sheet py-16">
        <div className="border-t-2 border-[var(--ink)] pt-4 numeral text-sm text-[var(--ink-3)]">Fetching sheet…</div>
        <div className="mt-8 h-24 sm:h-40 w-2/3 bg-[var(--paper-2)]" />
        <div className="mt-6 h-5 w-full max-w-xl bg-[var(--paper-2)]" />
        <div className="mt-3 h-5 w-5/6 max-w-lg bg-[var(--paper-2)]" />
      </div>
    </div>
  );
}
