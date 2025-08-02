import { ADMIN_ENDPOINTS } from '@admin/api/endpoints';
import {
    mockAdminBrandListResponse,
    mockBookmarkStats,
    mockFilteringStats,
    mockMembershipStats,
    mockRecommendStats,
    mockTotalStats,
} from '@admin/api/mockData';

import { http, HttpResponse } from 'msw';

const createResponse = <T>(data: T, message: string) =>
  HttpResponse.json({
    statusCode: 0,
    message,
    data,
  });

export const adminHandlers = [
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
  
  http.get(ADMIN_ENDPOINTS.BRAND_LIST, () => {
    console.log('🔧 MSW GET 브랜드 목록 조회 요청');
    return createResponse(mockAdminBrandListResponse, '브랜드 목록 조회 성공');
  }),
  
  http.post(ADMIN_ENDPOINTS.BRAND_CREATE, async ({ request }) => {
    console.log('🔧 MSW POST 브랜드 생성 요청');
    const body = await request.json();
    console.log('🔧 생성할 브랜드 데이터:', body);
    
    return createResponse({ brandId: 999 }, '브랜드 생성 성공');
  }),
  
  http.put('/admin/brands/:brandId', async ({ params, request }) => {
    const { brandId } = params;
    console.log('🔧 MSW PUT 브랜드 수정 요청 - brandId:', brandId);
    const body = await request.json();
    console.log('🔧 수정할 브랜드 데이터:', body);
    
    return createResponse({ brandId: Number(brandId) }, '브랜드 수정 성공');
  }),
  
  http.delete('/admin/brands/:brandId', ({ params }) => {
    const { brandId } = params;
    console.log('🔧 MSW DELETE 브랜드 삭제 요청 - brandId:', brandId);
    
    return createResponse('브랜드가 삭제되었습니다.', '브랜드 삭제 성공');
  }),
];
