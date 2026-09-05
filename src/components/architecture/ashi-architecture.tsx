"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  spec: string;
  type: "state" | "cognition" | "kernel" | "dispatch" | "verification";
}

const NODES: Record<string, ArchitectureNode> = {
  memory: {
    id: "memory",
    name: "MEMORY",
    role: "State & Trace Ledger",
    spec: "Append-only cryptographic event graph & episodic recall",
    type: "state",
  },
  planning: {
    id: "planning",
    name: "PLANNING",
    role: "Goal Decomposition",
    spec: "Multi-step hypothesis tree & self-critique heuristics",
    type: "cognition",
  },
  ashi: {
    id: "ashi",
    name: "ASHI",
    role: "Autonomous Kernel",
    spec: "Deterministic state machine & coordinator loop",
    type: "kernel",
  },
  tools: {
    id: "tools",
    name: "TOOLS",
    role: "Environment Abstraction",
    spec: "Typed interface registry with schema validation",
    type: "dispatch",
  },
  execution: {
    id: "execution",
    name: "EXECUTION",
    role: "Sandboxed Dispatch",
    spec: "Isolated Linux process boundary with resource limits",
    type: "dispatch",
  },
  evaluation: {
    id: "evaluation",
    name: "EVALUATION",
    role: "Invariant Verifier",
    spec: "External deterministic checker & failure analyzer",
    type: "verification",
  },
};

