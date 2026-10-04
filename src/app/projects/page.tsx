import { Metadata } from "next";
import Link from "next/link";
import { allProjects } from "@/data/projects";
import { BuildEvolutionGraph } from "@/components/projects/build-evolution-graph";

export const metadata: Metadata = {
  title: "Systems & Technical Case Studies | Ashish Labs",
  description:
    "Deep technical case studies, architectural blueprints, empirical failure post-mortems, and system evolutions engineered by Ashish Dhankecha.",
  alternates: {
    canonical: "https://ashishlabs.com/projects",
  },
};

export default function ProjectsIndexPage() {
  const flagship = allProjects.find((p) => p.isFlagship);
  const otherProjects = allProjects.filter((p) => !p.isFlagship);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="section-container space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              CASE STUDY ARCHIVE // TECHNICAL SYSTEMS DOSSIER
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--ink)] font-sans tracking-tight">
            Systems I&apos;ve Built
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] font-body leading-relaxed">
            I don&apos;t treat projects as static portfolio cards. Each system below is documented with
            exhaustive architectural diagrams, empirical invariant tests, failure post-mortems, and real engineering trade-offs.
          </p>
        </div>

        {/* Flagship System Feature */}
        {flagship && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-brass)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-brass)] shadow-[0_0_10px_var(--accent-glow-strong)]" />
              <span className="font-semibold uppercase tracking-wider">
                FLAGSHIP COGNITIVE SYSTEM // ACTIVE LONG-TERM BUILD
              </span>
            </div>

            <div className="brutal-card p-6 sm:p-8 lg:p-10 rounded-sm border-[var(--border-strong)] relative overflow-hidden bg-[var(--panel)] shadow-xl">
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] blur-2xl opacity-60"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {flagship.startDate} — {flagship.endDate}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-sans tracking-tight mt-1">
                      {flagship.title}
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--accent-brass)] font-sans font-medium mt-1">
                      {flagship.subtitle}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-sm shrink-0 font-medium">
                    ● {flagship.statusLabel}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl">
                  {flagship.summary}
                </p>

                {/* Key Metrics Quick Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--line)] font-mono text-xs">
                  <div className="p-3 bg-[var(--bg)]/60 border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--accent-brass)] block text-[10px]">MONOREPO SCALE</span>
                    <span className="text-[var(--ink)] font-semibold">28 uv Packages</span>
                  </div>
                  <div className="p-3 bg-[var(--bg)]/60 border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--accent-brass)] block text-[10px]">LOCAL INFERENCE</span>
                    <span className="text-[var(--ink)] font-semibold">5.4s Turn Latency</span>
                  </div>
                  <div className="p-3 bg-[var(--bg)]/60 border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--accent-brass)] block text-[10px]">INVARIANT TESTS</span>
                    <span className="text-[var(--ink)] font-semibold">181 / 181 Passed</span>
                  </div>
                  <div className="p-3 bg-[var(--bg)]/60 border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--accent-brass)] block text-[10px]">CRITICAL POST-MORTEM</span>
                    <span className="text-[var(--ink)] font-semibold">Vacuous Success Bug</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.snapshot.stack.slice(0, 5).map((t) => (
                      <span key={t} className="brutal-tag text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${flagship.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 bg-[var(--accent-enamel)] text-[var(--ink)] border border-[var(--accent-brass)] hover:bg-[var(--accent-enamel-bright)] hover:border-[var(--accent-gold)] transition-colors rounded-sm font-semibold shadow-md shadow-[var(--accent-glow)]"
                  >
                    <span>EXPLORE ASHI DEEP CASE STUDY</span>
                    <span className="text-[var(--accent-gold)]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Systems & Hackathon Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-[var(--line)]">
            <h3 className="font-mono text-xs sm:text-sm text-[var(--accent-brass)] tracking-widest uppercase font-semibold">
              SOVEREIGN SYSTEMS, HACKATHONS &amp; ARCHITECTURAL MILESTONES
            </h3>
            <span className="text-xs font-mono text-[var(--muted)]">
              {otherProjects.length} Documented Systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <div
                key={p.slug}
                className="brutal-card p-6 rounded-sm flex flex-col justify-between space-y-6 group hover:border-[var(--accent-brass)] transition-colors bg-[var(--panel)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-[var(--accent-brass)] uppercase tracking-wider font-semibold">
                      {p.snapshot.type}
                    </span>
                    <span className="text-[var(--muted)]">{p.startDate}</span>
                  </div>

                  <h4 className="text-xl font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs font-mono text-[var(--accent-brass)]">
                    {p.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    {p.summary}
                  </p>

                  <div className="p-3 bg-[var(--bg)]/70 border border-[var(--line)] rounded-sm text-xs font-mono space-y-1">
                    <span className="text-[10px] text-[var(--accent-gold)] uppercase block">
                      KEY TAKEAWAY:
                    </span>
                    <p className="text-[11px] text-[var(--ink-secondary)] font-sans italic">
                      &ldquo;{p.lessons.takeaways[0]?.insight || p.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[var(--line)]">
                  <div className="flex flex-wrap gap-1.5">
                    {p.snapshot.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="brutal-tag text-[10px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${p.slug}`}
                    className="w-full text-center block font-mono text-xs px-3 py-2 bg-[var(--bg)] hover:bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--accent-brass)] text-[var(--ink)] transition-colors rounded-sm font-medium"
                  >
                    [READ CASE STUDY →]
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Build Evolution Graph */}
        <BuildEvolutionGraph />
      </div>
    </main>
  );
}
