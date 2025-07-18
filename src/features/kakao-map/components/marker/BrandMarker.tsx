import { type FC } from 'react';
import { CATEGORY_CONFIGS } from '../../types/category.ts';
import type { Store } from '../../types/store.ts';

interface BrandMarkerProps {
  store: Store;
  isSelected?: boolean;
  hasPromotion?: boolean;
  onClick?: () => void;
}

const BrandMarker: FC<BrandMarkerProps> = ({
  store,
  isSelected = false,
  hasPromotion = false,
  onClick,
}) => {
  const category = store.categoryName as keyof typeof CATEGORY_CONFIGS;
  const categoryConfig = CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS.default;
  const brandImageSrc = store.logo_image;

  return (
    <div className="relative" onClick={onClick}>
      {/* 프로모션 배지 */}
      {hasPromotion && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-10">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      )}

      {/* 메인 마커 */}
      <div
        className={`
          relative 
          w-14 h-14 
          ${categoryConfig.color}
          rounded-full 
          shadow-lg 
          border-3 
          border-white
          cursor-pointer
          transition-all 
          duration-200
          hover:scale-110
          ${isSelected ? `ring-4 ${categoryConfig.ringColor}` : ''}
        `}
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
            ${categoryConfig.color}
            drop-shadow-md
          `}
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
