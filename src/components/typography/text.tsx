import { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: "lead" | "body" | "small" | "caption";
  muted?: boolean;
}

const variantClasses = {
  lead: "text-lg sm:text-xl leading-relaxed text-text-primary/90 font-normal",
  body: "text-base leading-relaxed text-text-primary/80 font-normal",
  small: "text-sm leading-normal text-text-muted font-normal",
  caption: "text-xs leading-normal text-text-subtle font-normal tracking-wide",
};

export function Text({
  as: Component = "p",
  variant = "body",
  muted = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        "font-sans text-pretty",
        variantClasses[variant],
        muted && "text-text-muted",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
