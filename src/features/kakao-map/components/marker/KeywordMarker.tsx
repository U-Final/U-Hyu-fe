import React from 'react';

import type { NormalizedPlace } from '../../api/types';
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
