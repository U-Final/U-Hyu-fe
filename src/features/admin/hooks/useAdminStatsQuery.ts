import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';

// 전체 통계 조회
export const useAdminTotalStatsQuery = () => {
  return useQuery({
    queryKey: ['adminTotalStats'],
    queryFn: adminApi.getTotalStats,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

// 즐겨찾기 통계 조회
export const useAdminBookmarkStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminBookmarkStats'],
    queryFn: adminApi.getBookmarkStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

// 필터링 통계 조회
export const useAdminFilteringStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminFilteringStats'],
    queryFn: adminApi.getFilteringStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

// 추천 통계 조회
export const useAdminRecommendStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminRecommendStats'],
    queryFn: adminApi.getRecommendStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

// 멤버십 통계 조회
export const useAdminMembershipStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminMembershipStats'],
    queryFn: adminApi.getMembershipStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
}; 