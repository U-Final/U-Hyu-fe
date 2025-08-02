import type { UserGrade } from '@/shared/types';

export const mapMembershipGrade = (grade: string): UserGrade => {
  const gradeMap: Record<string, UserGrade> = {
    Excellent: 'GOOD',
    vip: 'VIP',
    vvip: 'VVIP',
  };
  return gradeMap[grade] || 'GOOD';
};
