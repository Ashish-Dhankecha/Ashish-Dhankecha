import { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface MonoProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "xs" | "sm" | "base";
}

const sizeClasses = {
  xs: "text-xs tracking-tight",
  sm: "text-xs sm:text-sm tracking-tight",
  base: "text-sm sm:text-base tracking-normal",
};

export function Mono({
  as: Component = "span",
  size = "sm",
  className,
  children,
  ...props
}: MonoProps) {
  return (
    <Component
      className={cn(
        "font-mono text-text-muted font-normal",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
