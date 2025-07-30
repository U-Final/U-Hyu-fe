// 14개 카테고리에 정확히 맞춘 즐겨찾기 통계 mock 데이터
// APP/기기는 즐겨찾기 데이터가 없으므로 제외
export const mockBookmarkStats = [
  {
    categoryId: 2,
    categoryName: '영화 / 미디어',
    sumStatisticsBookmarksByCategory: 12,
    bookmarksByBrandList: [
      {
        brandName: 'CGV',
        sumBookmarksByBrand: 7
      },
      {
        brandName: '롯데시네마',
        sumBookmarksByBrand: 5
      }
    ]
  },
  {
    categoryId: 3,
    categoryName: '테마파크',
    sumStatisticsBookmarksByCategory: 8,
    bookmarksByBrandList: [
      {
        brandName: '뽀로로파크',
        sumBookmarksByBrand: 5
      },
      {
        brandName: '서울랜드',
        sumBookmarksByBrand: 3
      }
    ]
  },
  {
    categoryId: 4,
    categoryName: '워터파크/아쿠아리움',
    sumStatisticsBookmarksByCategory: 10,
    bookmarksByBrandList: [
      {
        brandName: '아쿠아필드',
        sumBookmarksByBrand: 6
      },
      {
        brandName: '캐리비안베이',
        sumBookmarksByBrand: 4
      }
    ]
  },
  {
    categoryId: 5,
    categoryName: '액티비티',
    sumStatisticsBookmarksByCategory: 14,
    bookmarksByBrandList: [
      {
        brandName: '스카이라인 루지',
        sumBookmarksByBrand: 8
      },
      {
        brandName: 'SEOUL SKY',
        sumBookmarksByBrand: 6
      }
    ]
  },
  {
    categoryId: 6,
    categoryName: '뷰티(피부과, 클리닉)',
    sumStatisticsBookmarksByCategory: 6,
    bookmarksByBrandList: [
      {
        brandName: '오가나셀 피부과 의원 청담점',
        sumBookmarksByBrand: 4
      },
      {
        brandName: '데이원클리닉',
        sumBookmarksByBrand: 2
      }
    ]
  },
  {
    categoryId: 7,
    categoryName: '건강(제약, 영양제 등)',
    sumStatisticsBookmarksByCategory: 8,
    bookmarksByBrandList: [
      {
        brandName: '동아제약 디몰',
        sumBookmarksByBrand: 5
      },
      {
        brandName: 'LG생활건강샵 U+패밀리샵',
        sumBookmarksByBrand: 3
      }
    ]
  },
  {
    categoryId: 8,
    categoryName: '쇼핑',
    sumStatisticsBookmarksByCategory: 22,
    bookmarksByBrandList: [
      {
        brandName: 'GS THE FRESH',
        sumBookmarksByBrand: 8
      },
      {
        brandName: '롯데백화점몰',
        sumBookmarksByBrand: 7
      },
      {
        brandName: '현대면세점',
        sumBookmarksByBrand: 7
      }
    ]
  },
  {
    categoryId: 9,
    categoryName: '생활/편의',
    sumStatisticsBookmarksByCategory: 18,
    bookmarksByBrandList: [
      {
        brandName: 'GS25',
        sumBookmarksByBrand: 10
      },
      {
        brandName: '펫생각',
        sumBookmarksByBrand: 8
      }
    ]
  },
  {
    categoryId: 10,
    categoryName: '베이커리/디저트',
    sumStatisticsBookmarksByCategory: 12,
    bookmarksByBrandList: [
      {
        brandName: '파리바게트',
        sumBookmarksByBrand: 6
      },
      {
        brandName: '베스킨라빈스',
        sumBookmarksByBrand: 6
      }
    ]
  },
  {
    categoryId: 11,
    categoryName: '음식점',
    sumStatisticsBookmarksByCategory: 25,
    bookmarksByBrandList: [
      {
        brandName: 'VIPS',
        sumBookmarksByBrand: 8
      },
      {
        brandName: '굽네치킨',
        sumBookmarksByBrand: 7
      },
      {
        brandName: '도미노피자',
        sumBookmarksByBrand: 5
      },
      {
        brandName: '미스터피자',
        sumBookmarksByBrand: 5
      }
    ]
  },
  {
    categoryId: 12,
    categoryName: '공연/전시',
    sumStatisticsBookmarksByCategory: 9,
    bookmarksByBrandList: [
      {
        brandName: '빛의 벙커',
        sumBookmarksByBrand: 5
      },
      {
        brandName: '그라운드시소',
        sumBookmarksByBrand: 4
      }
    ]
  },
  {
    categoryId: 13,
    categoryName: '교육',
    sumStatisticsBookmarksByCategory: 7,
    bookmarksByBrandList: [
      {
        brandName: '월스트리트 잉글리시',
        sumBookmarksByBrand: 4
      },
      {
        brandName: 'YBM NET',
        sumBookmarksByBrand: 3
      }
    ]
  },
  {
    categoryId: 14,
    categoryName: '여행/교통',
    sumStatisticsBookmarksByCategory: 11,
    bookmarksByBrandList: [
      {
        brandName: 'SK렌터카',
        sumBookmarksByBrand: 6
      },
      {
        brandName: '야놀자글로벌 해외 숙박',
        sumBookmarksByBrand: 5
      }
    ]
  }
];

