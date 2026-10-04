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
  return allProjects.find((p) => p.slug === slug || p.id === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}

export function getAdjacentProjects(currentSlug: string): {
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
} {
  const index = allProjects.findIndex(
    (p) => p.slug === currentSlug || p.id === currentSlug
  );
  if (index === -1) {
    return { previous: null, next: null };
  }
  const previous = index > 0 ? allProjects[index - 1] : null;
  const next = index < allProjects.length - 1 ? allProjects[index + 1] : null;
  return { previous, next };
}

export { ashiCaseStudy, leoCaseStudy, vaniCaseStudy, sihCaseStudy };
