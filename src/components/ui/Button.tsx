import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
  loading?: boolean;
  icon?:    React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-95",
  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
  ghost:
    "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
  danger:
    "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
};

const sizes: Record<Size, string> = {
  sm: "h-8  px-3 text-xs  gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm  gap-2   rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size    = "md",
      loading = false,
      icon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
