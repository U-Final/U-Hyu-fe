import type { StoreCategory } from '../types/category';

/**
 * 프론트엔드 카테고리 키와 백엔드 카테고리 ID 간의 매핑 테이블
 * 실제 서비스에서 사용되는 카테고리 ID와 매핑
 */
export const CATEGORY_ID_MAPPING: Record<StoreCategory, number> = {
  // 메인 카테고리
  all: 0, // 전체 카테고리 (모든 브랜드)

  // 새로운 카테고리들
  app: 1, // APP/기기
  themepark: 11, // 테마파크
  waterpark: 3, // 워터파크/아쿠아리움
  activity: 4, // 액티비티 (스카이라인 루지, 클룩, 부산 엑스 더 스카이 등)
  beauty: 5, // 뷰티(피부과, 클리닉) (오가나셀 피부과, 데이원클리닉 등)
  health: 6, // 건강(제약, 영양제 등) (동아제약 디몰, LG생활건강샵 등)
  shopping: 8, // 쇼핑 (GS THE FRESH, VYVY, 롯데백화점몰 등)
  lifestyle: 7, // 생활/편의 (GS25, 펫생각, 셸로 등)
  bakery: 10, // 베이커리/디저트 (파리바게트, 뚜레쥬르, 베스킨라빈스 등)
  food: 9, // 음식점 (VIPS, 더플레이스, 제일제면소 등)
  media: 2, // 영화/미디어 (CGV, 롯데시네마, 메가박스 등)
  performance: 12, // 공연/전시
  education: 13, // 교육
  travel: 14, // 여행/교통

  // 호환성을 위한 별칭 카테고리들
  culture: 2, // 영화/미디어 (media와 동일)
  pharmacy: 6, // 건강(health와 동일)
  convenience: 7, // 생활/편의 (lifestyle과 동일)
  cafe: 10, // 베이커리/디저트 (bakery와 동일)
  restaurant: 9, // 음식점 (food와 동일)
  fastfood: 9, // 음식점 (food와 동일)
  default: 0, // 기타 -> 전체 카테고리로 처리
};

/**
 * 프론트엔드 카테고리 키를 백엔드 카테고리 ID로 변환
 * @param categoryKey - 프론트엔드 카테고리 키
 * @returns 백엔드 카테고리 ID (기본값: 0)
 */
export const getCategoryId = (categoryKey: StoreCategory): number => {
  return CATEGORY_ID_MAPPING[categoryKey] ?? 0;
};

/**
 * 백엔드 카테고리 ID를 기본 프론트엔드 카테고리 키로 매핑하는 역방향 매핑 테이블
 * 동일한 ID를 가진 여러 키 중에서 가장 대표적인 키를 선택
 */
const REVERSE_CATEGORY_MAPPING: Record<number, StoreCategory> = {
  0: 'all',
  1: 'app', // APP/기기
  2: 'media', // 영화/미디어 (culture 별칭보다 media를 기본값으로)
  3: 'waterpark', // 워터파크/아쿠아리움
  4: 'activity', // 액티비티
  5: 'beauty', // 뷰티
  6: 'health', // 건강 (pharmacy 별칭보다 health를 기본값으로)
  7: 'lifestyle', // 생활/편의 (convenience 별칭보다 lifestyle을 기본값으로)
  8: 'shopping', // 쇼핑
  9: 'food', // 음식점 (restaurant, fastfood 별칭보다 food를 기본값으로)
  10: 'bakery', // 베이커리/디저트 (cafe 별칭보다 bakery를 기본값으로)
  11: 'themepark', // 테마파크
  12: 'performance', // 공연/전시
  13: 'education', // 교육
  14: 'travel', // 여행/교통
};

/**
 * 백엔드 카테고리 ID를 프론트엔드 카테고리 키로 역변환
 * @param categoryId - 백엔드 카테고리 ID
 * @returns 프론트엔드 카테고리 키 (기본값: 'all')
 */
export const getCategoryKey = (categoryId: number): StoreCategory => {
  return REVERSE_CATEGORY_MAPPING[categoryId] ?? 'all';
};

/**
 * 카테고리 ID가 유효한지 확인
 * @param categoryId - 확인할 카테고리 ID
 * @returns 유효성 여부
 */
export const isValidCategoryId = (categoryId: number): boolean => {
  return Object.values(CATEGORY_ID_MAPPING).includes(categoryId);
};
