// 통계별 mock 데이터 생성
export const mockBookmarkStats = [
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
];

export const mockFilteringStats = [
  {
    categoryId: 1,
    categoryName: '영화관',
    count: 1000,
    details: [
      { brandName: 'CGV', count: 8 },
      { brandName: '롯데시네마', count: 12 },
    ],
  },
  {
    categoryId: 2,
    categoryName: '편의점',
    count: 900,
    details: [
      { brandName: 'GS25', count: 7 },
      { brandName: 'CU', count: 3 },
    ],
  },
];



export const mockRecommendStats = [
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
];

export const mockMembershipStats = [
  {
    categoryId: 1,
    categoryName: '영화관',
    count: 300,
    details: [
      { brandName: 'CGV', count: 2 },
      { brandName: '롯데시네마', count: 1 },
    ],
  },
  {
    categoryId: 2,
    categoryName: '편의점',
    count: 200,
    details: [
      { brandName: 'GS25', count: 1 },
      { brandName: 'CU', count: 1 },
    ],
  },
];

export const mockTotalStats = {
  totalBookmark: 13123,
  totalFiltering: 13123,

  totalMembership: 13123,
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
      ],
    },
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
    {
      categoryId: 2,
      categoryName: '편의점',
      count: 900,
      details: [
        { brandName: 'GS25', count: 7 },
      ],
    },
  ],

  recommend: [
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
      ],
    },
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
    {
      categoryId: 2,
      categoryName: '편의점',
      count: 200,
      details: [
        { brandName: 'GS25', count: 1 },
      ],
    },
  ],
  total: {
    totalBookmark: 1561 + 1200, // 2761
    totalFiltering: 1000 + 900, // 1900

    totalMembership: 300 + 200, // 500
  },
};
