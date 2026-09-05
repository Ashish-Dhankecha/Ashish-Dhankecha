import { SiteMetadata } from "@/types/content";

export const siteConfig: SiteMetadata = {
  name: "Ashish Dhankecha",
  title: "Ashish Dhankecha — AI Systems Builder",
  description:
    "Ashish Dhankecha is a Computer Engineering student building AI systems, software, and real-world projects from first principles.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://ashishdhankecha.com",
  author: {
    name: "Ashish Dhankecha",
    github: "Ashish-Dhankecha",
    twitter: "Ashish-Dhankecha",
  },
};
