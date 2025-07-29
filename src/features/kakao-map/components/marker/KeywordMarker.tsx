import React from 'react';

import type { NormalizedPlace } from '../../api/types';

interface KeywordMarkerProps {
  /** 장소 정보 */
  place: NormalizedPlace;
  /** 마커 클릭 핸들러 */
  onClick: (place: NormalizedPlace) => void;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 마커 인덱스 (1부터 시작) */
  index?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 카카오 키워드 검색 결과를 표시하는 마커 컴포넌트
 * react-kakao-maps-sdk의 MapMarker와 함께 사용됨
 */
export const KeywordMarker: React.FC<KeywordMarkerProps> = ({
  place,
  onClick,
  isSelected = false,
  index,
  className = '',
}) => {
  const handleClick = () => {
    onClick(place);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative cursor-pointer transform transition-all duration-200
        hover:scale-110 active:scale-95
        ${className}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${place.name} 마커`}
    >
      {/* 마커 핀 */}
      <div
        className={`
          relative w-8 h-10 rounded-t-full rounded-br-full
          border-2 border-white shadow-lg
          flex items-center justify-center
          transition-all duration-200
          ${
            isSelected ? 'bg-blue-500 scale-110' : 'bg-red-500 hover:bg-red-600'
          }
        `}
      >
        {/* 마커 번호 (인덱스가 있는 경우) */}
        {index && (
          <span
            className={`
              text-white font-bold text-xs
              ${isSelected ? 'text-white' : 'text-white'}
            `}
          >
            {index}
          </span>
        )}

        {/* 마커가 선택되지 않고 인덱스가 없는 경우 점 표시 */}
        {!index && (
          <div
            className={`
              w-2 h-2 rounded-full
              ${isSelected ? 'bg-white' : 'bg-white'}
            `}
          />
        )}
      </div>

      {/* 마커 하단의 작은 삼각형 */}
      <div
        className={`
          absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1
          w-0 h-0 border-l-2 border-r-2 border-t-4
          border-transparent
          ${isSelected ? 'border-t-blue-500' : 'border-t-red-500'}
        `}
      />

      {/* 선택 상태일 때 펄스 효과 */}
      {isSelected && (
        <>
          <div className="absolute inset-0 w-8 h-8 rounded-full bg-blue-400 opacity-30 animate-ping" />
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-blue-300 opacity-20 animate-pulse" />
        </>
      )}
    </div>
  );
};

/**
 * 키워드 마커의 커스텀 오버레이 콘텐츠
 * react-kakao-maps-sdk의 CustomOverlayMap content로 사용
 */
export const createKeywordMarkerContent = (
  place: NormalizedPlace,
  onClick: (place: NormalizedPlace) => void,
  isSelected: boolean = false,
  index?: number
): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'keyword-marker-container';

  // 마커 스타일과 구조를 HTML로 생성
  container.innerHTML = `
    <div class="relative cursor-pointer transform transition-all duration-200 hover:scale-110 active:scale-95" 
         role="button" 
         tabindex="0"
         aria-label="${place.name} 마커">
      <!-- 마커 핀 -->
      <div class="${`
        relative w-8 h-10 rounded-t-full rounded-br-full
        border-2 border-white shadow-lg
        flex items-center justify-center
        transition-all duration-200
        ${isSelected ? 'bg-blue-500 scale-110' : 'bg-red-500 hover:bg-red-600'}
      `}">
        ${
          index
            ? `<span class="text-white font-bold text-xs">${index}</span>`
            : `<div class="w-2 h-2 rounded-full bg-white"></div>`
        }
      </div>
      
      <!-- 마커 하단의 작은 삼각형 -->
      <div class="${`
        absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1
        w-0 h-0 border-l-2 border-r-2 border-t-4
        border-transparent
        ${isSelected ? 'border-t-blue-500' : 'border-t-red-500'}
      `}"></div>
      
      ${
        isSelected
          ? '<div class="absolute inset-0 w-8 h-8 rounded-full bg-blue-400 opacity-30 animate-ping"></div>'
          : ''
      }
    </div>
  `;

  // 클릭 이벤트 추가
  container.addEventListener('click', () => onClick(place));
  container.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(place);
    }
  });

  return container;
};

/**
 * 클러스터링된 마커를 위한 컴포넌트
 */
interface ClusterMarkerProps {
  /** 클러스터된 장소들 */
  places: NormalizedPlace[];
  /** 클러스터 클릭 핸들러 */
  onClick: (places: NormalizedPlace[]) => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  places,
  onClick,
  className = '',
}) => {
  const handleClick = () => {
    onClick(places);
  };

  const count = places.length;
  const sizeClass =
    count > 50 ? 'w-16 h-16' : count > 10 ? 'w-12 h-12' : 'w-10 h-10';
  const textSizeClass =
    count > 50 ? 'text-lg' : count > 10 ? 'text-base' : 'text-sm';

  return (
    <div
      onClick={handleClick}
      className={`
        ${sizeClass} rounded-full cursor-pointer
        bg-orange-500 border-4 border-white shadow-lg
        flex items-center justify-center
        transition-all duration-200
        hover:scale-110 active:scale-95
        ${className}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${count}개 장소 클러스터`}
    >
      <span className={`${textSizeClass} font-bold text-white`}>
        {count > 99 ? '99+' : count}
      </span>
    </div>
  );
};

export default KeywordMarker;
