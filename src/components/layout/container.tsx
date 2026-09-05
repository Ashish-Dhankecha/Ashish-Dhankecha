import { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: "content" | "wide" | "full";
}

const widthClasses = {
  content: "max-w-content",
  wide: "max-w-wide",
  full: "max-w-full",
};

export function Container({
  as: Component = "div",
  width = "content",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8",
        widthClasses[width],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
