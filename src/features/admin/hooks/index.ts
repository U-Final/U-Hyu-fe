import { useQuery } from '@tanstack/react-query';
import { 
  getAdminBookmarkStats, 
  getAdminFilteringStats, 
  getAdminRecommendStats, 
  getAdminMembershipStats, 
  getAdminTotalStats,
  getAdminBrands 
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

export const useAdminBrandsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: getAdminBrands,
    staleTime: 0,
    enabled,
  });
}; 