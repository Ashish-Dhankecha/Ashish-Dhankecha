import { Metadata } from "next";
import { SpecRegister } from "@/components/spec/register";
import { ProgramFigure } from "@/components/spec/program-figure";

export const metadata: Metadata = {
  title: "Specifications | Ashish Labs",
  description:
    "Four AI systems by Ashish Dhankecha, each filed with its architecture, claims, decisions and failures: ÆON, SIH26117, Vani and Leo.",
  alternates: { canonical: "https://ashishdhankecha.com/projects" },
};

export default function ProjectsIndexPage() {
  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] pt-16">
      <div className="sheet">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--ink)] py-3 numeral text-xs sm:text-sm">
          <span>Ashish Labs / Specifications</span>
          <span>4 on file</span>
        </div>
        <div className="[container-type:inline-size] mt-6 sm:mt-8"><h1 className="display -ml-[0.03em] text-[16.5cqw]">Specifications</h1></div>
      </div>
      <div className="sheet grid grid-cols-1 lg:grid-cols-12 gap-x-10 mt-8">
        <p className="lg:col-span-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug pb-10 max-w-[36ch]">
          Every system I have built, filed the same way: a drawn architecture, numbered claims backed by measurements, the
          decisions and what they cost, and every deficiency left on the record.
        </p>
        <figure className="lg:col-span-7 -mx-[var(--gutter)] lg:mx-0 lg:-mr-[var(--gutter)] field-cobalt p-5 sm:p-8">
          <ProgramFigure />
          <figcaption className="sr-only">FIG. 0: the program on one time axis.</figcaption>
        </figure>
      </div>
      <div className="sheet py-16 sm:py-20">
        <SpecRegister />
      </div>
    </div>
  );
}
