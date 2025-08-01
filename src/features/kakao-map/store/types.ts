import type {
  GetNearbyStoresParams,
  StoreDetail,
  StoreListResponse,
} from '../api/types';
import type { Store } from '../types/store';

export interface Position {
  lat: number;
  lng: number;
}

export interface LoadingState {
  location: boolean;
  stores: boolean;
  storeDetail: boolean;
  favorite: boolean;
  recommendedStores: boolean;
}

export interface ErrorState {
  location: string | null;
  stores: string | null;
  storeDetail: string | null;
  favorite: string | null;
}

export interface MapStoreState {
  // 위치 관련 (LocationStore 통합)
  userLocation: Position | null;
  mapCenter: Position;
  // 매장 관련 (StoreListStore + Context 통합)
  stores: Store[];
  selectedStore: Store | null;
  storeDetail: StoreDetail | null;

  recommendedStores: Store[];
  showRecommendedStores: boolean; // 추천 매장 마커 표시 여부

  // 로딩 상태 (통합)
  loading: LoadingState;

  // 에러 상태 (통합)
  errors: ErrorState;

  // 캐시 관련 (성능 최적화)
  lastFetchParams: GetNearbyStoresParams | null;
  lastFetchTime: number | null;
  currentFilters: {
    category?: string;
    brand?: string;
    region?: string;
    searchQuery?: string;
  };

  // 즐겨찾기 상태
  bookmarkMode: boolean;
}

export interface MapStoreActions {
  // 위치 관련
  getCurrentLocation: () => Promise<void>;
  setMapCenter: (center: Position) => void;

  // 즐겨찾기 관련
  setBookmarkMode: (mode: boolean) => void;
  toggleBookmarkMode: () => void;

  // 매장 데이터 관리 (React Query 연동)
  setStores: (stores: Store[]) => void;
  setStoresFromQuery: (queryData: StoreListResponse | undefined) => void; // React Query 결과를 Store에 반영
  selectStore: (store: Store | null) => void;
  setStoreDetail: (detail: StoreDetail | null) => void;

  // 추천 매장 액션 추가
  setRecommendedStores: (stores: Store[]) => void;
  setShowRecommendedStores: (show: boolean) => void;
  toggleRecommendedStores: () => void;
  fetchRecommendedStores: () => Promise<void>;

  // 필터링
  applyFilters: (filters: {
    category?: string;
    brand?: string;
    region?: string;
    searchQuery?: string;
  }) => void;
  getFilteredStores: () => Store[];

  // 상태 관리
  setLoading: (type: keyof LoadingState, loading: boolean) => void;
  setError: (type: keyof ErrorState, error: string | null) => void;

  // 에러 관리
  clearError: (type: keyof ErrorState) => void;
  clearAllErrors: () => void;

  // 유틸리티
  reset: () => void;
}
