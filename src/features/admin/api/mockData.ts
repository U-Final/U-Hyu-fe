import type { CategoryStat, TotalStat } from './types';

// 카테고리 예시
const CATEGORIES = [
  { categoryId: 1, categoryName: '영화관', brands: ['CGV', '롯데시네마'] },
  { categoryId: 2, categoryName: '편의점', brands: ['GS25'] },
  { categoryId: 3, categoryName: '베이커리', brands: ['파리바게뜨', '뚜레쥬르'] },
  { categoryId: 4, categoryName: '치킨', brands: ['굽네치킨'] },
  { categoryId: 5, categoryName: '아이스크림', brands: ['베스킨라빈스'] },
  { categoryId: 6, categoryName: '테마파크', brands: ['원더파크'] },
];

// 브랜드별 임의 count 생성 함수
function makeBrandDetails(brands: string[], base = 10) {
  return brands.map((brand, idx) => ({
    brandName: brand,
    count: base + idx * 7,
  }));
}

// 통계별 mock 데이터 생성
export const mockBookmarkStats: CategoryStat[] = CATEGORIES.map((cat, i) => ({
  categoryId: cat.categoryId,
  categoryName: cat.categoryName,
  count: 1000 + i * 100,
  details: makeBrandDetails(cat.brands, 20 + i * 5),
}));

export const mockFilteringStats: CategoryStat[] = CATEGORIES.map((cat, i) => ({
  categoryId: cat.categoryId,
  categoryName: cat.categoryName,
  count: 800 + i * 80,
  details: makeBrandDetails(cat.brands, 10 + i * 3),
}));

export const mockSearchStats: CategoryStat[] = CATEGORIES.map((cat, i) => ({
  categoryId: cat.categoryId,
  categoryName: cat.categoryName,
  count: 600 + i * 60,
  details: makeBrandDetails(cat.brands, 5 + i * 2),
}));

export const mockRecommendStats: CategoryStat[] = CATEGORIES.map((cat, i) => ({
  categoryId: cat.categoryId,
  categoryName: cat.categoryName,
  count: 400 + i * 40,
  details: makeBrandDetails(cat.brands, 2 + i),
}));

export const mockMembershipStats: CategoryStat[] = CATEGORIES.map((cat, i) => ({
  categoryId: cat.categoryId,
  categoryName: cat.categoryName,
  count: 200 + i * 20,
  details: makeBrandDetails(cat.brands, 1 + i),
}));

export const mockTotalStats: TotalStat = {
  totalBookmark: mockBookmarkStats.reduce((acc, cur) => acc + cur.count, 0),
  totalFiltering: mockFilteringStats.reduce((acc, cur) => acc + cur.count, 0),
  totalSearch: mockSearchStats.reduce((acc, cur) => acc + cur.count, 0),
  totalMembership: mockMembershipStats.reduce((acc, cur) => acc + cur.count, 0),
};

// 관리자 카테고리 목록 mock 데이터
export const mockAdminCategories = [
  { categoryId: 1, categoryName: '영화관' },
  { categoryId: 2, categoryName: '편의점' },
  { categoryId: 3, categoryName: '베이커리' },
  { categoryId: 4, categoryName: '치킨' },
  { categoryId: 5, categoryName: '아이스크림' },
  { categoryId: 6, categoryName: '테마파크' },
];

