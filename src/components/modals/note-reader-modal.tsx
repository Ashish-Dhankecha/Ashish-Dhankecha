"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!note || !mounted) return null;

  const currentIndex = allNotes.findIndex((n) => n.id === note.id);
  const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
  const nextNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

  return createPortal(
    <div
      role="dialog"
      aria-labelledby="note-reader-title"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className="relative w-full max-w-3xl h-full sm:h-auto max-h-full sm:max-h-[90vh] bg-[#140A0D] border-0 sm:border border-[#2D161C] shadow-2xl rounded-none sm:rounded-xl p-4 sm:p-10 md:p-12 my-auto overflow-y-auto text-[#F5EBE1] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-b border-[#2D161C] pb-3 sm:pb-4 mb-5 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono uppercase tracking-widest">
            <span className="text-[#DF7987] font-semibold">
              {note.issue}
            </span>
            <span className="text-[#8E7C79]">&middot;</span>
            <span className="text-[#D9C7B8]">
              {note.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            className="p-2 rounded-full border border-[#2D161C] bg-[#0C0608] text-[#D9C7B8] hover:text-[#F5EBE1] hover:border-[#801D2C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#801D2C] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Metadata Header */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-[#8E7C79]">
            <span>{note.date}</span>
            <span>&middot;</span>
            <span>{note.readTime}</span>
            <span>&middot;</span>
            <span className="text-[#DF7987] font-medium bg-[#801D2C]/20 px-2 py-0.5 rounded-full border border-[#801D2C]/40">
              {note.statusLabel}
            </span>
          </div>

          <h2
            id="note-reader-title"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EBE1] tracking-tight leading-tight"
          >
            {note.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-[#DF7987] leading-relaxed">
            {note.subtitle}
          </p>
        </div>

        {/* Separator Rule */}
        <div className="w-full h-[1px] bg-[#2D161C] mb-6 sm:mb-8" />

        {/* Note Body */}
        <div className="prose prose-invert max-w-none space-y-5 sm:space-y-6 flex-1 text-sm sm:text-base leading-relaxed text-[#D9C7B8]">
          {/* Authentic Draft Disclaimer Banner */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-[#0C0608] border-l-2 border-[#801D2C] text-xs font-mono text-[#8E7C79] space-y-1">
            <p className="font-semibold text-[#DF7987] uppercase tracking-wider">
              AUTHOR&apos;S WORKING NOTE // AUDIT LOG
            </p>
            <p>
              This dispatch is an active engineering working paper by Ashish Dhankecha. It outlines current architecture hypotheses, state constraints, and observed failure modes under study.
            </p>
          </div>

          {note.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2.5 sm:space-y-3">
              {sec.heading && (
                <h3 className="font-serif text-lg sm:text-xl text-[#F5EBE1] font-semibold pt-2">
                  {sec.heading}
                </h3>
              )}
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-[#D9C7B8] leading-relaxed text-xs sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Rule */}
        <div className="w-full h-[1px] bg-[#2D161C] mt-8 sm:mt-10 mb-4 sm:mb-6" />

        {/* Previous / Next & Close Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
            {prevNote ? (
              <button
                type="button"
                onClick={() => onSelectNote(prevNote)}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full border border-[#2D161C] bg-[#0C0608] hover:border-[#801D2C] text-[#D9C7B8] hover:text-[#F5EBE1] transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Note</span>
              </button>
            ) : (
              <span className="text-[#8E7C79] py-2 px-3 border border-transparent">
                First Dispatch
              </span>
            )}

            {nextNote ? (
              <button
                type="button"
                onClick={() => onSelectNote(nextNote)}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full border border-[#2D161C] bg-[#0C0608] hover:border-[#801D2C] text-[#D9C7B8] hover:text-[#F5EBE1] transition-colors min-h-[44px]"
              >
                <span>Next Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[#8E7C79] py-2 px-3 border border-transparent">
                Latest Dispatch
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-[#801D2C] hover:bg-[#A6263A] text-[#F5EBE1] uppercase font-semibold tracking-wider transition-colors text-center min-h-[44px]"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
