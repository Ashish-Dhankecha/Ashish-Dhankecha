# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Ashish Labs is read by four audiences, all judging the same thing: whether Ashish Dhankecha can think about and build real AI systems.

- **Hiring managers and recruiters** for AI/ML and systems engineering roles and internships, checking for evidence of real building rather than tutorial projects.
- **Research labs, professors, and mentors**, judging depth of thinking, rigor, and how he reasons about failure.
- **Peer builders** (engineers and students) who follow the build logs and lab notes.
- **Future collaborators**: people who might build Ashi with him, back it, or start something alongside him.

All of them arrive through a link (GitHub, LinkedIn, X, a resume, a DM) and decide in the first few seconds whether to keep reading.

## Product Purpose

A personal site and build lab for Ashish Dhankecha, a Computer Engineering student (BE, SSASIT Surat, July 2024 to present) who builds AI systems from first principles. It presents his flagship long-term project, ÆON (called Ashi until October 2026; the code namespace and URLs stay `ashi`), alongside earlier and parallel systems (Leo, Vani, SIH26117), and a lab archive of engineering notes and decision records.

**Success means the visitor reads the depth.** They go past the homepage into a project page and the lab notes, and leave trusting his engineering judgment. Outreach and follow-ups come after that trust, not before it.

## Positioning

Most student AI portfolios list demos. This one shows the system around the model: memory, state, verification, failure recovery, architecture enforcement. Each project comes with its own decision records, forensic audits, and documented failures (for example, the Leo audit that found 281 direct-database violations and showed that 297 passing mock tests hid 11 broken live integrations). The evidence trail from Leo to Vani to Ashi, with each failure shaping the next design, is something a neighbouring portfolio can't honestly copy.

## Operating Context

- Visitors arrive from external links and often skim on a phone before reading properly on desktop.
- The homepage (`/`) gives the overview: hero, about, featured Ashi, projects, experience and journey, skills and stack, process, contact.
- Project pages (`/projects/[slug]`, plus the dedicated interactive `/projects/ashi`) are where depth is meant to land.
- The Lab (`/lab`, `/lab/[project]`, `/lab/[project]/[slug]`) is a readable archive of numbered engineering notes per project.

## Capabilities and Constraints

- **Stack (existing):** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3, Framer Motion, lucide-react. Deployed on Netlify (`@netlify/plugin-nextjs`). pnpm.
- **Lab ingest pipeline (binding):** `lab-content/<Project>/*.md` → `scripts/ingest-lab.js` (runs on `prebuild`) → `src/content/lab-generated.json`. This remains the single source for the Lab section.
- **Project data:** `src/data/projects/{ashi,leo,vani,sih}.ts` hold the case studies; `src/content/portfolio-data.ts` holds homepage content.
- **Source repositories live on this machine** and are the ground truth for project pages. Future work should mine them deeply, not paraphrase the existing summaries:
  - Ashi: `/home/ashish/Ashi` (also `/home/ashish/Ashi-saman`, `/home/ashish/Ashi-scratch-archive`)
  - Leo: `/home/ashish/Leo`
  - Vani: `/home/ashish/Vani`
  - SIH26117: `/home/ashish/SIH20261/SIH2026`
- Light and dark themes exist (stored in `localStorage` as `ashish_site_theme`); dark is the default.
- **Canonical domain:** `ashishdhankecha.com`. Any `ashishlabs.com` references are stale and should be corrected.

## Brand Commitments

- **Project naming:** the flagship is shown as **ÆON** everywhere on the site. Lab notes written before the rename say "Ashi" and are left as written.
- **Name:** "Ashish Labs" is the site brand, used alongside his personal name, Ashish Dhankecha.
- **Presence:** the site should read as a founder, researcher, and highly ambitious builder: someone running a lab, not a student showing coursework. The ambition is backed by evidence, never inflated.
- **Project pages as product sites (binding):** each project page should present its project the way a top-tier product marketing site presents a product. It should be persuasive and confident at the top, with the real engineering depth underneath. The source is the full project repository, not a summary.
- **Voice in use today:** direct, engineering-led ("Build systems, not just demos.").
- **Links:** GitHub `Ashish-Dhankecha`, X `Ashishdhankecha`, LinkedIn, email `ashishdhankecha256@gmail.com`.

## Evidence on Hand

- Lab notes: `lab-content/Ashi`, `lab-content/Leo` (21 notes), `lab-content/Vani` (21 notes), plus `r.txt` (the Ashi repository intelligence index).
- Case-study data in `src/data/projects/*.ts`; experience timeline in `src/components/pakcat/experience-section.tsx`.
- The project source repositories listed above.
- Photography of Ashish in `public/images/` (portraits, cutouts, hero crops) and `public/images/ashi-stack.jpg`.
- **Absent, never fabricate:** testimonials, users or customers, employers, press, benchmark numbers not traceable to a repository or lab log, funding, or adoption claims.

## Product Principles

1. **Evidence over adjectives.** Every claim, metric, and architectural statement must trace back to a repository, a lab note, or a log. Ambition is shown through what was built, not asserted.
2. **Failure is part of the proof.** Debt, broken integrations, and abandoned approaches stay visible next to the wins. The Leo → Vani → Ashi evolution is the story.
3. **Persuade at the top, prove underneath.** Each surface earns attention immediately, then rewards the reader who keeps going with real depth.
4. **Depth is the conversion.** Optimise for reading time and trust, not click-throughs. Contact comes after conviction.
5. **One lab, many systems.** Projects are presented as products of a single, continuous research program.
