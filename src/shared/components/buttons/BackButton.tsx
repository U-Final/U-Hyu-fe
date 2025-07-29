import type { FC } from 'react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const BackButton: FC<BackButtonProps> = ({
  onClick,
  className = '',
  ariaLabel = '이전 화면으로 돌아가기',
}) => {
  return (
    <button
      className={`px-3 py-2 text-sm font-medium bg-white text-gray hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray hover:border-gray-300 hover:shadow-md ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackButton;
