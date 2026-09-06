"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { EngineeringNote } from "@/content/portfolio-data";

interface NoteReaderModalProps {
  note: EngineeringNote | null;
  onClose: () => void;
  onSelectNote: (note: EngineeringNote) => void;
  allNotes: EngineeringNote[];
}

export function NoteReaderModal({
  note,
  onClose,
  onSelectNote,
  allNotes,
}: NoteReaderModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!note) return;

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
  }, [note, onClose]);

  if (!note) return null;

  const currentIndex = allNotes.findIndex((n) => n.id === note.id);
  const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
  const nextNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

  return (
    <div
      role="dialog"
      aria-labelledby="note-reader-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className="relative w-full max-w-3xl h-full sm:h-auto max-h-full sm:max-h-[90vh] bg-[#0D1117] border-0 sm:border border-[#1E293B] shadow-2xl rounded-none sm:rounded-lg p-4 sm:p-10 md:p-12 my-auto overflow-y-auto text-[#F8FAFC] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 sm:pb-4 mb-5 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono uppercase tracking-widest">
            <span className="text-cyber-cyan font-semibold">
              {note.issue}
            </span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-slate-400">
              {note.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            className="p-2 rounded border border-[#1E293B] bg-[#070A0F] text-slate-400 hover:text-white hover:border-cyber-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Metadata Header */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-slate-400">
            <span>{note.date}</span>
            <span>&middot;</span>
            <span>{note.readTime}</span>
            <span>&middot;</span>
            <span className="text-cyber-cyan font-medium bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/30">
              {note.statusLabel}
            </span>
          </div>

          <h2
            id="note-reader-title"
            className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight"
          >
            {note.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-cyber-cyan leading-relaxed">
            {note.subtitle}
          </p>
        </div>

        {/* Separator Rule */}
        <div className="w-full h-[1px] bg-[#1E293B] mb-6 sm:mb-8" />

        {/* Note Body */}
        <div className="prose prose-invert max-w-none space-y-5 sm:space-y-6 flex-1 text-sm sm:text-base leading-relaxed text-slate-300">
          {/* Authentic Draft Disclaimer Banner */}
          <div className="p-3.5 sm:p-4 rounded bg-[#070A0F] border-l-2 border-cyber-cyan text-xs font-mono text-slate-400 space-y-1">
            <p className="font-semibold text-cyber-cyan uppercase tracking-wider">
              AUTHOR&apos;S WORKING NOTE // AUDIT LOG
            </p>
            <p>
              This dispatch is an active engineering working paper by Ashish Dhankecha. It outlines current architecture hypotheses, state constraints, and observed failure modes under study.
            </p>
          </div>

          {note.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2.5 sm:space-y-3">
              {sec.heading && (
                <h3 className="font-sans text-lg sm:text-xl text-white font-semibold pt-2">
                  {sec.heading}
                </h3>
              )}
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-slate-300 leading-relaxed text-xs sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Rule */}
        <div className="w-full h-[1px] bg-[#1E293B] mt-8 sm:mt-10 mb-4 sm:mb-6" />

        {/* Previous / Next & Close Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
            {prevNote ? (
              <button
                type="button"
                onClick={() => onSelectNote(prevNote)}
                className="inline-flex items-center gap-1.5 py-2 px-3 rounded border border-[#1E293B] bg-[#070A0F] hover:border-cyber-cyan text-slate-300 hover:text-white transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Note</span>
              </button>
            ) : (
              <span className="text-slate-600 py-2 px-3 border border-transparent">
                First Dispatch
              </span>
            )}

            {nextNote ? (
              <button
                type="button"
                onClick={() => onSelectNote(nextNote)}
                className="inline-flex items-center gap-1.5 py-2 px-3 rounded border border-[#1E293B] bg-[#070A0F] hover:border-cyber-cyan text-slate-300 hover:text-white transition-colors min-h-[44px]"
              >
                <span>Next Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-slate-600 py-2 px-3 border border-transparent">
                Latest Dispatch
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan hover:text-obsidian-dark uppercase font-semibold tracking-wider transition-colors text-center min-h-[44px]"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
