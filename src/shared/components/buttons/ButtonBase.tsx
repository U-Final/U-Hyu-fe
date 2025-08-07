import { forwardRef } from 'react';

import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'nav' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles = {
  primary:
    'bg-primary text-white hover:bg-primary-hover disabled:bg-gray-300 disabled:text-gray-500',
  nav: 'bg-gray text-white hover:bg-light-gray-hover hover:text-tertiary disabled:bg-gray-300 disabled:text-gray-500',
  ghost:
    'border border-light-gray text-secondary hover:bg-white-hover disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200',
};

const sizeStyles = {
  sm: 'h-[36px] px-[21px] text-sm',
  md: 'h-[40px] px-[23px] text-base',
  lg: 'h-[44px] px-[25px] text-lg',
};

const disabledStyles =
  'disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300';

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {

    const baseClasses =
      'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none rounded-md';
    const finalClassName = twMerge(
      baseClasses,
      variantStyles[variant],
      sizeStyles[size],
      disabledStyles,
      className
    );

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={finalClassName}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </button>
    );
  }
);

ButtonBase.displayName = 'ButtonBase';
