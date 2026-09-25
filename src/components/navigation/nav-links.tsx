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
              "group relative inline-flex items-center gap-1.5 text-xs transition-colors py-1.5 select-none font-medium",
              isItemActive
                ? "text-[#F5EBE1] font-semibold"
                : "text-[#D9C7B8]/70 hover:text-[#F5EBE1]"
            )}
          >
            {item.index && (
              <span
                className={cn(
                  "font-mono text-[10px] transition-colors",
                  isItemActive
                    ? "text-[#DF7987] font-semibold"
                    : "text-[#8E7C79] group-hover:text-[#DF7987]"
                )}
              >
                {item.index}
              </span>
            )}
            <span className="font-sans text-xs tracking-normal">
              {item.title}
            </span>

            {isLabItem && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[8px] font-mono uppercase tracking-widest bg-[#2B0F15] text-[#DF7987] border border-[#801D2C]/40">
                ACTIVE
              </span>
            )}

            <span
              className={cn(
                "absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-transform origin-left duration-200",
                "bg-[#801D2C]",
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
