// utils/brandCategoryMapping.ts
import type { StoreCategory } from '../types/category';

// BRAND_CATEGORY_MAPPING에 정의된 카테고리만 사용
type BrandCategoryKey =
  | 'food'
  | 'lifestyle'
  | 'beauty'
  | 'shopping'
  | 'culture'
  | 'activity';

export const BRAND_CATEGORY_MAPPING = {
  food: {
    brands: [
      '스타벅스',
      '투썸플레이스',
      '이디야커피',
      '파리바게뜨',
      '뚜레쥬르',
      '맥도날드',
      '버거킹',
      '롯데리아',
    ],
    patterns: [
      /스타벅스/i,
      /투썸/i,
      /이디야/i,
      /파리바게뜨/i,
      /뚜레쥬르/i,
      /맥도날드/i,
      /버거킹/i,
      /롯데리아/i,
    ],
  },
  lifestyle: {
    brands: ['GS25', 'CU', '세븐일레븐', '이마트24', '미니스톱'],
    patterns: [/GS25/i, /CU/i, /세븐일레븐/i, /이마트24/i, /미니스톱/i],
  },
  beauty: {
    brands: ['올리브영', '아리따움', '롭스', '왓슨스'],
    patterns: [/올리브영/i, /아리따움/i, /롭스/i, /왓슨스/i],
  },
  shopping: {
    brands: ['이마트', '홈플러스', '롯데마트', '코스트코'],
    patterns: [/이마트/i, /홈플러스/i, /롯데마트/i, /코스트코/i],
  },
  culture: {
    brands: ['CGV', '롯데시네마', '메가박스', '교보문고'],
    patterns: [/CGV/i, /롯데시네마/i, /메가박스/i, /교보문고/i],
  },
  activity: {
    brands: ['피트니스클럽', '골프장', '볼링장', '당구장'],
    patterns: [/피트니스/i, /골프/i, /볼링/i, /당구/i],
  },
} as const;

// 매장 이름으로부터 카테고리를 추출하는 함수
export const getStoreCategory = (storeName: string): StoreCategory => {
  for (const [category, config] of Object.entries(BRAND_CATEGORY_MAPPING)) {
    const isMatch = config.patterns.some(pattern => pattern.test(storeName));
    if (isMatch) {
      return category as StoreCategory;
    }
  }
  return 'lifestyle'; // 기본 카테고리
};

// 특정 카테고리의 브랜드 목록을 가져오는 함수
export const getBrandsByCategory = (categoryKey: StoreCategory): string[] => {
  if (categoryKey === 'all') {
    // 전체 선택 시 모든 브랜드 반환
    return Object.values(BRAND_CATEGORY_MAPPING).flatMap(config => [
      ...config.brands,
    ]);
  }

  // BRAND_CATEGORY_MAPPING에 정의된 카테고리인지 확인
  if (categoryKey in BRAND_CATEGORY_MAPPING) {
    const categoryConfig =
      BRAND_CATEGORY_MAPPING[categoryKey as BrandCategoryKey];
    return [...categoryConfig.brands];
  }

  console.warn(`Unknown category: ${categoryKey}`);
  return [];
};
