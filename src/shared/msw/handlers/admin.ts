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
  
  http.get(ADMIN_ENDPOINTS.BRAND_LIST, ({ request }) => {
    console.log('🔧 MSW GET 브랜드 목록 조회 요청');
    
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '10');
    const category = url.searchParams.get('category');
    const brandName = url.searchParams.get('brand_name');
    
    console.log('🔧 API 파라미터:', { page, size, category, brandName });
    
    let filteredBrands = [...mockAdminBrandListResponse.brandList];
    console.log('🔧 초기 브랜드 수:', filteredBrands.length);
    
    // 카테고리 필터링
    if (category && category !== 'all') {
      const categoryMapping: { [key: string]: number } = {
        '음식점': 9,
        '베이커리/디저트': 10,
        '생활/편의': 7,
        '쇼핑': 8,
        '뷰티(피부과, 클리닉)': 5,
        '건강(제약, 영양제 등)': 6,
        '영화/미디어': 2,
        '여행/교통': 14,
        '교육': 13,
        '공연/전시': 12,
        '액티비티': 4,
        '테마파크': 11,
        '워터파크/아쿠아리움': 3,
        'APP/기기': 1,
      };
      
      const categoryId = categoryMapping[category];
      if (categoryId) {
        filteredBrands = filteredBrands.filter(brand => brand.categoryId === categoryId);
        console.log('🔧 카테고리 필터링 후 브랜드 수:', filteredBrands.length, '카테고리:', category, '카테고리 ID:', categoryId);
      } else {
        console.log('🔧 알 수 없는 카테고리:', category);
      }
    }
    
    // 브랜드명 검색 필터링
    if (brandName) {
      filteredBrands = filteredBrands.filter(brand => 
        brand.brandName.toLowerCase().includes(brandName.toLowerCase())
      );
      console.log('🔧 브랜드명 검색 후 브랜드 수:', filteredBrands.length, '검색어:', brandName);
      console.log('🔧 검색된 브랜드들:', filteredBrands.map(b => b.brandName));
    }
    
    // 페이지네이션 계산
    const totalItems = filteredBrands.length;
    const totalPages = Math.ceil(totalItems / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const currentPageBrands = filteredBrands.slice(startIndex, endIndex);
    
    console.log('🔧 페이지네이션 결과:', {
      totalItems,
      totalPages,
      currentPage: page,
      startIndex,
      endIndex,
      currentPageBrandsCount: currentPageBrands.length,
      hasNext: page < totalPages - 1
    });
    
    const response: AdminBrandListResponse = {
      brandList: currentPageBrands,
      hasNext: page < totalPages - 1,
      totalPages,
      currentPage: page,
    };
    
    return createResponse(response, '브랜드 목록 조회 성공');
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
