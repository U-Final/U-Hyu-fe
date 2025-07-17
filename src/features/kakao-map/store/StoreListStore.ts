import { create } from 'zustand';
import type {
  StoreDetail,
  StoreSummary,
  GetNearbyStoresParams,
  GetStoreDetailParams,
  ToggleFavoriteParams,
} from '../api/types';

/**
 * 매장 목록 상태
 */
interface StoreListState {
  stores: StoreSummary[];
  selectedStoreId: number | null;
  selectedStoreDetail: StoreDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchNearbyStores: (params: GetNearbyStoresParams) => Promise<void>;
  fetchStoreDetail: (params: GetStoreDetailParams) => Promise<void>;
  toggleFavorite: (params: ToggleFavoriteParams) => Promise<void>;
  setSelectedStoreId: (storeId: number | null) => void;
}

export const useStoreListStore = create<StoreListState>(set => ({
  stores: [],
  selectedStoreId: null,
  selectedStoreDetail: null,
  isLoading: false,
  error: null,

  fetchNearbyStores: async () => {
    set({ isLoading: true, error: null });
    try {
      set({ stores: [], isLoading: false }); // 목업
    } catch {
      set({ error: '주변 매장 불러오기 실패', isLoading: false });
    }
  },

  fetchStoreDetail: async () => {
    set({ isLoading: true, error: null });
    try {
      set({ selectedStoreDetail: null, isLoading: false }); // 목업
    } catch {
      set({ error: '매장 상세 불러오기 실패', isLoading: false });
    }
  },

  toggleFavorite: async () => {
    try {
      console.log('즐겨찾기 토글');
    } catch {
      set({ error: '즐겨찾기 토글 실패' });
    }
  },

  setSelectedStoreId: storeId => set({ selectedStoreId: storeId }),
}));
