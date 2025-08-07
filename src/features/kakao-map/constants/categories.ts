import { MAIN_CATEGORIES } from '../types/category';
import type { CategoryInfo } from '../types/category';

export type CategoryType = Pick<CategoryInfo, 'key' | 'name' | 'icon'>;

export const FILTERED_CATEGORIES = MAIN_CATEGORIES.filter(
  category => category.key !== 'all'
);
