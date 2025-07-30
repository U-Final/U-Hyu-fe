// 1. 먼저 RecommendStoreInfoWindow 컴포넌트 수정 (logoImage -> logo_image)
import type { Store } from '@kakao-map/types/store';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface RecommendedStoreInfoWindowProps {
  store: Store;
  position: { lat: number; lng: number };
  onClose: () => void;
}

export const RecommendStoreInfoWindow: React.FC<
  RecommendedStoreInfoWindowProps
> = ({ store, position, onClose }) => {
  return (
    <CustomOverlayMap
      position={position}
      yAnchor={1.3}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div
        className="relative z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] max-w-[320px]"
        onClick={e => {
          e.stopPropagation();
        }}
        onMouseDown={e => {
          e.stopPropagation();
        }}
        onMouseUp={e => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="닫기"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="pr-8">
          <div className="flex items-center gap-3 mb-3">
            {/* 브랜드 로고 - logo_image로 수정 */}
            <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={store.logoImage}
                alt={`${store.storeName} 로고`}
                className="w-full h-full object-cover"
                onError={e => {
                  e.currentTarget.src = '/images/brands/default-brand-logo.png';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg truncate">
                {store.storeName}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {store.addressDetail}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🎁</span>
              <span className="font-semibold text-yellow-800 text-sm">
                추천 혜택
              </span>
            </div>
            <p className="text-yellow-900 font-medium text-sm leading-relaxed">
              {store.benefit}
            </p>
          </div>
          <div className="text-xs text-gray-500 text-center">
            추천 매장 • 탭하여 자세히 보기
          </div>
          <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="drop-shadow-sm"
            >
              <polygon
                points="12,24 0,0 24,0"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
};
