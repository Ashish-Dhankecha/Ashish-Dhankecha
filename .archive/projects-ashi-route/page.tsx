import { Metadata } from "next";
import { ashiCaseStudy } from "@/data/projects/ashi";
import { AshiWorld } from "@/components/ashi-interactive/AshiWorld";

const title = "Ashi — Personal Cognitive Operating System";
const description = ashiCaseStudy.summary;
const canonicalUrl = `https://ashishlabs.com/projects/ashi`;

export const metadata: Metadata = {
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

export default function AshiInteractivePage() {
  return (
    <main className="bg-[#0a0f0d] text-[#f4ecd8] min-h-screen font-sans selection:bg-[#d4af37] selection:text-[#0a0f0d] overflow-x-hidden">
      <AshiWorld project={ashiCaseStudy} />
    </main>
  );
}
