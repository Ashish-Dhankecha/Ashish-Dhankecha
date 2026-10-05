"use client";

import React, { useState } from "react";
import { ArrowUpDown, Filter, Activity, Zap } from "lucide-react";

interface BenchmarkRow {
  id: string;
  model: string;
  architecture: "TRANSFORMER" | "MIXTURE_OF_EXPERTS" | "STATE_SPACE";
  parameters: string;
  quantization: "FP16" | "BF16" | "INT8-AWQ" | "INT4-GPTQ";
  prefillLatencyMs: number;
  decodeThroughputTokSec: number;
  vramGb: number;
  toolPassRate: number;
  deterministicScore: number;
}

const benchmarkData: BenchmarkRow[] = [
  {
    id: "m-1",
    model: "Qwen-2.5-Coder-7B",
    architecture: "TRANSFORMER",
    parameters: "7.6B",
    quantization: "BF16",
    prefillLatencyMs: 18.2,
    decodeThroughputTokSec: 94.6,
    vramGb: 15.2,
    toolPassRate: 94.2,
    deterministicScore: 98.6,
  },
  {
    id: "m-2",
    model: "Qwen-2.5-Coder-7B (INT8)",
    architecture: "TRANSFORMER",
    parameters: "7.6B",
    quantization: "INT8-AWQ",
    prefillLatencyMs: 22.4,
    decodeThroughputTokSec: 132.0,
    vramGb: 8.4,
    toolPassRate: 93.8,
    deterministicScore: 98.1,
  },
  {
    id: "m-3",
    model: "Llama-3.1-8B-Instruct",
    architecture: "TRANSFORMER",
    parameters: "8.0B",
    quantization: "FP16",
    prefillLatencyMs: 19.8,
    decodeThroughputTokSec: 88.4,
    vramGb: 16.1,
    toolPassRate: 91.5,
    deterministicScore: 97.4,
  },
  {
    id: "m-4",
    model: "Llama-3.1-8B (INT4-GPTQ)",
    architecture: "TRANSFORMER",
    parameters: "8.0B",
    quantization: "INT4-GPTQ",
    prefillLatencyMs: 26.5,
    decodeThroughputTokSec: 148.2,
    vramGb: 5.6,
    toolPassRate: 82.4,
    deterministicScore: 91.2,
  },
  {
    id: "m-5",
    model: "Mixtral-8x7B-v0.1",
    architecture: "MIXTURE_OF_EXPERTS",
    parameters: "46.7B (12.9B active)",
    quantization: "INT8-AWQ",
    prefillLatencyMs: 38.6,
    decodeThroughputTokSec: 72.1,
    vramGb: 23.4,
    toolPassRate: 96.1,
    deterministicScore: 99.2,
  },
  {
    id: "m-6",
    model: "Mamba-2.8B (State-Space)",
    architecture: "STATE_SPACE",
    parameters: "2.8B",
    quantization: "FP16",
    prefillLatencyMs: 4.8,
    decodeThroughputTokSec: 210.5,
    vramGb: 5.9,
    toolPassRate: 78.4,
    deterministicScore: 94.0,
  },
  {
    id: "m-7",
    model: "DeepSeek-Coder-V2-Lite",
    architecture: "MIXTURE_OF_EXPERTS",
    parameters: "16B (2.4B active)",
    quantization: "INT8-AWQ",
    prefillLatencyMs: 24.1,
    decodeThroughputTokSec: 118.0,
    vramGb: 9.8,
    toolPassRate: 92.8,
    deterministicScore: 97.9,
  },
];

type SortKey = "decodeThroughputTokSec" | "vramGb" | "toolPassRate" | "prefillLatencyMs";

