"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "./container";
import { footerNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function Footer() {
  const pathname = usePathname();
  const isLab = pathname?.startsWith("/lab");

  return (
    <footer
      role="contentinfo"
      className="w-full border-t mt-auto transition-colors duration-200 border-[#1E293B] bg-[#070A0F] text-[#F8FAFC]"
    >
      <Container width="wide">
        {/* Main Footer Row */}
        <div className="py-12 sm:py-16 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Identity & Subtext */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#0E1420] border border-[#1E293B] flex items-center justify-center text-cyber-cyan">
                <Terminal className="w-3 h-3" />
              </div>
              <h2 className="font-sans text-xl font-bold tracking-tight text-white">
                {siteConfig.name}
              </h2>
              {isLab && (
                <span className="px-2 py-0.5 rounded border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan font-mono text-[9px] uppercase tracking-widest font-semibold">
                  TECHNICAL ARCHIVE
                </span>
              )}
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
              AI Systems Engineer{" "}
              <span className="text-slate-600 px-1">&middot;</span>{" "}
              Autonomous Runtimes
            </p>
            <p className="text-xs font-sans leading-relaxed text-slate-400">
              Engineering reliable, deterministic, auditable agentic operating systems,
              spec-driven execution harnesses, and hardware-accelerated computer vision runtimes.
            </p>
          </div>

          {/* Links & Socials */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-12">
            {/* Nav links */}
            <ul className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono uppercase tracking-wider text-slate-400">
              {footerNav.internal.map((item, idx) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="transition-colors flex items-center gap-1.5 hover:text-cyber-cyan"
                  >
                    <span className="text-[10px] text-slate-600 font-mono">
                      0{idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-8 border-[#1E293B] text-slate-400">
              <a
                href="https://github.com/Ashish-Dhankecha"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded border border-[#1E293B] bg-[#0E1420] hover:border-cyber-cyan hover:text-cyber-cyan hover:bg-[#151D2A] transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded border border-[#1E293B] bg-[#0E1420] hover:border-cyber-cyan hover:text-cyber-cyan hover:bg-[#151D2A] transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:ashishdhankecha256@gmail.com"
                aria-label="Email Ashish Dhankecha"
                className="p-2.5 rounded border border-[#1E293B] bg-[#0E1420] hover:border-cyber-cyan hover:text-cyber-cyan hover:bg-[#151D2A] transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-[#1E293B] text-slate-500">
          <p className="font-mono text-[11px]">
            &copy; 2026 Ashish Dhankecha. Built with Next.js, TypeScript &amp; Dark Obsidian Theme.
          </p>
          <div className="font-mono text-xs flex items-center gap-3 sm:gap-4 text-slate-400">
            <span className="text-cyber-cyan font-semibold">KERNEL: RUNNING</span>
            <span className="text-slate-700">&middot;</span>
            <span>SPEC: DETERMINISTIC</span>
            <span className="text-slate-700">&middot;</span>
            <span>EVALS: VERIFIED</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
