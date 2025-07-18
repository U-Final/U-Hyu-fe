import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';

// 순수 UI 상태만 관리
interface MapUIState {
  // 검색 UI
  searchValue: string;
  isSearchFocused: boolean;

  // 바텀시트 네비게이션
  currentBottomSheetStep: 'list' | 'category' | 'brand';
  isBottomSheetExpanded: boolean;

  // 필터 UI 상태
  selectedCategory: string;
  selectedBrand: string;
  activeRegionFilter: string;

  // 지도 UI
  selectedMarkerId: number | null; // 마커 선택 상태만 UI로 관리
  showLocationMarker: boolean;

  // 인터랙션 상태
  showFilterDropdown: boolean;
  isMapDragging: boolean;
}

type MapUIAction =
  // 검색 관련
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_SEARCH_FOCUSED'; payload: boolean }
  | { type: 'CLEAR_SEARCH' }

  // 바텀시트 관련
  | { type: 'SET_BOTTOM_SHEET_STEP'; payload: 'list' | 'category' | 'brand' }
  | { type: 'SET_BOTTOM_SHEET_EXPANDED'; payload: boolean }
  | { type: 'TOGGLE_BOTTOM_SHEET' }

  // 필터 관련
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_BRAND'; payload: string }
  | { type: 'SET_REGION_FILTER'; payload: string }
  | { type: 'RESET_FILTERS' }

  // 지도 UI 관련
  | { type: 'SET_SELECTED_MARKER'; payload: number | null }
  | { type: 'TOGGLE_LOCATION_MARKER' }
  | { type: 'SET_MAP_DRAGGING'; payload: boolean }

  // 기타 UI
  | { type: 'TOGGLE_FILTER_DROPDOWN' }
  | { type: 'RESET_ALL_UI' };

const mapUIReducer = (state: MapUIState, action: MapUIAction): MapUIState => {
  switch (action.type) {
    // 검색 관련
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'SET_SEARCH_FOCUSED':
      return { ...state, isSearchFocused: action.payload };
    case 'CLEAR_SEARCH':
      return { ...state, searchValue: '', isSearchFocused: false };

    // 바텀시트 관련
    case 'SET_BOTTOM_SHEET_STEP':
      return { ...state, currentBottomSheetStep: action.payload };
    case 'SET_BOTTOM_SHEET_EXPANDED':
      return { ...state, isBottomSheetExpanded: action.payload };
    case 'TOGGLE_BOTTOM_SHEET':
      return { ...state, isBottomSheetExpanded: !state.isBottomSheetExpanded };

    // 필터 관련
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        selectedBrand: '', // 카테고리 변경 시 브랜드 초기화
      };
    case 'SET_SELECTED_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_REGION_FILTER':
      return { ...state, activeRegionFilter: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        selectedCategory: '',
        selectedBrand: '',
        activeRegionFilter: '',
        searchValue: '',
      };

    // 지도 UI 관련
    case 'SET_SELECTED_MARKER':
      return { ...state, selectedMarkerId: action.payload };
    case 'TOGGLE_LOCATION_MARKER':
      return { ...state, showLocationMarker: !state.showLocationMarker };
    case 'SET_MAP_DRAGGING':
      return { ...state, isMapDragging: action.payload };

    // 기타 UI
    case 'TOGGLE_FILTER_DROPDOWN':
      return { ...state, showFilterDropdown: !state.showFilterDropdown };
    case 'RESET_ALL_UI':
      return initialUIState;

    default:
      return state;
  }
};

interface MapUIContextValue {
  state: MapUIState;
  actions: {
    // 검색 관련
    setSearchValue: (value: string) => void;
    setSearchFocused: (focused: boolean) => void;
    clearSearch: () => void;

    // 바텀시트 관련
    setBottomSheetStep: (step: 'list' | 'category' | 'brand') => void;
    setBottomSheetExpanded: (expanded: boolean) => void;
    toggleBottomSheet: () => void;

    // 필터 관련
    setSelectedCategory: (category: string) => void;
    setSelectedBrand: (brand: string) => void;
    setRegionFilter: (region: string) => void;
    resetFilters: () => void;

    // 지도 UI 관련
    setSelectedMarker: (markerId: number | null) => void;
    toggleLocationMarker: () => void;
    setMapDragging: (dragging: boolean) => void;

    // 기타 UI
    toggleFilterDropdown: () => void;
    resetAllUI: () => void;
  };
}

const initialUIState: MapUIState = {
  searchValue: '',
  isSearchFocused: false,
  currentBottomSheetStep: 'list',
  isBottomSheetExpanded: true,
  selectedCategory: '',
  selectedBrand: '',
  activeRegionFilter: 'all',
  selectedMarkerId: null,
  showLocationMarker: true,
  showFilterDropdown: false,
  isMapDragging: false,
};

const MapUIContext = createContext<MapUIContextValue | null>(null);

export const MapUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mapUIReducer, initialUIState);

  const actions = {
    // 검색 관련
    setSearchValue: useCallback((value: string) => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
    }, []),

    setSearchFocused: useCallback((focused: boolean) => {
      dispatch({ type: 'SET_SEARCH_FOCUSED', payload: focused });
    }, []),

    clearSearch: useCallback(() => {
      dispatch({ type: 'CLEAR_SEARCH' });
    }, []),

    // 바텀시트 관련
    setBottomSheetStep: useCallback((step: 'list' | 'category' | 'brand') => {
      dispatch({ type: 'SET_BOTTOM_SHEET_STEP', payload: step });
    }, []),

    setBottomSheetExpanded: useCallback((expanded: boolean) => {
      dispatch({ type: 'SET_BOTTOM_SHEET_EXPANDED', payload: expanded });
    }, []),

    toggleBottomSheet: useCallback(() => {
      dispatch({ type: 'TOGGLE_BOTTOM_SHEET' });
    }, []),

    // 필터 관련
    setSelectedCategory: useCallback((category: string) => {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    }, []),

    setSelectedBrand: useCallback((brand: string) => {
      dispatch({ type: 'SET_SELECTED_BRAND', payload: brand });
    }, []),

    setRegionFilter: useCallback((region: string) => {
      dispatch({ type: 'SET_REGION_FILTER', payload: region });
    }, []),

    resetFilters: useCallback(() => {
      dispatch({ type: 'RESET_FILTERS' });
    }, []),

    // 지도 UI 관련
    setSelectedMarker: useCallback((markerId: number | null) => {
      dispatch({ type: 'SET_SELECTED_MARKER', payload: markerId });
    }, []),

    toggleLocationMarker: useCallback(() => {
      dispatch({ type: 'TOGGLE_LOCATION_MARKER' });
    }, []),

    setMapDragging: useCallback((dragging: boolean) => {
      dispatch({ type: 'SET_MAP_DRAGGING', payload: dragging });
    }, []),

    // 기타 UI
    toggleFilterDropdown: useCallback(() => {
      dispatch({ type: 'TOGGLE_FILTER_DROPDOWN' });
    }, []),

    resetAllUI: useCallback(() => {
      dispatch({ type: 'RESET_ALL_UI' });
    }, []),
  };

  return (
    <MapUIContext.Provider value={{ state, actions }}>
      {children}
    </MapUIContext.Provider>
  );
};

export const useMapUIContext = () => {
  const context = useContext(MapUIContext);
  if (!context) {
    throw new Error('useMapUIContext must be used within a MapUIProvider');
  }
  return context;
};
