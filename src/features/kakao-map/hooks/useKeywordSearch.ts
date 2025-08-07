import { useCallback, useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';

import {
  getKeywordSearch,
  getKeywordSearchByCategory,
  getKeywordSearchByLocation,
} from '../api/keywordSearchApi';
import type {
  KakaoKeywordSearchOptions,
  KakaoKeywordSearchResponse,
  NormalizedPlace,
} from '../api/types';
import { getPrimaryKakaoCategoryForFilter } from '../config/categoryMapping';

export interface KeywordSearchState {
  keyword: string;
  results: NormalizedPlace[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  /** 메타 정보 */
  meta: KakaoKeywordSearchResponse['meta'] | null;
  selectedPlace: NormalizedPlace | null;
}

export interface KeywordSearchActions {
  setKeyword: (keyword: string) => void;
  search: (
    inputKeyword?: string,
    options?: KakaoKeywordSearchOptions
  ) => Promise<void>;
  searchByLocation: (
    keyword: string,
    center: { lat: number; lng: number },
    radius?: number,
    categoryFilter?: string
  ) => Promise<void>;
  searchWithCategoryFilter: (
    keyword: string,
    categoryFilter: string,
    center?: { lat: number; lng: number },
    radius?: number
  ) => Promise<void>;
  selectPlace: (place: NormalizedPlace | null) => void;
  clearResults: () => void;
  clearError: () => void;
  reset: () => void;
  setAutoSearch: (enabled: boolean) => void;
  hideSearchResults: () => void;
}

const initialState: KeywordSearchState = {
  keyword: '',
  results: [],
  loading: false,
  error: null,
  hasSearched: false,
  meta: null,
  selectedPlace: null,
};

/**
 * 카카오 키워드 검색을 위한 커스텀 훅
 */
export const useKeywordSearch = (options?: { 
  autoSearchEnabled?: boolean; 
  debounceDelay?: number;
  mapCenter?: { lat: number; lng: number };
  searchRadius?: number;
}) => {
  const { 
    autoSearchEnabled = false, 
    debounceDelay = Number(import.meta.env.VITE_SEARCH_DEBOUNCE_DELAY) || 500,
    mapCenter,
    searchRadius = 5000
  } = options || {};
  const [state, setState] = useState<KeywordSearchState>(initialState);
  const [autoSearch, setAutoSearchState] = useState(autoSearchEnabled);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);

  const setKeyword = useCallback((keyword: string) => {
    setState(prev => ({ ...prev, keyword }));
    
    if (autoSearch && debouncedSearchRef.current) {
      debouncedSearchRef.current(keyword);
    }
  }, [autoSearch]);

  const selectPlace = useCallback((place: NormalizedPlace | null) => {
    setState(prev => ({ ...prev, selectedPlace: place }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      results: [],
      hasSearched: false,
      meta: null,
      selectedPlace: null,
      error: null,
    }));
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    debouncedSearchRef.current?.cancel();
    setState(initialState);
  }, []);

  const setAutoSearch = useCallback((enabled: boolean) => {
    setAutoSearchState(enabled);
  }, []);

  const hideSearchResults = useCallback(() => {
    setState(prev => ({ ...prev, hasSearched: false, error: null }));
  }, []);

  const executeSearch = useCallback(
    async (
      searchFn: () => Promise<{
        places: NormalizedPlace[];
        meta: KakaoKeywordSearchResponse['meta'];
      }>,
      keyword: string
    ) => {
      if (!keyword.trim()) {
        setState(prev => ({ ...prev, error: '검색어를 입력해주세요.' }));
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setState(prev => ({ ...prev, keyword, loading: true, error: null, hasSearched: false }));

      try {
        const result = await searchFn();
        if (!abortControllerRef.current?.signal.aborted) {
          setState(prev => ({
            ...prev,
            results: result.places,
            meta: result.meta,
            hasSearched: true,
            loading: false,
            selectedPlace: null,
          }));
        }
      } catch (error) {
        if (!abortControllerRef.current?.signal.aborted) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '검색 중 오류가 발생했습니다.';
          setState(prev => ({
            ...prev,
            loading: false,
            error: errorMessage,
            hasSearched: true,
          }));
        }
      } finally {
        abortControllerRef.current = null;
      }
    },
    []
  );

  const search = useCallback(
    async (inputKeyword?: string, options?: KakaoKeywordSearchOptions) => {
      const keyword = inputKeyword ?? state.keyword;
      await executeSearch(
        () => getKeywordSearch(keyword.trim(), options),
        keyword
      );
    },
    [state.keyword, executeSearch]
  );

  const searchByLocation = useCallback(
    async (
      keyword: string,
      center: { lat: number; lng: number },
      radius: number = 5000,
      categoryFilter?: string
    ) => {
      await executeSearch(async () => {
        if (categoryFilter && categoryFilter !== 'all') {
          const kakaoCategory =
            getPrimaryKakaoCategoryForFilter(categoryFilter);
          if (kakaoCategory) {
            return getKeywordSearchByCategory(
              keyword.trim(),
              kakaoCategory,
              center,
              radius
            );
          }
        }
        return getKeywordSearchByLocation(keyword.trim(), center, radius);
      }, keyword);
    },
    [executeSearch]
  );

  const searchWithCategoryFilter = useCallback(
    async (
      keyword: string,
      categoryFilter: string,
      center?: { lat: number; lng: number },
      radius: number = 5000
    ) => {
      await executeSearch(async () => {
        if (categoryFilter === 'all') {
          return center
            ? getKeywordSearchByLocation(keyword.trim(), center, radius)
            : getKeywordSearch(keyword.trim());
        }
        const kakaoCategory = getPrimaryKakaoCategoryForFilter(categoryFilter);
        if (kakaoCategory) {
          return getKeywordSearchByCategory(
            keyword.trim(),
            kakaoCategory,
            center,
            radius
          );
        }
        return center
          ? getKeywordSearchByLocation(keyword.trim(), center, radius)
          : getKeywordSearch(keyword.trim());
      }, keyword);
    },
    [executeSearch]
  );

  useEffect(() => {
    if (autoSearch) {
      debouncedSearchRef.current = debounce(async (keyword: string) => {
        if (keyword.trim()) {
          const trimmedKeyword = keyword.trim();
          
          const isRegionKeyword = /^(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)/.test(trimmedKeyword) ||
                                 /시$|구$|군$|동$|읍$|면$/.test(trimmedKeyword) ||
                                 trimmedKeyword.length <= 2;
          
          if (mapCenter && !isRegionKeyword) {
            await executeSearch(async () => {
              const result = await getKeywordSearchByLocation(trimmedKeyword, mapCenter, searchRadius);
              return result;
            }, keyword);
          } else {
            await executeSearch(
              () => getKeywordSearch(trimmedKeyword),
              keyword
            );
          }
        } else {
          clearResults();
        }
      }, debounceDelay);
    } else {
      debouncedSearchRef.current = null;
    }

    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [autoSearch, debounceDelay, executeSearch, clearResults, mapCenter, searchRadius]);

  const actions: KeywordSearchActions = {
    setKeyword,
    search,
    searchByLocation,
    searchWithCategoryFilter,
    selectPlace,
    clearResults,
    clearError,
    reset,
    setAutoSearch,
    hideSearchResults,
  };

  return {
    ...state,
    ...actions,
  };
};
