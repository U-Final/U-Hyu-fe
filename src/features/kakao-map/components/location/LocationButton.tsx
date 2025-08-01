import { type FC } from 'react';

import { FaLocationArrow } from 'react-icons/fa';

interface LocationButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const LocationButton: FC<LocationButtonProps> = ({
  onClick,
  isLoading = false,
  className = '',
}) => {
  return (
    <div className="relative inline-block group">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          w-12 h-12 
          bg-white 
          rounded-full 
          shadow-lg 
          flex items-center justify-center 
          hover:bg-gray-50 
          active:bg-gray-100 
          disabled:opacity-50 
          disabled:cursor-not-allowed
          transition-all duration-200
          ${className}
        `}
        aria-label="내 위치로 이동"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaLocationArrow className="w-5 h-5 text-primary" />
        )}
      </button>

      {/* 툴팁 */}
      <div
        className="
        absolute 
        bottom-full 
        left-1/2 
        transform 
        -translate-x-1/2 
        mb-2 
        px-3 
        py-1.5 
        bg-gray-900 
        text-white 
        text-xs 
        font-medium
        rounded-md 
        shadow-lg
        opacity-0 
        group-hover:opacity-100 
        transition-opacity 
        duration-200 
        pointer-events-none
        whitespace-nowrap
        z-50
        invisible
        group-hover:visible
      "
      >
        내 위치로 이동
        {/* 툴팁 화살표 */}
        <div
          className="
          absolute 
          top-full 
          left-1/2 
          transform 
          -translate-x-1/2 
          w-0 
          h-0 
          border-l-4 
          border-r-4 
          border-t-4 
          border-transparent 
          border-t-gray-900
        "
        />
      </div>
    </div>
  );
};

export default LocationButton;
