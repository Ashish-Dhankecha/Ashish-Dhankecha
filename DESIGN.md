---
name: Ashish Labs
description: Each project filed as a specification. Paper, line ink, flat cobalt fields, vermilion only for deficiencies.
colors:
  paper: "#f2f2ee"
  paper-2: "#e6e6e0"
  ink: "#0a0a0a"
  ink-2: "#333331"
  ink-3: "#5a5a56"
  rule-soft: "rgba(10, 10, 10, 0.16)"
  cobalt: "#2b2bff"
  cobalt-deep: "#1c1cd6"
  on-cobalt: "#f2f2ee"
  on-cobalt-2: "rgba(242, 242, 238, 0.8)"
  stamp: "#ff4a1c"
  stamp-ink: "#c23200"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 9vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.25
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "'ss01'"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 75"
  numeral:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0"
    fontFeature: "'tnum'"
  tag:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "48px"
  sheet-max: "1480px"
  header-height: "56px"
  sheet-top: "80px"
  sheet-bottom: "96px"
  sheet-head-gap: "56px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-on-cobalt:
    backgroundColor: "transparent"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "48px"
  button-on-cobalt-hover:
    backgroundColor: "{colors.on-cobalt}"
    textColor: "{colors.cobalt}"
  field-cobalt:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.none}"
    padding: "40px"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.stamp-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.55rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-3}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  numeral-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.numeral}"
    padding: "10px 0"
  numeral-row-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "56px"
---

# Design System: Ashish Labs

## Overview

**Creative North Star: "The Specification"**

Every project is filed like an invention, not pitched like an app. A page is a sheet in a patent filing: a heavy ink rule across the top, a heading set in giant condensed caps on the left, the sheet position ("SHEET 4 / 13") set in mono at the right edge. Architecture is shown as a generated hairline drawing with reference numerals and leader lines; claims are numbered and each cites its evidence; failures are stamped in vermilion and shown in full; earlier projects are cited as prior art.

The material is cool paper and black line ink. Whole regions turn into flat cobalt fields that run to the sheet edge and carry the figure in paper-white line. Nothing is lit, glazed, blurred or lifted: depth is a matter of rules, fields and inversion. The dark theme is not a separate mood but the same sheet as a photostat negative ("POS" / "NEG" toggle).

Density is high and editorial: wide 12-column sheets, ruled definition lists, numbered rows, mono measurements. The display face is loud; everything around it is quiet, ruled and exact.

