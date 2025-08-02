import React from 'react';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface UserLocationMarkerProps {
  /** 사용자 위치 좌표 */
  position: { lat: number; lng: number };
  /** 정확도 반경 (미터) - 선택사항 */
  accuracy?: number;
  /** 펄스 애니메이션 활성화 여부 */
  showPulse?: boolean;
  /** 커스텀 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 인포윈도우 표시 여부 */
  showInfoWindow?: boolean;
  /** 인포윈도우 닫기 핸들러 */
  onInfoWindowClose?: () => void;
}

/**
 * 개선된 사용자 위치 마커 컴포넌트
 * - 부드러운 펄스 애니메이션
 * - 정확도 표시 (선택사항)
 * - 반응형 크기
 * - 접근성 개선
 */
export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
  position,
  accuracy,
  showPulse = true,
  size = 'medium',
  onClick,
  showInfoWindow = false,
  onInfoWindowClose,
}) => {
  // 크기별 설정
  const sizeConfig = {
    small: {
      dotSize: 'w-4 h-4',
      pulseSize: 'w-10 h-10',
      translation: '-translate-x-3 -translate-y-3',
    },
    medium: {
      dotSize: 'w-6 h-6',
      pulseSize: 'w-16 h-16',
      translation: '-translate-x-5 -translate-y-5',
    },
    large: {
      dotSize: 'w-8 h-8',
      pulseSize: 'w-20 h-20',
      translation: '-translate-x-6 -translate-y-6',
    },
  };

  const config = sizeConfig[size];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <>
      <CustomOverlayMap
        position={position}
        yAnchor={0.5}
        xAnchor={0.5}
        zIndex={1000}
      >
        <div
          className="relative flex items-center justify-center cursor-pointer"
          role="button"
          aria-label="현재 위치 - 클릭하여 정보 보기"
          onClick={handleClick}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e as any);
            }
          }}
        >
          {/* 메인 위치 도트 */}
          <div
            className={`
            ${config.dotSize}
            bg-blue-500 
            rounded-full 
            border-4 
            border-white 
            shadow-lg
            relative
            z-10
          `}
          >
            {/* 내부 하이라이트 */}
            <div className="absolute inset-0.5 bg-blue-400 rounded-full opacity-60" />
          </div>

          {/* 펄스 애니메이션 링 */}
          {showPulse && (
            <>
              {/* 첫 번째 펄스 링 */}
              <div
                className={`
                absolute 
                inset-0 
                ${config.pulseSize}
                border-2 
                border-blue-400 
                rounded-full 
                opacity-40
                animate-ping
                ${config.translation}
              `}
                style={{
                  animationDuration: '2s',
                  animationDelay: '0s',
                }}
              />

              {/* 두 번째 펄스 링 (딜레이) */}
              <div
                className={`
                absolute 
                inset-0 
                ${config.pulseSize}
                border-2 
                border-blue-300 
                rounded-full 
                opacity-30
                animate-ping
                ${config.translation}
              `}
                style={{
                  animationDuration: '2s',
                  animationDelay: '0.5s',
                }}
              />

              {/* 정적 배경 링 */}
              <div
                className={`
                absolute 
                inset-0 
                ${config.pulseSize}
                border-2 
                border-blue-200 
                rounded-full 
                opacity-20
                ${config.translation}
              `}
              />
            </>
          )}

          {/* 정확도 원 (선택사항) */}
          {accuracy && accuracy > 0 && (
            <div
              className="absolute border border-blue-200 rounded-full opacity-30 bg-blue-100"
              style={{
                width: `${Math.min(accuracy / 10, 200)}px`,
                height: `${Math.min(accuracy / 10, 200)}px`,
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
              }}
            />
          )}
        </div>
      </CustomOverlayMap>

      {/* 인포윈도우 */}
      {showInfoWindow && (
        <CustomOverlayMap
          position={position}
          yAnchor={1.3}
          xAnchor={0.5}
          zIndex={1100}
        >
          <div
            className="relative z-50 max-w-48"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
          >
            {/* 말풍선 꼬리 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-white drop-shadow-sm" />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* 위치 아이콘 */}
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-sm flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      내 위치입니다
                    </h4>
                    <p className="text-xs text-gray-500">현재 위치</p>
                  </div>
                </div>

                {/* 닫기 버튼 */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onInfoWindowClose?.();
                  }}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors ml-2"
                  aria-label="닫기"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default UserLocationMarker;
