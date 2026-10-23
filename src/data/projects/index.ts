import { ProjectCaseStudy } from "@/types/project-case-study";
import { ashiCaseStudy } from "./ashi";
import { leoCaseStudy } from "./leo";
import { vaniCaseStudy } from "./vani";
import { sihCaseStudy } from "./sih";

export const allProjects: ProjectCaseStudy[] = [
  ashiCaseStudy,
  sihCaseStudy,
  vaniCaseStudy,
  leoCaseStudy,
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  const s = slug.toLowerCase();
  return allProjects.find(
    (p) =>
      p.slug === s ||
      p.id === s ||
      ((s === "ashi" || s === "aeon" || s === "æon") && (p.slug === "ashi" || p.id === "ashi"))
  );
}

export function getAllProjectSlugs(): string[] {
  return [...allProjects.map((p) => p.slug), "aeon"];
}

export function getAdjacentProjects(currentSlug: string): {
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
} {
  const norm = currentSlug.toLowerCase();
  const index = allProjects.findIndex(
    (p) =>
      p.slug === norm ||
      p.id === norm ||
      ((norm === "aeon" || norm === "æon" || norm === "ashi") &&
        (p.slug === "ashi" || p.id === "ashi"))
  );
  if (index === -1) {
    return { previous: null, next: null };
  }
  const previous = index > 0 ? allProjects[index - 1] : null;
  const next = index < allProjects.length - 1 ? allProjects[index + 1] : null;
  return { previous, next };
}

export { ashiCaseStudy, leoCaseStudy, vaniCaseStudy, sihCaseStudy };
