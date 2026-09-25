"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "./container";
import { footerNav } from "@/config/nav";

export function Footer() {
  const pathname = usePathname();

  // Hide the collaboration invitation & site footer across all lab section routes
  if (pathname?.startsWith("/lab")) {
    return null;
  }
  return (
    <footer
      role="contentinfo"
      className="w-full border-t mt-auto transition-colors duration-200 border-[#2D161C] bg-[#0C0608] text-[#F5EBE1]"
    >
      <Container width="wide">
        {/* Editorial "LET'S CREATE SOMETHING Amazing" Banner from Reference */}
        <div className="py-14 sm:py-20 border-b border-[#2D161C]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Headline & Cursive "Amazing" */}
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D9C7B8]/70 block">
                COLLABORATION INVITATION
              </span>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#F5EBE1] tracking-wide uppercase leading-tight">
                LET&apos;S CREATE
                <br />
                SOMETHING
              </h2>
              <div className="font-script text-5xl sm:text-6xl text-[#DF7987] leading-none pt-1">
                Amazing
              </div>
            </div>

            {/* Middle: Open status & Message dispatch */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-4 sm:p-5 rounded-lg border border-[#3D1E25] bg-[#140A0D] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DF7987] animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#F5EBE1] font-semibold">
                    I&apos;M CURRENTLY OPEN FOR NEW PROJECTS
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-[#D9C7B8] leading-relaxed">
                  Let&apos;s build something impactful, stateful, and enduring together.
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:ashishdhankecha256@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#801D2C] hover:bg-[#A6263A] text-[#F5EBE1] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
                  >
                    <span>Send Me a Message</span>
                    <span className="text-[#F5EBE1] group-hover:translate-x-0.5 transition-transform">✦</span>
                  </a>
                </div>
              </div>

              {/* Direct channels with icons */}
              <div className="space-y-2 text-xs font-mono text-[#D9C7B8]">
                <a
                  href="mailto:ashishdhankecha256@gmail.com"
                  className="flex items-center gap-2.5 hover:text-[#DF7987] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#DF7987]" />
                  <span>ashishdhankecha256@gmail.com</span>
                </a>
                <a
                  href="https://github.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#DF7987] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#DF7987]" />
                  <span>github.com/Ashish-Dhankecha</span>
                </a>
                <div className="flex items-center gap-2.5 text-[#8E7C79]">
                  <span className="text-xs">🌐</span>
                  <span>Gujarat, India &middot; Worldwide</span>
                </div>
              </div>
            </div>

            {/* Right: User's Framed Portrait Photo */}
            <div className="lg:col-span-3 flex justify-start lg:justify-end">
              <div className="relative group p-1.5 rounded-xl border border-[#3D1E25] bg-[#160B0F] shadow-xl overflow-hidden max-w-[220px]">
                <div className="relative w-48 h-56 rounded-lg overflow-hidden bg-[#1A0C11]">
                  <Image
                    src="/images/ashish-transparent.png"
                    alt="Ashish Dhankecha"
                    width={192}
                    height={224}
                    className="w-full h-full object-contain object-bottom filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0608]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-[#F5EBE1]">
                    <span className="font-semibold tracking-wider">ASHISH D.</span>
                    <span className="text-[#DF7987]">✦ 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Nav Row */}
        <div className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ul className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono uppercase tracking-wider text-[#D9C7B8]">
            {footerNav.internal.map((item, idx) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="transition-colors flex items-center gap-1.5 hover:text-[#DF7987]"
                >
                  <span className="text-[10px] text-[#8E7C79] font-mono">
                    0{idx + 1}
                  </span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 text-[#D9C7B8]">
            <a
              href="https://github.com/Ashish-Dhankecha"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:text-[#F5EBE1] hover:bg-[#200F15] transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:text-[#F5EBE1] hover:bg-[#200F15] transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:ashishdhankecha256@gmail.com"
              aria-label="Email Ashish Dhankecha"
              className="p-2.5 rounded-full border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:text-[#F5EBE1] hover:bg-[#200F15] transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Centered Editorial Thank You Banner from Reference */}
        <div className="py-6 border-t border-[#2D161C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E7C79]">
          <p className="font-mono text-[11px] text-center sm:text-left">
            &copy; 2026 Ashish Dhankecha &middot; AI Systems Architecture &middot; Haute Tech Editorial Theme
          </p>
          <div className="font-mono text-xs flex items-center gap-2 text-[#DF7987] tracking-widest uppercase">
            <span>✦</span>
            <span className="text-[#F5EBE1]">THANK YOU FOR VISITING</span>
            <span>✦</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