**Key Characteristics:**
- Paper and line ink; flat cobalt fields; vermilion only for deficiencies.
- Archivo at its narrowest and heaviest for display; Archivo condensed for labels; JetBrains Mono for every numeral and measurement.
- Square corners everywhere; 2px ink rules for structure, 16% ink hairlines for subdivision.
- Figures are drawn from data, numbered in 10s and 100s, and deep-linkable (#n-112).
- No shadows, gradients, glow or glass, in either theme.

## Colors

Two inks on cool paper, plus one field color and one warning color, each with a single job.

### Primary
- **Patent Cobalt** (cobalt): the field color. Fills whole regions edge to edge (Fig. 1 plate, the selected-part entry, the mobile index, worked-example input bands, the lineage grid) and carries text selection, focus outlines, link hover and button hover. Never a small accent chip, never a gradient.
- **Cobalt Deep** (cobalt-deep): the pressed or hovered variant of cobalt where cobalt is already the base.
- **Paper on Cobalt** (on-cobalt, on-cobalt-2): text, rules and line drawing set on a cobalt field; the 80% variant for secondary captions there.

### Secondary
- **Deficiency Vermilion** (stamp): strokes only. The strike line through failed or deprecated parts in figures and status keys.
- **Stamp Ink** (stamp-ink): the darker vermilion used for stamp text, deficiency box borders and "Refused" or "Pivot" words, so the warning color passes contrast on paper.

### Neutral
- **Cool Paper** (paper): page ground and the text color on ink bands.
- **Paper Shade** (paper-2): row hover, inline code ground, the only tonal step on paper.
- **Line Ink** (ink): body and display text, 2px structural rules, solid buttons, inverted output bands, the footer.
- **Ink 2** (ink-2): running prose and secondary paragraphs.
- **Ink 3** (ink-3): labels, captions, measurement footnotes, inactive numerals.
- **Hairline** (rule-soft): 1px subdividing rules between rows and the default border color.

The negative theme swaps paper and ink (#0d0d0f ground, #f2f2ee ink) and brightens cobalt (#3a3aff) and the stamp (#ff5a2e, text #ff7a52) so the same sheet reads reversed.

### Named Rules
**The Vermilion Is Evidence Rule.** Vermilion appears only where something failed, was refused, deprecated or pivoted. If nothing went wrong, the sheet has no vermilion.

**The Whole Field Rule.** Cobalt is applied as a flat field covering a region, or as a state (hover, focus, selection). It is not used for decorative fills, gradients or tinted cards.

## Typography

**Display Font:** Archivo variable, width axis at 62 (with system-ui)
**Body Font:** Archivo variable, width axis at 100 (with system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A single grotesque stretched across its width axis does all the talking: ExtraCondensed Black caps for titles, Condensed bold caps for labels and subheads, normal width for reading. Mono is reserved for things that were measured or numbered.

### Hierarchy
- **Display** (900, width 62, uppercase, line-height 0.84): sheet titles at clamp(3rem, 9vw, 7.5rem); project names in the first viewport sized to the word length, up to 15rem; "FIG. 1" captions; the giant "ASHISH LABS" footer mark.
- **Headline** (800, width 75, uppercase, clamp(1.5rem, 3vw, 2.5rem), 1.05): the sub-heading under a sheet title, problem and concept headlines.
- **Title** (800, width 75, uppercase, 1.35rem): step names, row titles, decision titles.
- **Body** (400, 1.0625rem, 1.65, ss01): prose capped at 68ch in ink-2. Lead paragraphs step up to clamp(1.35rem, 2.2vw, 1.85rem) at weight 500.
- **Label** (700, width 75, 0.75rem, 0.04em, uppercase): definition-list keys, entry labels, field captions.
- **Numeral** (JetBrains Mono, tabular): reference numerals, sheet numbers, dates, file paths, measured facts (up to 1.75rem in the facts row).
- **Tag** (JetBrains Mono, 0.6875rem, uppercase): part status in numeral lists.

### Named Rules
**The Measured In Mono Rule.** Anything counted, dated, numbered or pathed is set in JetBrains Mono with tabular figures. Words that are not measurements never use mono.

**The Width Axis Rule.** Hierarchy comes from Archivo's width and weight, not from a second display family: 62 for display, 75 for labels and subheads, 100 for reading.

## Layout

The sheet is a centered frame of 1480px max with a gutter of 16px, 32px from 768px and 48px from 1280px. Inside, content sits on a 12-column grid with 40px column gaps; the common splits are 7/5 (title vs. figure, abstract vs. ruled facts) and 5/7 (headline vs. prose).

Each sheet section opens with a 2px ink rule, the display title left and the sheet number right, then 56px before content; sections are padded 80px top and 96px bottom on desktop (56/64 on mobile). The fixed header is 56px with a 2px bottom rule, and anchors scroll with 4.5rem offset.

Cobalt fields bleed: on mobile they break out of the gutter to the viewport edge, and on desktop the first-viewport figure runs to the right sheet edge. Measured facts sit in a 2/3/6-column grid of cells separated by 1px hairline gaps between 2px ink rules. Lists are ruled rows with a fixed numeral column (2.5rem to 4rem) followed by content.

## Elevation & Depth

The system is flat. There are no shadows, gradients, blurs or translucent surfaces in either theme. Depth is conveyed by three devices only: 2px ink rules and boxes that frame a region, flat cobalt fields that set a region forward, and full inversion (ink band with paper text) for outputs, the facts ticker and the footer. Hover is a tonal or inverse fill, never a lift.

### Named Rules
**The Flat Ink Rule.** If a surface needs to stand apart, rule it, fill it cobalt or invert it. Never shadow it.

## Shapes

All corners are square (0px). Borders come in two weights: 2px ink for structure (sheet rules, boxes, buttons, figure frames) and 1px hairline for subdivision. Icons and arrows are drawn with square line caps at 2.2px stroke. Figure line work is hairline (1 to 1.6px) with dashed outlines for experimental parts, dotted for planned, and a hatch fill for verified. The one tilted object is the stamp, rotated -2deg like a hand-applied rubber stamp.

## Components

### Buttons
Blunt, square, condensed caps; they read as filing-office labels.
- **Shape:** square (0px), 2px ink border, 48px minimum height, 1.4rem side padding, Archivo 800 at width 75, 0.95rem, 0.03em tracking, uppercase, arrow glyph drawn as SVG.
- **Primary (ink):** solid ink with paper text; hover turns the whole button cobalt with paper text.
- **Line:** transparent with ink border and text; hover inverts to solid ink.
- **On cobalt:** transparent with paper border and text; hover fills paper with cobalt text. A paper-filled variant inverts to ink on hover.
- **Transitions:** background, color and border over 0.25s on cubic-bezier(0.16, 1, 0.3, 1). Focus is a 2px cobalt outline offset 3px.

### Chips / Tags
- **Materials chips:** mono 0.75rem in a 1px ink box, 8px by 4px padding, square.
- **Status tags:** mono 0.6875rem uppercase; outlined in paper on cobalt, plain ink-3 in lists. Status is drawn as a hatch key (full hatch verified, half hatch partial, dashed experimental, dotted planned, vermilion strike failed).

### Cards / Containers
- **Corner Style:** square.
- **Background:** paper, a cobalt field, or an ink band. No tinted cards.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 2px ink box for figures, hypotheses and worked examples; 2px stamp-ink box for deficiencies.
- **Internal Padding:** 20px mobile, 24px to 40px desktop.

### Navigation
- **Header:** fixed paper strip, 56px, 2px ink bottom rule. "Ashish Labs" in display at 1.9rem. Links in condensed bold caps with a 2px underline: ink when current, cobalt with cobalt text on hover. A mono "POS / NEG" theme toggle in a 2px ink box and a solid ink "Write to me" button sit right.
- **Mobile:** an "Index" toggle opens a full-height cobalt field listing pages as numbered rows (10, 20, 30) in 3.5rem display.
- **Footer:** ink band with condensed caps links and the display mark set at up to 22rem, cropped by the frame.

### Sheet Header
The repeating section opener: 2px rule, display title, mono "SHEET n / N" right, optional stamp beside it. The first sheet carries a mono header strip (breadcrumb, date range, status and sheet count) above the title.

### Figure Plate (signature)
A generated architecture drawing in a 2px ink frame (or paper line on a cobalt field for Fig. 1). Layers are numbered in hundreds and parts in tens; leader lines draw in once on entry via stroke-dashoffset over 1.1s on the expo-out curve, numerals fade in over 0.6s, both disabled under reduced motion. Beside it, a ruled reference-numeral list: hovering a row highlights the part in the drawing, selecting it inverts the row to ink, opens the part's entry on a cobalt field, and writes a #n-112 deep link.

### Stamp
Label-sized condensed black caps (0.75rem, 0.08em tracking) in stamp-ink inside a 2px stamp-ink box, rotated -2deg. Used for "Failed", deficiency numbers, "Shown in full", "On the record". An ink-colored variant marks "Under audit".

### Claim Row
A numbered claim with its value set in mono (cobalt when passing, stamp-ink when failed) and a link to the note that evidences it. Unsourced figures are listed separately as "reported, not re-measured" and never promoted to claims.

## Do's and Don'ts

### Do:
- **Do** set every sheet title in Archivo 900 at width 62, uppercase, line-height 0.84.
- **Do** set every number, date, path and measurement in JetBrains Mono with tabular figures.
- **Do** fill whole regions with flat cobalt (#2b2bff) and draw on them in paper line.
- **Do** frame structure with 2px ink rules and subdivide with 1px hairlines at 16% ink.
- **Do** number figure parts in tens and hundreds and make each numeral a deep link.
- **Do** stamp failures openly in stamp-ink with the -2deg rotated stamp.
- **Do** keep the negative theme a straight inversion of the same sheet.

### Don't:
- **Don't** use shadows, gradients, glow, blur or glass on any surface.
- **Don't** round corners.
- **Don't** use vermilion for anything that did not fail, get refused or get deprecated.
- **Don't** use cobalt as a tint, a small badge fill or a gradient stop.
- **Don't** set ordinary words in mono or measurements in the sans.
- **Don't** present an unsourced metric as a claim; list it as reported.
