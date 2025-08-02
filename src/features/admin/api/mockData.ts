import type {
  TotalStats,
  BookmarkStat,
  FilteringStat,
  RecommendStat,
  MembershipStat,
  AdminBrandListResponse,
} from './types';

// 전체 통계 목 데이터
export const mockTotalStats: TotalStats = {
  totalBookmark: 156,
  totalFiltering: 89,
  totalMembershipUsage: 234,
};

// 즐겨찾기 통계 목 데이터
export const mockBookmarkStats: BookmarkStat[] = [
  {
    categoryId: 2,
    categoryName: '영화/미디어',
    sumStatisticsBookmarksByCategory: 45,
    bookmarksByBrandList: [
      { brandName: 'CGV', sumBookmarksByBrand: 25 },
      { brandName: '메가박스', sumBookmarksByBrand: 15 },
      { brandName: '롯데시네마', sumBookmarksByBrand: 5 },
    ],
  },
  {
    categoryId: 3,
    categoryName: '워터파크/아쿠아리움',
    sumStatisticsBookmarksByCategory: 28,
    bookmarksByBrandList: [
      { brandName: '롯데월드 아쿠아리움', sumBookmarksByBrand: 18 },
      { brandName: '에버랜드', sumBookmarksByBrand: 10 },
    ],
  },
  {
    categoryId: 4,
    categoryName: '액티비티',
    sumStatisticsBookmarksByCategory: 32,
    bookmarksByBrandList: [
      { brandName: '클라이밍존', sumBookmarksByBrand: 20 },
      { brandName: '서핑존', sumBookmarksByBrand: 12 },
    ],
  },
  {
    categoryId: 5,
    categoryName: '뷰티(피부과, 클리닉)',
    sumStatisticsBookmarksByCategory: 39,
    bookmarksByBrandList: [
      { brandName: '아름다운 피부과', sumBookmarksByBrand: 25 },
      { brandName: '청담동 클리닉', sumBookmarksByBrand: 14 },
    ],
  },
];

// 필터링 통계 목 데이터
export const mockFilteringStats: FilteringStat[] = [
  {
    categoryId: 6,
    categoryName: '건강(제약, 영양제 등)',
    sumStatisticsFilterByCategory: 18,
  },
  {
    categoryId: 7,
    categoryName: '생활/편의',
    sumStatisticsFilterByCategory: 42,
  },
  {
    categoryId: 8,
    categoryName: '쇼핑',
    sumStatisticsFilterByCategory: 35,
  },
  {
    categoryId: 9,
    categoryName: '음식점',
    sumStatisticsFilterByCategory: 58,
  },
  {
    categoryId: 10,
    categoryName: '베이커리/디저트',
    sumStatisticsFilterByCategory: 25,
  },
];

// 추천 통계 목 데이터
export const mockRecommendStats: RecommendStat[] = [
  {
    categoryId: 6,
    categoryName: '건강(제약, 영양제 등)',
    sumStatisticsRecommendationByCategory: 18,
    recommendationsByBrandList: [
      { brandName: '건강약국', sumRecommendationsByBrand: 12 },
      { brandName: '영양제샵', sumRecommendationsByBrand: 6 },
    ],
  },
  {
    categoryId: 7,
    categoryName: '생활/편의',
    sumStatisticsRecommendationByCategory: 42,
    recommendationsByBrandList: [
      { brandName: 'GS25', sumRecommendationsByBrand: 25 },
      { brandName: 'CU', sumRecommendationsByBrand: 17 },
    ],
  },
  {
    categoryId: 8,
    categoryName: '쇼핑',
    sumStatisticsRecommendationByCategory: 35,
    recommendationsByBrandList: [
      { brandName: '올리브영', sumRecommendationsByBrand: 20 },
      { brandName: '다이소', sumRecommendationsByBrand: 15 },
    ],
  },
  {
    categoryId: 9,
    categoryName: '음식점',
    sumStatisticsRecommendationByCategory: 58,
    recommendationsByBrandList: [
      { brandName: '맥도날드', sumRecommendationsByBrand: 30 },
      { brandName: '버거킹', sumRecommendationsByBrand: 18 },
      { brandName: 'KFC', sumRecommendationsByBrand: 10 },
    ],
  },
  {
    categoryId: 10,
    categoryName: '베이커리/디저트',
    sumStatisticsRecommendationByCategory: 25,
    recommendationsByBrandList: [
      { brandName: '파리크라상', sumRecommendationsByBrand: 15 },
      { brandName: '파리바게트', sumRecommendationsByBrand: 10 },
    ],
  },
];

