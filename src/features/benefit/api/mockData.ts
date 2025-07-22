import type { BenefitType, Brand, BrandDetailRes, StoreType } from './types';





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

/**
 * 목데이터: 브랜드 상세 정보
 */
export const mockBrandDetails: BrandDetailRes[] = [
  {
    brandId: 101,
    brandName: '굽네치킨',
    logoImage: '/images/brands/굽네치킨.png',
    usageMethod: '매장 방문 후 유플러스 고객 인증',
    usageLimit: '1일 1회 / 일부 매장 제외',
    benefitRes: [
      { grade: 'VVIP', description: '20% 할인 + 음료 무료' },
      { grade: 'VIP', description: '15% 할인' },
    ],
  },
  {
    brandId: 102,
    brandName: '뚜레쥬르',
    logoImage: '/images/brands/뚜레쥬르.png',
    usageMethod: '유플러스 쿠폰 제시',
    usageLimit: '1일 2회 / 케이크 제외',
    benefitRes: [
      { grade: 'VVIP', description: '10% 할인 + 추가 적립' },
      { grade: 'GOOD', description: '5% 할인' },
    ],
  },
  {
    brandId: 103,
    brandName: '롯데시네마',
    logoImage: '/images/brands/롯데시네마.png',
    usageMethod: '모바일 앱에서 쿠폰 등록',
    usageLimit: '주 1회 / 본인만 사용 가능',
    benefitRes: [
      { grade: 'VVIP', description: '영화 1,000원 할인 + 콤보 업그레이드' },
      { grade: 'VIP', description: '영화 1,000원 할인' },
    ],
  },
  {
    brandId: 104,
    brandName: '배스킨라빈스',
    logoImage: '/images/brands/베스킨라빈스.png',
    usageMethod: '매장 QR코드 스캔 후 쿠폰 적용',
    usageLimit: '하루 1회 / 일부 제품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '1+1 (레귤러 사이즈)' },
      { grade: 'GOOD', description: '10% 할인' },
    ],
  },
  {
    brandId: 105,
    brandName: '원더파크',
    logoImage: '/images/brands/원더파크.png',
    usageMethod: '앱 바코드 스캔 후 적용',
    usageLimit: '1일 3회 / 행사 상품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '2+1 혜택 + 추가 포인트' },
      { grade: 'GOOD', description: '2+1 행사 적용' },
    ],
  },
  {
    brandId: 106,
    brandName: '파리바게뜨',
    logoImage: '/images/brands/파리바게뜨.png',
    usageMethod: '모바일 앱에서 쿠폰 등록',
    usageLimit: '주 1회 / 본인만 사용 가능',
    benefitRes: [
      { grade: 'VVIP', description: '영화 1,000원 할인 + 콤보 업그레이드' },
      { grade: 'VIP', description: '영화 1,000원 할인' },
    ],
  },
  {
    brandId: 107,
    brandName: 'CGV',
    logoImage: '/images/brands/CGV.png',
    usageMethod: '매장 QR코드 스캔 후 쿠폰 적용',
    usageLimit: '하루 1회 / 일부 제품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '1+1 (레귤러 사이즈)' },
      { grade: 'GOOD', description: '10% 할인' },
    ],
  },
  {
    brandId: 108,
    brandName: 'GS25',
    logoImage: '/images/brands/GS25.png',
    usageMethod: '앱 바코드 스캔 후 적용',
    usageLimit: '1일 3회 / 행사 상품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '2+1 혜택 + 추가 포인트' },
      { grade: 'GOOD', description: '2+1 행사 적용' },
    ],
  },
];