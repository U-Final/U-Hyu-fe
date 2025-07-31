import { ADMIN_ENDPOINTS } from './endpoints';
import type { 
  BookmarkStat,
  FilteringStat,
  MembershipStat,
  BrandListResponse,
  BrandListItem,
  BrandDetail,
  TotalStat, 
  RecommendStat,
  Category,
  CreateBrandRequest,
  UpdateBrandRequest
} from './types';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

// 통계 관련 API
export const getAdminBookmarkStats = async (): Promise<BookmarkStat[]> => {
  const res = await client.get<ApiResponse<BookmarkStat[]>>(ADMIN_ENDPOINTS.STAT_BOOKMARK);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const getAdminFilteringStats = async (): Promise<FilteringStat[]> => {
  const res = await client.get<ApiResponse<FilteringStat[]>>(ADMIN_ENDPOINTS.STAT_FILTERING);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const getAdminRecommendStats = async (): Promise<RecommendStat[]> => {
  const res = await client.get<ApiResponse<RecommendStat[]>>(ADMIN_ENDPOINTS.STAT_RECOMMEND);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const getAdminMembershipStats = async (): Promise<MembershipStat[]> => {
  const res = await client.get<ApiResponse<MembershipStat[]>>(ADMIN_ENDPOINTS.STAT_MEMBERSHIP);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const getAdminTotalStats = async (): Promise<TotalStat> => {
  const res = await client.get<ApiResponse<TotalStat>>(ADMIN_ENDPOINTS.STAT_TOTAL);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

// 카테고리 관련 API
export const getAdminCategories = async (): Promise<Category[]> => {
  const res = await client.get<ApiResponse<Category[]>>(ADMIN_ENDPOINTS.CATEGORY_LIST);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

// 브랜드 관련 API
// 제휴처 목록 조회
export const getBrandList = async (params?: {
  category?: string;
  sortType?: string;
  benefitType?: string;
  brand_name?: string;
}): Promise<BrandListItem[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append('category', params.category);
    if (params?.sortType) queryParams.append('sortType', params.sortType);
    if (params?.benefitType) queryParams.append('benefitType', params.benefitType);
    if (params?.brand_name) queryParams.append('brand_name', params.brand_name);

    const url = `${ADMIN_ENDPOINTS.BRAND_LIST}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('getBrandList 요청 URL:', url);
    
    const res = await client.get<ApiResponse<BrandListResponse>>(url);
    console.log('getBrandList 응답:', res.data);

    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }

    return res.data.data.brandList;
  } catch (error) {
    console.error('getBrandList 에러:', error);
    throw error;
  }
};

// 제휴처 상세 조회
export const getBrandDetail = async (brandId: number): Promise<BrandDetail> => {
  try {
    const url = ADMIN_ENDPOINTS.BRAND_DETAIL(brandId);
    console.log('getBrandDetail 요청 URL:', url);
    
    const res = await client.get<ApiResponse<BrandDetail>>(url);
    console.log(`getBrandDetail (${brandId}) 응답:`, res.data);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  } catch (error) {
    console.error(`getBrandDetail (${brandId}) 에러:`, error);
    throw error;
  }
};

// 브랜드 목록만 조회 (모든 브랜드)
export const getAdminBrands = async (): Promise<BrandListItem[]> => {
  try {
    console.log('getAdminBrands 시작 - 모든 브랜드 조회');
    
    // 모든 브랜드 목록 조회 (필터링 없음)
    const brandList = await getBrandList();
    console.log('브랜드 목록 조회 성공:', brandList.length, '개');
    
    return brandList;
  } catch (error) {
    console.error('getAdminBrands 에러:', error);
    throw error;
  }
};

export const createAdminBrand = async (data: CreateBrandRequest): Promise<{ brandId: number }> => {
  const res = await client.post<ApiResponse<{ brandId: number }>>(ADMIN_ENDPOINTS.BRAND_CREATE, data);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const updateAdminBrand = async (brandId: number, data: UpdateBrandRequest): Promise<{ brandId: number }> => {
  const res = await client.put<ApiResponse<{ brandId: number }>>(ADMIN_ENDPOINTS.BRAND_UPDATE(brandId), data);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const deleteAdminBrand = async (brandId: number): Promise<{ brandId: number }> => {
  const res = await client.delete<ApiResponse<{ brandId: number }>>(ADMIN_ENDPOINTS.BRAND_DELETE(brandId));
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
}; 