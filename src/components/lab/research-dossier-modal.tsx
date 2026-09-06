"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Cpu,
  Layers,
  ShieldCheck,
  AlertTriangle,
  FileCode2,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import { LabResearchItem } from "@/content/lab-data";

interface ResearchDossierModalProps {
  research: LabResearchItem | null;
  onClose: () => void;
}

type TabType = "overview" | "subsystems" | "execution" | "diagnosis" | "evidence";

export function ResearchDossierModal({
  research,
  onClose,
}: ResearchDossierModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!research) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [research, onClose]);

  if (!research) return null;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/lab/${research.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="research-dossier-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Dark backdrop with blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className="relative w-full max-w-5xl h-full sm:h-auto max-h-full sm:max-h-[92vh] bg-[#080C14] border-0 sm:border border-[#1E293B] shadow-2xl rounded-none my-auto overflow-y-auto text-[#F8FAFC] flex flex-col z-10 selection:bg-[#0284C7] selection:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Plate */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1E293B] bg-[#0A0E17]/95 backdrop-blur-md px-3 sm:px-8 py-2.5 sm:py-3.5">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#94A3B8]">
            <span className="text-[#38BDF8] font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
              {research.code}
            </span>
            <span className="text-[#334155]">&middot;</span>
            <span className="px-2 py-0.5 border border-[#0284C7]/40 bg-[#0284C7]/10 text-[#38BDF8] text-[9px] sm:text-[10px] font-semibold">
              {research.contentType}
            </span>
            <span className="text-[#334155] hidden sm:inline">&middot;</span>
            <span className="text-[#CBD5E1] hidden sm:inline">PROJECT: {research.project}</span>
            <span className="text-[#334155] hidden md:inline">&middot;</span>
            <span className="text-amber-400 hidden md:inline flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              STATUS: {research.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy link to this research"
              className="p-2 border border-[#334155] bg-[#111726] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8] transition-colors font-mono text-[11px] flex items-center gap-1.5 px-2.5 min-h-[40px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SHARE</span>
                </>
              )}
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close research dossier"
              className="p-2 border border-[#334155] bg-[#111726] text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-4 sm:px-8 md:px-10 pt-8 pb-6 border-b border-[#1E293B] bg-gradient-to-b from-[#0C1220] to-[#080C14]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {research.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 font-mono text-[10px] text-[#38BDF8] bg-[#0284C7]/10 border border-[#0284C7]/30 tracking-wide"
                >
                  #{topic}
                </span>
              ))}
            </div>

            <h1
              id="research-dossier-title"
              className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-tight"
            >
              {research.title}
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-4xl border-l-2 border-[#38BDF8] pl-3 py-0.5">
              {research.oneLineSummary}
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-2.5 border border-[#1E293B] bg-[#0A0E17]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">BOOT TIMING</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  {research.whatHappened.bootTime}
                </span>
              </div>
              <div className="p-2.5 border border-[#1E293B] bg-[#0A0E17]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">OS SUBSYSTEMS</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-[#38BDF8] flex items-center gap-1.5 mt-0.5">
                  <Cpu className="w-3.5 h-3.5" />
                  9 Core Subsystems
                </span>
              </div>
              <div className="p-2.5 border border-[#1E293B] bg-[#0A0E17]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">EVIDENCE TRACES</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-[#CBD5E1] flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                  12 Primary Sources
                </span>
              </div>
              <div className="p-2.5 border border-[#1E293B] bg-[#0A0E17]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">EVALUATION SCORE</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-amber-400 flex items-center gap-1.5 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                  5.0 / 5.0 (High Depth)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="flex items-center border-b border-[#1E293B] bg-[#0A0E17] px-3 sm:px-8 overflow-x-auto scrollbar-none touch-pan-x">
          {[
            { id: "overview" as TabType, label: "01 // CONTEXT & PROBLEM" },
            { id: "subsystems" as TabType, label: "02 // OS ARCHITECTURE & LAYERS" },
            { id: "execution" as TabType, label: "03 // EXECUTION & BOOT LOG" },
            { id: "diagnosis" as TabType, label: "04 // DIAGNOSIS & PRINCIPLES" },
            { id: "evidence" as TabType, label: "05 // EVIDENCE & REFERENCES" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 sm:px-4 font-mono text-[11px] sm:text-xs whitespace-nowrap border-b-2 transition-all font-semibold min-h-[44px] flex items-center ${
                activeTab === tab.id
                  ? "border-[#38BDF8] text-[#38BDF8] bg-[#0C1220]"
                  : "border-transparent text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0C1220]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Tab Content */}
        <div className="p-4 sm:p-8 md:p-10 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Vision Callout Box */}
              <div className="p-5 sm:p-6 border border-[#0284C7]/40 bg-[#0284C7]/5 relative overflow-hidden">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>PROJECT VISION DECLARATION (docs/00_VISION.md)</span>
                </div>
                <blockquote className="font-mono text-sm sm:text-base text-[#F8FAFC] leading-relaxed italic border-l-2 border-[#38BDF8] pl-4 my-2">
                  &ldquo;LEO IS: <strong className="text-[#38BDF8] font-bold">A Cognitive Operating System.</strong> It is explicitly stated NOT to be: a chatbot, an AI assistant wrapper, a prompt collection, or an agent framework.&rdquo;
                </blockquote>
                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                  {research.context.description}
                </p>
              </div>

              {/* The Question */}
              <div className="p-5 sm:p-6 border border-[#1E293B] bg-[#0A0E17]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>THE CENTRAL RESEARCH QUESTION</span>
                </div>
                <h3 className="font-mono text-base sm:text-lg text-[#F8FAFC] font-semibold leading-relaxed">
                  {research.question}
                </h3>
              </div>

              {/* Scorecard Matrix */}
              <div className="border border-[#1E293B] bg-[#0A0E17] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    RESEARCH CONTENT VALUE ASSESSMENT
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    OVERALL: {research.contentValue.overall}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Technical Depth", val: research.contentValue.technicalDepth },
                    { label: "Engineering Insight", val: research.contentValue.engineeringInsight },
                    { label: "Originality", val: research.contentValue.originality },
                    { label: "Evidence Quality", val: research.contentValue.evidenceQuality },
                    { label: "Story Value", val: research.contentValue.storyValue },
                  ].map((score) => (
                    <div key={score.label} className="p-3 border border-[#1E293B] bg-[#070A0F]">
                      <span className="text-[10px] font-mono text-[#64748B] block">{score.label}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-mono text-lg font-bold text-[#F8FAFC]">{score.val}</span>
                        <span className="text-xs font-mono text-[#64748B]">/ 5</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed pt-2 border-t border-[#1E293B]/60">
                  {research.contentValue.commentary}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SUBSYSTEMS & LAYERS */}
          {activeTab === "subsystems" && (
            <div className="space-y-8 animate-fadeIn">
              {/* 9 Subsystems Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-base sm:text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#38BDF8]" />
                      Core Subsystems Architecture (Phases 26–27)
                    </h3>
                    <p className="font-sans text-xs text-[#94A3B8] mt-0.5">
                      Formal operating system components implementing execution control, memory gatekeeping, and communication buses.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {research.initialApproach.subsystems.map((sub) => (
                    <div
                      key={sub.number}
                      className="p-4 border border-[#1E293B] bg-[#0A0E17] hover:border-[#38BDF8]/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                          <span className="text-[#38BDF8] font-bold">0{sub.number} {"//"} SUBSYSTEM</span>
                          <span className="text-[#64748B] px-1.5 py-0.2 border border-[#1E293B] bg-[#070A0F] text-[9px]">
                            {sub.role}
                          </span>
                        </div>
                        <h4 className="font-mono text-sm font-semibold text-[#F8FAFC] mb-1.5">
                          {sub.name}
                        </h4>
                        <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7-Layer Hierarchy Visual Stack */}
              <div className="border border-[#1E293B] bg-[#0A0E17] p-5 sm:p-6 space-y-4">
                <h3 className="font-mono text-sm font-semibold text-[#F8FAFC] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#38BDF8]" />
                  Strict 7-Layer Dependency Hierarchy (docs/03_LAYER_ARCHITECTURE.md)
                </h3>
                <p className="font-sans text-xs text-[#94A3B8]">
                  Architectural rule: Layers must strictly flow sequentially from Client down to Models. Skipping layers is explicitly forbidden.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 pt-2">
                  {research.initialApproach.layerHierarchy.map((layer, idx) => (
                    <React.Fragment key={layer}>
                      <div className="flex-1 p-2.5 border border-[#1E293B] bg-[#0E1422] text-center font-mono text-xs">
                        <span className="text-[9px] text-[#64748B] block">L{idx + 1}</span>
                        <span className="text-[#F8FAFC] font-medium">{layer}</span>
                      </div>
                      {idx < research.initialApproach.layerHierarchy.length - 1 && (
                        <div className="hidden sm:flex items-center justify-center text-[#38BDF8] px-1">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Boot DAG Specification */}
                <div className="mt-4 p-3.5 border border-[#1E293B] bg-[#070A0F] font-mono text-xs text-[#CBD5E1] space-y-1">
                  <span className="text-[10px] text-[#38BDF8] uppercase block">BOOT SEQUENCE SPECIFICATION</span>
                  <p className="text-[#94A3B8]">{research.initialApproach.bootSequence}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXECUTION & BOOT LOG */}
          {activeTab === "execution" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Boot Success Summary */}
              <div className="p-5 sm:p-6 border border-emerald-500/30 bg-emerald-500/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    Cognitive Kernel Boot Trace (Phase 26)
                  </span>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                    BOOT TIME: 1.29 SECONDS
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  {research.whatHappened.summary}
                </p>
              </div>

              {/* Kernel Components Checklist */}
              <div className="border border-[#1E293B] bg-[#0A0E17] p-5 sm:p-6 space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] font-bold block">
                  VERIFIED KERNEL PRIMITIVES IMPLEMENTATION
                </span>
                <div className="space-y-2 font-mono text-xs text-[#CBD5E1]">
                  {research.whatHappened.kernelComponents.map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 border border-[#1E293B]/70 bg-[#070A0F]">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 28 Violation Discovery Report */}
              <div className="p-5 sm:p-6 border border-rose-500/30 bg-rose-500/5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xs text-rose-400 font-bold flex items-center gap-1.5 uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    Phase 28 Architectural Audit Discovery
                  </span>
                  <span className="font-mono text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 border border-rose-500/30">
                    281 ARCHITECTURAL VIOLATIONS
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#F8FAFC] leading-relaxed">
                  {research.whatHappened.violationFinding}
                </p>
                <div className="p-3 border border-rose-500/20 bg-[#070A0F] font-mono text-xs text-[#94A3B8]">
                  <span className="text-rose-300 block text-[10px] uppercase mb-1">AUDIT ARTIFACT</span>
                  <code>phase_28_x_2_violation_report.md</code> — Database calls completely bypassed CMMU memory bus via legacy SQLAlchemy sessions.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIAGNOSIS & PRINCIPLES */}
          {activeTab === "diagnosis" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Diagnosis Matrix: Established / Likely / Unknown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 border border-emerald-500/30 bg-emerald-500/5 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5 mb-2 uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      Established Fact
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                      {research.diagnosis.established}
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-amber-500/30 bg-amber-500/5 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1.5 mb-2 uppercase">
                      <Zap className="w-4 h-4" />
                      Likely Architectural State
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                      {research.diagnosis.likely}
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-[#334155] bg-[#0A0E17] flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs text-[#94A3B8] font-bold flex items-center gap-1.5 mb-2 uppercase">
                      <Activity className="w-4 h-4 text-[#64748B]" />
                      Unknown Validation Boundary
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {research.diagnosis.unknown}
                    </p>
                  </div>
                </div>
              </div>

              {/* What I Learned & What Changed */}
              <div className="border border-[#1E293B] bg-[#0A0E17] p-5 sm:p-6 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-bold block">
                  KEY ENGINEERING RETROSPECTIVE
                </span>
                
                <div className="space-y-4 font-sans text-xs sm:text-sm text-[#CBD5E1]">
                  <div className="p-4 border border-[#1E293B] bg-[#070A0F] space-y-1.5">
                    <span className="font-mono text-[10px] uppercase text-[#64748B] block">WHAT I LEARNED</span>
                    <p className="leading-relaxed">{research.whatILearned}</p>
                  </div>

                  <div className="p-4 border border-[#1E293B] bg-[#070A0F] space-y-1.5">
                    <span className="font-mono text-[10px] uppercase text-[#64748B] block">WHAT I WOULD DO DIFFERENTLY (HINDSIGHT)</span>
                    <p className="leading-relaxed">{research.whatIWouldDoDifferently}</p>
                  </div>
                </div>
              </div>

              {/* Broader Principle Highlight */}
              <div className="p-6 border-2 border-[#38BDF8]/40 bg-gradient-to-r from-[#0284C7]/15 to-transparent space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8] font-bold block">
                  BROADER ARCHITECTURAL PRINCIPLE
                </span>
                <p className="font-mono text-sm sm:text-base text-[#F8FAFC] font-semibold leading-relaxed">
                  &ldquo;{research.broaderPrinciple}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: EVIDENCE & REFERENCES */}
          {activeTab === "evidence" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Primary Evidence Artifacts */}
              <div className="border border-[#1E293B] bg-[#0A0E17] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    PRIMARY VERIFIED SOURCE EVIDENCE ({research.evidence.length} Artifacts)
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                    CONFIDENCE: {research.sourceConfidence.level}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {research.evidence.map((item, idx) => (
                    <div key={idx} className="p-3 border border-[#1E293B] bg-[#070A0F] space-y-1 font-mono text-xs">
                      <div className="flex items-center gap-2 text-[#38BDF8]">
                        <FileCode2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-semibold break-all">{item.file}</span>
                      </div>
                      <p className="font-sans text-[11px] text-[#94A3B8] leading-relaxed pl-5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Code References */}
              <div className="border border-[#1E293B] bg-[#0A0E17] p-5 sm:p-6 space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#CBD5E1] font-bold block">
                  TECHNICAL CODE REPOSITORY REFERENCES
                </span>
                <div className="flex flex-wrap gap-2">
                  {research.technicalReferences.map((ref, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 border border-[#334155] bg-[#070A0F] font-mono text-xs text-[#CBD5E1]"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>

              {/* Publication Notes */}
              <div className="p-4 border border-[#1E293B] bg-[#070A0F] font-mono text-xs text-[#94A3B8] flex items-center justify-between">
                <span>PUBLICATION CLEARANCE: {research.publicationNotes}</span>
                <span className="text-emerald-400 font-semibold">CLEARED FOR DISPATCH</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="border-t border-[#1E293B] bg-[#0A0E17] px-4 sm:px-8 py-4 flex items-center justify-between flex-wrap gap-3 font-mono text-xs text-[#64748B]">
          <div>
            <span>SYSTEM IDENTIFIER: {research.slug}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 border border-[#334155] bg-[#111726] hover:bg-[#1E293B] text-[#F8FAFC] transition-colors"
            >
              CLOSE DISPATCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
