import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { ADMIN_ENDPOINTS } from './endpoints';
import type {
  TotalStats,
  BookmarkStat,
  FilteringStat,
  RecommendStat,
  MembershipStat,
  AdminBrandListResponse,
  AdminBrandCreateRequest,
  AdminBrandUpdateRequest,
  AdminBrandCreateResponse,
  AdminBrandUpdateResponse,
  AdminBrandDeleteResponse,
  AdminBrandListParams,
} from './types';

export const adminApi = {
  // 통계 관련 API
  getTotalStats: async (): Promise<TotalStats> => {
    const res = await client.get<ApiResponse<TotalStats>>(ADMIN_ENDPOINTS.TOTAL_STATS);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  getBookmarkStats: async (): Promise<BookmarkStat[]> => {
    const res = await client.get<ApiResponse<BookmarkStat[]>>(ADMIN_ENDPOINTS.BOOKMARK_STATS);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  getFilteringStats: async (): Promise<FilteringStat[]> => {
    const res = await client.get<ApiResponse<FilteringStat[]>>(ADMIN_ENDPOINTS.FILTERING_STATS);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  getRecommendStats: async (): Promise<RecommendStat[]> => {
    const res = await client.get<ApiResponse<RecommendStat[]>>(ADMIN_ENDPOINTS.RECOMMEND_STATS);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  getMembershipStats: async (): Promise<MembershipStat[]> => {
    const res = await client.get<ApiResponse<MembershipStat[]>>(ADMIN_ENDPOINTS.MEMBERSHIP_STATS);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  // 브랜드 관리 API
  getAdminBrandList: async (params?: AdminBrandListParams): Promise<AdminBrandListResponse> => {
    const res = await client.get<ApiResponse<AdminBrandListResponse>>(ADMIN_ENDPOINTS.BRAND_LIST, { params });
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  createAdminBrand: async (brandData: AdminBrandCreateRequest): Promise<AdminBrandCreateResponse> => {
    const res = await client.post<ApiResponse<AdminBrandCreateResponse>>(ADMIN_ENDPOINTS.BRAND_CREATE, brandData);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  updateAdminBrand: async (brandId: number, brandData: AdminBrandUpdateRequest): Promise<AdminBrandUpdateResponse> => {
    const res = await client.put<ApiResponse<AdminBrandUpdateResponse>>(ADMIN_ENDPOINTS.BRAND_UPDATE(brandId), brandData);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },

  deleteAdminBrand: async (brandId: number): Promise<AdminBrandDeleteResponse> => {
    const res = await client.delete<ApiResponse<AdminBrandDeleteResponse>>(ADMIN_ENDPOINTS.BRAND_DELETE(brandId));
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    return res.data.data;
  },
}; 