import React from "react";
import Link from "next/link";
import { footerNav } from "@/config/nav";

export function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="sheet pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-5 text-[1.15rem] leading-snug max-w-[34ch]">
            AI systems built and filed with their evidence.
          </p>
          <ul className="md:col-span-3 space-y-2">
            {footerNav.internal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-bold condensed uppercase underline-offset-4 decoration-2 hover:underline">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="md:col-span-4 space-y-2">
            {footerNav.external.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="font-bold condensed uppercase underline-offset-4 decoration-2 hover:underline"
                >
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="[container-type:inline-size] mt-14">
          <p aria-hidden="true" className="display text-[20.9cqw] leading-[0.78] whitespace-nowrap -ml-[0.02em]">
            Ashish Labs
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-[color:rgb(242_242_238/0.25)] flex flex-wrap justify-between gap-3 numeral text-xs opacity-80">
          <span>© {new Date().getFullYear()} Ashish Dhankecha</span>
          <span>Every figure on this site is measured from a repository or a lab note.</span>
        </div>
      </div>
    </footer>
  );
}
