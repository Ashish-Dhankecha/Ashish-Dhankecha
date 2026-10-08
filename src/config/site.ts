import { SiteMetadata } from "@/types/content";

export const siteConfig: SiteMetadata = {
  name: "Ashish Labs",
  title: "Ashish Dhankecha — AI Developer & Systems Builder | Ashish Labs",
  description:
    "AI systems built and filed with their evidence. Cognitive OS architecture, local LLM inference, and published audits. Ashish Dhankecha, Computer Engineering, Surat.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://ashishdhankecha.com",
  author: {
    name: "Ashish Dhankecha",
    github: "Ashish-Dhankecha",
    twitter: "Ashishdhankecha",
  },
};
