import { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DisplayProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "xl";
  italic?: boolean;
}

const sizeClasses = {
  sm: "text-2xl sm:text-3xl md:text-4xl tracking-tight",
  md: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight",
  lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter",
  xl: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter",
};

export function Display({
  as: Component = "h1",
  size = "md",
  italic = false,
  className,
  children,
  ...props
}: DisplayProps) {
  return (
    <Component
      className={cn(
        "font-display text-text-primary leading-[1.1] font-semibold text-balance",
        italic && "italic",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
