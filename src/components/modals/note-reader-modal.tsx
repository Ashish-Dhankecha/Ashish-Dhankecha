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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className="relative w-full max-w-3xl bg-[#F3F0E8] border border-[#111111] shadow-2xl p-6 sm:p-10 md:p-12 my-auto max-h-[90vh] overflow-y-auto text-[#111111] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#173B70] font-semibold">
              {note.issue}
            </span>
            <span className="text-[#D8D4CB]">&middot;</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#555555]">
              {note.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            className="p-1.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F3F0E8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B70]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Note Metadata Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#555555]">
            <span>{note.date}</span>
            <span>&middot;</span>
            <span>{note.readTime}</span>
            <span>&middot;</span>
            <span className="text-[#173B70] font-medium bg-[#EDE8DE] px-2 py-0.5 border border-[#D8D4CB]">
              {note.statusLabel}
            </span>
          </div>

          <h2
            id="note-reader-title"
            className="font-display text-3xl sm:text-4xl text-[#111111] font-light leading-tight"
          >
            {note.title}
          </h2>

          <p className="font-display italic text-lg sm:text-xl text-[#555555] leading-relaxed">
            {note.subtitle}
          </p>
        </div>

        {/* Separator Rule */}
        <div className="w-full h-[1px] bg-[#111111] mb-8" />

        {/* Note Body */}
        <div className="prose prose-neutral max-w-none space-y-6 flex-1 text-sm sm:text-base leading-relaxed text-[#111111]">
          {/* Authentic Draft Disclaimer Banner */}
          <div className="p-4 bg-[#EDE8DE] border-l-2 border-[#173B70] text-xs font-mono text-[#555555] space-y-1">
            <p className="font-semibold text-[#111111] uppercase tracking-wider">
              AUTHOR&apos;S WORKING NOTE // AUDIT LOG
            </p>
            <p>
              This dispatch is an active engineering working paper by Ashish Dhankecha. It outlines current architecture hypotheses, state constraints, and observed failure modes under study.
            </p>
          </div>

          {note.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              {sec.heading && (
                <h3 className="font-display text-xl text-[#111111] font-normal pt-2">
                  {sec.heading}
                </h3>
              )}
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-[#111111] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Rule */}
        <div className="w-full h-[1px] bg-[#D8D4CB] mt-10 mb-6" />

        {/* Previous / Next & Close Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            {prevNote ? (
              <button
                type="button"
                onClick={() => onSelectNote(prevNote)}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 border border-[#D8D4CB] hover:border-[#111111] text-[#111111] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Note</span>
              </button>
            ) : (
              <span className="text-[#8B8579] py-1.5 px-3 border border-transparent">
                First Dispatch
              </span>
            )}

            {nextNote ? (
              <button
                type="button"
                onClick={() => onSelectNote(nextNote)}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 border border-[#D8D4CB] hover:border-[#111111] text-[#111111] transition-colors"
              >
                <span>Next Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[#8B8579] py-1.5 px-3 border border-transparent">
                Latest Dispatch
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-2 px-6 border border-[#111111] bg-[#111111] text-[#F3F0E8] hover:bg-[#173B70] hover:border-[#173B70] uppercase tracking-wider transition-colors text-center"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
