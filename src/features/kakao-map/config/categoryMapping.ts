/**
 * FilterTabs 카테고리와 카카오 카테고리 그룹 코드 매핑
 * 
 * 카카오 카테고리 그룹 코드:
 * - MT1: 대형마트
 * - CS2: 편의점  
 * - PS3: 어린이집, 유치원
 * - SC4: 학교
 * - AC5: 학원
 * - PK6: 주차장
 * - OL7: 주유소, 충전소
 * - SW8: 지하철역
 * - BK9: 은행
 * - CT1: 문화시설
 * - AG2: 중개업소
 * - PO3: 공공기관
 * - AT4: 관광명소
 * - AD5: 숙박
 * - FD6: 음식점
 * - CE7: 카페
 * - HP8: 병원
 * - PM9: 약국
 */

/**
 * FilterTabs 카테고리를 카카오 카테고리 그룹 코드로 매핑
 */
export const FILTER_TAB_TO_KAKAO_CATEGORY: Record<string, string[]> = {
  'all': [], // 전체 - 필터링 없음
  'shopping': ['MT1', 'CS2'], // 쇼핑 - 대형마트, 편의점
  'food': ['FD6', 'CE7'], // 푸드 - 음식점, 카페  
  'life': ['CS2', 'BK9', 'AG2', 'PO3'], // 생활/편의 - 편의점, 은행, 중개업소, 공공기관
  'culture': ['CT1', 'AT4'], // 문화/여가 - 문화시설, 관광명소
  'beauty': ['HP8', 'PM9'], // 뷰티/건강 - 병원, 약국
  'activity': ['PK6', 'SW8'], // 액티비티 - 주차장, 지하철역 (이동 관련)
  'education': ['SC4', 'AC5', 'PS3'], // 교육 - 학교, 학원, 어린이집/유치원
  'travel': ['AD5', 'SW8', 'OL7'], // 여행/교통 - 숙박, 지하철역, 주유소/충전소
};

/**
 * 카카오 카테고리 그룹 코드를 FilterTabs 카테고리로 역매핑
 */
export const KAKAO_CATEGORY_TO_FILTER_TAB: Record<string, string> = {
  'MT1': 'shopping', // 대형마트 → 쇼핑
  'CS2': 'shopping', // 편의점 → 쇼핑 (생활/편의와 겹치지만 쇼핑을 우선)
  'PS3': 'education', // 어린이집, 유치원 → 교육
  'SC4': 'education', // 학교 → 교육
  'AC5': 'education', // 학원 → 교육
  'PK6': 'activity', // 주차장 → 액티비티
  'OL7': 'travel', // 주유소, 충전소 → 여행/교통
  'SW8': 'travel', // 지하철역 → 여행/교통 (액티비티와 겹치지만 여행/교통을 우선)
  'BK9': 'life', // 은행 → 생활/편의
  'CT1': 'culture', // 문화시설 → 문화/여가
  'AG2': 'life', // 중개업소 → 생활/편의
  'PO3': 'life', // 공공기관 → 생활/편의
  'AT4': 'culture', // 관광명소 → 문화/여가
  'AD5': 'travel', // 숙박 → 여행/교통
  'FD6': 'food', // 음식점 → 푸드
  'CE7': 'food', // 카페 → 푸드
  'HP8': 'beauty', // 병원 → 뷰티/건강
  'PM9': 'beauty', // 약국 → 뷰티/건강
};

/**
 * FilterTabs 카테고리별 설명
 */
export const FILTER_TAB_DESCRIPTIONS: Record<string, string> = {
  'all': '모든 카테고리',
  'shopping': '대형마트, 편의점 등 쇼핑 관련 장소',
  'food': '음식점, 카페 등 음식 관련 장소',
  'life': '은행, 공공기관 등 생활 편의 시설',
  'culture': '문화시설, 관광명소 등 문화/여가 시설',
  'beauty': '병원, 약국 등 건강/미용 관련 시설',
  'activity': '주차장 등 활동 관련 시설',
  'education': '학교, 학원, 어린이집 등 교육 시설',
  'travel': '숙박, 교통, 주유소 등 여행/교통 관련 시설',
};

