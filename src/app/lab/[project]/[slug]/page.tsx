import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ContentReader } from "@/components/lab/content-reader";
import { getAllLabPieces, getLabPieceBySlug } from "@/lib/lab";

interface Props {
  params: Promise<{ project: string; slug: string }>;
}

export async function generateStaticParams() {
  const pieces = getAllLabPieces();
  return pieces.map((p) => ({
    project: p.project_slug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = getLabPieceBySlug(slug);

  if (!piece) {
    return { title: "Archive Dispatch Not Found — Lab" };
  }

  return {
    title: `${piece.title} — ${piece.project} Lab Archive`,
    description: piece.one_line_summary,
    openGraph: {
      title: `${piece.title} — ${piece.project} Lab Archive`,
      description: piece.one_line_summary,
    },
  };
}

export default async function LabPiecePage({ params }: Props) {
  const { slug } = await params;
  const piece = getLabPieceBySlug(slug);

  if (!piece) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#070A0F] text-[#F8FAFC] pb-24">
      <Container width="wide">
        <ContentReader piece={piece} />
      </Container>
    </div>
  );
}
