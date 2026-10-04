import { SiteMetadata } from "@/types/content";

export const siteConfig: SiteMetadata = {
  name: "Ashish Labs",
  title: "Ashish Dhankecha — AI Developer & Systems Builder | Ashish Labs",
  description:
    "Personal build lab of Ashish Dhankecha — AI Developer & Systems Builder. Building AI systems, software, automation, and products from first principles. I WILL MAKE IT HAPPEN. No matter what.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://ashishdhankecha.com",
  author: {
    name: "Ashish Dhankecha",
    github: "Ashish-Dhankecha",
    twitter: "Ashishdhankecha",
  },
};