export function BenchmarkMatrix() {
  const [filterArch, setFilterArch] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("decodeThroughputTokSec");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = benchmarkData.filter((row) => {
    if (filterArch === "ALL") return true;
    return row.architecture === filterArch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  return (
    <div className="border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] p-5 sm:p-7 space-y-6 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Bench Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--accent-brass)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-brass)]">
              EMPIRICAL BENCHMARK MATRIX
            </span>
          </div>
          <h3 className="font-mono text-base sm:text-lg font-medium text-[var(--ink)]">
            Inference Latency, Quantization &amp; Tool Integrity Profiles
          </h3>
        </div>

        {/* Architecture Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[10px] uppercase text-[var(--muted)] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {["ALL", "TRANSFORMER", "MIXTURE_OF_EXPERTS", "STATE_SPACE"].map((arch) => (
            <button
              key={arch}
              type="button"
              onClick={() => setFilterArch(arch)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border rounded-md transition-all ${
                filterArch === arch
                  ? "border-[var(--accent-brass)] bg-[var(--accent-brass)]/25 text-[var(--accent-brass)] font-semibold"
                  : "border-[var(--line)] bg-[var(--bg)] text-[var(--muted)] hover:border-[var(--accent-brass)]/60 hover:text-[var(--ink)]"
              }`}
            >
              {arch === "ALL"
                ? "All (7)"
                : arch === "MIXTURE_OF_EXPERTS"
                ? "MoE"
                : arch === "STATE_SPACE"
                ? "SSM / Mamba"
                : "Transformers"}
            </button>
          ))}
        </div>
      </div>

      {/* Benchmark Table */}
      <div className="overflow-x-auto border border-[var(--line)] bg-[var(--bg)] rounded-xl">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--panel)] text-[10px] text-[var(--muted)] uppercase tracking-wider">
              <th className="p-3">Model Architecture</th>
              <th className="p-3">Precision</th>
              <th
                className="p-3 cursor-pointer hover:text-[var(--accent-brass)] transition-colors select-none"
                onClick={() => toggleSort("prefillLatencyMs")}
              >
                <div className="flex items-center gap-1">
                  <span>Prefill (ms)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer hover:text-[var(--accent-brass)] transition-colors select-none"
                onClick={() => toggleSort("decodeThroughputTokSec")}
              >
                <div className="flex items-center gap-1">
                  <span>Decode (tok/s)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer hover:text-[var(--accent-brass)] transition-colors select-none"
                onClick={() => toggleSort("vramGb")}
              >
                <div className="flex items-center gap-1">
                  <span>VRAM (GB)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer hover:text-[var(--accent-brass)] transition-colors select-none"
                onClick={() => toggleSort("toolPassRate")}
              >
                <div className="flex items-center gap-1">
                  <span>Tool Pass %</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {sorted.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[var(--panel-hover)] transition-colors text-[var(--muted)]"
              >
                <td className="p-3">
                  <div className="font-semibold text-[var(--ink)]">{row.model}</div>
                  <div className="text-[10px] text-[var(--muted)]">
                    {row.parameters} &middot; {row.architecture}
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[9px] uppercase border rounded ${
                      row.quantization === "INT8-AWQ"
                        ? "border-[var(--accent-brass)] bg-[var(--accent-brass)]/20 text-[var(--accent-brass)]"
                        : row.quantization === "INT4-GPTQ"
                        ? "border-[#F59E0B]/60 bg-[#F59E0B]/10 text-[#F59E0B]"
                        : "border-[var(--line)] bg-[var(--bg)] text-[var(--muted)]"
                    }`}
                  >
                    {row.quantization}
                  </span>
                </td>
                <td className="p-3 text-[var(--muted)]">{row.prefillLatencyMs} ms</td>
                <td className="p-3 font-semibold text-[#34D399]">
                  <div className="flex items-center gap-2">
                    <span>{row.decodeThroughputTokSec}</span>
                    <div className="w-12 h-1.5 bg-[var(--line)] rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-[#34D399]"
                        style={{
                          width: `${Math.min(100, (row.decodeThroughputTokSec / 220) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3 text-[var(--muted)]">
                  <span className={row.vramGb > 16 ? "text-[#F59E0B]" : "text-[var(--muted)]"}>
                    {row.vramGb} GB
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-semibold ${
                        row.toolPassRate >= 94
                          ? "text-[#34D399]"
                          : row.toolPassRate >= 90
                          ? "text-[var(--accent-brass)]"
                          : "text-[#F59E0B]"
                      }`}
                    >
                      {row.toolPassRate}%
                    </span>
                    {row.toolPassRate >= 94 && (
                      <Zap className="w-3 h-3 text-[#34D399] shrink-0" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bench Footnote / Observation */}
      <div className="p-3.5 border border-[var(--line)] bg-[var(--bg)] text-xs font-mono text-[var(--muted)] flex items-start gap-2 rounded-xl">
        <span className="text-[var(--accent-brass)] shrink-0 font-bold">[OBSERVATION]</span>
        <span className="leading-relaxed">
          INT8 AWQ provides optimal Pareto frontier: 39.5% faster decode throughput than BF16 with only a 0.4%
          degradation in complex JSON tool calling schema compliance. INT4 quantization leads to a 12.8% syntax error
          spike in multi-parameter tool calls.
        </span>
      </div>
    </div>
  );
}
