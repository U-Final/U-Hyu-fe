import { useQuery } from '@tanstack/react-query';

import { getMyMapList } from '../api/mymapApi';
import type { MyMapListRes } from '../api/types';

/**
 * My Map 목록 조회 Query 훅
 */
export const useMyMapListQuery = () => {
  return useQuery<MyMapListRes[]>({
    queryKey: ['mymaplist'],
    queryFn: getMyMapList,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
