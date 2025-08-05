import React, { useEffect, useState } from 'react';

import { RefreshCw } from 'lucide-react';

import { useMapUIContext } from '../../context/MapUIContext';

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
  zoomLevel?: number;
  radius?: number; // meter
}

/**
 * 거리 기반 재검색 버튼
 * 지도 위에 floating 형태로 표시되며, 기준 위치에서 일정 거리 이동 시 나타남
 */
export const ManualSearchButton: React.FC<ManualSearchButtonProps> = ({
  visible,
  loading = false,
  onClick,
  className = '',
  zoomLevel,
  radius,
}) => {
  const { bottomSheetRef } = useMapUIContext();
  const [bottomSheetPosition, setBottomSheetPosition] = useState<number>(
    window.innerHeight
  );

  // BottomSheet 위치를 실시간으로 추적
  useEffect(() => {
    if (!bottomSheetRef?.current) return;

    const updatePosition = () => {
      if (bottomSheetRef.current) {
        const currentPos = bottomSheetRef.current.getCurrentPosition();
        setBottomSheetPosition(currentPos);
      }
    };

    // 초기 위치 설정
    updatePosition();

    // MutationObserver로 위치 변화 감지
    const observer = new MutationObserver(() => {
      setTimeout(updatePosition, 50);
    });

    // DOM 변화 관찰
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // 리사이즈 이벤트 리스너
    const handleResize = () => updatePosition();
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [bottomSheetRef]);

  if (!visible) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 지도 클릭 이벤트와 분리
    onClick();
  };

  // BottomSheet 핸들 바로 위에 위치하도록 계산 (60px 위쪽)
  const buttonBottom = window.innerHeight - bottomSheetPosition + 15;

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 z-10
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        ${className}
      `}
      style={{
        bottom: `${buttonBottom}px`,
      }}
    >
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          flex items-center gap-2 px-6 py-2.5
          min-w-max
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
            text-primary
          `}
        />
        <span className="whitespace-nowrap">
          {loading ? '검색 중...' : '이 지역에서 재검색'}
        </span>
        {/* // 이동 거리 표시
        {typeof distance === 'number' && distance > 0 && (
          <span className="text-xs text-gray-500 ml-1">
            ({Math.round(distance)}m)
          </span>
        )} */}
        {(typeof zoomLevel === 'number' || typeof radius === 'number') && (
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
            {typeof zoomLevel === 'number'}
            {typeof radius === 'number' && (
              <>{Math.round(radius / 1000)}km 반경</>
            )}
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

export default ManualSearchButton;
