import React from 'react';

import { RefreshCw } from 'lucide-react';

interface ManualSearchButtonProps {
  /** 버튼 표시 여부 */
  visible: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 마지막 검색 위치로부터의 거리 (미터) */
  distance?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 거리 기반 재검색 버튼
 * 지도 위에 floating 형태로 표시되며, 기준 위치에서 일정 거리 이동 시 나타남
 */
export const ManualSearchButton: React.FC<ManualSearchButtonProps> = ({
  visible,
  loading = false,
  onClick,
  distance,
  className = '',
}) => {
  if (!visible) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 지도 클릭 이벤트와 분리
    onClick();
  };

  return (
    <div
      className={`
        fixed top-32 left-1/2 -translate-x-1/2 z-20
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        ${className}
      `}
    >
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          flex items-center gap-2 px-4 py-2.5
          bg-white text-gray-800 
          border border-gray-200 
          rounded-full shadow-lg hover:shadow-xl
          transition-all duration-200 
          font-medium text-sm
          ${
            loading
              ? 'cursor-not-allowed opacity-75'
              : 'hover:bg-gray-50 active:scale-95 cursor-pointer'
          }
          backdrop-blur-sm
        `}
        aria-label="이 지역에서 재검색"
      >
        <RefreshCw
          size={16}
          className={`
            ${loading ? 'animate-spin' : ''}
            text-blue-600
          `}
        />
        <span className="whitespace-nowrap">
          {loading ? '검색 중...' : '이 지역에서 재검색'}
        </span>

        {/* 이동 거리 표시 (개발 모드에서만) */}
        {import.meta.env.MODE === 'development' && distance && (
          <span className="text-xs text-gray-500 ml-1">
            ({Math.round(distance)}m)
          </span>
        )}
      </button>

      {/* 버튼 아래 작은 화살표 (지도를 가리키는 효과) */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200 drop-shadow-sm" />
      </div>
    </div>
  );
};

/**
 * 모바일 최적화된 재검색 버튼
 * 작은 화면에서 더 적절한 크기와 위치
 */
export const MobileManualSearchButton: React.FC<ManualSearchButtonProps> = ({
  visible,
  loading = false,
  onClick,
  className = '',
}) => {
  if (!visible) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={`
        fixed top-28 left-1/2 -translate-x-1/2 z-20
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        ${className}
      `}
    >
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          flex items-center gap-1.5 px-3 py-2
          bg-white text-gray-800 
          border border-gray-200 
          rounded-full shadow-lg
          transition-all duration-200 
          font-medium text-xs
          ${
            loading
              ? 'cursor-not-allowed opacity-75'
              : 'hover:bg-gray-50 active:scale-95 cursor-pointer'
          }
          backdrop-blur-sm
        `}
        aria-label="재검색"
      >
        <RefreshCw
          size={14}
          className={`
            ${loading ? 'animate-spin' : ''}
            text-blue-600
          `}
        />
        <span className="whitespace-nowrap">
          {loading ? '검색중' : '재검색'}
        </span>
      </button>
    </div>
  );
};

/**
 * 반응형 재검색 버튼
 * 화면 크기에 따라 적절한 버전을 자동 선택
 */
export const ResponsiveManualSearchButton: React.FC<
  ManualSearchButtonProps
> = props => {
  return (
    <>
      {/* 데스크톱/태블릿 버전 */}
      <div className="hidden sm:block">
        <ManualSearchButton {...props} />
      </div>

      {/* 모바일 버전 */}
      <div className="block sm:hidden">
        <MobileManualSearchButton {...props} />
      </div>
    </>
  );
};

export default ResponsiveManualSearchButton;
