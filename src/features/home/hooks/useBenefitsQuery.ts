import type { Benefit } from '@home/api/home.types';
import { useQuery } from '@tanstack/react-query';
import { fetchBenefits } from '../api/homeApi';

export const useBenefitsQuery = (grade: string) => {
  return useQuery<Benefit[]>({
    queryKey: ['benefits', grade],
    queryFn: () => fetchBenefits(grade),
    enabled: !!grade,
  });
};