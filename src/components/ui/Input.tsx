import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  hint?:      string;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full h-11 bg-white border rounded-xl text-sm text-slate-800 placeholder:text-slate-400",
              "outline-none transition-all duration-150",
              "focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-slate-200 hover:border-slate-300",
              leftIcon  ? "pl-10" : "pl-4",
              rightIcon ? "pr-10" : "pr-4",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error or hint */}
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
