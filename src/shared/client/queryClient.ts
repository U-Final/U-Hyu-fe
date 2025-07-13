import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 stale time (데이터가 fresh한 상태로 유지되는 시간)
      staleTime: 5 * 60 * 1000, // 5분

      // 기본 cache time (캐시에서 데이터가 유지되는 시간)
      gcTime: 10 * 60 * 1000, // 10분

      // 재시도 횟수
      retry: 1,

      // 에러 발생 시 재시도 간격
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),

      // 백그라운드에서 refetch 비활성화
      refetchOnWindowFocus: false,

      // 네트워크 재연결 시 refetch 비활성화
      refetchOnReconnect: false,
    },
    mutations: {
      // mutation 재시도 횟수
      retry: 1,
    },
  },
});
