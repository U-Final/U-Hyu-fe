import { type MembershipGrade } from '../types';

export const MEMBERSHIP_GRADES: MembershipGrade[] = [
  { value: 'vvip', label: 'VVIP' },
  { value: 'vip', label: 'VIP' },
  { value: 'Excellent', label: '우수' },
];

export const STEP_TITLES = [
  '이메일 주소를 입력해주세요',
  'LG U+ 멤버십 등급을 선택해주세요',
  '최근 이용한 브랜드를 선택해주세요',
  '관심있는 브랜드를 선택해주세요',
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
