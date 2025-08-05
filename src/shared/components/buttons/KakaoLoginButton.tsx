import { forwardRef } from 'react';

import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useKakaoLogin } from '@/shared/hooks';

type KakaoButtonSize = 'sm' | 'md' | 'lg';

export interface KakaoLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: KakaoButtonSize;
  isLoading?: boolean;
  variant?: 'full' | 'abbreviated';
}

const sizeStyles = {
  sm: 'h-[36px] px-[16px] text-sm',
  md: 'h-[44px] px-[20px] text-base',
  lg: 'h-[52px] px-[24px] text-lg',
};

// 카카오 심볼 SVG 컴포넌트
const KakaoSymbol = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0C13.9706 0 18 3.13401 18 7C18 9.7984 16.1637 12.1854 13.3747 13.4946L14.2858 16.8683C14.3532 17.1279 14.0724 17.3296 13.8519 17.1948L9.6307 14.2009C9.42282 14.2144 9.21221 14.2222 9 14.2222C4.02944 14.2222 0 11.0882 0 7.11111C0 3.13401 4.02944 0 9 0Z"
      fill="currentColor"
    />
  </svg>
);

export const KakaoLoginButton = forwardRef<
  HTMLButtonElement,
  KakaoLoginButtonProps
>(
  (
    {
      size = 'md',
      isLoading = false,
      variant = 'full',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'cursor-pointer inline-flex items-center justify-center gap-3 whitespace-nowrap font-medium transition-all duration-200 ease-out disabled:pointer-events-none rounded-xl transform-gpu hover:scale-105 active:scale-95';

    // 카카오 브랜드 컬러 (#FEE500)
    const kakaoStyles =
      'bg-[#FEE500] text-black hover:shadow-lg hover:shadow-yellow-400/20 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:scale-100';

    const finalClassName = twMerge(
      baseClasses,
      kakaoStyles,
      sizeStyles[size],
      className
    );

    const buttonText = variant === 'full' ? '카카오 로그인' : '로그인';
    const { login } = useKakaoLogin();

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={finalClassName}
        onClick={login}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-black" />
        ) : (
          <>
            <KakaoSymbol className="w-[18px] h-[17px] text-black flex-shrink-0" />
            <span className="text-black" style={{ opacity: 0.85 }}>
              {buttonText}
            </span>
          </>
        )}
      </button>
    );
  }
);

KakaoLoginButton.displayName = 'KakaoLoginButton';
