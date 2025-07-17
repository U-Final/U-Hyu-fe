import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import type { Store } from '../types/store';
import type {
  StoreDetail,
  GetNearbyStoresParams,
  StoreListResponse,
} from '../api/types';

export interface Position {
  lat: number;
  lng: number;
}

interface LoadingState {
  location: boolean;
  stores: boolean;
  storeDetail: boolean;
  favorite: boolean;
}

interface ErrorState {
  location: string | null;
  stores: string | null;
  storeDetail: string | null;
  favorite: string | null;
}

interface MapStoreState {
  // 위치 상태
  userLocation: Position | null;
  mapCenter: Position;

  // 매장 데이터 (React Query와 동기화)
  stores: Store[];
  selectedStore: Store | null;
  storeDetail: StoreDetail | null;

  // 상태 관리 (React Query 상태와 별도로 관리되는 것들만)
  loading: LoadingState;
  errors: ErrorState;

  // 필터링 상태
  currentFilters: {
    category?: string;
    brand?: string;
    region?: string;
    searchQuery?: string;
  };

  // 캐시 및 메타데이터
  lastFetchParams: GetNearbyStoresParams | null;
  lastFetchTime: number | null;
}

interface MapStoreActions {
  // 위치 관리
  getCurrentLocation: () => Promise<void>;
  setMapCenter: (center: Position) => void;

  // 매장 데이터 관리 (React Query 연동)
  setStores: (stores: Store[]) => void;
  setStoresFromQuery: (queryData: StoreListResponse | undefined) => void; // React Query 결과를 Store에 반영
  selectStore: (store: Store | null) => void;
  setStoreDetail: (detail: StoreDetail | null) => void;

  // 필터링
  applyFilters: (filters: MapStoreState['currentFilters']) => void;
  getFilteredStores: () => Store[];

  // 상태 관리
  setLoading: (type: keyof LoadingState, loading: boolean) => void;
  setError: (type: keyof ErrorState, error: string | null) => void;

  //
  clearError: (type: keyof ErrorState) => void;
  clearAllErrors: () => void;
  reset: () => void;
}

const initialState: MapStoreState = {
  userLocation: null,
  mapCenter: {
    lat: Number(import.meta.env.VITE_MAP_INITIAL_LAT) || 37.54699,
    lng: Number(import.meta.env.VITE_MAP_INITIAL_LNG) || 127.09598,
  },
  stores: [],
  selectedStore: null,
  storeDetail: null,
  loading: {
    location: false,
    stores: false,
    storeDetail: false,
    favorite: false,
  },
  errors: {
    location: null,
    stores: null,
    storeDetail: null,
    favorite: null,
  },
  currentFilters: {},
  lastFetchParams: null,
  lastFetchTime: null,
};

export const useMapStore = create<MapStoreState & MapStoreActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      // 📍 위치 관리 (기존과 동일)
      getCurrentLocation: async () => {
        const { loading } = get();
        if (loading.location) return;

        set(state => ({
          loading: { ...state.loading, location: true },
          errors: { ...state.errors, location: null },
        }));

        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
              });
            }
          );

          const newLocation: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          set(state => ({
            userLocation: newLocation,
            mapCenter: newLocation,
            loading: { ...state.loading, location: false },
          }));
        } catch (error) {
          let errorMessage = '위치를 가져올 수 없습니다.';
          if (error instanceof GeolocationPositionError) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = '위치 접근 권한이 거부되었습니다.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = '위치 정보를 사용할 수 없습니다.';
                break;
              case error.TIMEOUT:
                errorMessage = '위치 요청 시간이 초과되었습니다.';
                break;
            }
          }

          set(state => ({
            loading: { ...state.loading, location: false },
            errors: { ...state.errors, location: errorMessage },
          }));
        }
      },

      setMapCenter: (center: Position) => {
        set({ mapCenter: center });
      },

      // 🏪 매장 데이터 관리 (React Query 연동)
      setStores: (stores: Store[]) => {
        set({ stores });
      },

      setStoresFromQuery: (queryData: StoreListResponse | undefined) => {
        if (queryData?.data) {
          const stores = queryData.data.map(store => ({
            ...store,
          }));
          set({ stores });
        }
      },

      selectStore: (store: Store | null) => {
        set({ selectedStore: store });
        if (store) {
          set({ mapCenter: { lat: store.latitude, lng: store.longitude } });
        }
      },

      setStoreDetail: (detail: StoreDetail | null) => {
        set({ storeDetail: detail });
      },

      // 🎯 필터링 로직
      applyFilters: filters => {
        set({ currentFilters: filters });
      },

      getFilteredStores: () => {
        const { stores, currentFilters } = get();

        return stores.filter(store => {
          // 카테고리 필터
          if (currentFilters.category && currentFilters.category !== 'all') {
            if (store.categoryName !== currentFilters.category) return false;
          }

          // 브랜드 필터
          if (currentFilters.brand) {
            if (store.brandName !== currentFilters.brand) return false;
          }

          // 검색어 필터
          if (currentFilters.searchQuery) {
            const query = currentFilters.searchQuery.toLowerCase();
            const searchTarget =
              `${store.storeName} ${store.brandName} ${store.addressDetail}`.toLowerCase();
            if (!searchTarget.includes(query)) return false;
          }

          return true;
        });
      },

      // 📊 상태 관리
      setLoading: (type, loading) => {
        set(state => ({
          loading: { ...state.loading, [type]: loading },
        }));
      },

      setError: (type, error) => {
        set(state => ({
          errors: { ...state.errors, [type]: error },
        }));
      },

      // 🛠️ 유틸리티
      clearError: type => {
        set(state => ({
          errors: { ...state.errors, [type]: null },
        }));
      },

      clearAllErrors: () => {
        set(() => ({
          errors: {
            location: null,
            stores: null,
            storeDetail: null,
            favorite: null,
          },
        }));
      },

      reset: () => {
        set(initialState);
      },
    })),
    { name: 'map-store' }
  )
);

// 🎯 선택적 Selectors (성능 최적화)
export const useMapCenter = () => useMapStore(state => state.mapCenter);
export const useStores = () => useMapStore(state => state.stores);
export const useFilteredStores = () =>
  useMapStore(state => state.getFilteredStores());
export const useSelectedStore = () => useMapStore(state => state.selectedStore);
export const useUserLocation = () => useMapStore(state => state.userLocation);
export const useMapLoading = () => useMapStore(state => state.loading);
export const useMapErrors = () => useMapStore(state => state.errors);
