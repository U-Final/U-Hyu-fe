import type { UserGrade } from '@mypage/api/types';

export const convertGrade = (grade: UserGrade): string => {
  if (!grade) return '등급 없음';
  return grade === 'GOOD' ? '우수' : grade;
};
