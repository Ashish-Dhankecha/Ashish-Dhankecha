import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProjects, getAllLabPieces } from "@/lib/lab";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const projects = getAllProjects();
  const pieces = getAllLabPieces();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteConfig.url}/lab/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const pieceUrls: MetadataRoute.Sitemap = pieces.map((piece) => ({
    url: `${siteConfig.url}/lab/${piece.project_slug}/${piece.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/lab`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
    ...pieceUrls,
  ];
}