// 14개 카테고리에 정확히 맞춘 필터링 통계 mock 데이터
export const mockFilteringStats = [
  {
    categoryId: 1,
    categoryName: 'APP/기기',
    sumStatisticsFilterByCategory: 20
  },
  {
    categoryId: 2,
    categoryName: '영화 / 미디어',
    sumStatisticsFilterByCategory: 25
  },
  {
    categoryId: 3,
    categoryName: '테마파크',
    sumStatisticsFilterByCategory: 18
  },
  {
    categoryId: 4,
    categoryName: '워터파크/아쿠아리움',
    sumStatisticsFilterByCategory: 12
  },
  {
    categoryId: 5,
    categoryName: '액티비티',
    sumStatisticsFilterByCategory: 15
  },
  {
    categoryId: 6,
    categoryName: '뷰티(피부과, 클리닉)',
    sumStatisticsFilterByCategory: 22
  },
  {
    categoryId: 7,
    categoryName: '건강(제약, 영양제 등)',
    sumStatisticsFilterByCategory: 14
  },
  {
    categoryId: 8,
    categoryName: '쇼핑',
    sumStatisticsFilterByCategory: 28
  },
  {
    categoryId: 9,
    categoryName: '생활/편의',
    sumStatisticsFilterByCategory: 32
  },
  {
    categoryId: 10,
    categoryName: '베이커리/디저트',
    sumStatisticsFilterByCategory: 16
  },
  {
    categoryId: 11,
    categoryName: '음식점',
    sumStatisticsFilterByCategory: 35
  },
  {
    categoryId: 12,
    categoryName: '공연/전시',
    sumStatisticsFilterByCategory: 11
  },
  {
    categoryId: 13,
    categoryName: '교육',
    sumStatisticsFilterByCategory: 19
  },
  {
    categoryId: 14,
    categoryName: '여행/교통',
    sumStatisticsFilterByCategory: 23
  }
];

