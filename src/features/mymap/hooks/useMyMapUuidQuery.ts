import { getMyMapUuid } from '@mymap/api/mymapApi';
import type { MymapUuidRes } from '@mymap/api/types';
import { useQuery } from '@tanstack/react-query';

export const MYMAP_QUERY_KEYS = {
  detail: (uuid: string) => ['mymap-detail', uuid] as const,
};

/**
 * My Map 상세 조회 (UUID 기반) Query 훅
 * @param uuid
 * @param enabled
 */
export const useMyMapUuidQuery = (uuid: string, enabled = true) => {
  return useQuery<MymapUuidRes>({
    queryKey: MYMAP_QUERY_KEYS.detail(uuid),
    queryFn: () => getMyMapUuid(uuid),
    enabled: !!uuid && enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
