import type { StoreCategory } from '../types/category';

/**
 * 프론트엔드 카테고리 키와 백엔드 카테고리 ID 간의 매핑 테이블
 * Mock 데이터의 categoryId와 일치하도록 설정
 */
export const CATEGORY_ID_MAPPING: Record<StoreCategory, number> = {
  // 메인 카테고리
  all: 0, // 전체 카테고리 (모든 브랜드)
  
  // Mock 데이터와 매핑되는 카테고리들
  cafe: 1, // 카페 (스타벅스, 투썸플레이스 등)
  convenience: 2, // 편의점 (GS25, CU 등)
  fastfood: 3, // 패스트푸드 (맥도날드, KFC 등)
  beauty: 4, // 뷰티/건강 (올리브영, 왓슨스 등)
  bakery: 5, // 베이커리 (파리바게뜨, 뚜레쥬르 등)
  culture: 6, // 문화/여가 (CGV, 롯데시네마 등)
  shopping: 7, // 쇼핑 (이마트, 홈플러스 등)
  activity: 8, // 액티비티 (피트니스클럽, 헬스장 등)
  pharmacy: 9, // 약국 (약국, 온누리약국 등)
  
  // 추가 카테고리들 (현재 Mock 데이터에는 없음)
  restaurant: 3, // 음식점 -> 패스트푸드와 동일한 그룹으로 처리
  lifestyle: 2, // 생활/편의 -> 편의점과 동일한 그룹으로 처리
  electronics: 7, // 전자제품 -> 쇼핑과 동일한 그룹으로 처리
  food: 3, // 푸드 -> 패스트푸드와 동일한 그룹으로 처리
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