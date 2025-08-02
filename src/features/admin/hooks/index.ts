import { useQuery } from '@tanstack/react-query';
import { 
  getAdminBookmarkStats, 
  getAdminFilteringStats, 
  getAdminRecommendStats, 
  getAdminMembershipStats, 
  getAdminTotalStats,
  getAdminBrands,
  getBrandList,
  getBrandDetail
} from '@admin/api/adminApi';

// Brand management hooks
export { useAdminBrandMutation } from './useAdminBrandMutation';

export const useAdminBookmarkStatsQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['admin', 'stats', 'bookmark'],
    queryFn: getAdminBookmarkStats,
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    enabled,
  });
};

export const useAdminFilteringStatsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['admin', 'stats', 'filtering'],
    queryFn: getAdminFilteringStats,
    staleTime: 0,
    enabled,
  });
};

export const useAdminRecommendStatsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['admin', 'stats', 'recommend'],
    queryFn: getAdminRecommendStats,
    staleTime: 0,
    enabled,
  });
};

export const useAdminMembershipStatsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['admin', 'stats', 'membership'],
    queryFn: getAdminMembershipStats,
    staleTime: 0,
    enabled,
  });
};

export const useAdminTotalStatsQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['admin', 'stats', 'total'],
    queryFn: getAdminTotalStats,
    staleTime: 0,
    enabled,
  });
};

// 관리자 브랜드 목록 조회
export const useAdminBrandsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: () => getAdminBrands(),
    staleTime: 30 * 1000, // 30초로 변경하여 불필요한 재요청 방지
    enabled,
    retry: (failureCount, error) => {
      console.error(`useAdminBrandsQuery 재시도 ${failureCount}:`, error);
      return failureCount < 2; // 최대 2번 재시도
    },
    retryDelay: 1000, // 1초 대기 후 재시도
  });
};

// 브랜드 목록 조회
export const useBrandListQuery = (enabled: boolean = false, params?: {
  category?: string;
  sortType?: string;
  benefitType?: string;
  brand_name?: string;
}) => {
  return useQuery({
    queryKey: ['brands', 'list', params],
    queryFn: () => getBrandList(params),
    staleTime: 30 * 1000, // 30초로 변경
    enabled,
  });
};

// 브랜드 상세 조회
export const useBrandDetailQuery = (brandId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['brands', 'detail', brandId],
    queryFn: () => getBrandDetail(brandId),
    staleTime: 5 * 60 * 1000, // 5분으로 설정 (상세 정보는 더 오래 캐시)
    enabled: enabled && !!brandId,
  });
};

 