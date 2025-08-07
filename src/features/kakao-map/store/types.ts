import type { GetNearbyStoresParams, StoreDetail, StoreListResponse, StoreSummary } from '../api/types';
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

export interface SearchParams {
  lat: number;
  lng: number;
  radius: number;
}

export interface MapStoreState {
  userLocation: Position | null;
  mapCenter: Position;
  
  zoomLevel: number;
  searchRadius: number;
  
  searchParams: SearchParams | null;
  
  stores: Store[];
  selectedStore: Store | null;
  storeDetail: StoreDetail | null;

  recommendedStores: Store[];
  showRecommendedStores: boolean;

  loading: LoadingState;

  errors: ErrorState;

  lastFetchParams: GetNearbyStoresParams | null;
  lastFetchTime: number | null;
  currentFilters: {
    category?: string;
    brand?: string;
    region?: string;
    searchQuery?: string;
  };

  bookmarkMode: boolean;
  bookmarkStores: StoreSummary[];
}

export interface MapStoreActions {
  getCurrentLocation: (force?: boolean) => Promise<void>;
  setMapCenter: (center: Position) => void;
  
  setZoomLevel: (level: number) => void;
  updateSearchRadius: () => void;
  
  setSearchParams: (params: SearchParams) => void;

  setBookmarkMode: (mode: boolean) => void;
  toggleBookmarkMode: () => void;

  setStores: (stores: Store[]) => void;
  setStoresFromQuery: (queryData: StoreListResponse | undefined) => void;
  selectStore: (store: Store | null) => void;
  setStoreDetail: (detail: StoreDetail | null) => void;

  setRecommendedStores: (stores: Store[]) => void;
  setShowRecommendedStores: (show: boolean) => void;
  toggleRecommendedStores: () => void;
  fetchRecommendedStores: () => Promise<void>;
  refreshBookmarkStores: () => Promise<void>;


  applyFilters: (filters: {
    category?: string;
    brand?: string;
    region?: string;
    searchQuery?: string;
  }) => void;
  getFilteredStores: () => Store[];

  setLoading: (type: keyof LoadingState, loading: boolean) => void;
  setError: (type: keyof ErrorState, error: string | null) => void;

  clearError: (type: keyof ErrorState) => void;
  clearAllErrors: () => void;

  reset: () => void;

  fetchBookmarkStores: () => Promise<void>;
}