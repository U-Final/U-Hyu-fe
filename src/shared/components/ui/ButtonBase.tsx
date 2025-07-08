import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "nav" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  nav: "bg-gray text-white hover:bg-light-gray hover:text-tertiary",
  ghost: "border border-light-gray text-secondary hover:bg-white-hover",
};

const sizeStyles = {
  sm: "h-[36px] px-16 text-sm",
  md: "h-[40px] px-16 text-base",
  lg: "h-[44px] px-16 text-lg",
};

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    { children, variant = "primary", size = "md", isLoading = false, className = "", ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-semibold transition-colors disabled:pointer-events-none";
    const finalClassName = twMerge(
      baseClasses,
      variantStyles[variant],
      sizeStyles[size],
      className
    );
    return (
      <button ref={ref} disabled={isLoading} className={finalClassName} {...props}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </button>
    );
  }
);

ButtonBase.displayName = "ButtonBase";
