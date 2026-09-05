export type ItemStatus = "active" | "research" | "draft" | "archived";

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  handle?: string;
}

export interface Person {
  name: string;
  handle?: string;
  tagline: string;
  roles: string[];
  location?: string;
  bio: string[];
  socials: SocialLink[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type?: "live" | "github" | "paper" | "demo" | "external";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: number | string;
  status: ItemStatus;
  category: string;
  technologies: string[];
  links?: ProjectLink[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  highlights?: string[];
}

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  abstract?: string;
  year: number | string;
  status: "in-progress" | "published" | "note";
  topics: string[];
  externalUrl?: string;
  pdfUrl?: string;
  notes?: string[];
}

export interface WritingItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readTime?: string;
  tags: string[];
  externalUrl?: string;
  canonicalUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage?: string;
  author: {
    name: string;
    twitter?: string;
    github?: string;
  };
}
