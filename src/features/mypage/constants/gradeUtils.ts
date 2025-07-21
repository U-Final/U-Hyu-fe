import type { UserGrade } from '@features/mypage/api/types';

export const convertGrade = (grade: UserGrade): string => {
  return grade === 'GOOD' ? '우수' : grade;
};
