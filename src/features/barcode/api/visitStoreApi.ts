import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

export const postVisitStore = async (storeId: number): Promise<void> => {
  await client.post<ApiResponse<null>>(BARCODE_ENDPOINTS.VISIT, { storeId });
};
