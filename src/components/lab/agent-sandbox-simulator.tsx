"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, SkipForward, CheckCircle2, Terminal, Cpu, ShieldCheck } from "lucide-react";

interface StepLog {
  id: number;
  stage: "PLAN" | "TOOL_DISPATCH" | "SANDBOX_EXEC" | "INVARIANT_CHECK" | "DAG_COMMIT";
  message: string;
  timestamp: string;
  status: "success" | "warning" | "running";
}

interface Scenario {
  id: string;
  title: string;
  objective: string;
  steps: {
    stage: "PLAN" | "TOOL_DISPATCH" | "SANDBOX_EXEC" | "INVARIANT_CHECK" | "DAG_COMMIT";
    message: string;
    details: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: "scenario-1",
    title: "DAG Event Log Integrity & Invariant Replay",
    objective: "Verify tamper-evidence of 1,420 cognitive transactions under simulated hash mutation.",
    steps: [
      {
        stage: "PLAN",
        message: "Decomposing event stream into sequential Merkle leaves.",
        details: "Loaded 1,420 transactions from cognitive_event_log.db. Computing cryptographic hashes.",
      },
      {
        stage: "TOOL_DISPATCH",
        message: "Invoking sandbox tool: `verify_merkle_continuity(tree_id='ashi-v2')`",
        details: "Dispatching isolated worker thread within ephemerally sandboxed namespace.",
      },
      {
        stage: "SANDBOX_EXEC",
        message: "Sandbox execution completed with 0 errors. Exit code: 0.",
        details: "Root digest: 0x8a9f2...e3b. All 1,420 predecessor SHA-256 links validated.",
      },
      {
        stage: "INVARIANT_CHECK",
        message: "Asserting invariant: DETERMINISTIC_REPLAY_ASSERTION == PASS",
        details: "Replay assert verified against snapshot. Zero historical drift detected.",
      },
      {
        stage: "DAG_COMMIT",
        message: "Checkpoint state committed into append-only cryptographic event graph.",
        details: "Sequence #1421 signed. State frozen for audit verification.",
      },
    ],
  },
  {
    id: "scenario-2",
    title: "Sandboxed Process Isolation & Blast-Radius Cap",
    objective: "Execute synthetic adversarial bash script to verify filesystem boundary confinement.",
    steps: [
      {
        stage: "PLAN",
        message: "Generating isolated OverlayFS scratchpad container overlay.",
        details: "Ephemeral root mount allocated at /sandbox/ephemeral-094. Host filesystem set to read-only.",
      },
      {
        stage: "TOOL_DISPATCH",
        message: "Invoking sandbox tool: `bash_exec('rm -rf /root; echo test > /sandbox/tmp')`",
        details: "Adversarial payload dispatched into trapped container namespace.",
      },
      {
        stage: "SANDBOX_EXEC",
        message: "Kernel trap intercepted forbidden write outside ephemeral container.",
        details: "Host root preserved. Ephemeral modification confined strictly to /sandbox/tmp.",
      },
      {
        stage: "INVARIANT_CHECK",
        message: "Asserting invariant: SANDBOX_ISOLATION_ASSERTION == PASS",
        details: "Host file integrity hash matched: 100.0%. Zero host leaks.",
      },
      {
        stage: "DAG_COMMIT",
        message: "Atomic rollback triggered. Ephemeral overlay discarded cleanly in 12ms.",
        details: "Clean state restored. Blast radius strictly isolated.",
      },
    ],
  },
  {
    id: "scenario-3",
    title: "Context Saturation Eviction & Lossless Distillation",
    objective: "Prevent context window saturation when tool history exceeds 85% token budget.",
    steps: [
      {
        stage: "PLAN",
        message: "Monitoring token budget: 28,450 / 32,768 tokens (86.8% capacity).",
        details: "Threshold exceeded. Initiating lossless DAG graph compaction strategy.",
      },
      {
        stage: "TOOL_DISPATCH",
        message: "Invoking compaction kernel: `summarize_event_subgraph(start=1, end=80)`",
        details: "Compressing initial 80 single-turn tool messages into verifiable state summary.",
      },
      {
        stage: "SANDBOX_EXEC",
        message: "Context compressed from 28,450 tokens down to 6,120 tokens.",
        details: "Free capacity increased to 81.3%. Key environment invariants preserved intact.",
      },
      {
        stage: "INVARIANT_CHECK",
        message: "Asserting invariant: MEMORY_SATURATION_SENTINEL == PASS",
        details: "Token count (6,120) <= 0.85 * MaxTokens. Invariant restored to green.",
      },
      {
        stage: "DAG_COMMIT",
        message: "Summary node appended to DAG with cryptographic backpointer.",
        details: "Agent continues multi-step execution loop with zero amnesia.",
      },
    ],
  },
];

