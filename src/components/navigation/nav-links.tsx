"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  className?: string;
  onNavigate?: () => void;
}

export function NavLinks({ className, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const isLab = pathname?.startsWith("/lab");

  return (
    <nav
      aria-label="Main Navigation"
      className={cn("flex items-center gap-5 lg:gap-7", className)}
    >
      {mainNav.map((item) => {
        const isItemActive =
          item.href === "/lab"
            ? isLab
            : pathname === "/" && (item.href === "/#home" || item.href === "#home");

        const isLabItem = item.href === "/lab";

        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative inline-flex items-baseline gap-1 text-xs transition-colors py-1 select-none",
              isLab
                ? isItemActive
                  ? "text-[#38BDF8] font-medium"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
                : isLabItem
                ? "text-[#173B70] font-medium hover:text-[#111111]"
                : "text-[#555555] hover:text-[#111111]"
            )}
          >
            {item.index && (
              <span
                className={cn(
                  "font-mono text-[10px] transition-colors",
                  isLab
                    ? isItemActive
                      ? "text-[#38BDF8]"
                      : "text-[#64748B] group-hover:text-[#38BDF8]"
                    : "text-[#8B8579] group-hover:text-[#173B70]"
                )}
              >
                {item.index}
              </span>
            )}
            <span className="font-sans text-xs tracking-normal">
              {item.title}
            </span>

            {isLabItem && !isLab && (
              <span className="ml-0.5 px-1 py-0.2 text-[8px] font-mono uppercase tracking-widest bg-[#173B70] text-[#F3F0E8]">
                NEW
              </span>
            )}

            <span
              className={cn(
                "absolute -bottom-1 left-0 right-0 h-[1.5px] transition-transform origin-left duration-200",
                isLab ? "bg-[#38BDF8]" : "bg-[#173B70]",
                isItemActive
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
