// types/category.ts
export type StoreCategory =
  | 'all'
  | 'activity'
  | 'beauty'
  | 'shopping'
  | 'lifestyle'
  | 'food'
  | 'culture'
  | 'cafe'
  | 'restaurant'
  | 'fastfood'
  | 'bakery'
  | 'convenience'
  | 'pharmacy'
  | 'electronics'
  | 'default';

export interface CategoryInfo {
  key: StoreCategory;
  name: string;
  icon: string;
  color: string;
  ringColor: string;
  description?: string;
}

// 통합된 카테고리 설정
export const CATEGORY_CONFIGS: Record<StoreCategory, CategoryInfo> = {
  // 메인 카테고리
  all: {
    key: 'all',
    name: '전체',
    icon: '🏪',
    color: 'bg-gray-500',
    ringColor: 'ring-gray-300',
    description: '모든 매장',
  },
  activity: {
    key: 'activity',
    name: '액티비티',
    icon: '🎯',
    color: 'bg-blue-500',
    ringColor: 'ring-blue-300',
    description: '액티비티 및 스포츠',
  },
  beauty: {
    key: 'beauty',
    name: '뷰티/건강',
    icon: '💄',
    color: 'bg-pink-500',
    ringColor: 'ring-pink-300',
    description: '화장품 및 뷰티',
  },
  shopping: {
    key: 'shopping',
    name: '쇼핑',
    icon: '🛍️',
    color: 'bg-purple-500',
    ringColor: 'ring-purple-300',
    description: '쇼핑몰 및 매장',
  },
  lifestyle: {
    key: 'lifestyle',
    name: '생활/편의',
    icon: '🏠',
    color: 'bg-green-500',
    ringColor: 'ring-green-300',
    description: '생활용품 및 편의시설',
  },
  food: {
    key: 'food',
    name: '푸드',
    icon: '🍽️',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    description: '음식점 및 식품',
  },
  culture: {
    key: 'culture',
    name: '문화/여가',
    icon: '🎭',
    color: 'bg-indigo-500',
    ringColor: 'ring-indigo-300',
    description: '문화시설 및 여가',
  },

  // 세부 카테고리
  cafe: {
    key: 'cafe',
    name: '카페',
    icon: '☕',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: '커피 전문점',
  },
  restaurant: {
    key: 'restaurant',
    name: '음식점',
    icon: '🍽️',
    color: 'bg-green-500',
    ringColor: 'ring-green-300',
    description: '일반 음식점',
  },
  fastfood: {
    key: 'fastfood',
    name: '패스트푸드',
    icon: '🍔',
    color: 'bg-red-500',
    ringColor: 'ring-red-300',
    description: '패스트푸드 체인',
  },
  bakery: {
    key: 'bakery',
    name: '베이커리',
    icon: '🥖',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    description: '베이커리 및 디저트',
  },
  convenience: {
    key: 'convenience',
    name: '편의점',
    icon: '🏪',
    color: 'bg-blue-500',
    ringColor: 'ring-blue-300',
    description: '편의점',
  },
  pharmacy: {
    key: 'pharmacy',
    name: '약국',
    icon: '💊',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
    description: '약국',
  },
  electronics: {
    key: 'electronics',
    name: '전자제품',
    icon: '📱',
    color: 'bg-indigo-500',
    ringColor: 'ring-indigo-300',
    description: '전자제품 매장',
  },
  default: {
    key: 'default',
    name: '기타',
    icon: '🏬',
    color: 'bg-gray-500',
    ringColor: 'ring-gray-300',
    description: '기타 매장',
  },
};

// 메인 카테고리만 포함하는 배열 (필터링용)
export const MAIN_CATEGORIES: CategoryInfo[] = [
  CATEGORY_CONFIGS.all,
  CATEGORY_CONFIGS.activity,
  CATEGORY_CONFIGS.beauty,
  CATEGORY_CONFIGS.shopping,
  CATEGORY_CONFIGS.lifestyle,
  CATEGORY_CONFIGS.food,
  CATEGORY_CONFIGS.culture,
];

// 세부 카테고리만 포함하는 배열 (상세 필터링용)
export const DETAIL_CATEGORIES: CategoryInfo[] = [
  CATEGORY_CONFIGS.cafe,
  CATEGORY_CONFIGS.restaurant,
  CATEGORY_CONFIGS.fastfood,
  CATEGORY_CONFIGS.bakery,
  CATEGORY_CONFIGS.convenience,
  CATEGORY_CONFIGS.pharmacy,
  CATEGORY_CONFIGS.electronics,
];

// 기존 호환성을 위한 타입 별칭
export type Category = CategoryInfo;
export const CATEGORIES = MAIN_CATEGORIES;
