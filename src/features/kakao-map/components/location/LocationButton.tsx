import { type FC, useState, useEffect } from 'react';

import { FaLocationArrow } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

interface LocationButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
  /** 에러 상태 */
  error?: string | null;
  /** 성공 상태 표시 지속 시간 (ms) */
  successDuration?: number;
}

const LocationButton: FC<LocationButtonProps> = ({
  onClick,
  isLoading = false,
  className = '',
  error = null,
  successDuration = 2000,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [prevLoading, setPrevLoading] = useState(isLoading);

  // 로딩이 끝났고 에러가 없으면 성공 상태 표시
  useEffect(() => {
    if (prevLoading && !isLoading && !error) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, successDuration);
      
      return () => clearTimeout(timer);
    }
    setPrevLoading(isLoading);
  }, [isLoading, error, prevLoading, successDuration]);

  // 버튼 상태에 따른 스타일
  const getButtonStyle = () => {
    if (isLoading) {
      return 'bg-blue-50 border-2 border-blue-200';
    }
    if (showSuccess) {
      return 'bg-green-50 border-2 border-green-200';
    }
    if (error) {
      return 'bg-red-50 border-2 border-red-200 hover:bg-red-100';
    }
    return 'bg-white border-2 border-transparent hover:bg-gray-50 hover:border-gray-200';
  };

  // 아이콘 색상
  const getIconColor = () => {
    if (isLoading) return 'text-blue-500';
    if (showSuccess) return 'text-green-500';
    if (error) return 'text-red-500';
    return 'text-primary';
  };

  // 툴팁 메시지
  const getTooltipMessage = () => {
    if (error) return error;
    if (showSuccess) return '위치를 찾았습니다!';
    return '내 위치로 이동';
  };

  const handleClick = () => {
    // 에러 상태일 때도 재시도 가능
    setShowSuccess(false);
    onClick();
  };

  return (
    <div className="group relative">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          relative
          w-12 h-12 
          rounded-full
          shadow-lg 
          flex items-center justify-center 
          active:scale-95
          disabled:cursor-not-allowed
          transition-all duration-200
          ${getButtonStyle()}
          ${className}
        `}
        aria-label={getTooltipMessage()}
      >
        {isLoading ? (
          <BeatLoader color="#3B82F6" size={6} />
        ) : showSuccess ? (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <FaLocationArrow className={`w-4 h-4 ${getIconColor()}`} />
        )}

        {/* 로딩 시 펄스 효과 */}
        {isLoading && (
          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
        )}
      </button>

      {/* 개선된 툴팁 */}
      <div
        className={`
          absolute 
          bottom-full 
          right-0
          mb-2 
          px-3 
          py-1.5 
          rounded-md 
          shadow-lg
          text-xs 
          font-medium
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-200 
          pointer-events-none
          whitespace-nowrap
          z-50
          invisible
          group-hover:visible
          ${error ? 'bg-red-900 text-white' : 
            showSuccess ? 'bg-green-900 text-white' : 
            'bg-gray-900 text-white'
          }
        `}
      >
        {getTooltipMessage()}
        {/* 툴팁 화살표 */}
        <div
          className={`
            absolute 
            top-full 
            right-4
            w-0 
            h-0 
            border-l-4 
            border-r-4 
            border-t-4 
            border-transparent 
            ${error ? 'border-t-red-900' : 
              showSuccess ? 'border-t-green-900' : 
              'border-t-gray-900'
            }
          `}
        />
      </div>
    </div>
  );
};

export default LocationButton;
