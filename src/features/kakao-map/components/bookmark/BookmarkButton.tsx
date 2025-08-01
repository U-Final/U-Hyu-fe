import { type FC } from 'react';

import { MdStar } from 'react-icons/md';

interface BookmarkButtonProps {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const BookmarkButton: FC<BookmarkButtonProps> = ({
  isActive,
  onClick,
  className = '',
}) => {
  return (
    <div className="relative inline-block group">
      <button
        onClick={onClick}
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
        aria-label="즐겨찾기 필터"
      >
        {isActive ? (
          <MdStar className="w-6 h-6 text-primary" />
        ) : (
          <MdStar className="w-6 h-6 text-gray" />
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
        즐겨찾기
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

export default BookmarkButton;
