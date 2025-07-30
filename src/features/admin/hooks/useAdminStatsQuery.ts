import { useQuery } from '@tanstack/react-query';
import {
  getAdminBookmarkStats,
  getAdminFilteringStats,
  getAdminRecommendStats,
  getAdminMembershipStats,
  getAdminTotalStats,
  getAdminCategories,
} from '../api/adminApi';

export function useAdminBookmarkStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'bookmark'],
    queryFn: getAdminBookmarkStats,
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    gcTime: 0, // 캐시 즉시 삭제
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 refetch
  });
}

export function useAdminFilteringStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'filtering'],
    queryFn: getAdminFilteringStats,
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    gcTime: 0, // 캐시 즉시 삭제
    refetchOnMount: false, // 초기 로드 시 요청하지 않음
    enabled: false, // 수동으로만 요청
  });
}

export function useAdminRecommendStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'recommend'],
    queryFn: getAdminRecommendStats,
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    gcTime: 0, // 캐시 즉시 삭제
    refetchOnMount: false, // 초기 로드 시 요청하지 않음
    enabled: false, // 수동으로만 요청
  });
}

export function useAdminMembershipStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'membership'],
    queryFn: getAdminMembershipStats,
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    gcTime: 0, // 캐시 즉시 삭제
    refetchOnMount: false, // 초기 로드 시 요청하지 않음
    enabled: false, // 수동으로만 요청
  });
}

export function useAdminTotalStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'total'],
    queryFn: getAdminTotalStats,
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    gcTime: 0, // 캐시 즉시 삭제
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 refetch
  });
}

export function useAdminCategoriesQuery() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: getAdminCategories,
  });
} 