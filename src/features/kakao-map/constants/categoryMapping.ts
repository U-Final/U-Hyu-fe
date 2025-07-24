import type { StoreCategory } from '../types/category';

/**
 * 프론트엔드 카테고리 키와 백엔드 카테고리 ID 간의 매핑 테이블
 * 실제 서비스에서 사용되는 카테고리 ID와 매핑
 */
export const CATEGORY_ID_MAPPING: Record<StoreCategory, number> = {
  // 메인 카테고리
  all: 0, // 전체 카테고리 (모든 브랜드)
  
  // 실제 서비스 카테고리와 매핑 (매장이 있는 카테고리만)
  culture: 2, // 영화/미디어 (CGV, 롯데시네마, 메가박스 등)
  activity: 4, // 액티비티 (스카이라인 루지, 클룩, 부산 엑스 더 스카이 등)
  beauty: 5, // 뷰티(피부과, 클리닉) (오가나셀 피부과, 데이원클리닉 등)
  pharmacy: 6, // 건강(제약, 영양제 등) (동아제약 디몰, LG생활건강샵 등)
  lifestyle: 7, // 생활/편의 (GS25, 펫생각, 셸로 등)
  convenience: 7, // 생활/편의 (동일 카테고리)
  shopping: 8, // 쇼핑 (GS THE FRESH, VYVY, 롯데백화점몰 등)
  restaurant: 9, // 음식점 (VIPS, 더플레이스, 제일제면소 등)
  fastfood: 9, // 음식점 (동일 카테고리)
  food: 9, // 음식점 (동일 카테고리)
  bakery: 10, // 베이커리/디저트 (파리바게트, 뚜레쥬르, 베스킨라빈스 등)
  cafe: 10, // 베이커리/디저트 (동일 카테고리)
  
  // 추가 카테고리들 (필요시 확장)
  // 워터파크/아쿠아리움 (id: 3)
  // 테마파크 (id: 11) 
  // 공연/전시 (id: 12)
  // 교육 (id: 13)
  // 여행/교통 (id: 14)
  
  // 추가 매핑
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
 * 백엔드 카테고리 ID를 프론트엔드 카테고리 키로 역변환
 * @param categoryId - 백엔드 카테고리 ID
 * @returns 프론트엔드 카테고리 키 (기본값: 'all')
 */
export const getCategoryKey = (categoryId: number): StoreCategory => {
  const entry = Object.entries(CATEGORY_ID_MAPPING).find(
    ([, id]) => id === categoryId
  );
  return (entry?.[0] as StoreCategory) ?? 'all';
};

/**
 * 카테고리 ID가 유효한지 확인
 * @param categoryId - 확인할 카테고리 ID
 * @returns 유효성 여부
 */
export const isValidCategoryId = (categoryId: number): boolean => {
  return Object.values(CATEGORY_ID_MAPPING).includes(categoryId);
};