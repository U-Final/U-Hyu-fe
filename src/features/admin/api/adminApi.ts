import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';
import { ADMIN_ENDPOINTS } from './endpoints';
import type { 
  CategoryStat, 
  AdminBrand, 
  TotalStat, 
  RecommendStat,
  Category,
  BrandBenefit
} from './types';

// 통계 관련 API
export async function getAdminBookmarkStats(): Promise<CategoryStat[]> {
  const res = await client.get<ApiResponse<CategoryStat[]>>(ADMIN_ENDPOINTS.STAT_BOOKMARK);
  if (!res.data.data) {
    throw new Error('즐겨찾기 통계 데이터를 불러올 수 없습니다.');
  }
  return res.data.data;
}

export async function getAdminFilteringStats(): Promise<CategoryStat[]> {
  const res = await client.get<ApiResponse<CategoryStat[]>>(ADMIN_ENDPOINTS.STAT_FILTERING);
  if (!res.data.data) {
    throw new Error('필터링 통계 데이터를 불러올 수 없습니다.');
  }
  return res.data.data;
}

export async function getAdminRecommendStats(): Promise<RecommendStat[]> {
  const res = await client.get<ApiResponse<RecommendStat[]>>(ADMIN_ENDPOINTS.STAT_RECOMMEND);
  if (!res.data.data) {
    throw new Error('추천 통계 데이터를 불러올 수 없습니다.');
  }
  return res.data.data;
}

export async function getAdminMembershipStats(): Promise<CategoryStat[]> {
  const res = await client.get<ApiResponse<CategoryStat[]>>(ADMIN_ENDPOINTS.STAT_MEMBERSHIP);
  if (!res.data.data) {
    throw new Error('멤버십 통계 데이터를 불러올 수 없습니다.');
  }
  return res.data.data;
}

export async function getAdminTotalStats(): Promise<TotalStat> {
  const res = await client.get<ApiResponse<TotalStat>>(ADMIN_ENDPOINTS.STAT_TOTAL);
  if (!res.data.data) {
    throw new Error('전체 통계 데이터를 불러올 수 없습니다.');
  }
  return res.data.data;
}

// 카테고리 관련 API
export async function getAdminCategories(): Promise<Category[]> {
  const res = await client.get<ApiResponse<Category[]>>(ADMIN_ENDPOINTS.CATEGORY_LIST);
  if (!res.data.data) {
    throw new Error('카테고리 데이터를 불러올 수 없습니다.');
  }
  return res.data.data;
}

// 브랜드 관련 API
export async function getAdminBrands(): Promise<AdminBrand[]> {
  const res = await client.get<ApiResponse<AdminBrand[]>>(ADMIN_ENDPOINTS.BRAND_LIST);
  if (!res.data.data) {
    throw new Error('브랜드 목록을 불러올 수 없습니다.');
  }
  return res.data.data;
}

export async function getAdminBrandDetail(brandId: number): Promise<AdminBrand> {
  const res = await client.get<ApiResponse<AdminBrand>>(ADMIN_ENDPOINTS.BRAND_UPDATE(brandId));
  if (!res.data.data) {
    throw new Error('브랜드 상세 정보를 불러올 수 없습니다.');
  }
  return res.data.data;
}

export async function createAdminBrand(data: CreateBrandRequest): Promise<{ brandId: number }> {
  const res = await client.post<ApiResponse<{ brandId: number }>>(ADMIN_ENDPOINTS.BRAND_CREATE, data);
  if (!res.data.data) {
    throw new Error('브랜드 생성에 실패했습니다.');
  }
  return res.data.data;
}

export async function updateAdminBrand(brandId: number, data: UpdateBrandRequest): Promise<{ brandId: number }> {
  const res = await client.put<ApiResponse<{ brandId: number }>>(ADMIN_ENDPOINTS.BRAND_UPDATE(brandId), data);
  if (!res.data.data) {
    throw new Error('브랜드 수정에 실패했습니다.');
  }
  return res.data.data;
}

export async function deleteAdminBrand(brandId: number): Promise<{ brandId: number }> {
  const res = await client.delete<ApiResponse<{ brandId: number }>>(ADMIN_ENDPOINTS.BRAND_DELETE(brandId));
  if (!res.data.data) {
    throw new Error('브랜드 삭제에 실패했습니다.');
  }
  return res.data.data;
}

// 브랜드 생성/수정 요청 타입
export interface CreateBrandRequest {
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  data: BrandBenefit[];
}

export interface UpdateBrandRequest {
  brandName?: string;
  brandImg?: string;
  categoryId?: number;
  usageLimit?: string;
  usageMethod?: string;
  storeType?: 'ONLINE' | 'OFFLINE';
  status?: boolean;
  data?: BrandBenefit[];
} 