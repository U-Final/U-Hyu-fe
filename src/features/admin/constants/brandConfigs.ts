// 브랜드별 설정 정보
export interface BrandConfig {
  categoryId: number;
  storeType: 'ONLINE' | 'OFFLINE';
  benefitTypes: ('DISCOUNT' | 'GIFT')[];
}

export const BRAND_CONFIGS: Record<string, BrandConfig> = {
  'CGV': { 
    categoryId: 2, // 영화/미디어
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT', 'GIFT'] 
  },
  'GS25': { 
    categoryId: 9, // 생활/편의
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '파리바게트': { 
    categoryId: 10, // 베이커리/디저트
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '굽네치킨': { 
    categoryId: 11, // 음식점
    storeType: 'ONLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '베스킨라빈스': { 
    categoryId: 10, // 베이커리/디저트
    storeType: 'OFFLINE', 
    benefitTypes: ['GIFT'] 
  },
  '원더파크': { 
    categoryId: 3, // 테마파크
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '쿠팡': { 
    categoryId: 8, // 쇼핑
    storeType: 'ONLINE', 
    benefitTypes: ['GIFT', 'DISCOUNT'] 
  },
  '스타벅스': { 
    categoryId: 10, // 베이커리/디저트
    storeType: 'OFFLINE', 
    benefitTypes: ['GIFT', 'DISCOUNT'] 
  },
  '배달의민족': { 
    categoryId: 11, // 음식점
    storeType: 'ONLINE', 
    benefitTypes: ['GIFT', 'DISCOUNT'] 
  },
  '올리브영': { 
    categoryId: 6, // 뷰티
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
};

// 기본 설정 (브랜드가 configs에 없을 때 사용)
export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  categoryId: 1,
  storeType: 'OFFLINE',
  benefitTypes: ['DISCOUNT']
};

// 브랜드 설정 조회 함수
export const getBrandConfig = (brandName: string): BrandConfig => {
  return BRAND_CONFIGS[brandName] || DEFAULT_BRAND_CONFIG;
}; 