import { getMyMapUuid, getMyMapUuidGuest } from '@mymap/api/mymapApi';
import type { MymapUuidRes } from '@mymap/api/types';
import { useQuery } from '@tanstack/react-query';

export const MYMAP_QUERY_KEYS = {
  detail: (uuid: string) => ['mymap-detail', 'auth', uuid] as const,
  guestDetail: (uuid: string) => ['mymap-detail', 'guest', uuid] as const,
};

/**
 * My Map 공유지도 조회 (UUID 기반, 로그인)
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

/**
 * My Map 공유지도 조회 (UUID 기반, 비회원)
 */
export const useMyMapUuidGuestQuery = (uuid: string, enabled = true) => {
  return useQuery<MymapUuidRes>({
    queryKey: MYMAP_QUERY_KEYS.guestDetail(uuid),
    queryFn: () => getMyMapUuidGuest(uuid),
    enabled: !!uuid && enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
