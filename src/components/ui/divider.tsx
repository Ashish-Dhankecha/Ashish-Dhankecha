import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "strong";
}

export function Divider({
  orientation = "horizontal",
  variant = "subtle",
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "w-[1px] self-stretch",
          variant === "subtle" ? "bg-border-subtle" : "bg-border-strong",
          className
        )}
        {...props}
      />
    );
  }

  return (
    <hr
      className={cn(
        "w-full border-0 h-[1px]",
        variant === "subtle" ? "bg-border-subtle" : "bg-border-strong",
        className
      )}
      {...props}
    />
  );
}
