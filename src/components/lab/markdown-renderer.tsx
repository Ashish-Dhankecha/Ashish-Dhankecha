"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: Props) {
  if (!content) return null;

  // Split into blocks: code blocks, tables, headings, blockquotes, lists, paragraphs
  const blocks = parseBlocks(content);

  return (
    <div className={`space-y-3.5 sm:space-y-4 font-sans text-[#D9C7B8] leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "code":
            return (
              <CodeBlock
                key={idx}
                code={block.code || ""}
                language={block.language}
              />
            );
          case "table":
            return <TableBlock key={idx} rows={block.rows || []} />;
          case "h1":
            return (
              <h1
                key={idx}
                className="font-sans text-xl sm:text-3xl text-[#F5EBE1] font-bold pt-5 sm:pt-6 pb-2 border-b border-[#2D161C]"
              >
                {renderInline(block.text || "")}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={idx}
                className="font-sans text-lg sm:text-2xl text-[#F5EBE1] font-semibold pt-4 sm:pt-5 pb-1 border-b border-[#2D161C]"
              >
                {renderInline(block.text || "")}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="font-sans text-sm sm:text-lg text-[#F5EBE1] font-semibold pt-3 sm:pt-4"
              >
                {renderInline(block.text || "")}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={idx}
                className="font-mono text-xs uppercase tracking-wider text-[#DF7987] font-semibold pt-2.5 sm:pt-3"
              >
                {renderInline(block.text || "")}
              </h4>
            );
          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-[#DF7987] pl-3 sm:pl-4 py-1.5 my-2.5 sm:my-3 bg-[#140A0D] text-[#D9C7B8] italic text-xs sm:text-sm leading-relaxed rounded-r-lg"
              >
                {renderInline(block.text || "")}
              </blockquote>
            );
          case "list":
            return (
              <ul key={idx} className="list-disc list-outside pl-4 sm:pl-5 space-y-1 sm:space-y-1.5 text-xs sm:text-base text-[#D9C7B8]">
                {(block.items || []).map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol key={idx} className="list-decimal list-outside pl-4 sm:pl-5 space-y-1 sm:space-y-1.5 text-xs sm:text-base text-[#D9C7B8]">
                {(block.items || []).map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "hr":
            return <hr key={idx} className="my-5 sm:my-6 border-t border-[#2D161C]" />;
          case "paragraph":
          default:
            return (
              <p key={idx} className="text-xs sm:text-base leading-relaxed text-[#D9C7B8]">
                {renderInline(block.text || "")}
              </p>
            );
        }
      })}
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative my-3.5 sm:my-4 border border-[#2D161C] bg-[#0C0608] text-[#D9C7B8] rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 border-b border-[#2D161C] bg-[#140A0D] text-xs font-mono text-[#8E7C79]">
        <span className="uppercase tracking-wider text-[10px] sm:text-[11px] text-[#DF7987]">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-[#8E7C79] hover:text-[#DF7987] hover:bg-[#1F1015] transition-colors min-h-[30px]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto touch-pan-x p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed text-[#D9C7B8]">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function TableBlock({ rows }: { rows: string[][] }) {
  if (rows.length === 0) return null;
  const header = rows[0];
  const bodyRows = rows.slice(1);

  return (
    <div className="my-4 sm:my-6 overflow-x-auto touch-pan-x border border-[#2D161C] bg-[#0C0608] rounded-xl overflow-hidden">
      <table className="w-full text-left text-xs font-sans border-collapse min-w-[340px]">
        <thead>
          <tr className="bg-[#140A0D] border-b border-[#2D161C] text-[#F5EBE1] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
            {header.map((cell, idx) => (
              <th key={idx} className="py-2 sm:py-2.5 px-2.5 sm:px-3 font-semibold whitespace-nowrap sm:whitespace-normal">
                {renderInline(cell.trim())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2D161C]">
          {bodyRows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-[#1F1015] transition-colors text-[#D9C7B8]"
            >
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="py-1.5 sm:py-2 px-2.5 sm:px-3 align-top leading-normal text-[11px] sm:text-xs">
                  {renderInline(cell.trim())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline renderer for **bold**, *italic*, `code`, and [links](url)
function renderInline(text: string): React.ReactNode {
  if (!text) return "";

  // Split by inline code first
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-[#140A0D] text-[#DF7987] font-mono text-[0.88em] border border-[#2D161C] rounded break-all"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Process bold, italic, links
    return <span key={i}>{parseInlineFormatting(part)}</span>;
  });
}

function parseInlineFormatting(text: string): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      tokens.push(
        <strong key={match.index} className="font-semibold text-[#F5EBE1]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      tokens.push(
        <em key={match.index} className="italic text-[#F5EBE1]">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        tokens.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
            rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-[#DF7987] underline underline-offset-2 hover:text-[#DF7987]/80 transition-colors break-words"
          >
            {linkMatch[1]}
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens;
}

interface ParsedBlock {
  type:
    | "code"
    | "table"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "blockquote"
    | "list"
    | "ordered-list"
    | "hr"
    | "paragraph";
  text?: string;
  code?: string;
  language?: string;
  rows?: string[][];
  items?: string[];
}

function parseBlocks(markdown: string): ParsedBlock[] {
  const lines = markdown.split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Code block
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      blocks.push({
        type: "code",
        code: codeLines.join("\n"),
        language,
      });
      continue;
    }

    // Table block
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowLine = lines[i].trim();
        // Check if separator row (|---|---|)
        if (!/^[|:\-\s]+$/.test(rowLine)) {
          const cells = rowLine
            .slice(1, -1)
            .split("|")
            .map((c: string) => c.trim());
          tableRows.push(cells);
        }
        i++;
      }
      if (tableRows.length > 0) {
        blocks.push({
          type: "table",
          rows: tableRows,
        });
      }
      continue;
    }

    // Horizontal rule
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("#### ")) {
      blocks.push({ type: "h4", text: trimmed.slice(5).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({
        type: "blockquote",
        text: quoteLines.join(" "),
      });
      continue;
    }

    // Unordered List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        listItems.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({
        type: "list",
        items: listItems,
      });
      continue;
    }

    // Ordered List
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({
        type: "ordered-list",
        items: listItems,
      });
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      lines[i].trim() !== "---"
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: paraLines.join(" "),
      });
    }
  }

  return blocks;
}
