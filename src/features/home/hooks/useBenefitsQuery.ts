import { useQuery } from '@tanstack/react-query';
import { fetchBenefits } from '../api/homeApi';

export const useBenefitsQuery = (grade: string) => {
  return useQuery({
    queryKey: ['benefits', grade],
    queryFn: () => fetchBenefits(grade),
    enabled: !!grade, // grade가 있어야 요청함
  });
};