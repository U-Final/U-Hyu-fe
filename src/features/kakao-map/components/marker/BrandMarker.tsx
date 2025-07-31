import { type FC } from 'react';

import type { Store } from '../../types/store.ts';
import { FILTER_TABS } from '../../../../shared/components/filter_tabs/FilterTabs.variants.ts';

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

  // FilterTabs 색상을 직접 사용하는 개선된 함수
  const getCategoryColorFromFilter = (storeCategoryName: string): string => {
    // 매장 카테고리명을 FilterTabs에서 찾기
    const filterTab = FILTER_TABS.find(tab => {
      // 정확한 매칭
      if (tab.value === storeCategoryName) return true;
      
      // 유사한 카테고리 매칭
      const categoryMappings: Record<string, string[]> = {
        '테마파크': ['themepark'],
        '워터파크/아쿠아리움': ['waterpark'],
        '액티비티': ['activity'],
        '뷰티': ['beauty'],
        '건강': ['health', 'pharmacy'],
        '쇼핑': ['shopping'],
        '생활/편의': ['lifestyle', 'convenience'],
        '베이커리/디저트': ['bakery', 'cafe'],
        '음식점': ['food', 'restaurant', 'fastfood'],
        '영화/미디어': ['media', 'culture'],
        '공연/전시': ['performance'],
        '교육': ['education'],
        '여행/교통': ['travel'],
      };
      
      const matchingCategories = categoryMappings[tab.value];
      return matchingCategories?.includes(storeCategoryName);
    });
    
    return filterTab?.color || '#6b7280'; // 기본 회색
  };

  const categoryColor = getCategoryColorFromFilter(store.categoryName);

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
