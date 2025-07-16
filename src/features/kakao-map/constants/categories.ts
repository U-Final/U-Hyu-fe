import { MAIN_CATEGORIES } from '../types/category';
import type { CategoryInfo } from '../types/category';

// 기존 호환성 유지용 타입
export type CategoryType = Pick<CategoryInfo, 'key' | 'name' | 'icon'>;

// 통합된 카테고리 시스템 사용
export const FILTERED_CATEGORIES = MAIN_CATEGORIES.filter(
  category => category.key !== 'all'
);
