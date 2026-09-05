import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ItemStatus } from "@/types/content";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ItemStatus | "default" | "outline";
  dot?: boolean;
}

const statusVariants: Record<ItemStatus, { container: string; dot: string; label: string }> = {
  active: {
    container: "bg-status-active/10 text-emerald-400 border-status-active/20",
    dot: "bg-emerald-400",
    label: "Active",
  },
  research: {
    container: "bg-status-research/10 text-indigo-400 border-status-research/20",
    dot: "bg-indigo-400",
    label: "Research",
  },
  draft: {
    container: "bg-status-draft/10 text-amber-400 border-status-draft/20",
    dot: "bg-amber-400",
    label: "Draft",
  },
  archived: {
    container: "bg-status-archived/10 text-zinc-400 border-status-archived/20",
    dot: "bg-zinc-400",
    label: "Archived",
  },
};

export function Badge({
  variant = "default",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const isStatus = variant in statusVariants;
  const statusInfo = isStatus ? statusVariants[variant as ItemStatus] : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-normal tracking-wide border",
        statusInfo
          ? statusInfo.container
          : variant === "outline"
          ? "border-border-subtle bg-transparent text-text-muted"
          : "border-border-subtle bg-bg-surface text-text-muted",
        className
      )}
      {...props}
    >
      {(dot || isStatus) && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            statusInfo ? statusInfo.dot : "bg-text-muted"
          )}
          aria-hidden="true"
        />
      )}
      {children || (statusInfo ? statusInfo.label : null)}
    </span>
  );
}
