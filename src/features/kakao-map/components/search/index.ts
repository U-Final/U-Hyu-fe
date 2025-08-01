// 키워드 검색 관련 컴포넌트 exports
export { KeywordSearchInput } from './MapSearchInput';
export {
  SearchResultList,
  SearchResultItem,
  SearchResultSummary,
} from './SearchResultList';
export { KeywordSearchContainer } from './KeywordSearchContainer';

// 타입 exports
export type {
  NormalizedPlace,
  KakaoPlace,
  KakaoKeywordSearchOptions,
  KakaoKeywordSearchResponse,
} from '../../api/types';

// API 함수 exports
export {
  getKeywordSearch,
  getKeywordSearchByLocation,
  getKeywordSearchByBounds,
  getKeywordSearchByCategory,
  normalizeKakaoPlace,
  getKakaoApiKeyStatus,
} from '../../api/keywordSearchApi';

// 훅 exports
export { useKeywordSearch } from '../../hooks/useKeywordSearch';
export {
  useSearchMarkers,
  useMapBounds,
  useMarkerClustering,
} from '../../hooks/useSearchMarkers';
