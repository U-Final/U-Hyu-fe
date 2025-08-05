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
    <div
      className="relative select-none"
      onClick={handleMarkerClick}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* 추천 매장 글로우 효과 */}
      {isRecommended && (
        <div
          className="absolute inset-0 w-16 h-16 -translate-x-2 -translate-y-1 rounded-full opacity-30 animate-pulse"
          style={{
            background: `radial-gradient(circle, #fbbf24 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      )}

      {/* 마커 전체 컨테이너 */}
      <div className="relative">
        {/* 메인 마커 몸체 - 원형 */}
        <div
          className={`
            relative 
            w-14 h-14
            rounded-full
            border-1
            border-white
            cursor-pointer
            transition-all 
            duration-300
            ease-out
            hover:scale-110
            hover:shadow-xl
            transform-gpu
            ${isSelected ? 'scale-100 shadow-xl' : 'shadow-lg'}
          `}
          style={{
            backgroundColor: isRecommended ? '#fbbf24' : categoryColor,
            boxShadow: isRecommended
              ? `0 8px 25px -8px ${categoryColor}60, 0 4px 12px -4px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              : `0 6px 20px -6px ${categoryColor}50, 0 4px 8px -2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
          }}
        >
          {/* 브랜드 로고 */}
          <div className="absolute inset-1 bg-white rounded-full overflow-hidden shadow-inner">
            <img
              src={brandImageSrc}
              alt={`${store.storeName} 마커`}
              className="w-full h-full object-cover"
              onError={e => {
                e.currentTarget.src = '/images/brands/default-brand-logo.png';
              }}
            />
          </div>

          {/* 추천 매장 미니멀 뱃지 */}
          {isRecommended && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-1 border-white shadow-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)',
              }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
            </div>
          )}
        </div>

        {/* 마커 꼬리 - 자연스러운 삼각형 */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1"
          style={{
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: `12px solid ${isRecommended ? '#fbbf24' : categoryColor}`,
            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15))',
          }}
        />

        {/* 꼬리 테두리 효과 */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '13px solid white',
            zIndex: -1,
          }}
        />
      </div>

      {/* 선택 상태 링 효과 */}
      {isSelected && (
        <>
          <div
            className="absolute inset-0 w-14 h-14 rounded-full animate-ping"
            style={{
              border: `2px solid ${isRecommended ? '#fbbf24' : '#3b82f6'}`,
              opacity: 0.6,
            }}
          />
          <div
            className="absolute inset-0 w-14 h-14 rounded-full"
            style={{
              border: `3px solid ${isRecommended ? '#fbbf24' : '#3b82f6'}`,
              opacity: 0.8,
            }}
          />
        </>
      )}
    </div>
  );
};

export default BrandMarker;
