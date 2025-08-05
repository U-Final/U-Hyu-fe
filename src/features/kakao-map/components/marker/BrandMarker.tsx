import { type FC } from 'react';

import { useGA } from '@/shared/hooks/useGA';

import type { Store } from '../../types/store.ts';
import { getCategoryColorFromFilter } from '../../utils/categoryColorMapping';

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
  const { trackMapInteraction } = useGA();
  const brandImageSrc = store.logoImage;

  // 항상 매장의 실제 카테고리 색상 사용
  const categoryColor = getCategoryColorFromFilter(store.categoryName);

  const handleMarkerClick = () => {
    // GA 추적: 마커 클릭
    trackMapInteraction('marker_click', store.storeId, store.categoryName);

    // 기존 onClick 핸들러 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative select-none" onClick={handleMarkerClick} style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* 추천 매장 심플한 효과 */}
      {isRecommended && (
        <>
          {/* 단일 펄스 링 */}
          <div className="absolute inset-0 w-16 h-16 -translate-x-1 -translate-y-1 rounded-full border-2 border-yellow-400 opacity-50 animate-pulse" />
        </>
      )}
      {/* 메인 마커 */}
      <div
        className={`
          relative 
          w-14 h-14 
          rounded-full 
          shadow-xl 
          border-3 
          border-white
          cursor-pointer
          transition-all 
          duration-200
          hover:scale-110
          hover:shadow-2xl
          ${isSelected ? `ring-4 ${isRecommended ? 'ring-yellow-300' : 'ring-blue-300'} shadow-2xl` : ''}
        `}
        style={{
          backgroundColor: categoryColor,
          boxShadow: isRecommended
            ? `0 8px 25px -5px ${categoryColor}50, 0 10px 10px -5px ${categoryColor}30`
            : `0 8px 25px -5px ${categoryColor}40, 0 10px 10px -5px ${categoryColor}30`,
          border: isRecommended ? '3px solid #fbbf24' : '3px solid white',
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

        {/* 추천 매장 간단한 표시 */}
        {isRecommended && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        )}

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
            ${isRecommended ? 'animate-pulse' : ''}
          `}
          style={{
            borderTopColor: isRecommended ? '#fbbf24' : categoryColor, // amber-400 or category color
            filter: isRecommended
              ? 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4))'
              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
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
