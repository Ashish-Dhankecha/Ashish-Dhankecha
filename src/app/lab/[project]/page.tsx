import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ProjectDossierView } from "@/components/lab/project-dossier-view";
import { ContentReader } from "@/components/lab/content-reader";
import {
  getAllProjects,
  getProjectBySlug,
  getLabPiecesByProject,
  getAllLabPieces,
  getLabPieceBySlug,
} from "@/lib/lab";

interface Props {
  params: Promise<{ project: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  const pieces = getAllLabPieces();

  // Project dossier routes: /lab/ashi, /lab/leo, /lab/vani
  const projectParams = projects.map((p) => ({
    project: p.id,
  }));

  // Backwards compatibility for legacy flat URLs: /lab/[slug]
  const legacyPieceParams = pieces.map((piece) => ({
    project: piece.slug,
  }));

  return [...projectParams, ...legacyPieceParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: segment } = await params;
  const project = getProjectBySlug(segment);

  if (project) {
    return {
      title: `${project.name} — Project Dossier | Ashish Dhankecha Lab`,
      description: project.one_line_summary,
      openGraph: {
        title: `${project.name} — Lab Project Dossier`,
        description: project.one_line_summary,
      },
    };
  }

  const piece = getLabPieceBySlug(segment);
  if (piece) {
    return {
      title: `${piece.title} — ${piece.project} Lab Archive`,
      description: piece.one_line_summary,
      openGraph: {
        title: `${piece.title} — ${piece.project} Lab Archive`,
        description: piece.one_line_summary,
      },
    };
  }

  return { title: "Archive Record Not Found — Lab" };
}

export default async function ProjectOrPiecePage({ params }: Props) {
  const { project: segment } = await params;
  const project = getProjectBySlug(segment);

  // If it's a project dossier route
  if (project) {
    const pieces = getLabPiecesByProject(project.id);
    return (
      <div className="w-full min-h-screen bg-[#070A0F] text-[#F8FAFC] pb-24">
        <Container width="wide">
          <ProjectDossierView
            project={project}
            pieces={pieces}
            isStandalonePage={true}
          />
        </Container>
      </div>
    );
  }

  // If it's a legacy piece slug URL, render the piece or redirect
  const piece = getLabPieceBySlug(segment);
  if (piece) {
    return (
      <div className="w-full min-h-screen bg-[#070A0F] text-[#F8FAFC] pb-24">
        <Container width="wide">
          <ContentReader piece={piece} />
        </Container>
      </div>
    );
  }

  notFound();
}
