---
version: 1
slug: "src-app-projects-slug-page-tsx"
primary_target: "src/app/projects/[slug]/page.tsx"
related_targets: ["src/app/page.tsx","src/app/lab/page.tsx"]
---

# Surface brief: project pages (and the site world they set)

Scope: `/projects/[slug]` for Ashi, Leo, Vani, SIH26117 — the surface that sets the Ashish Labs world; homepage and Lab inherit it. Mode: **Persuade** (project pages, homepage). Lab reader is **Read** inside the same world.

Audience: hiring managers, researchers/mentors, peer builders, collaborators arriving from a link. Job: decide in seconds that this is serious, then read deep. Action: "Read the specification" (scroll into depth), then lab notes / repo.

Proof: repo-measured facts (git, 7 Oct 2026), lab notes, ADRs, audits, failures. Constraint: no invented claims; every claim cites evidence.

Build path: code-led (no image generation available).

## Direction contract

THESIS: Each project is filed like an invention, not pitched like an app. The page refuses the category default (dark glow hero, three feature cards, stats row) and replaces it with a specification: a giant drawn figure, numbered claims, each claim citing its evidence, and earlier projects cited as prior art.

OWN-WORLD: Cool paper (#f2f2ee) and black line ink. Whole regions are flat cobalt (#2b2bff) fields: no gradients, glow, glass or shadows. Vermilion (#ff4a1c) is used only for deficiencies, failures and stamps. Display type is Archivo ExtraCondensed Black in giant caps. Reference numerals (100, 110…) and measurements are set in mono. Figures are black hairline drawings with leader lines and numerals, generated from data. Sheet margins are thin rules, with a sheet header and footer ("SHEET 2 OF 6").

STORY: The visitor understands what the system is from Fig. 1, sees that its claims are backed by numbers they can click, sees the failures stamped openly, and follows prior art Leo → Vani → Ashi. They come away believing this person runs a lab, then read the lab notes or reach out.

FIRST VIEWPORT: The sheet header strip runs across the top. On the left, the project name is set in giant condensed caps (~22vw on mobile, up to 15rem), with the one-line claim under it. On the right and bleeding down, a cobalt field holds Fig. 1, the architecture drawn in paper-white line with numerals. Bottom row: primary "Read the specification" (solid ink button), secondary "Lab notes" and repo, plus measured facts in mono (commits, lines, tests, dates).

FORM: The Specification (patent filing), candidate 4 of my ordered list, seed key fb5f379b. Raises: flat ink commitment (WPA), deep-linkable claims and figures (HyperCard), one continuous lineage line (neon). Signature interaction: hovering or focusing a reference numeral highlights its part in the figure and opens that subsystem's entry; numerals deep-link (#n-112). Motion grammar: figures draw their leader lines in once on entry (stroke-dashoffset, expo-out). Claims are static and readable by default.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- Ashi's repo README names the product ÆON (namespace `ashi`). The site keeps "Ashi" until the user decides.
