import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/data/projects";
import { ProjectPageView } from "@/components/projects/project-page-view";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ashish Labs",
    };
  }

  const title = `${project.title} — ${project.subtitle} | Technical Case Study`;
  const description = project.summary;
  const canonicalUrl = `https://ashishlabs.com/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Ashish Labs",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <ProjectPageView
      project={project}
      previousProject={previous}
      nextProject={next}
    />
  );
}
