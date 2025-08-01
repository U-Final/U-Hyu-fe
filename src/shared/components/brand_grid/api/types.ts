import type { ApiResponse } from '@/shared/client/client.type';

/**
 * API 브랜드 정보 타입
 */
export interface ApiBrand {
  brandId: number;
  brandName: string;
  logoImage: string;
}

export type ApiBrandResponse = ApiResponse<ApiBrand[]>;
