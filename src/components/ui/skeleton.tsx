import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rect" | "circle";
}

export function Skeleton({
  variant = "rect",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-bg-elevated/70 animate-pulse-subtle",
        variant === "text" && "h-4 w-full rounded",
        variant === "rect" && "rounded-md",
        variant === "circle" && "rounded-full",
        className
      )}
      {...props}
    />
  );
}