// 관리자 브랜드 목록 mock 데이터
export const mockAdminBrands = [
  {
    brandId: 1,
    brandName: 'CGV',
    brandImg: '/images/brands/CGV.png',
    categoryId: 1, // 영화관
    usageLimit: '1일 1회',
    usageMethod: '모바일 앱 쿠폰 제시',
    storeType: 'OFFLINE',
    status: true,
    data: [
      { grade: 'VVIP', description: '영화 티켓 100% 할인', benefitType: 'DISCOUNT' },
      { grade: 'VIP', description: '팝콘 무료', benefitType: 'GIFT' },
    ],
  },
  {
    brandId: 2,
    brandName: 'GS25',
    brandImg: '/images/brands/GS25.png',
    categoryId: 2, // 편의점
    usageLimit: '1일 2회',
    usageMethod: '바코드 제시',
    storeType: 'OFFLINE',
    status: true,
    data: [
      { grade: 'VIP', description: '1000원 할인', benefitType: 'DISCOUNT' },
    ],
  },
  {
    brandId: 3,
    brandName: '파리바게뜨',
    brandImg: '/images/brands/파리바게뜨.png',
    categoryId: 3, // 베이커리
    usageLimit: '월 5회',
    usageMethod: '모바일 쿠폰',
    storeType: 'OFFLINE',
    status: true,
    data: [
      { grade: 'VVIP', description: '10% 할인', benefitType: 'DISCOUNT' },
    ],
  },
  {
    brandId: 4,
    brandName: '굽네치킨',
    brandImg: '/images/brands/굽네치킨.png',
    categoryId: 4, // 치킨
    usageLimit: '주 1회',
    usageMethod: '온라인 주문 시 적용',
    storeType: 'ONLINE',
    status: false,
    data: [
      { grade: 'VIP', description: '2000원 할인', benefitType: 'DISCOUNT' },
    ],
  },
  {
    brandId: 5,
    brandName: '베스킨라빈스',
    brandImg: '/images/brands/베스킨라빈스.png',
    categoryId: 5, // 아이스크림
    usageLimit: '월 3회',
    usageMethod: '모바일 쿠폰',
    storeType: 'OFFLINE',
    status: true,
    data: [
      { grade: 'VVIP', description: '싱글레귤러 1+1', benefitType: 'GIFT' },
    ],
  },
  {
    brandId: 6,
    brandName: '원더파크',
    brandImg: '/images/brands/원더파크.png',
    categoryId: 6, // 테마파크
    usageLimit: '연 1회',
    usageMethod: '현장 매표소 쿠폰 제시',
    storeType: 'OFFLINE',
    status: true,
    data: [
      { grade: 'VVIP', description: '입장권 50% 할인', benefitType: 'DISCOUNT' },
    ],
  },
];

export const mockAdminStatistics = {
  bookmark: [
    {
      categoryId: 1,
      categoryName: '영화관',
      count: 1561,
      details: [
        { brandName: 'CGV', count: 15 },
        { brandName: '롯데시네마', count: 20 },
      ],
    },
    {
      categoryId: 2,
      categoryName: '편의점',
      count: 1200,
      details: [
        { brandName: 'GS25', count: 10 },
        { brandName: 'CU', count: 5 },
      ],
    },
    // ...필요한 만큼 실제 데이터 추가
  ],
  filtering: [
    {
      categoryId: 1,
      categoryName: '영화관',
      count: 1000,
      details: [
        { brandName: 'CGV', count: 8 },
        { brandName: '롯데시네마', count: 12 },
      ],
    },
    // ...다른 카테고리
  ],
  search: [
    {
      categoryId: 1,
      categoryName: '영화관',
      count: 900,
      details: [
        { brandName: 'CGV', count: 7 },
        { brandName: '롯데시네마', count: 9 },
      ],
    },
    // ...다른 카테고리
  ],
  recommend: [
    {
      categoryId: 1,
      categoryName: '영화관',
      count: 1561,
    },
    {
      categoryId: 2,
      categoryName: '편의점',
      count: 1200,
    },
    // ...다른 카테고리
  ],
  membership: [
    {
      categoryId: 1,
      categoryName: '영화관',
      count: 300,
      details: [
        { brandName: 'CGV', count: 2 },
        { brandName: '롯데시네마', count: 1 },
      ],
    },
    // ...다른 카테고리
  ],
  total: {
    totalBookmark: 13123,
    totalFiltering: 13123,
    totalSearch: 13123,
    totalMembership: 13123,
  },
};
