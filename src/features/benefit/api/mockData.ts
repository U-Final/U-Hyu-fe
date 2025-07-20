import type { BenefitType, Brand, BrandListRes, StoreType } from './types';

interface BrandMock extends Brand {
  category: string;
  storeTypes: StoreType[];
  benefitTypes: BenefitType[];
}

/**
 * 모든 브랜드를 하나의 배열에 정의 (모든 페이지 합친 버전)
 */
export const allBrands: BrandMock[] = [
  {
    brandId: 101,
    brandName: '굽네치킨',
    logoImage: '/images/brands/굽네치킨.png',
    description: '아메리카노 20% 할인',
    category: '음식점',
    storeTypes: ['ONLINE', 'OFFLINE'],
    benefitTypes: ['DISCOUNT'],
  },
  {
    brandId: 102,
    brandName: '뚜레쥬르',
    logoImage: '/images/brands/뚜레쥬르.png',
    description: '케이크 10% 할인',
    category: '베이커리/디저트',
    storeTypes: ['OFFLINE'],
    benefitTypes: ['DISCOUNT'],
  },
  {
    brandId: 103,
    brandName: '롯데시네마',
    logoImage: '/images/brands/롯데시네마.png',
    description: '영화 티켓 1,000원 할인',
    category: '영화/미디어',
    storeTypes: ['OFFLINE'],
    benefitTypes: ['DISCOUNT'],
  },
  {
    brandId: 104,
    brandName: '배스킨라빈스',
    logoImage: '/images/brands/베스킨라빈스.png',
    description: '레귤러 1+1 혜택',
    category: '베이커리/디저트',
    storeTypes: ['OFFLINE'],
    benefitTypes: ['GIFT'],
  },
  {
    brandId: 105,
    brandName: '원더파크',
    logoImage: '/images/brands/원더파크.png',
    description: '전 상품 15% 할인',
    category: '테마파크',
    storeTypes: ['ONLINE', 'OFFLINE'],
    benefitTypes: ['DISCOUNT'],
  },
  {
    brandId: 106,
    brandName: '파리바게뜨',
    logoImage: '/images/brands/파리바게뜨.png',
    description: '전 상품 15% 할인',
    category: '베이커리/디저트',
    storeTypes: ['OFFLINE'],
    benefitTypes: ['DISCOUNT'],
  },
  {
    brandId: 107,
    brandName: 'CGV',
    logoImage: '/images/brands/CGV.png',
    description: '2+1 행사 상품 제공',
    category: '영화/미디어',
    storeTypes: ['OFFLINE'],
    benefitTypes: ['GIFT'],
  },
  {
    brandId: 108,
    brandName: 'GS25',
    logoImage: '/images/brands/GS25.png',
    description: '2+1 행사 상품 제공',
    category: '생활/편의',
    storeTypes: ['OFFLINE'],
    benefitTypes: ['GIFT'],
  },
];

/**
 * 공통 응답 포맷 생성 헬퍼
 */
export const createMockBrandListResponse = (data: BrandListRes) => {
  return {
    status: 200,
    message: '제휴처 목록을 성공적으로 조회했습니다.',
    data,
    timestamp: new Date().toISOString(),
  };
};