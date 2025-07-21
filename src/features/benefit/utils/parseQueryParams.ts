import type { BrandListParams } from '@benefit/api/types';

export const parseQueryParams = (params: URLSearchParams): BrandListParams => ({
  category: params.get('category') || undefined,
  storeType: params.get('storeType') as 'ONLINE' | 'OFFLINE' | undefined,
  benefitType: params.get('benefitType') as 'DISCOUNT' | 'GIFT' | undefined,
  brand_name: params.get('brand_name') || undefined,
  page: Number(params.get('page') || '0'),
  size: Number(params.get('size') || '5'),
});