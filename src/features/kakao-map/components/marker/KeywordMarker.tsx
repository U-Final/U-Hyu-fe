import React from 'react';

import type { NormalizedPlace } from '../../api/types';
import {
  CATEGORY_COLOR_MAP,
  getCategoryGroupCode,
} from '../search/CategoryIcon';
import { CategoryMarker } from './CategoryMarker';

interface KeywordMarkerProps {
  /** 장소 정보 */
  place: NormalizedPlace;
  /** 마커 클릭 핸들러 */
  onClick: (place: NormalizedPlace) => void;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 마커 인덱스 (1부터 시작) - 사용하지 않음 */
  index?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 카카오 키워드 검색 결과를 표시하는 마커 컴포넌트
 * CategoryMarker를 래핑하여 기존 인터페이스 호환성 유지
 */
export const KeywordMarker: React.FC<KeywordMarkerProps> = ({
  place,
  onClick,
  isSelected = false,
  className = '',
}) => {
  return (
    <CategoryMarker
      place={place}
      onClick={onClick}
      isSelected={isSelected}
      className={className}
    />
  );
};

/**
 * 키워드 마커의 커스텀 오버레이 콘텐츠 (카테고리 기반 디자인)
 * @deprecated React 컴포넌트 방식인 KeywordMarker를 사용하는 것을 권장합니다.
 */
export const createKeywordMarkerContent = (
  place: NormalizedPlace,
  onClick: (place: NormalizedPlace) => void,
  isSelected: boolean = false
): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'keyword-marker-container';

  // CategoryMarker와 같은 스타일 적용
  const categoryCode = getCategoryGroupCode(
    place.category,
    place.categoryGroupCode
  );
  const backgroundColor =
    CATEGORY_COLOR_MAP[categoryCode as keyof typeof CATEGORY_COLOR_MAP] ||
    '#6b7280';
  const selectedBackgroundColor = '#3b82f6';

  // 간단한 마커 스타일로 생성 (숫자 표시 제거)
  container.innerHTML = `
    <div class="relative cursor-pointer transform transition-all duration-200 hover:scale-110 active:scale-95 z-10" 
         role="button" 
         tabindex="0"
         aria-label="${place.name} 마커">
      <div class="relative w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-200 ${isSelected ? 'scale-125 ring-4 ring-blue-200' : 'hover:scale-110'}"
           style="background-color: ${isSelected ? selectedBackgroundColor : backgroundColor}">
        <div class="w-3 h-3 rounded-full bg-white"></div>
      </div>
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent transition-all duration-200"
           style="border-top-color: ${isSelected ? selectedBackgroundColor : backgroundColor}"></div>
      ${isSelected ? '<div class="absolute inset-0 w-10 h-10 rounded-full bg-blue-400 opacity-20 animate-ping"></div><div class="absolute inset-0 w-14 h-14 rounded-full bg-blue-300 opacity-10 animate-pulse" style="transform: translate(-8px, -8px)"></div>' : ''}
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
