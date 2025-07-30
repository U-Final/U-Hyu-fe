import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import { useMapStore } from '@kakao-map/store/MapStore';
import type { Store } from '@kakao-map/types/store';

import { BrandCard } from '@/shared/components';

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

  const handleCardClick = () => {
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

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
    >
      <BrandCard logoUrl={store.logoImage}>
        {' '}
        {/* logoImage -> logo_image 수정 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-black text-lg font-bold group-hover:text-blue-600 transition-colors">
              {store.storeName}
            </p>
            {/* 추천 매장 배지 */}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200 group-hover:shadow-sm transition-shadow">
              <span className="mr-1">⭐</span>
              추천
            </span>
          </div>

          <p className="text-black text-sm group-hover:text-gray-700 transition-colors">
            📍 {store.addressDetail}
          </p>

          {/* 혜택 정보 - 강조된 스타일 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-md p-2 mt-1 group-hover:shadow-sm transition-shadow">
            <p className="text-yellow-900 font-semibold text-sm flex items-center gap-1">
              <span>🎁</span>
              <span>{store.benefit}</span>
            </p>
          </div>

          {/* 클릭 힌트 */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 group-hover:text-blue-600 transition-colors">
            <span>👆</span>
            <span>탭하여 지도에서 확인하기</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </div>
        </div>
      </BrandCard>
    </div>
  );
};

export default RecommendedStoreCard;
