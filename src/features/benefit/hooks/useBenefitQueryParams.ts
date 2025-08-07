import { useMemo } from 'react';

import type { BrandListParams } from '@benefit/api/types';
import { parseQueryParams } from '@benefit/utils/parseQueryParams';
import { useSearchParams } from 'react-router-dom';

export const useBenefitQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: BrandListParams = useMemo(() => {
    return parseQueryParams(searchParams);
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
