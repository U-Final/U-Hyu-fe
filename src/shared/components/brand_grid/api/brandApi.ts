import { client } from '@/shared/client';

import { type ApiBrandResponse } from '../brand.type';

export const getInterestBrands = async (): Promise<ApiBrandResponse> => {
  const response = await client.get<ApiBrandResponse>('/brand-list/interest');
  return response.data;
};
