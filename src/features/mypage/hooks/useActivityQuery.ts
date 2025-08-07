import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchActivityStatistics, fetchBookmarkList } from '@mypage/api/mypageApi';
import type { ActivityStatistics, Bookmark } from '@mypage/api/types';

export const useActivityStatisticsQuery = () => {
  return useQuery<ActivityStatistics>({
    queryKey: ['activityStatistics'],
    queryFn: fetchActivityStatistics,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const useBookmarkListInfiniteQuery = (enabled: boolean) => {
  return useInfiniteQuery<Bookmark[], Error>({
    queryKey: ['bookmarkList'],
    queryFn: async (context) => {
      const page = typeof context.pageParam === 'number' ? context.pageParam : 1;
      return fetchBookmarkList(page, 5);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1;
    },
    enabled,
    initialPageParam: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}; 