// 멤버십 통계 목 데이터
export const mockMembershipStats: MembershipStat[] = [
  {
    categoryId: 11,
    categoryName: '테마파크',
    sumStatisticsMembershipUsageByCategory: 67,
    membershipUsageByBrandList: [
      { brandName: '롯데월드', sumMembershipUsageByBrand: 40 },
      { brandName: '에버랜드', sumMembershipUsageByBrand: 27 },
    ],
  },
  {
    categoryId: 12,
    categoryName: '공연/전시',
    sumStatisticsMembershipUsageByCategory: 23,
    membershipUsageByBrandList: [
      { brandName: '예술의전당', sumMembershipUsageByBrand: 15 },
      { brandName: '세종문화회관', sumMembershipUsageByBrand: 8 },
    ],
  },
  {
    categoryId: 14,
    categoryName: '여행/교통',
    sumStatisticsMembershipUsageByCategory: 44,
    membershipUsageByBrandList: [
      { brandName: '카카오T', sumMembershipUsageByBrand: 28 },
      { brandName: '우버', sumMembershipUsageByBrand: 16 },
    ],
  },
];

// 브랜드 목록 목 데이터
export const mockAdminBrandListResponse: AdminBrandListResponse = {
  data: [
    {
      brandId: 1,
      brandName: '파리크라상',
      brandImg: '/images/brands/paris-croissant.png',
      data: [
        { grade: 'VIP', description: '1천원당 100원 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '1천원당 50원 할인', benefitType: 'DISCOUNT' },
        { grade: 'VVIP', description: '1천원당 100원 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 10,
      usageLimit: '일 1회',
      usageMethod: '결제 시 직원에게 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 2,
      brandName: '롯데월드 아이스링크',
      brandImg: '/images/brands/lotte-world-ice.png',
      data: [
        { grade: 'VVIP', description: '입장권 50% 할인 (동반 1인 포함)', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '입장권 50% 할인 (동반 1인 포함)', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '입장권 50% 할인 (동반 1인 포함)', benefitType: 'DISCOUNT' },
      ],
      categoryId: 11,
      usageLimit: '일 1회',
      usageMethod: '결제 시 직원에게 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 3,
      brandName: 'CGV',
      brandImg: '/images/brands/cgv.png',
      data: [
        { grade: 'VVIP', description: '영화표 30% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '영화표 20% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '영화표 10% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 2,
      usageLimit: '월 2회',
      usageMethod: '예매 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 4,
      brandName: '메가박스',
      brandImg: '/images/brands/megabox.png',
      data: [
        { grade: 'VVIP', description: '영화표 25% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '영화표 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '영화표 5% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 2,
      usageLimit: '월 2회',
      usageMethod: '예매 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 5,
      brandName: '올리브영',
      brandImg: '/images/brands/oliveyoung.png',
      data: [
        { grade: 'VVIP', description: '전품목 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '전품목 10% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '전품목 5% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 8,
      usageLimit: '일 1회',
      usageMethod: '결제 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 6,
      brandName: 'GS25',
      brandImg: '/images/brands/gs25.png',
      data: [
        { grade: 'VVIP', description: '전품목 10% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '전품목 7% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '전품목 3% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 7,
      usageLimit: '일 2회',
      usageMethod: '결제 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 7,
      brandName: '맥도날드',
      brandImg: '/images/brands/mcdonalds.png',
      data: [
        { grade: 'VVIP', description: '세트메뉴 20% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '세트메뉴 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '세트메뉴 10% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 9,
      usageLimit: '일 1회',
      usageMethod: '주문 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 8,
      brandName: '버거킹',
      brandImg: '/images/brands/burgerking.png',
      data: [
        { grade: 'VVIP', description: '세트메뉴 18% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '세트메뉴 13% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '세트메뉴 8% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 9,
      usageLimit: '일 1회',
      usageMethod: '주문 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 9,
      brandName: '다이소',
      brandImg: '/images/brands/daiso.png',
      data: [
        { grade: 'VVIP', description: '전품목 12% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '전품목 8% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '전품목 4% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 8,
      usageLimit: '일 1회',
      usageMethod: '결제 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 10,
      brandName: 'CU',
      brandImg: '/images/brands/cu.png',
      data: [
        { grade: 'VVIP', description: '전품목 8% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '전품목 5% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '전품목 2% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 7,
      usageLimit: '일 2회',
      usageMethod: '결제 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 11,
      brandName: 'KFC',
      brandImg: '/images/brands/kfc.png',
      data: [
        { grade: 'VVIP', description: '세트메뉴 22% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '세트메뉴 17% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '세트메뉴 12% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 9,
      usageLimit: '일 1회',
      usageMethod: '주문 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 12,
      brandName: '파리바게트',
      brandImg: '/images/brands/paris-baguette.png',
      data: [
        { grade: 'VVIP', description: '전품목 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '전품목 10% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '전품목 5% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 10,
      usageLimit: '일 1회',
      usageMethod: '결제 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 13,
      brandName: '롯데월드',
      brandImg: '/images/brands/lotte-world.png',
      data: [
        { grade: 'VVIP', description: '입장권 60% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '입장권 40% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '입장권 20% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 11,
      usageLimit: '월 1회',
      usageMethod: '입장 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 14,
      brandName: '에버랜드',
      brandImg: '/images/brands/everland.png',
      data: [
        { grade: 'VVIP', description: '입장권 55% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '입장권 35% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '입장권 15% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 11,
      usageLimit: '월 1회',
      usageMethod: '입장 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 15,
      brandName: '예술의전당',
      brandImg: '/images/brands/arts-center.png',
      data: [
        { grade: 'VVIP', description: '공연티켓 30% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '공연티켓 20% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '공연티켓 10% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 12,
      usageLimit: '월 2회',
      usageMethod: '예매 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 16,
      brandName: '카카오T',
      brandImg: '/images/brands/kakao-t.png',
      data: [
        { grade: 'VVIP', description: '택시요금 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '택시요금 10% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '택시요금 5% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 14,
      usageLimit: '일 3회',
      usageMethod: '결제 시 자동 적용',
      storeType: 'ONLINE',
    },
    {
      brandId: 17,
      brandName: '우버',
      brandImg: '/images/brands/uber.png',
      data: [
        { grade: 'VVIP', description: '이동요금 12% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '이동요금 8% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '이동요금 4% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 14,
      usageLimit: '일 3회',
      usageMethod: '결제 시 자동 적용',
      storeType: 'ONLINE',
    },
    {
      brandId: 18,
      brandName: '학원A',
      brandImg: '/images/brands/academy-a.png',
      data: [
        { grade: 'VVIP', description: '수강료 20% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '수강료 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '수강료 10% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 13,
      usageLimit: '월 1회',
      usageMethod: '등록 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 19,
      brandName: '학원B',
      brandImg: '/images/brands/academy-b.png',
      data: [
        { grade: 'VVIP', description: '수강료 18% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '수강료 13% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '수강료 8% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 13,
      usageLimit: '월 1회',
      usageMethod: '등록 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 20,
      brandName: '삼성전자',
      brandImg: '/images/brands/samsung.png',
      data: [
        { grade: 'VVIP', description: '제품 25% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '제품 15% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '제품 5% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 1,
      usageLimit: '연 2회',
      usageMethod: '구매 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
    {
      brandId: 21,
      brandName: '애플',
      brandImg: '/images/brands/apple.png',
      data: [
        { grade: 'VVIP', description: '제품 20% 할인', benefitType: 'DISCOUNT' },
        { grade: 'VIP', description: '제품 10% 할인', benefitType: 'DISCOUNT' },
        { grade: 'GOOD', description: '제품 3% 할인', benefitType: 'DISCOUNT' },
      ],
      categoryId: 1,
      usageLimit: '연 2회',
      usageMethod: '구매 시 멤버십 카드 제시',
      storeType: 'OFFLINE',
    },
  ],
  hasNext: false,
  totalPages: 1,
  currentPage: 0,
};
