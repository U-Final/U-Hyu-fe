import { ADMIN_ENDPOINTS } from './endpoints';
import type { 
  CategoryStat, 
  AdminBrand, 
  TotalStat, 
  RecommendStat,
  Category,
  CreateBrandRequest,
  UpdateBrandRequest
} from './types';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

// 통계 관련 API
export const getAdminBookmarkStats = async (): Promise<CategoryStat[]> => {
  const res = await client.get<ApiResponse<CategoryStat[]>>(ADMIN_ENDPOINTS.STAT_BOOKMARK);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const getAdminFilteringStats = async (): Promise<CategoryStat[]> => {
  const res = await client.get<ApiResponse<CategoryStat[]>>(ADMIN_ENDPOINTS.STAT_FILTERING);
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

export const getAdminMembershipStats = async (): Promise<CategoryStat[]> => {
  const res = await client.get<ApiResponse<CategoryStat[]>>(ADMIN_ENDPOINTS.STAT_MEMBERSHIP);
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
export const getAdminBrands = async (): Promise<AdminBrand[]> => {
  const res = await client.get<ApiResponse<AdminBrand[]>>(ADMIN_ENDPOINTS.BRAND_LIST);
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

export const getAdminBrandDetail = async (brandId: number): Promise<AdminBrand> => {
  const res = await client.get<ApiResponse<AdminBrand>>(ADMIN_ENDPOINTS.BRAND_UPDATE(brandId));
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
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