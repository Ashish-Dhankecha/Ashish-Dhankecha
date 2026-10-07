import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/data/projects";
import { getProjectSpec } from "@/data/projects/spec";
import { getLabPieceBySlug, getProjectBySlug as getLabProject } from "@/lib/lab";
import { ProjectSpecView } from "@/components/spec/project-spec";
import type { ProjectLink } from "@/types/project-case-study";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Specification not found | Ashish Labs" };

  const title = `${project.title}: ${project.subtitle} | Ashish Labs`;
  const description = getProjectSpec(project.slug)?.claim ?? project.summary;
  const canonicalUrl = `https://ashishdhankecha.com/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: "article", siteName: "Ashish Labs" },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Keep only links that resolve: external URLs, or Lab routes that exist. */
function resolvableLinks(links: ProjectLink[]): ProjectLink[] {
  return links.filter((l) => {
    if (/^https?:\/\//.test(l.url)) return true;
    const m = l.url.match(/^\/lab\/([^/]+)(?:\/([^/]+))?$/);
    if (!m) return true;
    const [, project, piece] = m;
    if (!getLabProject(project)) return false;
    return piece ? !!getLabPieceBySlug(piece) : true;
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const spec = project ? getProjectSpec(project.slug) : undefined;
  if (!project || !spec) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <ProjectSpecView
      project={project}
      spec={spec}
      links={resolvableLinks(project.links)}
      previous={previous}
      next={next}
    />
  );
}
