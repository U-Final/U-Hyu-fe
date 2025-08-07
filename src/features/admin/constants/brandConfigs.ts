export interface BrandConfig {
  categoryId: number;
  storeType: 'ONLINE' | 'OFFLINE';
  benefitTypes: ('DISCOUNT' | 'GIFT')[];
}

export const BRAND_CONFIGS: Record<string, BrandConfig> = {
  'CGV': { 
    categoryId: 2,
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT', 'GIFT'] 
  },
  'GS25': { 
    categoryId: 9,
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '파리바게트': { 
    categoryId: 10,
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '굽네치킨': { 
    categoryId: 11,
    storeType: 'ONLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '베스킨라빈스': { 
    categoryId: 10,
    storeType: 'OFFLINE', 
    benefitTypes: ['GIFT'] 
  },
  '원더파크': { 
    categoryId: 3,
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
  '쿠팡': { 
    categoryId: 8,
    storeType: 'ONLINE', 
    benefitTypes: ['GIFT', 'DISCOUNT'] 
  },
  '스타벅스': { 
    categoryId: 10,
    storeType: 'OFFLINE', 
    benefitTypes: ['GIFT', 'DISCOUNT'] 
  },
  '배달의민족': { 
    categoryId: 11,
    storeType: 'ONLINE', 
    benefitTypes: ['GIFT', 'DISCOUNT'] 
  },
  '올리브영': { 
    categoryId: 6,
    storeType: 'OFFLINE', 
    benefitTypes: ['DISCOUNT'] 
  },
};

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  categoryId: 1,
  storeType: 'OFFLINE',
  benefitTypes: ['DISCOUNT']
};

export const getBrandConfig = (brandName: string): BrandConfig => {
  return BRAND_CONFIGS[brandName] || DEFAULT_BRAND_CONFIG;
}; 