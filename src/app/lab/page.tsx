import React, { Suspense } from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { LabHero } from "@/components/lab/lab-hero";
import { LabArchiveIndexVisual } from "@/components/lab/lab-archive-index-visual";
import { ProjectIndex } from "@/components/lab/project-index";
import { LabCatalogInteractive } from "@/components/lab/lab-catalog-interactive";
import { getLabMetrics, getAllProjects, getAllLabPieces } from "@/lib/lab";

export const metadata: Metadata = {
  title: "The Lab — Technical Research & Engineering Notebook | Ashish Dhankecha",
  description:
    "An authoritative research archive of 62 technical notes, failure analyses, and architectural decisions from Ashi, LEO, and VANI. Zero marketing claims.",
  openGraph: {
    title: "The Lab — Technical Research & Engineering Notebook",
    description:
      "An authoritative research archive of 62 technical notes, failure analyses, and architectural decisions from Ashi, LEO, and VANI.",
  },
};

export default function LabPage() {
  const metrics = getLabMetrics();
  const projects = getAllProjects();
  const allPieces = getAllLabPieces();

  return (
    <div className="w-full flex flex-col flex-1 bg-[#070A0F] text-[#F8FAFC]">
      {/* 01 Hero Section */}
      <LabHero metrics={metrics} />

      {/* Main Container */}
      <Container width="wide">
        {/* 02 Top Archival Visualization Index (User Refinement #10) */}
        <LabArchiveIndexVisual
          metrics={metrics}
          projects={projects}
        />

        {/* 03 Primary Project Directory (User Refinement #9: LAB -> PROJECTS -> CONTENT) */}
        <ProjectIndex projects={projects} />

        {/* 04 Interactive Full Chronological Archive Catalog */}
        <Suspense
          fallback={
            <div className="py-12 text-center font-mono text-xs text-[#777777]">
              INITIALIZING ARCHIVE SEARCH INDEX...
            </div>
          }
        >
          <LabCatalogInteractive
            initialPieces={allPieces}
            metrics={metrics}
          />
        </Suspense>
      </Container>
    </div>
  );
}
