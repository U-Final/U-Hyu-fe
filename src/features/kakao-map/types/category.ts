// types/category.ts
export type StoreCategory =
  | 'all'
  | 'themepark'           // 테마파크
  | 'waterpark'           // 워터파크/아쿠아리움
  | 'activity'            // 액티비티
  | 'beauty'              // 뷰티
  | 'health'              // 건강
  | 'shopping'            // 쇼핑
  | 'lifestyle'           // 생활/편의
  | 'bakery'              // 베이커리/디저트
  | 'food'                // 음식점
  | 'media'               // 영화/미디어
  | 'performance'         // 공연/전시
  | 'education'           // 교육
  | 'travel'              // 여행/교통
  // 기존 호환성 유지용
  | 'culture'
  | 'cafe'
  | 'restaurant'
  | 'fastfood'
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
  themepark: {
    key: 'themepark',
    name: '테마파크',
    icon: '🎡',
    color: 'bg-pink-500',
    ringColor: 'ring-pink-300',
    description: '뽀로로파크, 원더빌리지, 서울랜드, 롯데월드 등',
  },
  waterpark: {
    key: 'waterpark',
    name: '워터파크/아쿠아리움',
    icon: '🌊',
    color: 'bg-cyan-500',
    ringColor: 'ring-cyan-300',
    description: '아쿠아필드, 캐리비안베이, 코엑스아쿠아리움, 아쿠아플라넷 등',
  },
  activity: {
    key: 'activity',
    name: '액티비티',
    icon: '🎢',
    color: 'bg-cyan-500',
    ringColor: 'ring-cyan-300',
    description: '스카이라인 루지, 클룩, 부산 엑스 더 스카이, 대관령 하늘목장 등',
  },
  beauty: {
    key: 'beauty',
    name: '뷰티',
    icon: '💄',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-300',
    description: '오가나셀 피부과, 데이원클리닉, 포쉬네일, 유엔아이피부과 등',
  },
  health: {
    key: 'health',
    name: '건강',
    icon: '💊',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
    description: '동아제약 디몰, LG생활건강샵, 필리 등',
  },
  shopping: {
    key: 'shopping',
    name: '쇼핑',
    icon: '🛍️',
    color: 'bg-pink-500',
    ringColor: 'ring-pink-300',
    description: 'GS THE FRESH, VYVY, 롯데백화점몰, 현대면세점 등',
  },
  lifestyle: {
    key: 'lifestyle',
    name: '생활/편의',
    icon: '🏪',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
    description: 'GS25, 펫생각, 셸로, 다락, 청소연구소 등',
  },
  bakery: {
    key: 'bakery',
    name: '베이커리/디저트',
    icon: '🧁',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: '파리바게트, 뚜레쥬르, 베스킨라빈스, 파리크라상 등',
  },
  food: {
    key: 'food',
    name: '음식점',
    icon: '🍽️',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: 'VIPS, 더플레이스, 제일제면소, 유가네닭갈비, 굽네치킨 등',
  },
  media: {
    key: 'media',
    name: '영화/미디어',
    icon: '🎬',
    color: 'bg-violet-500',
    ringColor: 'ring-violet-300',
    description: 'CGV, 롯데시네마, 메가박스, 씨네폭스 등',
  },
  performance: {
    key: 'performance',
    name: '공연/전시',
    icon: '🎭',
    color: 'bg-violet-500',
    ringColor: 'ring-violet-300',
    description: '빛의 벙커, 페인터즈, 뮤지엄원, 그라운드시소 등',
  },
  education: {
    key: 'education',
    name: '교육',
    icon: '🎓',
    color: 'bg-blue-500',
    ringColor: 'ring-blue-300',
    description: '젠지, 월스트리트 잉글리시, YBM NET, 허그맘 등',
  },
  travel: {
    key: 'travel',
    name: '여행/교통',
    icon: '✈️',
    color: 'bg-lime-500',
    ringColor: 'ring-lime-300',
    description: 'SK렌터카, 야놀자, 티웨이항공, 롯데렌터카 등',
  },

  // 호환성을 위한 별칭 카테고리들
  culture: {
    key: 'culture',
    name: '영화/미디어',
    icon: '🎬',
    color: 'bg-violet-500',
    ringColor: 'ring-violet-300',
    description: 'CGV, 롯데시네마, 메가박스 등',
  },
  pharmacy: {
    key: 'pharmacy',
    name: '건강',
    icon: '💊',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
    description: '동아제약 디몰, LG생활건강샵, 필리 등',
  },
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
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: 'VIPS, 더플레이스, 제일제면소 등',
  },
  fastfood: {
    key: 'fastfood',
    name: '음식점',
    icon: '🍽️',
    color: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    description: 'VIPS, 더플레이스, 제일제면소 등',
  },
  convenience: {
    key: 'convenience',
    name: '생활/편의',
    icon: '🏪',
    color: 'bg-emerald-500',
    ringColor: 'ring-emerald-300',
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
  CATEGORY_CONFIGS.themepark,    // 테마파크
  CATEGORY_CONFIGS.waterpark,    // 워터파크/아쿠아리움
  CATEGORY_CONFIGS.activity,     // 액티비티
  CATEGORY_CONFIGS.beauty,       // 뷰티
  CATEGORY_CONFIGS.health,       // 건강
  CATEGORY_CONFIGS.shopping,     // 쇼핑
  CATEGORY_CONFIGS.lifestyle,    // 생활/편의
  CATEGORY_CONFIGS.bakery,       // 베이커리/디저트
  CATEGORY_CONFIGS.food,         // 음식점
  CATEGORY_CONFIGS.media,        // 영화/미디어
  CATEGORY_CONFIGS.performance,  // 공연/전시
  CATEGORY_CONFIGS.education,    // 교육
  CATEGORY_CONFIGS.travel,       // 여행/교통
];

// 세부 카테고리만 포함하는 배열 (호환성을 위한 별칭들)
export const DETAIL_CATEGORIES: CategoryInfo[] = [
  CATEGORY_CONFIGS.culture,
  CATEGORY_CONFIGS.pharmacy,
  CATEGORY_CONFIGS.cafe,
  CATEGORY_CONFIGS.restaurant,
  CATEGORY_CONFIGS.fastfood,
  CATEGORY_CONFIGS.convenience,
];

// 기존 호환성을 위한 타입 별칭
export type Category = CategoryInfo;
export const CATEGORIES = MAIN_CATEGORIES;
