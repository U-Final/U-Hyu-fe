import { getCategoryId } from '@kakao-map/constants/categoryMapping';
import type { StoreCategory } from '@kakao-map/types/category';
import type { Store } from '@kakao-map/types/store';

import {
  getFilterUsageCount,
  getMarkerClickCount,
  trackFilterUsed,
  trackMarkerClick,
} from '@/shared/utils/actionlogTracker';

export const useMapMarkerActionTracking = () => {
  const handleMarkerClick = (store: Store) => {
    trackMarkerClick(store.storeId);
  };

  const handleFilterClick = (categoryKey: string) => {
    if (categoryKey !== 'all') {
      const categoryId = getCategoryId(categoryKey as StoreCategory);
      if (categoryId > 0) {
        trackFilterUsed(categoryKey);
      }
    }
  };

  const getMarkerCount = (storeId: number) => getMarkerClickCount(storeId);
  const getFilterCount = (categoryKey: string) =>
    getFilterUsageCount(categoryKey);

  return {
    handleMarkerClick,
    handleFilterClick,
    getMarkerCount,
    getFilterCount,
  };
};
