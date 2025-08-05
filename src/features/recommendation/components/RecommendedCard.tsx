import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import { useMapStore } from '@kakao-map/store/MapStore';
import type { Store } from '@kakao-map/types/store';
import ConfirmExcludeModalContent from '@recommendation/components/ConfirmExcludeModalContent';
import { ThumbsDown } from 'lucide-react';

import { BrandCard } from '@/shared/components';
import { useModalStore } from '@/shared/store';

export interface RecommendedStoreCardProps {
  store: Store;
  autoCloseBottomSheet?: boolean; // 바텀시트 자동 닫기 여부 (기본값: false)
}

const RecommendedStoreCard = ({
  store,
  autoCloseBottomSheet = false,
}: RecommendedStoreCardProps) => {
  const selectStore = useMapStore(state => state.selectStore);
  const setMapCenter = useMapStore(state => state.setMapCenter);
  const { bottomSheetRef } = useMapUIContext();
  const { openModal } = useModalStore();

  const handleCardClick = () => {
    if (!store.addressDetail) return; // 온라인 매장은 클릭 무시

    // 전역 상태에 선택된 매장 설정 (지도 포커스용)
    selectStore(store);

    // 지도 중심을 해당 매장으로 이동
    setMapCenter({ lat: store.latitude, lng: store.longitude });

    // 바텀시트 자동 닫기 (옵션)
    if (autoCloseBottomSheet && bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.setExplicitlyClosed(true);
      bottomSheetRef.current.close();
    }
  };

  const handleDislikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!store.brandId) return;

    openModal('base', {
      title: '앞으로 이 브랜드는 추천에서 제외 됩니다.',
      children: (
        <ConfirmExcludeModalContent
          brandId={store.brandId}
          brandName={store.brandName}
        />
      ),
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-lg group pb-8"
    >
      <BrandCard logoUrl={store.logoImage}>
        <div className="flex space-around items-center w-full">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-black text-lg font-bold group-hover:text-blue-600 transition-colors">
                {store.storeName}
              </p>
            </div>

            {store.addressDetail && (
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>{store.addressDetail}</span>
              </p>
            )}

            <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-md p-2 group-hover:shadow-sm transition-shadow w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-orange-100/40 to-yellow-100/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-200/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-orange-200/15 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
             
              <div className="absolute inset-0 overflow-hidden rounded-md">
                <div
                  className="absolute top-1 left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0s', animationDuration: '1s' }}
                ></div>
                <div
                  className="absolute top-2 right-3 w-1 h-1 bg-orange-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}
                ></div>
                <div
                  className="absolute top-1 right-1 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}
                ></div>
                <div
                  className="absolute top-3 left-1 w-1 h-1 bg-orange-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0.6s', animationDuration: '1.1s' }}
                ></div>
                <div
                  className="absolute top-1 left-4 w-0.5 h-0.5 bg-yellow-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.8s', animationDuration: '0.9s' }}
                ></div>
                <div
                  className="absolute top-2 left-6 w-1 h-1 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: '1s', animationDuration: '1.3s' }}
                ></div>
                <div
                  className="absolute top-3 right-2 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: '1.2s', animationDuration: '1s' }}
                ></div>
                <div
                  className="absolute top-1 right-4 w-1 h-1 bg-orange-400 rounded-full animate-bounce"
                  style={{ animationDelay: '1.4s', animationDuration: '1.1s' }}
                ></div>
                <div
                  className="absolute top-2 left-3 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-bounce"
                  style={{ animationDelay: '1.6s', animationDuration: '0.8s' }}
                ></div>
                <div
                  className="absolute top-3 right-5 w-1 h-1 bg-orange-300 rounded-full animate-bounce"
                  style={{ animationDelay: '1.8s', animationDuration: '1.2s' }}
                ></div>
              </div>
              
              <p className="text-yellow-900 font-semibold text-sm flex items-center gap-1 relative z-10">
                <span className="animate-pulse">🎁</span>
                <span>{store.benefit}</span>
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleDislikeClick}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ThumbsDown
            className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="추천 제외"
          />
        </button>
      </BrandCard>
    </div>
  );
};

export default RecommendedStoreCard;
