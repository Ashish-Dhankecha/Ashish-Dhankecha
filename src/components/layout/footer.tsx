"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
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
      className={`w-full border-t mt-auto transition-colors duration-200 ${
        isLab
          ? "border-[#1E293B] bg-[#0A0D14] text-[#F8FAFC]"
          : "border-[#D8D4CB] bg-[#F3F0E8] text-[#111111]"
      }`}
    >
      <Container width="wide">
        {/* Main Footer Row */}
        <div className="py-14 sm:py-20 flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Identity & Subtext */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-light tracking-tight">
                {siteConfig.name}
              </h2>
              {isLab && (
                <span className="px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 font-mono text-[9px] uppercase tracking-widest">
                  EXPERIMENTAL LAB
                </span>
              )}
            </div>
            <p
              className={`font-mono text-xs uppercase tracking-wider ${
                isLab ? "text-[#94A3B8]" : "text-[#555555]"
              }`}
            >
              Computer Engineering Student{" "}
              <span className={isLab ? "text-[#334155] px-1" : "text-[#D8D4CB] px-1"}>
                &middot;
              </span>{" "}
              AI Systems Builder
            </p>
            <p
              className={`text-xs font-sans leading-relaxed ${
                isLab ? "text-[#94A3B8]" : "text-[#555555]"
              }`}
            >
              Dedicated to understanding difficult problems from first principles and engineering reliable, auditable intelligent systems.
            </p>
          </div>

          {/* Links & Socials */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-12">
            {/* Nav links */}
            <ul
              className={`flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono uppercase tracking-wider ${
                isLab ? "text-[#94A3B8]" : "text-[#555555]"
              }`}
            >
              {footerNav.internal.map((item, idx) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`transition-colors flex items-baseline gap-1 ${
                      isLab
                        ? "hover:text-[#38BDF8]"
                        : "hover:text-[#111111]"
                    }`}
                  >
                    <span className={`text-[10px] ${isLab ? "text-[#64748B]" : "text-[#8B8579]"}`}>
                      0{idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div
              className={`flex items-center gap-3 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-8 ${
                isLab ? "border-[#1E293B] text-[#94A3B8]" : "border-[#D8D4CB] text-[#555555]"
              }`}
            >
              <a
                href="https://github.com/Ashish-Dhankecha"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={`p-2 border transition-all ${
                  isLab
                    ? "border-[#1E293B] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#111726]"
                    : "border-[#D8D4CB] hover:border-[#111111] hover:text-[#111111] hover:bg-[#EDE8DE]"
                }`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`p-2 border transition-all ${
                  isLab
                    ? "border-[#1E293B] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#111726]"
                    : "border-[#D8D4CB] hover:border-[#111111] hover:text-[#111111] hover:bg-[#EDE8DE]"
                }`}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:ashishdhankecha256@gmail.com"
                aria-label="Email Ashish Dhankecha"
                className={`p-2 border transition-all ${
                  isLab
                    ? "border-[#1E293B] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#111726]"
                    : "border-[#D8D4CB] hover:border-[#111111] hover:text-[#111111] hover:bg-[#EDE8DE]"
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLab
              ? "border-[#1E293B] text-[#64748B]"
              : "border-[#D8D4CB] text-[#555555]"
          }`}
        >
          <p className="font-mono text-[11px]">&copy; 2026 Ashish Dhankecha. All rights reserved.</p>
          <div className="font-display italic text-sm flex items-center gap-4 sm:gap-6">
            <span>Learn</span>
            <span className={isLab ? "text-[#334155]" : "text-[#D8D4CB]"}>&middot;</span>
            <span>Build</span>
            <span className={isLab ? "text-[#334155]" : "text-[#D8D4CB]"}>&middot;</span>
            <span>Solve</span>
            <span className={isLab ? "text-[#334155]" : "text-[#D8D4CB]"}>&middot;</span>
            <span>Document</span>
            <span className={isLab ? "text-[#334155]" : "text-[#D8D4CB]"}>&middot;</span>
            <span>Improve</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
