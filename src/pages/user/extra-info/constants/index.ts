import { type Brand, type MembershipGrade } from '../types';

export const BRANDS: Brand[] = [
  {
    id: 'cgv',
    name: 'CGV',
    color: '#E53E3E',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
    imagePath: '/images/brands/CGV.png',
  },
  {
    id: 'baskin',
    name: '베스킨라빈스',
    color: '#ED64A6',
    bgColor: 'bg-pink-500',
    textColor: 'text-white',
    imagePath: '/images/brands/베스킨라빈스.png',
  },
  {
    id: 'paris',
    name: '파리바게뜨',
    color: '#1B3B6F',
    bgColor: 'bg-blue-900',
    textColor: 'text-white',
    imagePath: '/images/brands/파리바게뜨.png',
  },
  {
    id: 'gs25',
    name: 'GS25',
    color: '#3182CE',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    imagePath: '/images/brands/GS25.png',
  },
  {
    id: 'lotte',
    name: '롯데시네마',
    color: '#E53E3E',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    imagePath: '/images/brands/롯데시네마.png',
  },
  {
    id: 'goobne',
    name: '굽네치킨',
    color: '#8B4513',
    bgColor: 'bg-amber-800',
    textColor: 'text-white',
    imagePath: '/images/brands/굽네치킨.png',
  },
  {
    id: 'touslesjours',
    name: '뚜레쥬르',
    color: '#2E4B3C',
    bgColor: 'bg-green-900',
    textColor: 'text-white',
    imagePath: '/images/brands/뚜레쥬르.png',
  },
  {
    id: 'wonderpark',
    name: '원더파크',
    color: '#BCAAA4',
    bgColor: 'bg-gray-300',
    textColor: 'text-black',
    imagePath: '/images/brands/원더파크.png',
  },
];

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
