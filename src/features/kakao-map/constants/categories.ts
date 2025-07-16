import { MAIN_CATEGORIES, type StoreCategory } from '../types/category';

// 통합된 카테고리 시스템 사용
export const CATEGORIES = MAIN_CATEGORIES.filter(
  category => category.key !== 'all'
);

// 기존 호환성을 위한 타입
export interface CategoryType {
  key: StoreCategory;
  name: string;
  icon: string;
}