export function AshiArchitectureDiagram({ className }: { className?: string }) {
  const [activeNode, setActiveNode] = useState<string>("ashi");

  const selectedNode = NODES[activeNode] || NODES.ashi;

  return (
    <div
      className={cn(
        "border border-[#111111] bg-[#EDE8DE]/40 p-5 sm:p-7 relative select-none",
        className
      )}
    >
      {/* Top Architectural Plate Header */}
      <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-3 text-[10px] font-mono tracking-widest text-[#555555] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#173B70]" />
          <span className="text-[#111111] font-semibold">FIG. 02A // ARCHITECTURAL SCHEMATIC</span>
        </div>
        <span>SCALE: 1:1 STATE FLOW</span>
      </div>

      {/* Main Diagram Canvas */}
      <div className="py-6 sm:py-8 flex flex-col items-center justify-center">
        {/* Memory Node */}
        <button
          type="button"
          onClick={() => setActiveNode("memory")}
          onMouseEnter={() => setActiveNode("memory")}
          className={cn(
            "w-52 sm:w-60 py-3 px-4 border text-center transition-all duration-200 cursor-pointer",
            activeNode === "memory"
              ? "border-[#173B70] bg-[#173B70] text-[#F3F0E8] shadow-sm"
              : "border-[#111111] bg-[#F3F0E8] text-[#111111] hover:border-[#173B70]"
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
            <span>[ 01 ]</span>
            <span>STATE</span>
          </div>
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider mt-0.5">
            MEMORY
          </p>
          <p className={cn("text-[9px] font-mono mt-0.5", activeNode === "memory" ? "text-slate-200" : "text-[#555555]")}>
            Cryptographic Event Ledger
          </p>
        </button>

        {/* Bi-directional Connector: Memory ↕ Planning */}
        <div className="flex flex-col items-center my-1">
          <div className="w-[1px] h-3 bg-[#111111]" />
          <div className="flex items-center gap-1 font-mono text-[9px] text-[#555555]">
            <span>▲</span>
            <span className="text-[8px] tracking-tighter">RECALL / SYNC</span>
            <span>▼</span>
          </div>
          <div className="w-[1px] h-3 bg-[#111111]" />
        </div>

        {/* Planning Node */}
        <button
          type="button"
          onClick={() => setActiveNode("planning")}
          onMouseEnter={() => setActiveNode("planning")}
          className={cn(
            "w-52 sm:w-60 py-3 px-4 border text-center transition-all duration-200 cursor-pointer",
            activeNode === "planning"
              ? "border-[#173B70] bg-[#173B70] text-[#F3F0E8] shadow-sm"
              : "border-[#111111] bg-[#F3F0E8] text-[#111111] hover:border-[#173B70]"
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
            <span>[ 02 ]</span>
            <span>REASONING</span>
          </div>
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider mt-0.5">
            PLANNING
          </p>
          <p className={cn("text-[9px] font-mono mt-0.5", activeNode === "planning" ? "text-slate-200" : "text-[#555555]")}>
            Goal Synthesis &amp; Tree Search
          </p>
        </button>

        {/* Connector: Planning ↓ Ashi */}
        <div className="flex flex-col items-center my-1">
          <div className="w-[1px] h-4 bg-[#111111]" />
          <span className="font-mono text-[9px] text-[#111111]">▼</span>
        </div>

        {/* Ashi Kernel Node (Center) */}
        <button
          type="button"
          onClick={() => setActiveNode("ashi")}
          onMouseEnter={() => setActiveNode("ashi")}
          className={cn(
            "w-64 sm:w-72 py-4 px-6 border-2 text-center transition-all duration-200 relative",
            activeNode === "ashi"
              ? "border-[#173B70] bg-[#111111] text-[#F3F0E8] shadow-md ring-2 ring-[#173B70]/30"
              : "border-[#111111] bg-[#F3F0E8] text-[#111111] hover:border-[#173B70]"
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#D8D4CB]">
            <span>CORE KERNEL</span>
            <span className="text-[#173B70] font-bold">● ACTIVE</span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-light tracking-tight mt-1 text-[#F3F0E8]">
            ASHI
          </h4>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#A5B4C7] mt-0.5">
            Autonomous Operating Runtime
          </p>
        </button>

        {/* Diagonal Fork Connectors: Ashi ↙ ↘ Tools & Execution */}
        <div className="relative w-72 sm:w-80 h-10 mt-1">
          {/* SVG connectors */}
          <svg className="w-full h-full" viewBox="0 0 320 40" fill="none">
            <path
              d="M160 0 L160 12 L70 12 L70 36"
              stroke="#111111"
              strokeWidth="1"
              strokeDasharray={activeNode === "tools" ? "3 3" : undefined}
            />
            <polygon points="67,34 73,34 70,39" fill="#111111" />
            <path
              d="M160 0 L160 12 L250 12 L250 36"
              stroke="#111111"
              strokeWidth="1"
              strokeDasharray={activeNode === "execution" ? "3 3" : undefined}
            />
            <polygon points="247,34 253,34 250,39" fill="#111111" />
          </svg>
        </div>

        {/* Bottom Dual Nodes: Tools & Execution */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md mt-1">
          {/* Tools */}
          <button
            type="button"
            onClick={() => setActiveNode("tools")}
            onMouseEnter={() => setActiveNode("tools")}
            className={cn(
              "py-3 px-3.5 border text-center transition-all duration-200 cursor-pointer",
              activeNode === "tools"
                ? "border-[#173B70] bg-[#173B70] text-[#F3F0E8] shadow-sm"
                : "border-[#111111] bg-[#F3F0E8] text-[#111111] hover:border-[#173B70]"
            )}
          >
            <div className="text-[9px] font-mono tracking-widest">[ 03A ]</div>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider mt-0.5">
              TOOLS
            </p>
            <p className={cn("text-[9px] font-mono mt-0.5", activeNode === "tools" ? "text-slate-200" : "text-[#555555]")}>
              Validated Schemas
            </p>
          </button>

          {/* Execution */}
          <button
            type="button"
            onClick={() => setActiveNode("execution")}
            onMouseEnter={() => setActiveNode("execution")}
            className={cn(
              "py-3 px-3.5 border text-center transition-all duration-200 cursor-pointer",
              activeNode === "execution"
                ? "border-[#173B70] bg-[#173B70] text-[#F3F0E8] shadow-sm"
                : "border-[#111111] bg-[#F3F0E8] text-[#111111] hover:border-[#173B70]"
            )}
          >
            <div className="text-[9px] font-mono tracking-widest">[ 03B ]</div>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider mt-0.5">
              EXECUTION
            </p>
            <p className={cn("text-[9px] font-mono mt-0.5", activeNode === "execution" ? "text-slate-200" : "text-[#555555]")}>
              Linux Sandboxes
            </p>
          </button>
        </div>

        {/* Convergence Connector to Evaluation */}
        <div className="relative w-72 sm:w-80 h-10 mt-1">
          <svg className="w-full h-full" viewBox="0 0 320 40" fill="none">
            <path
              d="M70 0 L70 16 L160 16 L160 36"
              stroke="#111111"
              strokeWidth="1"
              strokeDasharray={activeNode === "evaluation" ? "3 3" : undefined}
            />
            <path
              d="M250 0 L250 16 L160 16"
              stroke="#111111"
              strokeWidth="1"
            />
            <polygon points="157,34 163,34 160,39" fill="#111111" />
          </svg>
        </div>

        {/* Evaluation Node */}
        <button
          type="button"
          onClick={() => setActiveNode("evaluation")}
          onMouseEnter={() => setActiveNode("evaluation")}
          className={cn(
            "w-52 sm:w-60 py-3 px-4 border text-center transition-all duration-200 cursor-pointer mt-1",
            activeNode === "evaluation"
              ? "border-[#173B70] bg-[#173B70] text-[#F3F0E8] shadow-sm"
              : "border-[#111111] bg-[#F3F0E8] text-[#111111] hover:border-[#173B70]"
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
            <span>[ 04 ]</span>
            <span>VERIFICATION</span>
          </div>
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider mt-0.5">
            EVALUATION
          </p>
          <p className={cn("text-[9px] font-mono mt-0.5", activeNode === "evaluation" ? "text-slate-200" : "text-[#555555]")}>
            Deterministic Assertions
          </p>
        </button>
      </div>

      {/* Dynamic Sub-plate Inspector for the selected node */}
      <div className="mt-4 pt-3 border-t border-[#D8D4CB] bg-[#F3F0E8] p-3 sm:p-4 border border-[#D8D4CB]">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#173B70] font-semibold">
            NODE SPECIFICATION &middot; {selectedNode.name}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#555555]">
            LAYER: {selectedNode.role}
          </span>
        </div>
        <p className="text-xs text-[#111111] font-sans mt-1.5 leading-relaxed">
          {selectedNode.spec}
        </p>
      </div>
    </div>
  );
}
