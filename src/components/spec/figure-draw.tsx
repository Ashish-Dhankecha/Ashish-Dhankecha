import React, { useId } from "react";
import type {
  ArchitectureComponent,
  ArchitectureLayer,
  ClaimVerificationStatus,
} from "@/types/project-case-study";

/* ------------------------------------------------------------------ */
/* Numbering: layers are 100, 120, 140…; their parts 102, 104, 106…    */
/* ------------------------------------------------------------------ */

export interface NumberedPart extends ArchitectureComponent {
  numeral: number;
  layerName: string;
  layerNumeral: number;
  displayName: string;
  path?: string;
}

export interface NumberedLayer {
  numeral: number;
  name: string;
  description: string;
  parts: NumberedPart[];
}

export function cleanName(name: string): { displayName: string; path?: string } {
  const m = name.match(/\(`([^`]+)`\)/);
  const displayName = name
    .replace(/\s*\(`[^`]*`\)/, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim();
  return { displayName, path: m?.[1] };
}

export function cleanLayerName(name: string): string {
  return name
    .replace(/^L\d+\s*[—-]\s*/, "")
    .replace(/^Layer\s*\d+\s*[—-]\s*/i, "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

export function numberLayers(layers: ArchitectureLayer[]): NumberedLayer[] {
  return layers.map((layer, i) => {
    const layerNumeral = 100 + i * 20;
    return {
      numeral: layerNumeral,
      name: cleanLayerName(layer.name),
      description: layer.description,
      parts: layer.components.map((c, j) => {
        const { displayName, path } = cleanName(c.name);
        return {
          ...c,
          numeral: layerNumeral + 2 * (j + 1),
          layerName: cleanLayerName(layer.name),
          layerNumeral,
          displayName,
          path: path ?? c.keyFiles?.[0],
        };
      }),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Status is drawn, not coloured: hatching is the state vocabulary      */
/* ------------------------------------------------------------------ */

export const STATUS_KEY: Record<
  ClaimVerificationStatus,
  { label: string; meaning: string }
> = {
  VERIFIED: { label: "Verified", meaning: "Section-hatched: proven by tests or audit" },
  IMPLEMENTED: { label: "Implemented", meaning: "Solid outline: built and running" },
  PARTIAL: { label: "Partial", meaning: "Half-hatched: built in part" },
  EXPERIMENTAL: { label: "Experimental", meaning: "Broken outline: under trial" },
  PLANNED: { label: "Planned", meaning: "Dotted outline: specified, not built" },
  FAILED: { label: "Failed", meaning: "Struck through: did not hold" },
  DEPRECATED: { label: "Deprecated", meaning: "Struck through: retired" },
};

function PartShape({
  x,
  y,
  w,
  h,
  status,
  stroke,
  hatchId,
  active,
  activeFill,
  strokeWidth,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  status: ClaimVerificationStatus;
  stroke: string;
  hatchId: string;
  active: boolean;
  activeFill: string;
  strokeWidth: number;
}) {
  const dash =
    status === "EXPERIMENTAL" ? "8 5" : status === "PLANNED" ? "2 5" : undefined;
  const struck = status === "FAILED" || status === "DEPRECATED";
  return (
    <g>
      {active && <rect x={x} y={y} width={w} height={h} fill={activeFill} />}
      {!active && status === "VERIFIED" && (
        <rect x={x} y={y} width={w} height={h} fill={`url(#${hatchId})`} />
      )}
      {!active && status === "PARTIAL" && (
        <rect x={x} y={y} width={w / 2} height={h} fill={`url(#${hatchId})`} />
      )}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
      />
      {struck && (
        <line
          x1={x}
          y1={y + h}
          x2={x + w}
          y2={y}
          stroke="var(--stamp)"
          strokeWidth={strokeWidth + 1}
        />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* The figure                                                          */
/* ------------------------------------------------------------------ */

interface FigureProps {
  layers: NumberedLayer[];
  tone?: "ink" | "paper";
  selected?: number | null;
  hovered?: number | null;
  onSelect?: (numeral: number) => void;
  onHover?: (numeral: number | null) => void;
  interactive?: boolean;
  animate?: boolean;
  compact?: boolean;
  title?: string;
  className?: string;
}

export function ArchitectureFigure({
  layers,
  tone = "ink",
  selected = null,
  hovered = null,
  onSelect,
  onHover,
  interactive = false,
  animate = false,
  compact = false,
  title,
  className = "",
}: FigureProps) {
  const uid = useId().replace(/:/g, "");
  const hatchId = `hatch-${uid}`;
  const stroke = tone === "paper" ? "var(--on-cobalt)" : "var(--ink)";
  const activeFill = tone === "paper" ? "var(--on-cobalt)" : "var(--cobalt)";
  const activeText = tone === "paper" ? "var(--cobalt)" : "var(--on-cobalt)";

  const W = 1000;
  const left = compact ? 40 : 110;
  const right = 24;
  const bandH = compact ? 78 : 118;
  const gap = compact ? 18 : 30;
  const boxH = compact ? 30 : 44;
  const numSize = compact ? 0 : 19;
  const sw = compact ? 2.2 : 1.6;

  // Foundation at the bottom, like a section through the system.
  const ordered = [...layers].reverse();
  const H = ordered.length * (bandH + gap) + (compact ? 4 : 40);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`block w-full h-auto ${animate ? "draw-in" : ""} ${className}`}
      role={interactive ? "group" : "img"}
      aria-label={title ?? "Architecture drawing"}
    >
      <defs>
        <pattern
          id={hatchId}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke={stroke} strokeWidth="1.4" />
        </pattern>
        <marker
          id={`arrow-${uid}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={stroke} />
        </marker>
      </defs>

      {ordered.map((layer, li) => {
        const y = li * (bandH + gap) + 6;
        const n = Math.max(layer.parts.length, 1);
        const innerW = W - left - right - 32;
        const boxGap = compact ? 12 : 22;
        const boxW = (innerW - boxGap * (n - 1)) / n;
        const boxY = y + bandH - boxH - (compact ? 14 : 18);
        const delay = (ordered.length - li) * 0.08;

        return (
          <g key={layer.numeral}>
            {/* Layer boundary drawn as a phantom line */}
            <rect
              x={left}
              y={y}
              width={W - left - right}
              height={bandH}
              fill="none"
              stroke={stroke}
              strokeWidth={compact ? 1.4 : 1}
              strokeDasharray="22 5 4 5"
              opacity={0.9}
            />
            {!compact && (
              <>
                <path
                  className="lead"
                  d={`M ${left} ${y + bandH / 2} Q ${left - 30} ${y + bandH / 2 - 4} ${left - 46} ${y + bandH / 2 - 18}`}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={1.2}
                  style={{ animationDelay: `${delay}s` }}
                />
                <text
                  x={left - 52}
                  y={y + bandH / 2 - 14}
                  textAnchor="end"
                  fill={stroke}
                  fontSize={numSize + 3}
                  className="numeral numeral-fade"
                  style={{ animationDelay: `${delay + 0.3}s` }}
                >
                  {layer.numeral}
                </text>
              </>
            )}

            {layer.parts.map((part, pi) => {
              const x = left + 16 + pi * (boxW + boxGap);
              const isActive = selected === part.numeral || hovered === part.numeral;
              const leadStartX = x + boxW * 0.62;
              const leadStartY = boxY + boxH * 0.4;
              const numX = Math.min(x + boxW * 0.62 + 26, W - right - 30);
              const numY = boxY - 22;

              const body = (
                <>
                  <PartShape
                    x={x}
                    y={boxY}
                    w={boxW}
                    h={boxH}
                    status={part.status}
                    stroke={stroke}
                    hatchId={hatchId}
                    active={isActive}
                    activeFill={activeFill}
                    strokeWidth={sw}
                  />
                  {!compact && (
                    <>
                      <path
                        className="lead"
                        d={`M ${leadStartX} ${leadStartY} Q ${leadStartX + 4} ${numY + 10} ${numX - 6} ${numY + 4}`}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={1.1}
                        style={{ animationDelay: `${delay + pi * 0.05}s` }}
                      />
                      <circle
                        cx={leadStartX}
                        cy={leadStartY}
                        r={2.6}
                        fill={isActive ? activeText : stroke}
                      />
                      <text
                        x={numX}
                        y={numY + 8}
                        fill={stroke}
                        fontSize={numSize}
                        fontWeight={isActive ? 700 : 400}
                        className="numeral numeral-fade"
                        style={{ animationDelay: `${delay + 0.35 + pi * 0.05}s` }}
                      >
                        {part.numeral}
                      </text>
                    </>
                  )}
                </>
              );

              if (!interactive) return <g key={part.numeral}>{body}</g>;

              return (
                <g
                  key={part.numeral}
                  role="button"
                  tabIndex={0}
                  aria-label={`${part.numeral}: ${part.displayName}, ${STATUS_KEY[part.status].label}`}
                  aria-pressed={selected === part.numeral}
                  className="cursor-pointer outline-none [&:focus-visible>g>rect:last-of-type]:stroke-[var(--cobalt)]"
                  onClick={() => onSelect?.(part.numeral)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect?.(part.numeral);
                    }
                  }}
                  onMouseEnter={() => onHover?.(part.numeral)}
                  onMouseLeave={() => onHover?.(null)}
                  onFocus={() => onHover?.(part.numeral)}
                  onBlur={() => onHover?.(null)}
                >
                  {/* generous hit area */}
                  <rect
                    x={x - 4}
                    y={numY - 14}
                    width={boxW + 8}
                    height={boxY + boxH - numY + 18}
                    fill="transparent"
                  />
                  {body}
                </g>
              );
            })}

            {/* Dependency arrow down to the layer beneath */}
            {li < ordered.length - 1 && (
              <line
                x1={left + (W - left - right) / 2}
                y1={y + bandH}
                x2={left + (W - left - right) / 2}
                y2={y + bandH + gap - 2}
                stroke={stroke}
                strokeWidth={compact ? 1.6 : 1.3}
                markerEnd={`url(#arrow-${uid})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