// 14개 카테고리에 정확히 맞춘 추천 통계 mock 데이터 (APP/기기만 포함)
export const mockRecommendStats = [
  {
    categoryId: 1,
    categoryName: 'APP/기기',
    sumStatisticsRecommendationByCategory: 8,
    recommendationsByBrandList: [
      {
        brandName: 'V컬러링 멤버십 프로모션',
        sumRecommendationsByBrand: 5
      },
      {
        brandName: '원스토어',
        sumRecommendationsByBrand: 3
      }
    ]
  },
  {
    categoryId: 2,
    categoryName: '영화 / 미디어',
    sumStatisticsRecommendationByCategory: 6,
    recommendationsByBrandList: [
      {
        brandName: 'CGV',
        sumRecommendationsByBrand: 4
      },
      {
        brandName: '롯데시네마',
        sumRecommendationsByBrand: 2
      }
    ]
  },
  {
    categoryId: 3,
    categoryName: '테마파크',
    sumStatisticsRecommendationByCategory: 4,
    recommendationsByBrandList: [
      {
        brandName: '뽀로로파크',
        sumRecommendationsByBrand: 2
      },
      {
        brandName: '서울랜드',
        sumRecommendationsByBrand: 2
      }
    ]
  },
  {
    categoryId: 4,
    categoryName: '워터파크/아쿠아리움',
    sumStatisticsRecommendationByCategory: 3,
    recommendationsByBrandList: [
      {
        brandName: '아쿠아필드',
        sumRecommendationsByBrand: 2
      },
      {
        brandName: '캐리비안베이',
        sumRecommendationsByBrand: 1
      }
    ]
  },
  {
    categoryId: 5,
    categoryName: '액티비티',
    sumStatisticsRecommendationByCategory: 7,
    recommendationsByBrandList: [
      {
        brandName: '스카이라인 루지',
        sumRecommendationsByBrand: 4
      },
      {
        brandName: 'SEOUL SKY',
        sumRecommendationsByBrand: 3
      }
    ]
  },
  {
    categoryId: 6,
    categoryName: '뷰티(피부과, 클리닉)',
    sumStatisticsRecommendationByCategory: 5,
    recommendationsByBrandList: [
      {
        brandName: '오가나셀 피부과 의원 청담점',
        sumRecommendationsByBrand: 3
      },
      {
        brandName: '데이원클리닉',
        sumRecommendationsByBrand: 2
      }
    ]
  },
  {
    categoryId: 7,
    categoryName: '건강(제약, 영양제 등)',
    sumStatisticsRecommendationByCategory: 9,
    recommendationsByBrandList: [
      {
        brandName: '동아제약 디몰',
        sumRecommendationsByBrand: 5
      },
      {
        brandName: 'LG생활건강샵 U+패밀리샵',
        sumRecommendationsByBrand: 4
      }
    ]
  },
  {
    categoryId: 8,
    categoryName: '쇼핑',
    sumStatisticsRecommendationByCategory: 6,
    recommendationsByBrandList: [
      {
        brandName: 'GS THE FRESH',
        sumRecommendationsByBrand: 4
      },
      {
        brandName: '롯데백화점몰',
        sumRecommendationsByBrand: 2
      }
    ]
  },
  {
    categoryId: 9,
    categoryName: '생활/편의',
    sumStatisticsRecommendationByCategory: 4,
    recommendationsByBrandList: [
      {
        brandName: 'GS25',
        sumRecommendationsByBrand: 3
      },
      {
        brandName: '펫생각',
        sumRecommendationsByBrand: 1
      }
    ]
  },
  {
    categoryId: 10,
    categoryName: '베이커리/디저트',
    sumStatisticsRecommendationByCategory: 11,
    recommendationsByBrandList: [
      {
        brandName: '파리바게트',
        sumRecommendationsByBrand: 6
      },
      {
        brandName: '베스킨라빈스',
        sumRecommendationsByBrand: 5
      }
    ]
  },
  {
    categoryId: 11,
    categoryName: '음식점',
    sumStatisticsRecommendationByCategory: 3,
    recommendationsByBrandList: [
      {
        brandName: 'VIPS',
        sumRecommendationsByBrand: 2
      },
      {
        brandName: '굽네치킨',
        sumRecommendationsByBrand: 1
      }
    ]
  },
  {
    categoryId: 12,
    categoryName: '공연/전시',
    sumStatisticsRecommendationByCategory: 2,
    recommendationsByBrandList: [
      {
        brandName: '빛의 벙커',
        sumRecommendationsByBrand: 1
      },
      {
        brandName: '그라운드시소',
        sumRecommendationsByBrand: 1
      }
    ]
  },
  {
    categoryId: 13,
    categoryName: '교육',
    sumStatisticsRecommendationByCategory: 7,
    recommendationsByBrandList: [
      {
        brandName: '젠지',
        sumRecommendationsByBrand: 4
      },
      {
        brandName: '월스트리트 잉글리시',
        sumRecommendationsByBrand: 3
      }
    ]
  },
  {
    categoryId: 14,
    categoryName: '여행/교통',
    sumStatisticsRecommendationByCategory: 7,
    recommendationsByBrandList: [
      {
        brandName: 'SK렌터카',
        sumRecommendationsByBrand: 4
      },
      {
        brandName: '야놀자글로벌',
        sumRecommendationsByBrand: 3
      }
    ]
  }
];

