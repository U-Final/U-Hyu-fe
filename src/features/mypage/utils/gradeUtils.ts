import type { UserGrade } from '@mypage/types';

export const convertGrade = (grade: UserGrade): 'VIP' | 'VVIP' | '우수' => {
  return grade === 'GOOD' ? '우수' : grade;
};
