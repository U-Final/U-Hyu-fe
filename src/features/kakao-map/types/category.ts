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
  culture: {
    key: 'culture',
    name: '영화/미디어',
    icon: '🎬',
    color: 'bg-purple-500',
    ringColor: 'ring-purple-300',
    description: 'CGV, 롯데시네마, 메가박스 등',
  },
  activity: {
    key: 'activity',
    name: '액티비티',
    icon: '🎢',
    color: 'bg-green-500',
    ringColor: 'ring-green-300',
    description: '스카이라인 루지, 클룩, 부산 엑스 더 스카이 등',
  },
  beauty: {
    key: 'beauty',
    name: '뷰티/클리닉',
    icon: '💄',
    color: 'bg-pink-500',
    ringColor: 'ring-pink-300',
    description: '오가나셀 피부과, 데이원클리닉, 포쉬네일 등',
  },
  pharmacy: {
    key: 'pharmacy',
    name: '건강/영양제',
    icon: '💊',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
    description: '동아제약 디몰, LG생활건강샵, 필리 등',
  },
  lifestyle: {
    key: 'lifestyle',
    name: '생활/편의',
    icon: '🏪',
    color: 'bg-yellow-500',
    ringColor: 'ring-yellow-300',
    description: 'GS25, 펫생각, 셸로 등',
  },
  shopping: {
    key: 'shopping',
    name: '쇼핑',
    icon: '🛍️',
    color: 'bg-indigo-500',
    ringColor: 'ring-indigo-300',
    description: 'GS THE FRESH, VYVY, 롯데백화점몰 등',
  },
  food: {
    key: 'food',
    name: '음식점',
    icon: '🍽️',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    description: 'VIPS, 더플레이스, 제일제면소 등',
  },
  bakery: {
    key: 'bakery',
    name: '베이커리/디저트',
    icon: '🧁',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: '파리바게트, 뚜레쥬르, 베스킨라빈스 등',
  },

  // 호환성을 위한 별칭 카테고리들
  cafe: {
    key: 'cafe',
    name: '베이커리/디저트',
    icon: '🧁',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: '파리바게트, 뚜레쥬르, 베스킨라빈스 등',
  },
  restaurant: {
    key: 'restaurant',
    name: '음식점',
    icon: '🍽️',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    description: 'VIPS, 더플레이스, 제일제면소 등',
  },
  fastfood: {
    key: 'fastfood',
    name: '음식점',
    icon: '🍽️',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    description: 'VIPS, 더플레이스, 제일제면소 등',
  },
  convenience: {
    key: 'convenience',
    name: '생활/편의',
    icon: '🏪',
    color: 'bg-yellow-500',
    ringColor: 'ring-yellow-300',
    description: 'GS25, 펫생각, 셸로 등',
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

// 메인 카테고리만 포함하는 배열 (필터링용) - 매장이 있는 카테고리만
export const MAIN_CATEGORIES: CategoryInfo[] = [
  CATEGORY_CONFIGS.culture, // 영화/미디어
  CATEGORY_CONFIGS.activity, // 액티비티
  CATEGORY_CONFIGS.beauty, // 뷰티/클리닉
  CATEGORY_CONFIGS.pharmacy, // 건강/영양제
  CATEGORY_CONFIGS.lifestyle, // 생활/편의
  CATEGORY_CONFIGS.shopping, // 쇼핑
  CATEGORY_CONFIGS.food, // 음식점
  CATEGORY_CONFIGS.bakery, // 베이커리/디저트
];

// 세부 카테고리만 포함하는 배열 (호환성을 위한 별칭들)
export const DETAIL_CATEGORIES: CategoryInfo[] = [
  CATEGORY_CONFIGS.cafe,
  CATEGORY_CONFIGS.restaurant,
  CATEGORY_CONFIGS.fastfood,
  CATEGORY_CONFIGS.convenience,
];

// 기존 호환성을 위한 타입 별칭
export type Category = CategoryInfo;
export const CATEGORIES = MAIN_CATEGORIES;