// 14개 카테고리에 정확히 맞춘 멤버십 통계 mock 데이터 (APP/기기 제외)
export const mockMembershipStats = [
  {
    categoryId: 2,
    categoryName: '영화 / 미디어',
    sumStatisticsMembershipUsageByCategory: 12,
    membershipUsageByBrandList: [
      {
        brandName: 'CGV',
        sumMembershipUsageByBrand: 7
      },
      {
        brandName: '롯데시네마',
        sumMembershipUsageByBrand: 5
      }
    ]
  },
  {
    categoryId: 3,
    categoryName: '테마파크',
    sumStatisticsMembershipUsageByCategory: 8,
    membershipUsageByBrandList: [
      {
        brandName: '뽀로로파크',
        sumMembershipUsageByBrand: 5
      },
      {
        brandName: '서울랜드',
        sumMembershipUsageByBrand: 3
      }
    ]
  },
  {
    categoryId: 4,
    categoryName: '워터파크/아쿠아리움',
    sumStatisticsMembershipUsageByCategory: 5,
    membershipUsageByBrandList: [
      {
        brandName: '아쿠아필드',
        sumMembershipUsageByBrand: 3
      },
      {
        brandName: '캐리비안베이',
        sumMembershipUsageByBrand: 2
      }
    ]
  },
  {
    categoryId: 5,
    categoryName: '액티비티',
    sumStatisticsMembershipUsageByCategory: 6,
    membershipUsageByBrandList: [
      {
        brandName: '스카이라인 루지',
        sumMembershipUsageByBrand: 4
      },
      {
        brandName: 'SEOUL SKY',
        sumMembershipUsageByBrand: 2
      }
    ]
  },
  {
    categoryId: 6,
    categoryName: '뷰티(피부과, 클리닉)',
    sumStatisticsMembershipUsageByCategory: 15,
    membershipUsageByBrandList: [
      {
        brandName: '오가나셀 피부과 의원 청담점',
        sumMembershipUsageByBrand: 9
      },
      {
        brandName: '데이원클리닉',
        sumMembershipUsageByBrand: 6
      }
    ]
  },
  {
    categoryId: 7,
    categoryName: '건강(제약, 영양제 등)',
    sumStatisticsMembershipUsageByCategory: 11,
    membershipUsageByBrandList: [
      {
        brandName: '동아제약 디몰',
        sumMembershipUsageByBrand: 7
      },
      {
        brandName: 'LG생활건강샵 U+패밀리샵',
        sumMembershipUsageByBrand: 4
      }
    ]
  },
  {
    categoryId: 8,
    categoryName: '쇼핑',
    sumStatisticsMembershipUsageByCategory: 18,
    membershipUsageByBrandList: [
      {
        brandName: 'GS THE FRESH',
        sumMembershipUsageByBrand: 10
      },
      {
        brandName: '롯데백화점몰',
        sumMembershipUsageByBrand: 8
      }
    ]
  },
  {
    categoryId: 9,
    categoryName: '생활/편의',
    sumStatisticsMembershipUsageByCategory: 14,
    membershipUsageByBrandList: [
      {
        brandName: 'GS25',
        sumMembershipUsageByBrand: 8
      },
      {
        brandName: '펫생각',
        sumMembershipUsageByBrand: 6
      }
    ]
  },
  {
    categoryId: 10,
    categoryName: '베이커리/디저트',
    sumStatisticsMembershipUsageByCategory: 9,
    membershipUsageByBrandList: [
      {
        brandName: '파리바게트',
        sumMembershipUsageByBrand: 5
      },
      {
        brandName: '베스킨라빈스',
        sumMembershipUsageByBrand: 4
      }
    ]
  },
  {
    categoryId: 11,
    categoryName: '음식점',
    sumStatisticsMembershipUsageByCategory: 22,
    membershipUsageByBrandList: [
      {
        brandName: 'VIPS',
        sumMembershipUsageByBrand: 10
      },
      {
        brandName: '굽네치킨',
        sumMembershipUsageByBrand: 7
      },
      {
        brandName: '도미노피자',
        sumMembershipUsageByBrand: 5
      }
    ]
  },
  {
    categoryId: 12,
    categoryName: '공연/전시',
    sumStatisticsMembershipUsageByCategory: 6,
    membershipUsageByBrandList: [
      {
        brandName: '빛의 벙커',
        sumMembershipUsageByBrand: 4
      },
      {
        brandName: '그라운드시소',
        sumMembershipUsageByBrand: 2
      }
    ]
  },
  {
    categoryId: 13,
    categoryName: '교육',
    sumStatisticsMembershipUsageByCategory: 8,
    membershipUsageByBrandList: [
      {
        brandName: '젝지',
        sumMembershipUsageByBrand: 5
      },
      {
        brandName: '월스트리트 잉글리시',
        sumMembershipUsageByBrand: 3
      }
    ]
  },
  {
    categoryId: 14,
    categoryName: '여행/교통',
    sumStatisticsMembershipUsageByCategory: 10,
    membershipUsageByBrandList: [
      {
        brandName: 'SK렌터카',
        sumMembershipUsageByBrand: 6
      },
      {
        brandName: '야놀자글로벌',
        sumMembershipUsageByBrand: 4
      }
    ]
  }
];

// 전체 통계 총합 mock 데이터
export const mockTotalStats = {
  totalBookmark: 162, // 즐겨찾기 총합 (APP/기기 제외)
  totalFiltering: 290, // 필터링 총합 (모든 카테고리 포함)
  totalRecommendation: 80, // 추천 총합 (모든 카테고리 포함)
  totalMembershipUsage: 129 // 멤버십 총합 (APP/기기 제외)
};

