export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-3 focus:bg-[var(--cobalt)] focus:text-[var(--on-cobalt)] font-bold uppercase text-sm"
    >
      Skip to content
    </a>
  );
}
