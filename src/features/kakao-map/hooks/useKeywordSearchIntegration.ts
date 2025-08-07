import { useCallback, useState } from 'react';

import type { NormalizedPlace } from '../api/types';
import { useKeywordSearch } from './useKeywordSearch';

/**
 * 지도에 통합된 키워드 검색 기능을 관리하는 훅
 */
export const useKeywordSearchIntegration = () => {
  const [isKeywordSearchMode, setIsKeywordSearchMode] = useState(false);
  const [selectedKeywordPlace, setSelectedKeywordPlace] =
    useState<NormalizedPlace | null>(null);
  const [showKeywordResults, setShowKeywordResults] = useState(false);

  const {
    results: keywordPlaces,
    loading: keywordLoading,
    error: keywordError,
    search: searchKeyword,
    clearResults,
  } = useKeywordSearch();

  const handleKeywordSearch = useCallback(
    async (keyword: string, center?: { lat: number; lng: number }) => {
      if (!keyword.trim()) {
        setIsKeywordSearchMode(false);
        setShowKeywordResults(false);
        clearResults();
        return;
      }

      setIsKeywordSearchMode(true);
      setShowKeywordResults(true);

      try {
        if (center) {
          await searchKeyword(keyword, { x: center.lng, y: center.lat });
        } else {
          await searchKeyword(keyword);
        }
      } catch {
        // 에러는 상위 컴포넌트에서 처리됨
      }
    },
    [searchKeyword, clearResults]
  );

  const exitKeywordSearchMode = useCallback(() => {
    setIsKeywordSearchMode(false);
    setShowKeywordResults(false);
    setSelectedKeywordPlace(null);
    clearResults();
  }, [clearResults]);

  const selectKeywordPlace = useCallback((place: NormalizedPlace) => {
    setSelectedKeywordPlace(place);
  }, []);

  const clearKeywordPlaceSelection = useCallback(() => {
    setSelectedKeywordPlace(null);
  }, []);

  return {
    isKeywordSearchMode,
    keywordPlaces,
    keywordLoading,
    keywordError,
    selectedKeywordPlace,
    showKeywordResults,

    handleKeywordSearch,
    exitKeywordSearchMode,
    selectKeywordPlace,
    clearKeywordPlaceSelection,
  };
};