// 관리자 카테고리 목록 mock 데이터
export const mockAdminCategories = [
  { categoryId: 1, categoryName: '영화 / 미디어' },
  { categoryId: 2, categoryName: '테마파크' },
  { categoryId: 3, categoryName: '워터파크/아쿠아리움' },
  { categoryId: 4, categoryName: '액티비티' },
  { categoryId: 5, categoryName: '뷰티(피부과, 클리닉)' },
  { categoryId: 6, categoryName: '건강(제약, 영양제 등)' },
  { categoryId: 7, categoryName: '쇼핑' },
  { categoryId: 8, categoryName: '생활/편의' },
  { categoryId: 9, categoryName: '베이커리/디저트' },
  { categoryId: 10, categoryName: '음식점' },
  { categoryId: 11, categoryName: '공연/전시' },
  { categoryId: 12, categoryName: '교육' },
  { categoryId: 13, categoryName: '여행/교통' },
];

// 관리자 브랜드 목록 mock 데이터
export const mockAdminBrands = [
  {
    brandId: 1,
    brandName: 'CGV',
    brandImg: '/images/brands/CGV.png',
    categoryId: 2, // 영화/미디어
    usageLimit: '1일 1회',
    usageMethod: '모바일 앱 쿠폰 제시',
    data: [
      { grade: 'VVIP', description: '영화 티켓 100% 할인', benefitType: 'DISCOUNT' },
      { grade: 'VIP', description: '팝콘 무료', benefitType: 'GIFT' },
    ],
  },
  {
    brandId: 2,
    brandName: 'GS25',
    brandImg: '/images/brands/GS25.png',
    categoryId: 9, // 생활/편의
    usageLimit: '1일 2회',
    usageMethod: '바코드 제시',
    data: [
      { grade: 'VIP', description: '1000원 할인', benefitType: 'DISCOUNT' },
    ],
  },
  {
    brandId: 3,
    brandName: '파리바게트',
    brandImg: '/images/brands/파리바게뜨.png',
    categoryId: 10, // 베이커리/디저트
    usageLimit: '월 5회',
    usageMethod: '모바일 쿠폰',
    data: [
      { grade: 'VVIP', description: '10% 할인', benefitType: 'DISCOUNT' },
    ],
  },
  {
    brandId: 4,
    brandName: '굽네치킨',
    brandImg: '/images/brands/굽네치킨.png',
    categoryId: 11, // 음식점
    usageLimit: '주 1회',
    usageMethod: '온라인 주문 시 적용',
    data: [
      { grade: 'VIP', description: '2000원 할인', benefitType: 'DISCOUNT' },
    ],
  },
  {
    brandId: 5,
    brandName: '베스킨라빈스',
    brandImg: '/images/brands/베스킨라빈스.png',
    categoryId: 10, // 베이커리/디저트
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
    categoryId: 3, // 테마파크
    usageLimit: '연 1회',
    usageMethod: '현장 매표소 쿠폰 제시',
    data: [
      { grade: 'VVIP', description: '입장권 50% 할인', benefitType: 'DISCOUNT' },
    ],
  },
];

export const mockAdminStatistics = {
  bookmark: [
    {
      categoryId: 1,
      categoryName: '영화 / 미디어',
      count: 1561,
      details: [
        { brandName: 'CGV', count: 15 },
        { brandName: '롯데시네마', count: 20 },
      ],
    },
    {
      categoryId: 8,
      categoryName: '생활/편의',
      count: 1200,
      details: [
        { brandName: 'GS25', count: 10 },
      ],
    },
  ],
  filtering: [
    {
      categoryId: 1,
      categoryName: '영화 / 미디어',
      count: 1000,
      details: [
        { brandName: 'CGV', count: 8 },
        { brandName: '롯데시네마', count: 12 },
      ],
    },
    {
      categoryId: 8,
      categoryName: '생활/편의',
      count: 900,
      details: [
        { brandName: 'GS25', count: 7 },
      ],
    },
  ],

  recommend: [
    {
      categoryId: 1,
      categoryName: '영화 / 미디어',
      count: 1561,
      details: [
        { brandName: 'CGV', count: 15 },
        { brandName: '롯데시네마', count: 20 },
      ],
    },
    {
      categoryId: 8,
      categoryName: '생활/편의',
      count: 1200,
      details: [
        { brandName: 'GS25', count: 10 },
      ],
    },
  ],
  membership: [
    {
      categoryId: 1,
      categoryName: '영화 / 미디어',
      count: 300,
      details: [
        { brandName: 'CGV', count: 2 },
        { brandName: '롯데시네마', count: 1 },
      ],
    },
    {
      categoryId: 8,
      categoryName: '생활/편의',
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
