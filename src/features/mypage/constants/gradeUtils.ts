import type { UserGrade } from '@mypage/api/types';

export const convertGrade = (grade: UserGrade): string => {
  return grade === 'GOOD' ? '우수' : grade;
};
