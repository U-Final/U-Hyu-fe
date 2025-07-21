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
      searchParams.set(key, value);
      if (key !== 'page') searchParams.set('page', '0');
      setSearchParams(searchParams);
    },

    setParams: (updates: Record<string, string>) => {
      Object.entries(updates).forEach(([k, v]) => {
        searchParams.set(k, v);
      });
      setSearchParams(searchParams);
    },
  };
};
