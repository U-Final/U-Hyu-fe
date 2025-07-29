import type { ActivityBenefit, ActivityBrand, ActivityStatistics, Bookmark } from '@mypage/api/types';

export const mockBenefit: ActivityBenefit = {
  id: 1,
  benefitName: 'CGV 영화 할인',
  brandName: 'CGV',
  usedAt: '2024-01-15T10:30:00Z',
  benefitType: 'DISCOUNT'
};

export const mockBrands: ActivityBrand[] = [
  {
    brandId: 1,
    brandName: '뚜레쥬르',
    logoImage: '/images/brands/뚜레쥬르.png',
    visitCount: 5,
    lastVisitAt: '2024-01-15T10:30:00Z'
  },
  {
    brandId: 2,
    brandName: 'CGV',
    logoImage: '/images/brands/CGV.png',
    visitCount: 3,
    lastVisitAt: '2024-01-10T14:20:00Z'
  },
  {
    brandId: 3,
    brandName: '파리바게뜨',
    logoImage: '/images/brands/파리바게뜨.png',
    visitCount: 2,
    lastVisitAt: '2024-01-08T09:15:00Z'
  }
];

export const mockBookmarks: Bookmark[] = [
  {
    bookmarkId: 10,
    storeId: 27,
    logoImage: 'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png',
    storeName: 'CGV 강남',
    addressDetail: '서울특별시 강남구 강남대로66길 85',
    benefit: null
  },
  {
    bookmarkId: 11,
    storeId: 28,
    logoImage: '/images/brands/뚜레쥬르.png',
    storeName: '뚜레쥬르 신촌',
    addressDetail: '서울특별시 마포구 신촌로 12',
    benefit: '아메리카노 무료'
  },
  {
    bookmarkId: 12,
    storeId: 29,
    logoImage: '/images/brands/파리바게뜨.png',
    storeName: '파리바게뜨 홍대',
    addressDetail: '서울특별시 마포구 홍익로 5',
    benefit: '샌드위치 할인'
  },
  {
    bookmarkId: 13,
    storeId: 30,
    logoImage: '/images/brands/GS25.png',
    storeName: 'GS25 합정',
    addressDetail: '서울특별시 마포구 양화로 45',
    benefit: '1000원 할인'
  },
  {
    bookmarkId: 14,
    storeId: 31,
    logoImage: '/images/brands/베스킨라빈스.png',
    storeName: '베스킨라빈스 신림',
    addressDetail: '서울특별시 관악구 신림로 23',
    benefit: '아이스크림 20% 할인'
  },
  {
    bookmarkId: 15,
    storeId: 32,
    logoImage: '/images/brands/롯데시네마.png',
    storeName: '롯데시네마 건대',
    addressDetail: '서울특별시 광진구 능동로 120',
    benefit: '영화 관람권'
  },
  {
    bookmarkId: 16,
    storeId: 33,
    logoImage: '/images/brands/굽네치킨.png',
    storeName: '굽네치킨 신촌',
    addressDetail: '서울특별시 서대문구 신촌로 22',
    benefit: '치킨 2000원 할인'
  },
  {
    bookmarkId: 17,
    storeId: 34,
    logoImage: '/images/brands/뚜레쥬르.png',
    storeName: '뚜레쥬르 홍대',
    addressDetail: '서울특별시 마포구 홍익로 10',
    benefit: '빵 10% 할인'
  },
  {
    bookmarkId: 18,
    storeId: 35,
    logoImage: '/images/brands/원더파크.png',
    storeName: '원더파크 잠실',
    addressDetail: '서울특별시 송파구 올림픽로 300',
    benefit: '자유이용권'
  },
  {
    bookmarkId: 19,
    storeId: 36,
    logoImage: '/images/brands/파리바게뜨.png',
    storeName: '파리바게뜨 강동',
    addressDetail: '서울특별시 강동구 천호대로 100',
    benefit: '음료 무료'
  },
  {
    bookmarkId: 20,
    storeId: 37,
    logoImage: '/images/brands/뚜레쥬르.png',
    storeName: '뚜레쥬르 강남',
    addressDetail: '서울특별시 강남구 테헤란로 20',
    benefit: '쿠키 증정'
  },
  {
    bookmarkId: 21,
    storeId: 38,
    logoImage: '/images/brands/CGV.png',
    storeName: 'CGV 신림',
    addressDetail: '서울특별시 관악구 신림로 50',
    benefit: '팝콘 무료'
  },
  {
    bookmarkId: 22,
    storeId: 39,
    logoImage: '/images/brands/롯데시네마.png',
    storeName: '롯데시네마 홍대',
    addressDetail: '서울특별시 마포구 홍익로 15',
    benefit: '영화 할인'
  },
  {
    bookmarkId: 23,
    storeId: 40,
    logoImage: '/images/brands/GS25.png',
    storeName: 'GS25 신촌',
    addressDetail: '서울특별시 서대문구 신촌로 30',
    benefit: '음료 1+1'
  },
  {
    bookmarkId: 24,
    storeId: 41,
    logoImage: '/images/brands/베스킨라빈스.png',
    storeName: '베스킨라빈스 강남',
    addressDetail: '서울특별시 강남구 강남대로 10',
    benefit: '아이스크림 무료'
  },
  {
    bookmarkId: 25,
    storeId: 42,
    logoImage: '/images/brands/뚜레쥬르.png',
    storeName: '뚜레쥬르 신촌',
    addressDetail: '서울특별시 서대문구 신촌로 40',
    benefit: '빵 20% 할인'
  },
  {
    bookmarkId: 26,
    storeId: 43,
    logoImage: '/images/brands/원더파크.png',
    storeName: '원더파크 강남',
    addressDetail: '서울특별시 강남구 테헤란로 30',
    benefit: '입장권'
  },
  {
    bookmarkId: 27,
    storeId: 44,
    logoImage: '/images/brands/파리바게뜨.png',
    storeName: '파리바게뜨 신림',
    addressDetail: '서울특별시 관악구 신림로 60',
    benefit: '샌드위치 무료'
  },
  {
    bookmarkId: 28,
    storeId: 45,
    logoImage: '/images/brands/뚜레쥬르.png',
    storeName: '뚜레쥬르 홍대',
    addressDetail: '서울특별시 마포구 홍익로 20',
    benefit: '음료 1+1'
  },
  {
    bookmarkId: 29,
    storeId: 46,
    logoImage: '/images/brands/롯데시네마.png',
    storeName: '롯데시네마 강동',
    addressDetail: '서울특별시 강동구 천호대로 120',
    benefit: '영화 관람권'
  },
  {
    bookmarkId: 30,
    storeId: 47,
    logoImage: '/images/brands/GS25.png',
    storeName: 'GS25 홍대',
    addressDetail: '서울특별시 마포구 홍익로 25',
    benefit: '1000원 할인'
  }
];

