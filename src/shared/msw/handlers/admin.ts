import { ADMIN_ENDPOINTS } from '@/features/admin/api/endpoints';
import {
  mockBookmarkStats,
  mockFilteringStats,
  mockSearchStats,
  mockRecommendStats,
  mockMembershipStats,
  mockTotalStats,
  mockAdminCategories,
  mockAdminBrands,
  mockAdminStatistics,
} from '@/features/admin/api/mockData';
import { createResponse } from '@/shared/utils/createResponse';
import { http, HttpResponse } from 'msw';
import type { AdminBrand } from '@/features/admin/api/types';

// 브랜드 관리용 mock 배열 (메모리 내 조작)
const adminBrands = [...mockAdminBrands];

export const adminHandlers = [
  // 즐겨찾기 통계
  http.get(ADMIN_ENDPOINTS.STAT_BOOKMARK, () => {
    return createResponse(mockBookmarkStats, '즐겨찾기 통계 조회 성공');
  }),
  // 필터링 통계
  http.get(ADMIN_ENDPOINTS.STAT_FILTERING, () => {
    return createResponse(mockFilteringStats, '필터링 통계 조회 성공');
  }),
  // 검색 통계
  http.get(ADMIN_ENDPOINTS.STAT_SEARCH, () => {
    return createResponse(mockSearchStats, '검색 통계 조회 성공');
  }),
  // 추천 통계
  http.get(ADMIN_ENDPOINTS.STAT_RECOMMEND, () => {
    return createResponse(mockRecommendStats, '추천 통계 조회 성공');
  }),
  // 멤버십 통계
  http.get(ADMIN_ENDPOINTS.STAT_MEMBERSHIP, () => {
    return createResponse(mockMembershipStats, '멤버십 통계 조회 성공');
  }),
  // 토탈 통계
  http.get(ADMIN_ENDPOINTS.STAT_TOTAL, () => {
    return createResponse(mockTotalStats, '토탈 통계 조회 성공');
  }),
  // 카테고리 목록 조회
  http.get(ADMIN_ENDPOINTS.CATEGORY_LIST, () => {
    return createResponse(mockAdminCategories, '카테고리 목록 조회 성공');
  }),
  // 브랜드 목록 조회
  http.get(ADMIN_ENDPOINTS.BRAND_LIST, () => {
    return HttpResponse.json({
      code: 0,
      status: 200,
      message: '브랜드 목록 조회 성공',
      result: adminBrands,
    });
  }),

  // 브랜드 추가
  http.post(ADMIN_ENDPOINTS.BRAND_CREATE, async ({ request }) => {
    const body = (await request.json()) as Omit<AdminBrand, 'brandId'>;
    // id auto-increment
    const newId = adminBrands.length ? Math.max(...adminBrands.map(b => b.brandId)) + 1 : 1;
    const newBrand: AdminBrand = { ...body, brandId: newId };
    adminBrands.push(newBrand);
    return HttpResponse.json({
      code: 0,
      status: 200,
      message: '브랜드 추가 성공',
      result: newBrand,
    });
  }),

  // 브랜드 수정
  http.put('/admin/brands/:brandId', async ({ params, request }) => {
    const { brandId } = params;
    const idx = adminBrands.findIndex(b => b.brandId === Number(brandId));
    if (idx === -1) {
      return HttpResponse.json({
        code: 404,
        status: 404,
        message: '존재하지 않는 브랜드입니다.',
        result: null,
      }, { status: 404 });
    }
    const body = (await request.json()) as Partial<AdminBrand>;
    adminBrands[idx] = { ...adminBrands[idx], ...body };
    return HttpResponse.json({
      code: 0,
      status: 200,
      message: '브랜드 수정 성공',
      result: adminBrands[idx],
    });
  }),

  // 브랜드 삭제
  http.delete('/admin/brands/:brandId', ({ params }) => {
    const { brandId } = params;
    const idx = adminBrands.findIndex(b => b.brandId === Number(brandId));
    if (idx === -1) {
      return HttpResponse.json({
        code: 404,
        status: 404,
        message: '존재하지 않는 브랜드입니다.',
        result: null,
      }, { status: 404 });
    }
    adminBrands.splice(idx, 1);
    return HttpResponse.json({
      code: 0,
      status: 200,
      message: '브랜드 삭제 성공',
      result: { brandId: Number(brandId) },
    });
  }),

  // 통계 전체 조회
  http.get('/admin/status', () => {
    return createResponse(mockAdminStatistics, '통계 전체 조회 성공');
  }),
];
