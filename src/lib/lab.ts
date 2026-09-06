import labDataRaw from "@/content/lab-generated.json";
import {
  LabPayload,
  LabMetrics,
  LabProject,
  LabPiece,
} from "@/types/lab";

const labData = labDataRaw as unknown as LabPayload;

/**
 * Returns dynamically computed archive metrics (total pieces, by project, by type).
 * UI components must consume this instead of hard-coding counts.
 */
export function getLabMetrics(): LabMetrics {
  return labData.metrics;
}

/**
 * Returns all ingested projects (Ashi, LEO, VANI).
 */
export function getAllProjects(): LabProject[] {
  return labData.projects;
}

/**
 * Retrieves a specific project dossier by its slug ('ashi', 'leo', 'vani').
 */
export function getProjectBySlug(slug: string): LabProject | undefined {
  const norm = slug.toLowerCase().trim();
  return labData.projects.find(
    (p) => p.id.toLowerCase() === norm || p.short_name.toLowerCase() === norm
  );
}

/**
 * Returns all 62 ingested pieces, ordered by project and file sequence.
 */
export function getAllLabPieces(): LabPiece[] {
  return labData.pieces;
}

/**
 * Retrieves a single content piece by slug.
 */
export function getLabPieceBySlug(slug: string): LabPiece | undefined {
  const norm = slug.toLowerCase().trim();
  return labData.pieces.find((p) => p.slug.toLowerCase() === norm);
}

/**
 * Retrieves all pieces belonging to a specific project.
 */
export function getLabPiecesByProject(projectSlug: string): LabPiece[] {
  const norm = projectSlug.toLowerCase().trim();
  return labData.pieces.filter((p) => p.project_slug.toLowerCase() === norm);
}

/**
 * Finds related pieces from the same project as well as broader related pieces in the lab.
 */
export function getRelatedPieces(
  piece: LabPiece,
  limit: number = 3
): { sameProject: LabPiece[]; broaderLab: LabPiece[] } {
  const pieceTopics = new Set(piece.topics.map((t) => t.toLowerCase()));

  // Same project pieces
  const sameProjectCandidates = labData.pieces.filter(
    (p) => p.slug !== piece.slug && p.project_slug === piece.project_slug
  );

  // Score candidates by shared topics or matching content type
  const scoredSame = sameProjectCandidates.map((p) => {
    let score = 0;
    if (p.content_type === piece.content_type) score += 2;
    for (const t of p.topics) {
      if (pieceTopics.has(t.toLowerCase())) score += 3;
    }
    return { piece: p, score };
  });
  scoredSame.sort((a, b) => b.score - a.score || a.piece.order - b.piece.order);
  const sameProject = scoredSame.slice(0, limit).map((s) => s.piece);

  // Broader lab pieces (different projects)
  const broaderCandidates = labData.pieces.filter(
    (p) => p.slug !== piece.slug && p.project_slug !== piece.project_slug
  );
  const scoredBroader = broaderCandidates.map((p) => {
    let score = 0;
    if (p.content_type === piece.content_type) score += 2;
    for (const t of p.topics) {
      if (pieceTopics.has(t.toLowerCase())) score += 3;
    }
    return { piece: p, score };
  });
  scoredBroader.sort((a, b) => b.score - a.score || a.piece.order - b.piece.order);
  const broaderLab = scoredBroader.slice(0, limit).map((s) => s.piece);

  return { sameProject, broaderLab };
}

/**
 * Retrieves the previous and next piece within the same project for sequential reading.
 */
export function getAdjacentPiecesInProject(piece: LabPiece): {
  prev: LabPiece | null;
  next: LabPiece | null;
} {
  const projPieces = getLabPiecesByProject(piece.project_slug);
  const currentIndex = projPieces.findIndex((p) => p.slug === piece.slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? projPieces[currentIndex - 1] : null;
  const next =
    currentIndex < projPieces.length - 1 ? projPieces[currentIndex + 1] : null;

  return { prev, next };
}
