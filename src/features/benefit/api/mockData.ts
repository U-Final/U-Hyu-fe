import type { BenefitType, Brand, StoreType } from './types';

/**
 * 브랜드 정보 목데이터 타입
 */
interface BrandMock extends Brand {
  category: string;
  storeTypes: StoreType;
  benefitTypes: BenefitType;
}

/**
 * 목데이터: 브랜드 정보
 */
export const allBrands: BrandMock[] = [
  {
    brandId: 101,
    brandName: '굽네치킨',
    logoImage: '/images/brands/굽네치킨.png',
    description: '아메리카노 20% 할인',
    category: 'restaurant',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 102,
    brandName: '뚜레쥬르',
    logoImage: '/images/brands/뚜레쥬르.png',
    description: '케이크 10% 할인',
    category: 'dessert',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 103,
    brandName: '롯데시네마',
    logoImage: '/images/brands/롯데시네마.png',
    description: '영화 티켓 1,000원 할인',
    category: 'media',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 104,
    brandName: '배스킨라빈스',
    logoImage: '/images/brands/베스킨라빈스.png',
    description: '레귤러 1+1 혜택',
    category: 'dessert',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
  {
    brandId: 105,
    brandName: '원더파크',
    logoImage: '/images/brands/원더파크.png',
    description: '전 상품 15% 할인',
    category: 'theme-park',
    storeTypes: 'ONLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 106,
    brandName: '파리바게뜨',
    logoImage: '/images/brands/파리바게뜨.png',
    description: '전 상품 15% 할인',
    category: 'dessert',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 107,
    brandName: 'CGV',
    logoImage: '/images/brands/CGV.png',
    description: '2+1 행사 상품 제공',
    category: 'media',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
  {
    brandId: 108,
    brandName: 'GS25',
    logoImage: '/images/brands/GS25.png',
    description: '2+1 행사 상품 제공',
    category: 'lifestyle',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
];