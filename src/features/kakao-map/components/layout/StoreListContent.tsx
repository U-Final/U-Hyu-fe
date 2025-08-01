import { type FC } from 'react';

import type { Store } from '@kakao-map/types/store';
import { RecommendedStoreListWrapper } from '@recommendation/components/RecommendedStoreListWrapper';

import { BrandCard } from '@/shared/components';
import { trackMarkerClick } from '@/shared/utils/actionlogTracker';

interface StoreListContentProps {
  stores: Store[];
  onFilterClick: () => void;
  onStoreClick?: (store: Store) => void;
}

const StoreListContent: FC<StoreListContentProps> = ({
  stores,
  onStoreClick,
}) => {
  const handleStoreClick = (store: Store) => {
    onStoreClick?.(store);
    trackMarkerClick(store.storeId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 필터 헤더 - 고정 */}
      <div className="flex-shrink-0 py-3 rounded-[1px] bg-[#f4f8ff]">
        <RecommendedStoreListWrapper />
      </div>

      {/* 스토어 리스트 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto">
        {stores.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-400">주변에 매장이 없습니다</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stores.map(store => (
              <div
                key={store.storeId}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleStoreClick(store)}
              >
                <BrandCard logoUrl={store.logoImage}>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {store.storeName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {store.addressDetail}
                    </div>
                    <div className="text-xs text-red-500 mt-1 font-medium">
                      {store.benefit}
                    </div>
                  </div>
                </BrandCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreListContent;
