import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'nav' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  nav: 'bg-gray text-white hover:bg-light-gray-hover hover:text-tertiary',
  ghost: 'border border-light-gray text-secondary hover:bg-white-hover',
};

const sizeStyles = {
  sm: 'h-[36px] px-[21px] text-sm',
  md: 'h-[40px] px-[23px] text-base',
  lg: 'h-[44px] px-[25px] text-lg',
};

// 비활성화 상태 스타일
const disabledStyles =
  'disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300';

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // 로딩 중이거나 disabled가 true면 비활성화
    const isDisabled = isLoading || disabled;

    const baseClasses =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-semibold transition-colors disabled:pointer-events-none';

    const finalClassName = twMerge(
      baseClasses,
      variantStyles[variant],
      sizeStyles[size],
      disabledStyles,
      className
    );

    return (
      <button ref={ref} disabled={isDisabled} className={finalClassName} {...props}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>로딩중...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

ButtonBase.displayName = 'ButtonBase';
