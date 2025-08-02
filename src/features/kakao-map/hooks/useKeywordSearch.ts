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
  /** 현재 검색어 */
  keyword: string;
  /** 검색 결과 */
  results: NormalizedPlace[];
  /** 로딩 상태 */
  loading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 검색 완료 여부 */
  hasSearched: boolean;
  /** 메타 정보 */
  meta: KakaoKeywordSearchResponse['meta'] | null;
  /** 선택된 장소 */
  selectedPlace: NormalizedPlace | null;
}

export interface KeywordSearchActions {
  /** 검색어 설정 */
  setKeyword: (keyword: string) => void;
  /** 키워드 검색 실행 */
  search: (
    inputKeyword?: string,
    options?: KakaoKeywordSearchOptions
  ) => Promise<void>;
  /** 위치 기반 검색 실행 */
  searchByLocation: (
    keyword: string,
    center: { lat: number; lng: number },
    radius?: number,
    categoryFilter?: string
  ) => Promise<void>;
  /** 카테고리 필터로 검색 실행 */
  searchWithCategoryFilter: (
    keyword: string,
    categoryFilter: string,
    center?: { lat: number; lng: number },
    radius?: number
  ) => Promise<void>;
  /** 장소 선택 */
  selectPlace: (place: NormalizedPlace | null) => void;
  /** 검색 결과 초기화 */
  clearResults: () => void;
  /** 에러 초기화 */
  clearError: () => void;
  /** 전체 상태 초기화 */
  reset: () => void;
  /** 자동 검색 활성화/비활성화 */
  setAutoSearch: (enabled: boolean) => void;
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
    
    // 자동 검색이 활성화되어 있고 디바운스 함수가 있으면 자동 검색 실행
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

      setState(prev => ({ ...prev, keyword, loading: true, error: null }));

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

  // 디바운스된 검색 함수 생성 (모든 함수 정의 후)
  useEffect(() => {
    if (autoSearch) {
      debouncedSearchRef.current = debounce(async (keyword: string) => {
        if (keyword.trim()) {
          // 지도 중심 좌표가 있으면 위치 기반 검색, 없으면 일반 검색
          if (mapCenter) {
            await executeSearch(async () => {
              const result = await getKeywordSearchByLocation(keyword.trim(), mapCenter, searchRadius);
              return result;
            }, keyword);
          } else {
            await executeSearch(
              () => getKeywordSearch(keyword.trim()),
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
  };

  return {
    ...state,
    ...actions,
  };
};
