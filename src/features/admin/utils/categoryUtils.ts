import { ADMIN_CATEGORIES } from '@admin/constants/categories';
import type { CategoryId } from '@admin/constants/categories';

export function getCategoryDisplayName(categoryId: CategoryId | string): string {
  if (categoryId === 'all') return '전체';
  
  const numericId = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId;
  const category = ADMIN_CATEGORIES.find(cat => cat.id === numericId);
  return category?.name || '전체';
} 