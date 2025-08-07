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
  'all': [],
  'shopping': ['MT1', 'CS2'],
  'food': ['FD6', 'CE7'],
  'life': ['CS2', 'BK9', 'AG2', 'PO3'],
  'culture': ['CT1', 'AT4'],
  'beauty': ['HP8', 'PM9'],
  'activity': ['PK6', 'SW8'],
  'education': ['SC4', 'AC5', 'PS3'],
  'travel': ['AD5', 'SW8', 'OL7'],
};

/**
 * 카카오 카테고리 그룹 코드를 FilterTabs 카테고리로 역매핑
 */
export const KAKAO_CATEGORY_TO_FILTER_TAB: Record<string, string> = {
  'MT1': 'shopping',
  'CS2': 'shopping',
  'PS3': 'education',
  'SC4': 'education',
  'AC5': 'education',
  'PK6': 'activity',
  'OL7': 'travel',
  'SW8': 'travel',
  'BK9': 'life',
  'CT1': 'culture',
  'AG2': 'life',
  'PO3': 'life',
  'AT4': 'culture',
  'AD5': 'travel',
  'FD6': 'food',
  'CE7': 'food',
  'HP8': 'beauty',
  'PM9': 'beauty',
};

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
  'themepark': '테마파크',
  'waterpark': '워터파크/아쿠아리움',
  'activity': '액티비티',
  'beauty': '뷰티',
  'health': '건강',
  'pharmacy': '건강',
  'shopping': '쇼핑',
  'lifestyle': '생활/편의',
  'convenience': '생활/편의',
  'bakery': '베이커리/디저트',
  'cafe': '베이커리/디저트',
  'food': '음식점',
  'restaurant': '음식점',
  'fastfood': '음식점',
  'media': '영화/미디어',
  'culture': '영화/미디어',
  'performance': '공연/전시',
  'education': '교육',
  'travel': '여행/교통',
  'default': 'all',
  
  // 추가로 가능한 문자열 형태의 카테고리명들 (호환성)
  '테마파크': '테마파크',
  '워터파크/아쿠아리움': '워터파크/아쿠아리움',
  '액티비티': '액티비티',
  '뷰티': '뷰티',
  '뷰티/클리닉': '뷰티',
  '건강': '건강',
  '건강/영양제': '건강',
  '쇼핑': '쇼핑',
  '생활/편의': '생활/편의',
  '베이커리/디저트': '베이커리/디저트',
  '음식점': '음식점',
  '영화/미디어': '영화/미디어',
  '공연/전시': '공연/전시',
  '교육': '교육',
  '여행/교통': '여행/교통',
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