/**
 * FilterTabs 카테고리에 해당하는 카카오 카테고리 그룹 코드들을 반환
 */
export const getKakaoCategoriesForFilter = (filterCategory: string): string[] => {
  return FILTER_TAB_TO_KAKAO_CATEGORY[filterCategory] || [];
};

/**
 * 카카오 카테고리 그룹 코드에 해당하는 FilterTabs 카테고리를 반환
 */
export const getFilterCategoryForKakao = (kakaoCategory: string): string => {
  return KAKAO_CATEGORY_TO_FILTER_TAB[kakaoCategory] || 'all';
};

/**
 * 특정 FilterTabs 카테고리로 키워드 검색 시 사용할 카카오 카테고리 그룹 코드
 * 여러 코드가 있는 경우 첫 번째 코드를 반환 (API는 하나의 카테고리만 지원)
 */
export const getPrimaryKakaoCategoryForFilter = (filterCategory: string): string | undefined => {
  const categories = getKakaoCategoriesForFilter(filterCategory);
  return categories.length > 0 ? categories[0] : undefined;
};

/**
 * LG U+ 제휴 매장 카테고리(StoreCategory)를 FilterTabs 카테고리로 매핑
 * constants/categoryMapping.ts의 실제 카테고리 키값들을 기반으로 설정
 */
export const STORE_CATEGORY_TO_FILTER_TAB: Record<string, string> = {
  // LG U+ 제휴 매장의 실제 카테고리 키값들
  'all': 'all',
  'culture': 'culture',           // 영화/미디어 → 문화/여가
  'activity': 'activity',         // 액티비티 → 액티비티
  'beauty': 'beauty',             // 뷰티/클리닉 → 뷰티/건강
  'pharmacy': 'beauty',           // 건강/영양제 → 뷰티/건강 (건강 관련)
  'lifestyle': 'life',            // 생활/편의 → 생활/편의
  'convenience': 'life',          // 생활/편의 → 생활/편의
  'shopping': 'shopping',         // 쇼핑 → 쇼핑
  'food': 'food',                 // 음식점 → 푸드
  'restaurant': 'food',           // 음식점 → 푸드
  'fastfood': 'food',             // 음식점 → 푸드
  'bakery': 'food',               // 베이커리/디저트 → 푸드
  'cafe': 'food',                 // 베이커리/디저트 → 푸드
  'default': 'all',               // 기타 → 전체
  
  // 추가로 가능한 문자열 형태의 카테고리명들 (호환성)
  '영화/미디어': 'culture',
  '액티비티': 'activity', 
  '뷰티/클리닉': 'beauty',
  '건강/영양제': 'beauty',
  '생활/편의': 'life',
  '쇼핑': 'shopping',
  '음식점': 'food',
  '베이커리/디저트': 'food',
  '기타': 'all',
};

/**
 * 매장 카테고리명으로 FilterTabs 카테고리를 반환
 */
export const getFilterCategoryForStore = (storeCategoryName: string): string => {
  return STORE_CATEGORY_TO_FILTER_TAB[storeCategoryName] || 'all';
};

/**
 * 매장 데이터를 FilterTabs 카테고리로 필터링
 * 주의: 현재는 백엔드에서 필터링을 처리하므로 사용하지 않음
 * 향후 프론트엔드 필터링이 필요한 경우를 위해 보존
 */
export const filterStoresByCategory = <T extends { categoryName: string }>(
  stores: T[],
  filterCategory: string
): T[] => {
  if (filterCategory === 'all') {
    return stores;
  }
  
  return stores.filter(store => {
    const storeFilterCategory = getFilterCategoryForStore(store.categoryName);
    return storeFilterCategory === filterCategory;
  });
};