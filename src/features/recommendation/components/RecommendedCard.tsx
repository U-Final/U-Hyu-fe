import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import { useMapStore } from '@kakao-map/store/MapStore';
import type { Store } from '@kakao-map/types/store';
import ConfirmExcludeModalContent from '@recommendation/components/ConfirmExcludeModalContent';
import { ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

import { BrandCard } from '@/shared/components';
import { useModalStore } from '@/shared/store';

export interface RecommendedStoreCardProps {
  store: Store;
  autoCloseBottomSheet?: boolean; // 바텀시트 자동 닫기 여부 (기본값: false)
}

// 텍스트 길이 제한 상수
const TEXT_LIMITS = {
  storeName: 20,
  address: 35,
  benefit: 45,
};

// 축약된 텍스트를 반환하는 헬퍼 함수
const getTruncatedText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

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
    if (!store.brandId) {
      toast.error('추천 매장을 찾을 수 없습니다.');
      return;
    }

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
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <BrandCard logoUrl={store.logoImage}>
        <div className="flex items-start w-full relative">
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-black text-lg font-bold hover:text-primary transition-colors">
                {getTruncatedText(store.storeName || '', TEXT_LIMITS.storeName)}
              </h3>
            </div>

            {store.addressDetail && (
              <p className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>{getTruncatedText(store.addressDetail || '', TEXT_LIMITS.address)}</span>
              </p>
            )}

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 font-semibold text-sm flex items-center gap-2">
                <span className="text-lg">🎁</span>
                <span>{getTruncatedText(store.benefit || '', TEXT_LIMITS.benefit)}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleDislikeClick}
            className="absolute top-0 right-0 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0"
          >
            <ThumbsDown
              className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="추천 제외"
            />
          </button>
        </div>
      </BrandCard>
    </div>
  );
};

export default RecommendedStoreCard;
