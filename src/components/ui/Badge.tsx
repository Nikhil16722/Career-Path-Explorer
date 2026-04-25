import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "danger" | "info" | "purple";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  Variant;
  className?: string;
  dot?:      boolean;
}

const variants: Record<Variant, string> = {
  default: "bg-slate-100  text-slate-600  border-slate-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50   text-amber-700   border-amber-200",
  danger:  "bg-red-50     text-red-600     border-red-200",
  info:    "bg-blue-50    text-blue-700    border-blue-200",
  purple:  "bg-purple-50  text-purple-700  border-purple-200",
};

const dotColors: Record<Variant, string> = {
  default: "bg-slate-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger:  "bg-red-500",
  info:    "bg-blue-500",
  purple:  "bg-purple-500",
};

export default function Badge({
  children,
  variant = "default",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
