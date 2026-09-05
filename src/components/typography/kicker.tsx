import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface KickerProps extends HTMLAttributes<HTMLSpanElement> {
  index?: string | number;
  label?: string;
}

export function Kicker({
  index,
  label,
  className,
  children,
  ...props
}: KickerProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-subtle",
        className
      )}
      {...props}
    >
      {index !== undefined && (
        <span className="text-accent-primary font-medium">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      {index !== undefined && label && <span className="opacity-40">{"//"}</span>}
      {label && <span className="text-text-muted">{label}</span>}
      {children}
    </div>
  );
}
