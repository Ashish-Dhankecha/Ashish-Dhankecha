import { SiteMetadata } from "@/types/content";

export const siteConfig: SiteMetadata = {
  name: "Ashish Labs",
  title: "Ashish Labs — AI Systems Architect & First-Principles Builder | Ashish Dhankecha",
  description:
    "Ashish Labs is the personal build lab of Ashish Dhankecha — AI Systems Architect engineering autonomous cognitive architectures, local SLM inference runtimes, and verifiable stateful systems from first principles.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://ashishdhankecha.com",
  author: {
    name: "Ashish Dhankecha",
    github: "Ashish-Dhankecha",
    twitter: "Ashish-Dhankecha",
  },
};
