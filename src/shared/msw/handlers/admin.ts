import { ADMIN_ENDPOINTS } from '@admin/api/endpoints';
import {
    mockAdminBrands,
    mockAdminCategories,
    mockBookmarkStats,
    mockFilteringStats,
    mockMembershipStats,
    mockRecommendStats,

    mockTotalStats,
} from '@admin/api/mockData';
import type { AdminBrand } from '@admin/api/types';
import type { CreateBrandRequest, UpdateBrandRequest } from '@admin/api/types';
import { http, HttpResponse } from 'msw';

const createResponse = <T>(data: T, message: string) =>
  HttpResponse.json({
    statusCode: 0,
    message,
    data,
  });

// 마이페이지와 동일한 패턴: import된 mock 데이터를 직접 변경
// 이렇게 하면 실제 서버 연결 시 자동으로 무시됨

export const adminHandlers = [
  http.get(ADMIN_ENDPOINTS.STAT_BOOKMARK, () => {
    return createResponse(mockBookmarkStats, '즐겨찾기 통계 조회 성공');
  }),
  http.get(ADMIN_ENDPOINTS.STAT_FILTERING, () => {
    return createResponse(mockFilteringStats, '필터링 수 통계 조회 성공');
  }),

  http.get(ADMIN_ENDPOINTS.STAT_RECOMMEND, () => {
    return createResponse(mockRecommendStats, '추천 분포 통계 조회 성공');
  }),
  http.get(ADMIN_ENDPOINTS.STAT_MEMBERSHIP, () => {
    return createResponse(mockMembershipStats, '멤버십 통계 조회 성공');
  }),
  http.get(ADMIN_ENDPOINTS.STAT_TOTAL, () => {
    return createResponse(mockTotalStats, '토탈 통계 조회 성공');
  }),
  http.get(ADMIN_ENDPOINTS.CATEGORY_LIST, () => {
    return createResponse(mockAdminCategories, '카테고리 목록 조회 성공');
  }),
  
  http.get(ADMIN_ENDPOINTS.BRAND_LIST, ({ request }) => {
    console.log('🔧 MSW GET 브랜드 목록 조회 요청');
    const url = new URL(request.url);
    const category = url.searchParams.get('category') || 'all';
    const brand_name = url.searchParams.get('brand_name') || '';
    console.log('🔧 검색 파라미터 - category:', category, 'brand_name:', brand_name);
    
    let filteredBrands = [...mockAdminBrands];
    console.log('🔧 전체 브랜드 수:', mockAdminBrands.length);
    
    // 카테고리 필터링
    if (category !== 'all') {
      filteredBrands = filteredBrands.filter(brand => brand.categoryId === parseInt(category));
    }
    
    // 브랜드명 검색
    if (brand_name) {
      filteredBrands = filteredBrands.filter(brand => 
        brand.brandName.toLowerCase().includes(brand_name.toLowerCase())
      );
    }
  
    const brandListItems = filteredBrands.map(brand => ({
      brandId: brand.brandId,
      brandName: brand.brandName,
      logoImage: brand.logoImage,
      description: brand.description
    }));
    
    console.log('🔧 필터링된 브랜드 수:', brandListItems.length);
    
    const response = {
      brandList: brandListItems,
      hasNext: false,
      totalPages: 1,
      currentPage: 0
    };
    return createResponse(response, '브랜드 목록 조회 성공');
  }),
  http.get('/brand-list/:brandId', ({ params }) => {
    const { brandId } = params;
    const brand = mockAdminBrands.find(b => b.brandId === Number(brandId));
    if (!brand) {
      return HttpResponse.json({
        statusCode: 404,
        message: '존재하지 않는 브랜드입니다.',
        data: null,
      }, { status: 404 });
    }

    const brandDetail = {
      brandId: brand.brandId,
      brandName: brand.brandName,
      logoImage: brand.logoImage,
      usageMethod: brand.usageMethod,
      usageLimit: brand.usageLimit,
      benefitRes: brand.data.map(benefit => ({
        grade: benefit.grade,
        description: benefit.description
        // benefitType 제외
      }))
    };
    
    return createResponse(brandDetail, '브랜드 상세 조회 성공');
  }),
  
  http.post(ADMIN_ENDPOINTS.BRAND_CREATE, async ({ request }) => {
    console.log('🔧 MSW POST 브랜드 추가 요청');
    const body = (await request.json()) as CreateBrandRequest;
    console.log('🔧 추가 요청 데이터:', body);
    
    const newId = mockAdminBrands.length ? Math.max(...mockAdminBrands.map(b => b.brandId)) + 1 : 1;
    console.log('🔧 새 브랜드 ID:', newId);
    
    const { brandImg, ...otherData } = body;
    
    const description = body.data.map(benefit => 
      `${benefit.grade} : ${benefit.description}`
    ).join(', ');
    
    const newBrand: AdminBrand = { 
      ...otherData,
      brandId: newId,
      logoImage: brandImg,
      description,
      storeType: body.storeType || 'OFFLINE'
    };
    
    mockAdminBrands.push(newBrand);
    console.log('✅ 브랜드 추가 완료:', newBrand.brandName, '전체 브랜드 수:', mockAdminBrands.length);
    
    return createResponse({ brandId: newId }, '브랜드 추가 성공');
  }),

  http.put('/admin/brands/:brandId', async ({ params, request }) => {
    console.log('🔧 MSW PUT 브랜드 수정 요청:', params);
    const { brandId } = params;
    const idx = mockAdminBrands.findIndex(b => b.brandId === Number(brandId));
    console.log('🔧 수정할 브랜드 인덱스:', idx, '전체 브랜드 수:', mockAdminBrands.length);
    
    if (idx === -1) {
      console.log('❌ 브랜드를 찾을 수 없음:', brandId);
      return HttpResponse.json({
        statusCode: 404,
        message: '존재하지 않는 브랜드입니다.',
        data: null,
      }, { status: 404 });
    }
    
    const body = (await request.json()) as UpdateBrandRequest;
    console.log('🔧 수정 요청 데이터:', body);
    
    // brandImg가 있으면 logoImage로 매핑하고 description 자동 생성
    const { brandImg, ...otherData } = body;
    
    const description = body.data ? body.data.map(benefit => 
      `${benefit.grade} : ${benefit.description}`
    ).join(', ') : mockAdminBrands[idx].description;
    
    const updateData = {
      ...otherData,
      ...(brandImg && { logoImage: brandImg }),
      description,
      storeType: body.storeType || mockAdminBrands[idx].storeType
    };
    
    Object.assign(mockAdminBrands[idx], updateData);
    
    console.log('✅ 브랜드 수정 완료:', mockAdminBrands[idx]);
    return createResponse({ brandId: Number(brandId) }, '브랜드 수정 성공');
  }),
 
  http.delete('/admin/brands/:brandId', ({ params }) => {
    console.log('🔧 MSW DELETE 브랜드 삭제 요청:', params);
    const { brandId } = params;
    const idx = mockAdminBrands.findIndex(b => b.brandId === Number(brandId));
    console.log('🔧 삭제할 브랜드 인덱스:', idx, '전체 브랜드 수:', mockAdminBrands.length);
    
    if (idx === -1) {
      console.log('❌ 삭제할 브랜드를 찾을 수 없음:', brandId);
      return HttpResponse.json({
        statusCode: 404,
        message: '존재하지 않는 브랜드입니다.',
        data: null,
      }, { status: 404 });
    }
    
    const deletedBrand = mockAdminBrands[idx];
    mockAdminBrands.splice(idx, 1);
    console.log('✅ 브랜드 삭제 완료:', deletedBrand.brandName, '남은 브랜드 수:', mockAdminBrands.length);
    
    return createResponse({ brandId: Number(brandId) }, '브랜드 삭제 성공');
  }),
];
