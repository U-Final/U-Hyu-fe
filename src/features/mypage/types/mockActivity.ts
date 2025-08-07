import type { ActivityBenefit, ActivityBrand, ActivityStatistics, Bookmark } from '@mypage/api/types';

export const mockBenefit: ActivityBenefit = {
  id: 1,
  benefitName: 'CGV 영화 할인',
  brandName: 'CGV',
  usedAt: '2024-01-15T10:30:00Z',
  benefitType: 'DISCOUNT'
};

export const mockBestBrands: ActivityBrand[] = [
  {
    bestBrandId: 1,
    bestBrandName: 'CGV',
    bestBrandImage: 'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png',
    visitCount: 15,
    lastVisitAt: '2024-01-20T15:30:00Z'
  },
  {
    bestBrandId: 2,
    bestBrandName: '뚜레쥬르',
    bestBrandImage: '/images/brands/뚜레쥬르.png',
    visitCount: 12,
    lastVisitAt: '2024-01-18T11:20:00Z'
  },
  {
    bestBrandId: 3,
    bestBrandName: '파리바게뜨',
    bestBrandImage: '/images/brands/파리바게뜨.png',
    visitCount: 8,
    lastVisitAt: '2024-01-15T09:10:00Z'
  }
];

export const mockRecentStores = [
  {
    recentStoreId: 1,
    recentStoreName: 'CGV 명동역 씨네라이브러리',
    recentBrandImage: 'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png'
  },
  {
    recentStoreId: 2,
    recentStoreName: 'CGV 피카디리1958',
    recentBrandImage: 'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png'
  },
  {
    recentStoreId: 3,
    recentStoreName: '뚜레쥬르 신촌점',
    recentBrandImage: '/images/brands/뚜레쥬르.png'
  },
  {
    recentStoreId: 4,
    recentStoreName: '파리바게뜨 홍대점',
    recentBrandImage: '/images/brands/파리바게뜨.png'
  },
  {
    recentStoreId: 5,
    recentStoreName: 'GS25 합정점',
    recentBrandImage: '/images/brands/GS25.png'
  },
  {
    recentStoreId: 6,
    recentStoreName: '베스킨라빈스 신림점',
    recentBrandImage: '/images/brands/베스킨라빈스.png'
  },
  {
    recentStoreId: 7,
    recentStoreName: '롯데시네마 건대점',
    recentBrandImage: '/images/brands/롯데시네마.png'
  },
  {
    recentStoreId: 8,
    recentStoreName: '굽네치킨 신촌점',
    recentBrandImage: '/images/brands/굽네치킨.png'
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
  }
];

export const mockActivityStatistics: ActivityStatistics = {
  discountMoney: 1500,
  bestBrandList: mockBestBrands,
  recentStoreList: mockRecentStores
};

export const mockBrands = mockBestBrands;

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
