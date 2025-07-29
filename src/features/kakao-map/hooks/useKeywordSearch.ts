import { useCallback, useRef, useState } from 'react';

import { searchKeyword, searchKeywordByLocation, searchKeywordByCategory } from '../api/keywordSearchApi';
import { getPrimaryKakaoCategoryForFilter } from '../config/categoryMapping';
import type {
  KakaoKeywordSearchOptions,
  KakaoKeywordSearchResponse,
  NormalizedPlace,
} from '../api/types';

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
export const useKeywordSearch = () => {
  const [state, setState] = useState<KeywordSearchState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const setKeyword = useCallback((keyword: string) => {
    setState(prev => ({ ...prev, keyword }));
  }, []);

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
    // 진행 중인 검색 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setState(initialState);
  }, []);

  const search = useCallback(
    async (inputKeyword?: string, options?: KakaoKeywordSearchOptions) => {
      const keyword = inputKeyword || state.keyword;

      if (import.meta.env.MODE === 'development') {
        console.log('🔍 useKeywordSearch.search 호출됨:', {
          inputKeyword,
          currentStateKeyword: state.keyword,
          finalKeyword: keyword,
          options
        });
      }

      if (!keyword.trim()) {
        if (import.meta.env.MODE === 'development') {
          console.log('❌ 검색어가 비어있음:', keyword);
        }
        setState(prev => ({
          ...prev,
          error: '검색어를 입력해주세요.',
        }));
        return;
      }

      // 이전 검색 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새로운 AbortController 생성
      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        keyword,
        loading: true,
        error: null,
      }));

      try {
        const result = await searchKeyword(keyword.trim(), options);

        // 검색이 취소되지 않았을 때만 결과 설정
        if (!abortControllerRef.current?.signal.aborted) {
          setState(prev => ({
            ...prev,
            results: result.places,
            meta: result.meta,
            hasSearched: true,
            loading: false,
            selectedPlace: null, // 새 검색 시 선택 초기화
          }));

          if (import.meta.env.MODE === 'development') {
            console.log('🔍 키워드 검색 완료:', {
              keyword,
              resultCount: result.places.length,
              totalCount: result.meta.total_count,
              results: result.places,
            });
          }
        }
      } catch (error) {
        // 검색이 취소되지 않았을 때만 에러 설정
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

          if (import.meta.env.MODE === 'development') {
            console.error('🔍 키워드 검색 실패:', error);
          }
        }
      } finally {
        abortControllerRef.current = null;
      }
    },
    [state.keyword]
  );

  const searchByLocation = useCallback(
    async (
      keyword: string,
      center: { lat: number; lng: number },
      radius: number = 5000,
      categoryFilter?: string
    ) => {
      if (!keyword.trim()) {
        setState(prev => ({
          ...prev,
          error: '검색어를 입력해주세요.',
        }));
        return;
      }

      // 이전 검색 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        keyword,
        loading: true,
        error: null,
      }));

      try {
        let result;
        
        if (categoryFilter && categoryFilter !== 'all') {
          // 카테고리 필터가 있는 경우
          const kakaoCategory = getPrimaryKakaoCategoryForFilter(categoryFilter);
          if (kakaoCategory) {
            result = await searchKeywordByCategory(
              keyword.trim(),
              kakaoCategory,
              center,
              radius
            );
          } else {
            // 카테고리 매핑이 없는 경우 일반 검색
            result = await searchKeywordByLocation(
              keyword.trim(),
              center,
              radius
            );
          }
        } else {
          // 카테고리 필터가 없는 경우
          result = await searchKeywordByLocation(
            keyword.trim(),
            center,
            radius
          );
        }

        if (!abortControllerRef.current?.signal.aborted) {
          setState(prev => ({
            ...prev,
            results: result.places,
            meta: result.meta,
            hasSearched: true,
            loading: false,
            selectedPlace: null,
          }));

          if (import.meta.env.MODE === 'development') {
            console.log('🔍 위치 기반 키워드 검색 완료:', {
              keyword,
              center,
              radius,
              categoryFilter,
              resultCount: result.places.length,
            });
          }
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

          if (import.meta.env.MODE === 'development') {
            console.error('🔍 위치 기반 키워드 검색 실패:', error);
          }
        }
      } finally {
        abortControllerRef.current = null;
      }
    },
    []
  );

  const searchWithCategoryFilter = useCallback(
    async (
      keyword: string,
      categoryFilter: string,
      center?: { lat: number; lng: number },
      radius: number = 5000
    ) => {
      if (!keyword.trim()) {
        setState(prev => ({
          ...prev,
          error: '검색어를 입력해주세요.',
        }));
        return;
      }

      // 이전 검색 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        keyword,
        loading: true,
        error: null,
      }));

      try {
        let result;

        if (categoryFilter === 'all') {
          // 전체 카테고리인 경우
          if (center) {
            result = await searchKeywordByLocation(keyword.trim(), center, radius);
          } else {
            result = await searchKeyword(keyword.trim());
          }
        } else {
          // 특정 카테고리인 경우
          const kakaoCategory = getPrimaryKakaoCategoryForFilter(categoryFilter);
          if (kakaoCategory) {
            result = await searchKeywordByCategory(
              keyword.trim(),
              kakaoCategory,
              center,
              radius
            );
          } else {
            // 카테고리 매핑이 없는 경우 일반 검색
            if (center) {
              result = await searchKeywordByLocation(keyword.trim(), center, radius);
            } else {
              result = await searchKeyword(keyword.trim());
            }
          }
        }

        if (!abortControllerRef.current?.signal.aborted) {
          setState(prev => ({
            ...prev,
            results: result.places,
            meta: result.meta,
            hasSearched: true,
            loading: false,
            selectedPlace: null,
          }));

          if (import.meta.env.MODE === 'development') {
            console.log('🔍 카테고리 필터 검색 완료:', {
              keyword,
              categoryFilter,
              center,
              radius,
              resultCount: result.places.length,
            });
          }
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

          if (import.meta.env.MODE === 'development') {
            console.error('🔍 카테고리 필터 검색 실패:', error);
          }
        }
      } finally {
        abortControllerRef.current = null;
      }
    },
    []
  );

  const actions: KeywordSearchActions = {
    setKeyword,
    search,
    searchByLocation,
    searchWithCategoryFilter,
    selectPlace,
    clearResults,
    clearError,
    reset,
  };

  return {
    ...state,
    ...actions,
  };
};

/**
 * 검색 히스토리 관리를 위한 훅
 */
export const useSearchHistory = (maxHistorySize: number = 10) => {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('keyword-search-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) return;

      setHistory(prev => {
        const filtered = prev.filter(item => item !== keyword.trim());
        const newHistory = [keyword.trim(), ...filtered].slice(
          0,
          maxHistorySize
        );

        try {
          localStorage.setItem(
            'keyword-search-history',
            JSON.stringify(newHistory)
          );
        } catch (error) {
          if (import.meta.env.MODE === 'development') {
            console.warn('검색 히스토리 저장 실패:', error);
          }
        }

        return newHistory;
      });
    },
    [maxHistorySize]
  );

  const removeFromHistory = useCallback((keyword: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item !== keyword);

      try {
        localStorage.setItem(
          'keyword-search-history',
          JSON.stringify(newHistory)
        );
      } catch (error) {
        if (import.meta.env.MODE === 'development') {
          console.warn('검색 히스토리 저장 실패:', error);
        }
      }

      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('keyword-search-history');
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.warn('검색 히스토리 삭제 실패:', error);
      }
    }
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};
