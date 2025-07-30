// CategoryIcon에서 사용하는 아이콘들로 교체
import {
  ShoppingCart,
  UtensilsCrossed,
  Home,
  Camera,
  Heart,
  Car,
  GraduationCap,
  Train,
  MapPin,
  Coffee,
  Building2,
  Palette,
} from 'lucide-react';

// React Icons (특정 카테고리용 추가 아이콘)
import { 
  MdLocalConvenienceStore,
} from 'react-icons/md';

import type { FilterTabItem } from './FilterTabs.types';

/**
 * 기본 필터 탭 목록
 * - label: 사용자에게 보여질 텍스트
 * - value: 내부에서 선택 상태를 구분할 값
 * - icon: 카테고리를 나타내는 아이콘 컴포넌트
 * - color: 활성 상태 시 사용할 색상
 */
export const FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all', icon: MapPin, color: '#6366f1' }, // indigo-500 - 전체 위치
  { label: '쇼핑', value: 'shopping', icon: ShoppingCart, color: '#ec4899' }, // pink-500 - 쇼핑카트
  { label: '푸드', value: 'food', icon: UtensilsCrossed, color: '#f59e0b' }, // amber-500 - 음식
  { label: '생활/편의', value: 'life', icon: Home, color: '#10b981' }, // emerald-500 - 생활
  { label: '문화/여가', value: 'culture', icon: Camera, color: '#8b5cf6' }, // violet-500 - 여가활동
  { label: '뷰티/건강', value: 'beauty', icon: Heart, color: '#f97316' }, // orange-500 - 건강한 마음
  { label: '액티비티', value: 'activity', icon: Car, color: '#06b6d4' }, // cyan-500 - 활동/이동
  {
    label: '교육',
    value: 'education',
    icon: GraduationCap,
    color: '#3b82f6',
  }, // blue-500 - 교육
  { label: '여행/교통', value: 'travel', icon: Train, color: '#84cc16' }, // lime-500 - 교통수단
];

export const BENEFIT_FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all', icon: MapPin, color: '#6366f1' },
  { label: 'APP/기기', value: 'APP/기기', icon: Building2, color: '#8b5cf6' },
  { label: '테마파크', value: '테마파크', icon: Camera, color: '#ec4899' },
  { label: '워터파크/아쿠아리움', value: '워터파크/아쿠아리움', icon: Camera, color: '#06b6d4' },
  { label: '액티비티', value: '액티비티', icon: Car, color: '#06b6d4' },
  { label: '뷰티', value: '뷰티', icon: Palette, color: '#f97316' },
  { label: '건강', value: '건강', icon: Heart, color: '#10b981' },
  { label: '쇼핑', value: '쇼핑', icon: ShoppingCart, color: '#ec4899' },
  { label: '생활/편의', value: '생활/편의', icon: MdLocalConvenienceStore, color: '#10b981' },
  { label: '베이커리/디저트', value: '베이커리/디저트', icon: Coffee, color: '#f59e0b' },
  { label: '음식점', value: '음식점', icon: UtensilsCrossed, color: '#f59e0b' },
  { label: '영화/미디어', value: '영화/미디어', icon: Camera, color: '#8b5cf6' },
  { label: '공연/전시', value: '공연/전시', icon: Palette, color: '#8b5cf6' },
  { label: '교육', value: '교육', icon: GraduationCap, color: '#3b82f6' },
  { label: '여행/교통', value: '여행/교통', icon: Train, color: '#84cc16' },
];

export const filterTabVariants = {
  gray: {
    base: 'px-3 h-[36px] flex items-center rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-sm min-w-fit backdrop-blur-sm',
    active:
      'bg-light-gray text-black shadow-sm scale-105 ring-2 ring-offset-2',
    inactive:
      'text-gray-600 hover:bg-white/50 hover:text-gray-800 hover:scale-102',
  },
  white: {
    base: 'px-3 h-[36px] flex items-center bg-white/90 border border-gray-200/50 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-sm min-w-fit backdrop-blur-sm',
    active: 'shadow-sm scale-105 ring-2 ring-offset-2 bg-white',
    inactive:
      'text-gray-600 hover:bg-white hover:text-gray-800 hover:border-gray-300/70 hover:scale-102',
  },
} as const;
