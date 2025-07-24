import {
  mockBookmarkStats,
  mockFilteringStats,
  mockSearchStats,
  mockRecommendStats,
  mockMembershipStats,
  mockTotalStats,
  mockAdminCategories,
  mockAdminBrands,
} from '@/features/admin/api/mockData';
import { http, HttpResponse } from 'msw';
import type { AdminBrand } from '@/features/admin/api/types';

// 공통 응답 포맷 유틸 (data 필드 사용)
const createResponse = <T>(data: T, message: string) =>
  HttpResponse.json({
    code: 0,
    status: 200,
    message,
    data,
  });

const adminBrands = [...mockAdminBrands];

export const adminHandlers = [
  // 즐겨찾기 통계
  http.get('/admin/statistics/bookmark', () => {
    return createResponse(mockBookmarkStats, '즐겨찾기 통계 조회 성공');
  }),
  // 필터링 수 통계
  http.get('/admin/statistics/filter', () => {
    return createResponse(mockFilteringStats, '필터링 수 통계 조회 성공');
  }),
  // 검색 수 통계
  http.get('/admin/statistics/searching', () => {
    return createResponse(mockSearchStats, '검색 수 통계 조회 성공');
  }),
  // 추천 분포 통계
  http.get('/admin/statistics/recommendation', () => {
    return createResponse(mockRecommendStats, '추천 분포 통계 조회 성공');
  }),
  // 멤버십 통계
  http.get('/admin/statistics/membership', () => {
    return createResponse(mockMembershipStats, '멤버십 통계 조회 성공');
  }),
  // 토탈 통계
  http.get('/admin/statistics/total', () => {
    return createResponse(mockTotalStats, '토탈 통계 조회 성공');
  }),
  // 카테고리 목록 조회
  http.get('/admin/category/list', () => {
    return createResponse(mockAdminCategories, '카테고리 목록 조회 성공');
  }),
  // 브랜드 목록 조회
  http.get('/admin/brand/list', () => {
    return createResponse(adminBrands, '브랜드 목록 조회 성공');
  }),
  // 브랜드 추가
  http.post('/admin/brand', async ({ request }) => {
    const body = (await request.json()) as Omit<AdminBrand, 'brandId'>;
    const newId = adminBrands.length ? Math.max(...adminBrands.map(b => b.brandId)) + 1 : 1;
    const newBrand: AdminBrand = { ...body, brandId: newId };
    adminBrands.push(newBrand);
    return createResponse(newBrand, '브랜드 추가 성공');
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
        data: null,
      }, { status: 404 });
    }
    const body = (await request.json()) as Partial<AdminBrand>;
    adminBrands[idx] = { ...adminBrands[idx], ...body };
    return createResponse(adminBrands[idx], '브랜드 수정 성공');
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
        data: null,
      }, { status: 404 });
    }
    adminBrands.splice(idx, 1);
    return createResponse({ brandId: Number(brandId) }, '브랜드 삭제 성공');
  }),
];
