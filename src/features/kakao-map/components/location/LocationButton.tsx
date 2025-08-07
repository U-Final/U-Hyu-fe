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
    <div className="group relative">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          relative
          w-10 h-10 
          bg-white 
          rounded-full
          shadow-md 
          border border-gray-200
          flex items-center justify-center 
          hover:bg-primary/5
          hover:border-primary/20
          hover:shadow-lg
          active:bg-primary/10
          active:scale-95
          disabled:opacity-50 
          disabled:cursor-not-allowed
          transition-all duration-300
          ${isLoading ? 'animate-pulse' : ''}
          ${className}
        `}
        aria-label="내 위치로 이동"
      >
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 아이콘 또는 로딩 */}
        <div className="relative z-10">
          {isLoading ? (
            <BeatLoader size={5} color="#e6007e" />
          ) : (
            <FaLocationArrow className="w-3.5 h-3.5 text-primary group-hover:text-primary/80 transition-colors duration-200" />
          )}
        </div>

        {/* 호버 시 리플 효과 */}
        <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300" />
      </button>

      {/* 개선된 툴팁 */}
      <div
        className="
          absolute 
          bottom-full 
          left-1/2
          transform -translate-x-1/2
          mb-3
          px-3 
          py-2
          bg-gray-800 
          text-white 
          text-xs 
          font-medium
          rounded-lg
          shadow-xl
          opacity-0 
          group-hover:opacity-100 
          transition-all
          duration-300
          pointer-events-none
          whitespace-nowrap
          z-50
          scale-95
          group-hover:scale-100
        "
      >
        내 위치로 이동
        {/* 툴팁 화살표 */}
        <div
          className="
            absolute 
            top-full 
            left-1/2
            transform -translate-x-1/2
            w-0 
            h-0 
            border-l-2 
            border-r-2 
            border-t-4 
            border-transparent 
            border-t-gray-800
          "
        />
      </div>
    </div>
  );
};

export default LocationButton;
