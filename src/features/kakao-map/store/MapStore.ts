import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import type { Store } from '../types/store';
import type { StoreDetail, StoreListResponse } from '../api/types';
import type { Position, MapStoreState, MapStoreActions } from './types';

const parseCoordinate = (
  value: string | undefined,
  defaultValue: number
): number => {
  const parsed = Number(value);
  return !isNaN(parsed) ? parsed : defaultValue;
};

const initialState: MapStoreState = {
  userLocation: null,
  mapCenter: {
    lat: parseCoordinate(import.meta.env.VITE_MAP_INITIAL_LAT, 37.54699),
    lng: parseCoordinate(import.meta.env.VITE_MAP_INITIAL_LNG, 127.09598),
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
