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
              {/* 추천 매장 배지 */}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200 group-hover:shadow-sm transition-shadow font-semibold">
                <span className="mr-1">🔥</span>
                추천
              </span>
            </div>

            {store.addressDetail && (
              <p className="text-black text-sm group-hover:text-gray-700 transition-colors">
                📍 {store.addressDetail}
              </p>
            )}

            {/* 혜택 정보 - 강조된 스타일 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-md p-2 group-hover:shadow-sm transition-shadow w-full">
              <p className="text-yellow-900 font-semibold text-sm flex items-center gap-1">
                <span>🎁</span>
                <span>{store.benefit}</span>
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleDislikeClick}
          className="absolute top-2 right-2 p-1 mr-3 rounded-full bg-white hover:bg-gray-100"
        >
          <ThumbsDown
            className="w-4 h-4 text-secondary hover:text-red-500"
            aria-label="추천 제외"
          />
        </button>
      </BrandCard>
    </div>
  );
};

export default RecommendedStoreCard;
