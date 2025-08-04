import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AdminBrandListParams } from '@admin/api/types';

const parseAdminQueryParams = (params: URLSearchParams): AdminBrandListParams => ({
  category: params.get('category') || undefined,
  brand_name: params.get('brand_name') || undefined,
  page: Number(params.get('page') || '0'),
  size: Number(params.get('size') || '10'),
});

export const useAdminQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: AdminBrandListParams = useMemo(() => {
    return parseAdminQueryParams(searchParams);
  }, [searchParams.toString()]);

  return {
    params,

    setParam: (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      if (key !== 'page') newParams.set('page', '0');
      setSearchParams(newParams);
    },

    setParams: (updates: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([k, v]) => {
        newParams.set(k, v);
      });
      setSearchParams(newParams);
    },
  };
}; 