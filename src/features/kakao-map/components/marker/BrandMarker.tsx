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

  const categoryColor = getCategoryColorFromFilter(store.categoryName);

  const handleMarkerClick = () => {
    trackMapInteraction('marker_click', store.storeId, store.categoryName);

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
      {isRecommended && (
        <div
          className="absolute inset-0 w-16 h-16 -translate-x-1 -translate-y-1 rounded-full border-2 border-yellow-400 opacity-60 animate-pulse"
          style={{
            animationDuration: '2s',
          }}
        />
      )}

      <div className="relative">
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

          {isRecommended && (
            <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center bg-yellow-400 z-100">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

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
