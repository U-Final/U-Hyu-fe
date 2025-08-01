import type { Store } from '@kakao-map/types/store';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface RecommendedStoreInfoWindowProps {
  store: Store;
  position: { lat: number; lng: number };
}

export const RecommendStoreInfoWindow: React.FC<
  RecommendedStoreInfoWindowProps
> = ({ store, position }) => {
  return (
    <CustomOverlayMap
      position={position}
      yAnchor={1.4}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div className="relative">
        {/* 말풍선 꼬리 - 뒤쪽에 배치 */}
        <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 z-0">
          <svg width="24" height="24" viewBox="0 0 24 24" className="">
            <polygon points="12,24 0,0 24,0" fill="white" />
          </svg>
        </div>

        <div
          className="relative z-10 bg-white rounded-[14px] shadow-lg border border-gray-200 p-4 min-w-[280px] max-w-[320px] border-b-0"
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
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
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
              <h3 className="font-bold text-black text-lg truncate">
                {store.storeName}
              </h3>
              <p className="text-sm text-secondary truncate">
                {store.addressDetail}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🎁</span>
              <span className="font-bold text-yellow-800 text-md">
                U-HYU 추천
              </span>
              <span className="font-semibold text-yellow-800 text-sm">
                멤버십 혜택
              </span>
            </div>
            <p className="text-yellow-900 font-semibold text-lg leading-relaxed">
              {store.benefit}
            </p>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
};
