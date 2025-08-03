import React from 'react';

import { getCategoryColorFromFilter } from '../../utils/categoryColorMapping';

import type { NormalizedPlace } from '../../api/types';
import { CategoryIcon } from '../search/CategoryIcon';

interface CategoryMarkerProps {
  /** 장소 정보 */
  place: NormalizedPlace;
  /** 마커 클릭 핸들러 */
  onClick: (place: NormalizedPlace) => void;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 카테고리 기반 마커 컴포넌트
 * 카테고리별 아이콘과 색상을 표시하는 개별 마커
 */
export const CategoryMarker: React.FC<CategoryMarkerProps> = ({
  place,
  onClick,
  isSelected = false,
  className = '',
}) => {
  const handleClick = () => {
    onClick(place);
  };

  const backgroundColor = getCategoryColorFromFilter(place.category);
  const selectedBackgroundColor = '#3b82f6'; // blue-500

  return (
    <div
      onClick={handleClick}
      className={`
        relative cursor-pointer transform transition-all duration-200
        hover:scale-110 active:scale-95 z-10
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
      {/* 마커 아이콘 컨테이너 */}
      <div
        className={`
          relative w-10 h-10 rounded-full
          border-2 border-white shadow-xl
          flex items-center justify-center
          transition-all duration-200
          hover:scale-110 hover:shadow-2xl
          ${isSelected ? 'scale-125 ring-4 ring-blue-200 shadow-2xl' : ''}
        `}
        style={{
          backgroundColor: isSelected
            ? selectedBackgroundColor
            : backgroundColor,
          boxShadow: isSelected
            ? `0 8px 25px -5px ${selectedBackgroundColor}40, 0 10px 10px -5px ${selectedBackgroundColor}30`
            : `0 8px 25px -5px ${backgroundColor}40, 0 10px 10px -5px ${backgroundColor}30`,
        }}
      >
        {/* 카테고리 아이콘 - 마커 내부에서는 흰색으로 표시 */}
        <CategoryIcon
          category={place.category}
          categoryGroupCode={place.categoryGroupCode}
          size={16}
          color="#ffffff"
        />
      </div>

      {/* 마커 하단의 작은 포인터 */}
      <div
        className={`
          absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1
          w-0 h-0 border-l-2 border-r-2 border-t-4
          border-transparent
          transition-all duration-200
        `}
        style={{
          borderTopColor: isSelected
            ? selectedBackgroundColor
            : backgroundColor,
        }}
      />

      {/* 선택 상태일 때 펄스 효과 */}
      {isSelected && (
        <>
          <div className="absolute inset-0 w-10 h-10 rounded-full bg-blue-400 opacity-20 animate-ping" />
          <div className="absolute inset-0 w-14 h-14 rounded-full bg-blue-300 opacity-10 animate-pulse -translate-x-2 -translate-y-2" />
        </>
      )}
    </div>
  );
};

export default CategoryMarker;
