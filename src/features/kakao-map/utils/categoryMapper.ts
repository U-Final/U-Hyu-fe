import type { StoreCategory } from '../types/category';

interface BrandCategoryMapping {
  patterns: RegExp[];
  category: StoreCategory;
}

// 브랜드 패턴과 카테고리 매핑 정의
const BRAND_MAPPINGS: BrandCategoryMapping[] = [
  // 카페 카테고리
  {
    patterns: [/스타벅스/i, /starbucks/i],
    category: 'cafe',
  },
  {
    patterns: [/투썸/i, /twosome/i, /2some/i],
    category: 'cafe',
  },
  {
    patterns: [/이디야/i, /ediya/i],
    category: 'cafe',
  },
  {
    patterns: [/커피빈/i, /coffee\s*bean/i],
    category: 'cafe',
  },
  {
    patterns: [/할리스/i, /hollys/i],
    category: 'cafe',
  },

  // 패스트푸드 카테고리
  {
    patterns: [/맥도날드/i, /mcdonald/i],
    category: 'fastfood',
  },
  {
    patterns: [/버거킹/i, /burger\s*king/i],
    category: 'fastfood',
  },
  {
    patterns: [/KFC/i, /케이에프씨/i],
    category: 'fastfood',
  },
  {
    patterns: [/롯데리아/i, /lotteria/i],
    category: 'fastfood',
  },

  // 베이커리 카테고리
  {
    patterns: [/파리바게뜨/i, /paris\s*baguette/i],
    category: 'bakery',
  },
  {
    patterns: [/뚜레쥬르/i, /tous\s*les\s*jours/i],
    category: 'bakery',
  },
  {
    patterns: [/던킨/i, /dunkin/i],
    category: 'bakery',
  },

  // 편의점 카테고리
  {
    patterns: [/GS25/i, /지에스25/i],
    category: 'convenience',
  },
  {
    patterns: [/CU/i, /씨유/i],
    category: 'convenience',
  },
  {
    patterns: [/세븐일레븐/i, /7-eleven/i, /7eleven/i],
    category: 'convenience',
  },

  // 뷰티 카테고리
  {
    patterns: [/올리브영/i, /olive\s*young/i],
    category: 'beauty',
  },
  {
    patterns: [/아리따움/i, /aritaum/i],
    category: 'beauty',
  },
];

// 매장명으로부터 카테고리를 추출하는 함수
export const getStoreCategory = (storeName: string): StoreCategory => {
  // 정의된 패턴들과 매칭 시도
  for (const mapping of BRAND_MAPPINGS) {
    const isMatch = mapping.patterns.some(pattern => pattern.test(storeName));
    if (isMatch) {
      return mapping.category;
    }
  }

  // 매칭되지 않으면 기본 카테고리 반환
  return 'default';
};

// 카테고리별 매장 개수를 계산하는 유틸리티 함수
export const getCategoryStats = (stores: Array<{ name: string }>) => {
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
    const category = getStoreCategory(store.name);
    stats[category] = (stats[category] || 0) + 1;
  });

  return stats;
};
