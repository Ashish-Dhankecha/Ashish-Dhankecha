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
    <main className="min-h-screen bg-[#050505] text-white pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
      {/* Background Ambient Void Glows */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.06),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(16,185,129,0.04),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 space-y-16">
        {/* Header with signature mal1k gradient line */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
              02.
            </span>
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest font-semibold">
              Systems Dossier // Technical Case Studies
            </span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-sans tracking-tight">
            Systems I&apos;ve Built
          </h1>
          <p className="text-base sm:text-lg text-white/60 font-body leading-relaxed">
            I don&apos;t treat projects as static portfolio cards. Each system below is documented with
            exhaustive architectural diagrams, empirical invariant tests, failure post-mortems, and real engineering trade-offs.
          </p>
        </div>

        {/* Flagship System Feature */}
        {flagship && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider">
                FLAGSHIP COGNITIVE SYSTEM // ACTIVE LONG-TERM BUILD
              </span>
            </div>

            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_70%)] blur-2xl"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-white/40">
                      {flagship.startDate} — {flagship.endDate}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mt-1">
                      {flagship.title}
                    </h2>
                    <p className="text-base sm:text-lg text-emerald-400 font-sans font-medium mt-1">
                      {flagship.subtitle}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0 font-medium">
                    ● {flagship.statusLabel}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white/70 font-body leading-relaxed max-w-3xl">
                  {flagship.summary}
                </p>

                {/* Key Metrics Quick Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                  <div className="p-3.5 glass border border-white/10 rounded-xl">
                    <span className="text-white/40 block text-[10px] uppercase">MONOREPO SCALE</span>
                    <span className="text-white font-semibold text-sm">28 uv Packages</span>
                  </div>
                  <div className="p-3.5 glass border border-white/10 rounded-xl">
                    <span className="text-white/40 block text-[10px] uppercase">LOCAL INFERENCE</span>
                    <span className="text-white font-semibold text-sm">5.4s Turn Latency</span>
                  </div>
                  <div className="p-3.5 glass border border-white/10 rounded-xl">
                    <span className="text-white/40 block text-[10px] uppercase">INVARIANT TESTS</span>
                    <span className="text-emerald-400 font-semibold text-sm">181 / 181 Passed</span>
                  </div>
                  <div className="p-3.5 glass border border-white/10 rounded-xl">
                    <span className="text-white/40 block text-[10px] uppercase">CRITICAL AUDIT</span>
                    <span className="text-white font-semibold text-sm">Vacuous Success Patch</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.snapshot.stack.slice(0, 5).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono glass border border-white/10 text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${flagship.slug}`}
                    className="inline-flex items-center gap-2 font-sans text-xs px-6 py-2.5 bg-white text-black hover:bg-white/90 transition-all rounded-full font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <span>EXPLORE ÆON DEEP CASE STUDY</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Systems & Hackathon Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
            <h3 className="font-mono text-xs sm:text-sm text-white/70 tracking-widest uppercase font-semibold">
              SOVEREIGN SYSTEMS, HACKATHONS &amp; ARCHITECTURAL MILESTONES
            </h3>
            <span className="text-xs font-mono text-white/40">
              {otherProjects.length} Documented Systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <div
                key={p.slug}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-6 group hover:border-white/25 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-emerald-400 uppercase tracking-wider font-semibold">
                      {p.snapshot.type}
                    </span>
                    <span className="text-white/40">{p.startDate}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white font-sans group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs font-mono text-white/50">
                    {p.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed">
                    {p.summary}
                  </p>

                  <div className="p-3.5 glass border border-white/10 rounded-xl text-xs font-mono space-y-1">
                    <span className="text-[10px] text-white/40 uppercase block">
                      KEY TAKEAWAY:
                    </span>
                    <p className="text-[11px] text-white/90 font-sans italic">
                      &ldquo;{p.lessons.takeaways[0]?.insight || p.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {p.snapshot.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-mono glass border border-white/5 text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${p.slug}`}
                    className="w-full text-center block font-mono text-xs px-3 py-2 rounded-xl glass border border-white/10 hover:border-white/30 text-white hover:bg-white/10 transition-colors font-medium"
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