export function AgentSandboxSimulator() {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<StepLog[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const scenario = scenarios[selectedScenarioIdx];

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Run loop
  useEffect(() => {
    if (!isRunning) return;

    if (currentStep < scenario.steps.length) {
      const timer = setTimeout(() => {
        const step = scenario.steps[currentStep];
        const now = new Date().toLocaleTimeString("en-US", { hour12: false });

        setLogs((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            stage: step.stage,
            message: `${step.message} — ${step.details}`,
            timestamp: now,
            status: "success",
          },
        ]);

        setCurrentStep((prev) => prev + 1);
      }, 750);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, scenario]);

  const handleRunAll = () => {
    if (currentStep >= scenario.steps.length) {
      // Reset first
      setLogs([]);
      setCurrentStep(0);
    }
    setIsRunning(true);
  };

  const handleStep = () => {
    if (currentStep < scenario.steps.length) {
      const step = scenario.steps[currentStep];
      const now = new Date().toLocaleTimeString("en-US", { hour12: false });

      setLogs((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          stage: step.stage,
          message: `${step.message} — ${step.details}`,
          timestamp: now,
          status: "success",
        },
      ]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setLogs([]);
  };

  const handleSelectScenario = (idx: number) => {
    setIsRunning(false);
    setSelectedScenarioIdx(idx);
    setCurrentStep(0);
    setLogs([]);
  };

  return (
    <div className="border border-[#2D161C] bg-[#140A0D] text-[#F5EBE1] p-5 sm:p-7 space-y-6 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2D161C] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DF7987] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#DF7987]">
              INTERACTIVE TRIAL SANDBOX
            </span>
          </div>
          <h3 className="font-mono text-base sm:text-lg font-medium text-[#F5EBE1]">
            Autonomous Agent State Execution Engine
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunAll}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#A6263A] bg-[#801D2C] hover:bg-[#A6263A] text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(128,29,44,0.3)] font-semibold"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Running..." : "Run Trial"}</span>
          </button>

          <button
            type="button"
            onClick={handleStep}
            disabled={isRunning || currentStep >= scenario.steps.length}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#2D161C] bg-[#0C0608] hover:border-[#801D2C] hover:bg-[#1F1015] text-[#D9C7B8] hover:text-[#F5EBE1] font-mono text-xs uppercase tracking-wider rounded-lg transition-all disabled:opacity-50"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Step</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-[#2D161C] bg-[#0C0608] hover:border-[#801D2C] hover:bg-[#1F1015] text-[#8E7C79] hover:text-[#DF7987] font-mono text-xs rounded-lg transition-all"
            title="Reset sandbox"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario selector tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => handleSelectScenario(idx)}
            className={`p-3 text-left border rounded-xl transition-all ${
              selectedScenarioIdx === idx
                ? "border-[#801D2C] bg-[#1F1015] text-[#F5EBE1] shadow-[0_0_16px_rgba(128,29,44,0.25)]"
                : "border-[#2D161C] bg-[#0C0608] text-[#8E7C79] hover:border-[#801D2C]/60 hover:text-[#F5EBE1]"
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] pb-1">
              <span className={selectedScenarioIdx === idx ? "text-[#DF7987] font-semibold" : "text-[#8E7C79]"}>
                TRIAL 0{idx + 1}
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 border border-[#2D161C] rounded">
                {idx === 0 ? "CRYPTOGRAPHIC" : idx === 1 ? "SANDBOX" : "COMPACTION"}
              </span>
            </div>
            <p className="font-mono text-xs font-medium line-clamp-1">{sc.title}</p>
          </button>
        ))}
      </div>

      {/* Execution Pipeline Steps */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E7C79] block">
          PIPELINE DAG STATE MACHINE
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {scenario.steps.map((st, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx && isRunning;

            return (
              <div
                key={st.stage}
                className={`p-2.5 border rounded-lg text-center transition-all ${
                  isDone
                    ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-400"
                    : isCurrent
                    ? "border-[#DF7987] bg-[#801D2C]/20 text-[#DF7987] animate-pulse font-semibold"
                    : "border-[#2D161C] bg-[#0C0608] text-[#8E7C79]"
                }`}
              >
                <div className="font-mono text-[10px] font-semibold tracking-wider">
                  0{idx + 1}: {st.stage}
                </div>
                <div className="text-[9px] font-mono pt-1 text-[#8E7C79] truncate">
                  {isDone ? "VERIFIED" : isCurrent ? "EXECUTING" : "WAITING"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Terminal & Trace Log Console */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] text-[#8E7C79]">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#DF7987]" />
            <span className="uppercase tracking-widest">LIVE TRACE LOG &amp; INVARIANT SENTINEL</span>
          </div>
          <span>
            {currentStep}/{scenario.steps.length} STAGES COMPLETED
          </span>
        </div>

        <div
          ref={logContainerRef}
          className="h-44 overflow-y-auto bg-[#0C0608] border border-[#2D161C] p-3 font-mono text-xs space-y-1.5 rounded-xl"
        >
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-[#8E7C79] text-xs">
              <span>[ Trial ready. Click &ldquo;Run Trial&rdquo; or &ldquo;Step&rdquo; to launch simulation. ]</span>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 leading-relaxed text-[#D9C7B8]">
                <span className="text-[#8E7C79] text-[10px] shrink-0 pt-0.5">[{log.timestamp}]</span>
                <span className="text-[#DF7987] text-[10px] uppercase shrink-0 font-semibold">
                  [{log.stage}]
                </span>
                <span className="text-xs break-all">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Real-time Hardware & Telemetry Readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#2D161C] pt-4 font-mono text-xs">
        <div className="flex items-center gap-2.5 p-2.5 border border-[#2D161C] bg-[#0C0608] rounded-xl">
          <Cpu className="w-4 h-4 text-[#DF7987]" />
          <div>
            <span className="text-[9px] uppercase text-[#8E7C79] block">ISOLATION KERNEL</span>
            <span className="text-[#F5EBE1]">Linux Namespace v6.8</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 border border-[#2D161C] bg-[#0C0608] rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[9px] uppercase text-[#8E7C79] block">SENTINEL ASSERTION</span>
            <span className="text-emerald-400">Deterministic Invariant OK</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 border border-[#2D161C] bg-[#0C0608] rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-[#DF7987]" />
          <div>
            <span className="text-[9px] uppercase text-[#8E7C79] block">TRACE HASH DIGEST</span>
            <span className="text-[#D9C7B8]">0x8f2c...4d9e</span>
          </div>
        </div>
      </div>
    </div>
  );
}
