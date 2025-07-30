import { ADMIN_CATEGORIES } from '../constants/categories';

export function getCategoryDisplayName(categoryId: string): string {
  const category = ADMIN_CATEGORIES.find(cat => cat.id === categoryId);
  return category?.name || '전체';
} 