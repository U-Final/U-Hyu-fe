import { ADMIN_ENDPOINTS } from '@admin/api/endpoints';
import {
  mockAdminBrandListResponse,
  mockBookmarkStats,
  mockFilteringStats,
  mockMembershipStats,
  mockRecommendStats,
  mockTotalStats,
} from '@admin/api/mockData';
import type { AdminBrandListResponse } from '@admin/api/types';
import { HttpResponse, http } from 'msw';

const createResponse = <T>(data: T, message: string) =>
  HttpResponse.json({
    statusCode: 0,
    message,
    data,
  });

const createErrorResponse = (message: string, statusCode: number = 400) =>
  HttpResponse.json(
    {
      statusCode,
      message,
      data: null,
    },
    { status: statusCode }
  );

export const adminHandlers = [
  // 통계
  http.get(ADMIN_ENDPOINTS.TOTAL_STATS, () => {
    return createResponse(mockTotalStats, '전체 통계 조회 성공');
  }),

  http.get(ADMIN_ENDPOINTS.BOOKMARK_STATS, () => {
    return createResponse(mockBookmarkStats, '즐겨찾기 통계 조회 성공');
  }),

  http.get(ADMIN_ENDPOINTS.FILTERING_STATS, () => {
    return createResponse(mockFilteringStats, '필터링 통계 조회 성공');
  }),

  http.get(ADMIN_ENDPOINTS.RECOMMEND_STATS, () => {
    return createResponse(mockRecommendStats, '추천 통계 조회 성공');
  }),

  http.get(ADMIN_ENDPOINTS.MEMBERSHIP_STATS, () => {
    return createResponse(mockMembershipStats, '멤버십 통계 조회 성공');
  }),

  // 브랜드 목록 (페이지네이션 + 필터/검색)
  http.get(ADMIN_ENDPOINTS.BRAND_LIST, ({ request }) => {
    if (import.meta.env.MODE === 'development') {
      console.log('🔧 MSW GET 브랜드 목록 조회 요청');
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '10');
    const category = url.searchParams.get('category');
    const brandName = url.searchParams.get('brand_name');

    if (import.meta.env.MODE === 'development') {
      console.log('🔧 API 파라미터:', { page, size, category, brandName });
    }

    let filteredBrands = [...mockAdminBrandListResponse.brandList];

    // 카테고리 필터링 (문자 → ID 매핑)
    if (category && category !== 'all') {
      const categoryMapping: Record<string, number> = {
        음식점: 9,
        '베이커리/디저트': 10,
        '생활/편의': 7,
        쇼핑: 8,
        '뷰티(피부과, 클리닉)': 5,
        '건강(제약, 영양제 등)': 6,
        '영화/미디어': 2,
        '여행/교통': 14,
        교육: 13,
        '공연/전시': 12,
        액티비티: 4,
        테마파크: 11,
        '워터파크/아쿠아리움': 3,
        'APP/기기': 1,
      };

      const categoryId = categoryMapping[category];
      if (categoryId) {
        filteredBrands = filteredBrands.filter(
          b => b.categoryId === categoryId
        );
        if (import.meta.env.MODE === 'development') {
          console.log(
            '🔧 카테고리 필터링:',
            category,
            '→',
            categoryId,
            '결과:',
            filteredBrands.length
          );
        }
      } else if (import.meta.env.MODE === 'development') {
        console.log('🔧 알 수 없는 카테고리:', category);
      }
    }

    // 브랜드명 부분 검색
    if (brandName) {
      const kw = brandName.toLowerCase();
      filteredBrands = filteredBrands.filter(b =>
        b.brandName.toLowerCase().includes(kw)
      );
      if (import.meta.env.MODE === 'development') {
        console.log(
          '🔧 브랜드명 검색:',
          brandName,
          '결과:',
          filteredBrands.length
        );
      }
    }

    // 페이지네이션
    const totalItems = filteredBrands.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, size)));
    const currentPage = Math.max(0, Math.min(page, totalPages - 1));
    const startIndex = currentPage * size;
    const endIndex = startIndex + size;
    const currentPageBrands = filteredBrands.slice(startIndex, endIndex);

    const response: AdminBrandListResponse = {
      brandList: currentPageBrands,
      hasNext: currentPage < totalPages - 1,
      totalPages,
      currentPage,
    };

    if (import.meta.env.MODE === 'development') {
      console.log('🔧 페이지네이션:', {
        totalItems,
        totalPages,
        currentPage,
        startIndex,
        endIndex,
        currentPageBrandsCount: currentPageBrands.length,
        hasNext: response.hasNext,
      });
    }

    return createResponse(response, '브랜드 목록 조회 성공');
  }),

  // 브랜드 생성 (중복명 검증)
  http.post(ADMIN_ENDPOINTS.BRAND_CREATE, async ({ request }) => {
    if (import.meta.env.MODE === 'development') {
      console.log('🔧 MSW POST 브랜드 생성 요청');
    }

    type CreateBody = {
      brandName: string;
      brandImg: string;
      categoryId: number;
      usageLimit: string;
      usageMethod: string;
      storeType: string;
      data: Array<{ grade: string; description: string; benefitType: string }>;
    };

    const body = (await request.json()) as CreateBody;

    // 중복 브랜드명 검증
    const existing = mockAdminBrandListResponse.brandList.find(
      b => b.brandName === body.brandName
    );
    if (existing) {
      return createErrorResponse('이미 존재하는 브랜드명입니다', 400);
    }

    return createResponse({ brandId: 999 }, '브랜드 생성 성공');
  }),

  // 브랜드 수정 (자기 자신 제외 중복명 검증)
  http.put('/admin/brands/:brandId', async ({ params, request }) => {
    const { brandId } = params;
    if (import.meta.env.MODE === 'development') {
      console.log('🔧 MSW PUT 브랜드 수정 요청 - brandId:', brandId);
    }

    type UpdateBody = {
      brandName: string;
      brandImg: string;
      categoryId: number;
      usageLimit: string;
      usageMethod: string;
      storeType: string;
      data: Array<{ grade: string; description: string; benefitType: string }>;
    };

    const body = (await request.json()) as UpdateBody;
    const currentBrandId = Number(brandId);

    const duplicated = mockAdminBrandListResponse.brandList.find(
      b => b.brandName === body.brandName && b.brandId !== currentBrandId
    );
    if (duplicated) {
      return createErrorResponse('이미 존재하는 브랜드명입니다', 400);
    }

    return createResponse({ brandId: currentBrandId }, '브랜드 수정 성공');
  }),

  // 브랜드 삭제 (존재 여부 검증)
  http.delete('/admin/brands/:brandId', ({ params }) => {
    const { brandId } = params;
    const currentBrandId = Number(brandId);

    if (import.meta.env.MODE === 'development') {
      console.log('🔧 MSW DELETE 브랜드 삭제 요청 - brandId:', brandId);
    }

    const existing = mockAdminBrandListResponse.brandList.find(
      b => b.brandId === currentBrandId
    );
    if (!existing) {
      return createErrorResponse('존재하지 않는 브랜드입니다', 404);
    }

    return createResponse('브랜드가 삭제되었습니다.', '브랜드 삭제 성공');
  }),
];
