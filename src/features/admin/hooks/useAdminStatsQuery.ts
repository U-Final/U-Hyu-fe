import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';

export const useAdminTotalStatsQuery = () => {
  return useQuery({
    queryKey: ['adminTotalStats'],
    queryFn: adminApi.getTotalStats,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

export const useAdminBookmarkStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminBookmarkStats'],
    queryFn: adminApi.getBookmarkStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

export const useAdminFilteringStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminFilteringStats'],
    queryFn: adminApi.getFilteringStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

export const useAdminRecommendStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminRecommendStats'],
    queryFn: adminApi.getRecommendStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
};

export const useAdminMembershipStatsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminMembershipStats'],
    queryFn: adminApi.getMembershipStats,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
}; 