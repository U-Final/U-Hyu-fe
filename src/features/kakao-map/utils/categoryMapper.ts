import type { StoreCategory } from '../types/category';

// 카테고리별 매장 개수를 계산하는 유틸리티 함수
export const getCategoryStats = (stores: Array<{ categoryName: string }>) => {
  const stats: Record<StoreCategory, number> = {
    all: 0,
    activity: 0,
    beauty: 0,
    shopping: 0,
    lifestyle: 0,
    food: 0,
    culture: 0,
    cafe: 0,
    restaurant: 0,
    fastfood: 0,
    bakery: 0,
    convenience: 0,
    pharmacy: 0,
    electronics: 0,
    default: 0,
  };

  stores.forEach(store => {
    // 응답 데이터의 categoryName을 직접 사용
    const category = store.categoryName as StoreCategory;
    if (category in stats) {
      stats[category]++;
    } else {
      stats.default++; // 알 수 없는 카테고리는 default로 분류
    }
  });

  return stats;
};
