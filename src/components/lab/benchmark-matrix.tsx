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
    <div className="border border-[#1E293B] bg-[#0E1420] text-[#F8FAFC] p-5 sm:p-7 space-y-6">
      {/* Bench Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
              EMPIRICAL BENCHMARK MATRIX
            </span>
          </div>
          <h3 className="font-mono text-base sm:text-lg font-medium text-[#F8FAFC]">
            Inference Latency, Quantization &amp; Tool Integrity Profiles
          </h3>
        </div>

        {/* Architecture Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[10px] uppercase text-[#64748B] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {["ALL", "TRANSFORMER", "MIXTURE_OF_EXPERTS", "STATE_SPACE"].map((arch) => (
            <button
              key={arch}
              type="button"
              onClick={() => setFilterArch(arch)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                filterArch === arch
                  ? "border-[#38BDF8] bg-[#0284C7]/20 text-[#38BDF8]"
                  : "border-[#1E293B] bg-[#111726]/60 text-[#94A3B8] hover:border-[#334155]"
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
      <div className="overflow-x-auto border border-[#1E293B] bg-[#070A0F]">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#111726]/80 text-[10px] text-[#94A3B8] uppercase tracking-wider">
              <th className="p-3">Model Architecture</th>
              <th className="p-3">Precision</th>
              <th
                className="p-3 cursor-pointer hover:text-[#38BDF8] transition-colors select-none"
                onClick={() => toggleSort("prefillLatencyMs")}
              >
                <div className="flex items-center gap-1">
                  <span>Prefill (ms)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer hover:text-[#38BDF8] transition-colors select-none"
                onClick={() => toggleSort("decodeThroughputTokSec")}
              >
                <div className="flex items-center gap-1">
                  <span>Decode (tok/s)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer hover:text-[#38BDF8] transition-colors select-none"
                onClick={() => toggleSort("vramGb")}
              >
                <div className="flex items-center gap-1">
                  <span>VRAM (GB)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer hover:text-[#38BDF8] transition-colors select-none"
                onClick={() => toggleSort("toolPassRate")}
              >
                <div className="flex items-center gap-1">
                  <span>Tool Pass %</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {sorted.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#111726]/50 transition-colors text-[#CBD5E1]"
              >
                <td className="p-3">
                  <div className="font-semibold text-[#F8FAFC]">{row.model}</div>
                  <div className="text-[10px] text-[#64748B]">
                    {row.parameters} &middot; {row.architecture}
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[9px] uppercase border ${
                      row.quantization === "INT8-AWQ"
                        ? "border-[#0284C7] bg-[#0284C7]/10 text-[#38BDF8]"
                        : row.quantization === "INT4-GPTQ"
                        ? "border-[#F59E0B]/60 bg-[#F59E0B]/10 text-[#F59E0B]"
                        : "border-slate-700 bg-slate-800/40 text-slate-300"
                    }`}
                  >
                    {row.quantization}
                  </span>
                </td>
                <td className="p-3 text-slate-300">{row.prefillLatencyMs} ms</td>
                <td className="p-3 font-semibold text-emerald-400">
                  <div className="flex items-center gap-2">
                    <span>{row.decodeThroughputTokSec}</span>
                    <div className="w-12 h-1.5 bg-[#1E293B] rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-emerald-400"
                        style={{
                          width: `${Math.min(100, (row.decodeThroughputTokSec / 220) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3 text-slate-300">
                  <span className={row.vramGb > 16 ? "text-[#F59E0B]" : "text-slate-300"}>
                    {row.vramGb} GB
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-semibold ${
                        row.toolPassRate >= 94
                          ? "text-emerald-400"
                          : row.toolPassRate >= 90
                          ? "text-[#38BDF8]"
                          : "text-[#F59E0B]"
                      }`}
                    >
                      {row.toolPassRate}%
                    </span>
                    {row.toolPassRate >= 94 && (
                      <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bench Footnote / Observation */}
      <div className="p-3 border border-[#1E293B] bg-[#111726]/40 text-xs font-mono text-[#94A3B8] flex items-start gap-2">
        <span className="text-[#38BDF8] shrink-0 font-bold">[OBSERVATION]</span>
        <span>
          INT8 AWQ provides optimal Pareto frontier: 39.5% faster decode throughput than BF16 with only a 0.4%
          degradation in complex JSON tool calling schema compliance. INT4 quantization leads to a 12.8% syntax error
          spike in multi-parameter tool calls.
        </span>
      </div>
    </div>
  );
}
