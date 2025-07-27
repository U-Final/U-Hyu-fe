// 키워드 검색 관련 컴포넌트 exports
export { KeywordSearchInput, CompactKeywordSearchInput } from './KeywordSearchInput';
export { 
  SearchResultList, 
  SearchResultItem, 
  SearchResultSummary 
} from './SearchResultList';
export { KeywordSearchContainer } from './KeywordSearchContainer';

// 타입 exports
export type { 
  NormalizedPlace, 
  KakaoPlace, 
  KakaoKeywordSearchOptions,
  KakaoKeywordSearchResponse 
} from '../../api/types';

// API 함수 exports
export { 
  searchKeyword, 
  searchKeywordByLocation, 
  searchKeywordByBounds,
  searchKeywordByCategory,
  normalizeKakaoPlace,
  checkKakaoApiKeyStatus 
} from '../../api/keywordSearchApi';

// 훅 exports
export { 
  useKeywordSearch, 
  useSearchHistory 
} from '../../hooks/useKeywordSearch';
export { 
  useSearchMarkers, 
  useMapBounds, 
  useMarkerClustering 
} from '../../hooks/useSearchMarkers';