import { type FC } from 'react';

import { getFilterCategoryForStore } from '../../config/categoryMapping.ts';
import type { Store } from '../../types/store.ts';
import { CATEGORY_COLOR_MAP } from '../search/CategoryIcon.tsx';

interface BrandMarkerProps {
  store: Store;
  isSelected?: boolean;
  isRecommended?: boolean;
  onClick?: () => void;
}

const BrandMarker: FC<BrandMarkerProps> = ({
  store,
  isSelected = false,
  isRecommended = false,
  onClick,
}) => {
  const brandImageSrc = store.logoImage;

  // 제휴 매장 카테고리를 필터 탭으로 변환 후 카카오 카테고리 색상 사용
  const filterCategory = getFilterCategoryForStore(store.categoryName);

  // 카테고리별 카카오 색상 매핑 (필터 탭 기반)
  const getCategoryColorFromFilter = (filterCat: string): string => {
    switch (filterCat) {
      case 'shopping':
        return CATEGORY_COLOR_MAP.MT1; // 대형마트 색상
      case 'food':
        return CATEGORY_COLOR_MAP.FD6; // 음식점 색상
      case 'beauty':
        return CATEGORY_COLOR_MAP.HP8; // 병원 색상
      case 'life':
        return CATEGORY_COLOR_MAP.BK9; // 은행 색상
      case 'culture':
        return CATEGORY_COLOR_MAP.CT1; // 문화시설 색상
      case 'activity':
        return CATEGORY_COLOR_MAP.PK6; // 주차장 색상
      case 'travel':
        return CATEGORY_COLOR_MAP.AD5; // 숙박 색상
      default:
        return CATEGORY_COLOR_MAP.DEFAULT; // 기본 색상
    }
  };

  const categoryColor = getCategoryColorFromFilter(filterCategory);

  return (
    <div className="relative" onClick={onClick}>
      {/* 추천 매장 배지 */}
      {isRecommended && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center z-20 shadow-lg">
          <span className="text-white text-xs font-bold">★</span>
        </div>
      )}
      {/* 메인 마커 */}
      <div
        className={`
          relative 
          w-14 h-14 
          rounded-full 
          shadow-lg 
          border-3 
          border-white
          cursor-pointer
          transition-all 
          duration-200
          hover:scale-110
          ${isSelected ? `ring-4 ${isRecommended ? 'ring-yellow-300' : 'ring-blue-300'}` : ''}
          ${isRecommended ? 'animate-pulse' : ''}
        `}
        style={{
          backgroundColor: categoryColor,
        }}
      >
        {/* 브랜드 로고 */}
        <div className="absolute inset-2 bg-white rounded-full overflow-hidden">
          <img
            src={brandImageSrc}
            alt={`${store.storeName} 마커`}
            className="w-full h-full object-cover"
            onError={e => {
              e.currentTarget.src = '/images/brands/default-brand-logo.png';
            }}
          />
        </div>

        {/* 마커 포인터 */}
        <div
          className={`
            absolute 
            top-full 
            left-1/2
            transform
            -translate-x-1/2
            w-0 h-0
            border-l-[6px]
            border-r-[6px]
            border-t-[10px]
            border-transparent
            border-t-current
            drop-shadow-md
          `}
          style={{
            borderTopColor: isRecommended ? '#eab308' : categoryColor, // yellow-500 or category color
          }}
        />
      </div>

      {/* 선택 상태 펄스 */}
      {isSelected && (
        <div
          className={`absolute inset-0 rounded-full border-2 border-blue-400 animate-ping`}
        />
      )}
    </div>
  );
};

export default BrandMarker;
