// types/category.ts
export type StoreCategory =
  | 'cafe'
  | 'restaurant'
  | 'fastfood'
  | 'bakery'
  | 'convenience'
  | 'beauty'
  | 'pharmacy'
  | 'electronics'
  | 'default';

export interface CategoryConfig {
  name: string;
  color: string;
  ringColor: string; // 선택 상태일 때 사용할 색상
  icon?: string;
  description?: string;
}

// 카테고리별 시각적 설정을 중앙에서 관리
export const CATEGORY_CONFIGS: Record<StoreCategory, CategoryConfig> = {
  cafe: {
    name: '카페',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    icon: '☕',
    description: '커피 전문점',
  },
  restaurant: {
    name: '음식점',
    color: 'bg-green-500',
    ringColor: 'ring-green-300',
    icon: '🍽️',
    description: '일반 음식점',
  },
  fastfood: {
    name: '패스트푸드',
    color: 'bg-red-500',
    ringColor: 'ring-red-300',
    icon: '🍔',
    description: '패스트푸드 체인',
  },
  bakery: {
    name: '베이커리',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    icon: '🥖',
    description: '베이커리 및 디저트',
  },
  convenience: {
    name: '편의점',
    color: 'bg-blue-500',
    ringColor: 'ring-blue-300',
    icon: '🏪',
    description: '편의점',
  },
  beauty: {
    name: '뷰티',
    color: 'bg-pink-500',
    ringColor: 'ring-pink-300',
    icon: '💄',
    description: '화장품 및 뷰티',
  },
  pharmacy: {
    name: '약국',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
    icon: '💊',
    description: '약국',
  },
  electronics: {
    name: '전자제품',
    color: 'bg-indigo-500',
    ringColor: 'ring-indigo-300',
    icon: '📱',
    description: '전자제품 매장',
  },
  default: {
    name: '기타',
    color: 'bg-gray-500',
    ringColor: 'ring-gray-300',
    icon: '🏬',
    description: '기타 매장',
  },
};

export interface Category {
  key: string;
  name: string;
  icon: string;
  color?: string; // 카테고리별 색상 구분
}

export const CATEGORIES: Category[] = [
  {
    key: 'all',
    name: '전체',
    icon: '🏪',
    color: 'bg-gray-500',
  },
  {
    key: 'activity',
    name: '액티비티',
    icon: '🎯',
    color: 'bg-blue-500',
  },
  {
    key: 'beauty',
    name: '뷰티/건강',
    icon: '💄',
    color: 'bg-pink-500',
  },
  {
    key: 'shopping',
    name: '쇼핑',
    icon: '🛍️',
    color: 'bg-purple-500',
  },
  {
    key: 'lifestyle',
    name: '생활/편의',
    icon: '🏠',
    color: 'bg-green-500',
  },
  {
    key: 'food',
    name: '푸드',
    icon: '🍽️',
    color: 'bg-orange-500',
  },
  {
    key: 'culture',
    name: '문화/여가',
    icon: '🎭',
    color: 'bg-indigo-500',
  },
];
