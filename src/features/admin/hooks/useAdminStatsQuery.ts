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
  });
}

export function useAdminFilteringStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'filtering'],
    queryFn: getAdminFilteringStats,
  });
}

export function useAdminRecommendStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'recommend'],
    queryFn: getAdminRecommendStats,
  });
}

export function useAdminMembershipStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'membership'],
    queryFn: getAdminMembershipStats,
  });
}

export function useAdminTotalStatsQuery() {
  return useQuery({
    queryKey: ['admin', 'stats', 'total'],
    queryFn: getAdminTotalStats,
  });
}

export function useAdminCategoriesQuery() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: getAdminCategories,
  });
} 