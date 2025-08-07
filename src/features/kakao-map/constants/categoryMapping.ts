import type { StoreCategory } from '../types/category';

/**
 * 프론트엔드 카테고리 키와 백엔드 카테고리 ID 간의 매핑 테이블
 * 실제 서비스에서 사용되는 카테고리 ID와 매핑
 */
export const CATEGORY_ID_MAPPING: Record<StoreCategory, number> = {
  all: 0,
  app: 1,
  themepark: 11,
  waterpark: 3,
  activity: 4,
  beauty: 5,
  health: 6,
  shopping: 8,
  lifestyle: 7,
  bakery: 10,
  food: 9,
  media: 2,
  performance: 12,
  education: 13,
  travel: 14,

  culture: 2,
  pharmacy: 6,
  convenience: 7,
  cafe: 10,
  restaurant: 9,
  fastfood: 9,
  default: 0,
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
  1: 'app',
  2: 'media',
  3: 'waterpark',
  4: 'activity',
  5: 'beauty',
  6: 'health',
  7: 'lifestyle',
  8: 'shopping',
  9: 'food',
  10: 'bakery',
  11: 'themepark',
  12: 'performance',
  13: 'education',
  14: 'travel',
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