export const mockActivityStatistics: ActivityStatistics = {
  discountMoney: 12000,
  bestBrandList: mockBrands,
  recentStoreList: [
    {
      storeId: 101,
      storeName: 'CGV 강남',
      logoImage: 'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png',
      addressDetail: '서울특별시 강남구 강남대로66길 85',
      visitAt: '2024-01-20T15:00:00Z',
    },
    {
      storeId: 102,
      storeName: '뚜레쥬르 신촌',
      logoImage: '/images/brands/뚜레쥬르.png',
      addressDetail: '서울특별시 마포구 신촌로 12',
      visitAt: '2024-01-18T11:30:00Z',
    },
    {
      storeId: 103,
      storeName: '파리바게뜨 홍대',
      logoImage: '/images/brands/파리바게뜨.png',
      addressDetail: '서울특별시 마포구 홍익로 5',
      visitAt: '2024-01-15T09:10:00Z',
    },
  ],
};

export const mockFavoriteBrands = [
  { id: 1, image: "/images/brands/CGV.png", name: "CGV", description: "전국 CGV에서 사용 가능", isFavorite: true },
  { id: 2, image: "/images/brands/베스킨라빈스.png", name: "베스킨라빈스", description: "아이스크림 할인 혜택", isFavorite: true },
  { id: 3, image: "/images/brands/GS25.png", name: "GS25", description: "편의점 1000원 할인", isFavorite: true },
  { id: 4, image: "/images/brands/굽네치킨.png", name: "굽네치킨", description: "배달 시 2000원 할인", isFavorite: true },
  { id: 5, image: "/images/brands/뚜레쥬르.png", name: "뚜레쥬르", description: "빵 10% 할인", isFavorite: true },
  { id: 6, image: "/images/brands/원더파크.png", name: "원더파크", description: "테마파크 자유 이용권", isFavorite: true },
  { id: 7, image: "/images/brands/파리바게뜨.png", name: "파리바게뜨", description: "음료 무료 쿠폰", isFavorite: true },
  { id: 8, image: "/images/brands/롯데시네마.png", name: "롯데시네마", description: "영화 관람 30% 할인", isFavorite: true }
];
