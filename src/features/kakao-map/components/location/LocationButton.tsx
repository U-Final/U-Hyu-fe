import { type FC } from 'react';

import { FaLocationArrow } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

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
    <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          px-4 py-2 rounded-full
          w-12 h-12 
          bg-white 
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
          <BeatLoader color="primary" />
        ) : (
          <FaLocationArrow className="w-5 h-5 text-primary" />
        )}

      {/* 툴팁 */}
      <div
        className="
        absolute 
        bottom-full 
        right-0
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
          right-4
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
    </button>
  );
};

export default LocationButton;
