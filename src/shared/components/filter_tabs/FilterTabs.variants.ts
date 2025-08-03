// CategoryIcon에서 사용하는 아이콘들로 교체
import {
  ShoppingCart,
  UtensilsCrossed,
  Heart,
  GraduationCap,
  Train,
  MapPin,
  Coffee,
  Palette,
  Waves,
  Activity,
  FerrisWheel,
  Film,
  Theater,
  Smartphone,
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
  { label: '전체', value: 'all', icon: MapPin, color: '#6366f1' },
  { label: '음식점', value: '음식점', icon: UtensilsCrossed, color: '#f59e0b' },
  { label: '베이커리/디저트', value: '베이커리/디저트', icon: Coffee, color: '#f59e0b' },
  { label: '생활/편의', value: '생활/편의', icon: MdLocalConvenienceStore, color: '#10b981' },
  { label: '쇼핑', value: '쇼핑', icon: ShoppingCart, color: '#ec4899' },
  { label: '뷰티', value: '뷰티', icon: Palette, color: '#f97316' },
  { label: '건강', value: '건강', icon: Heart, color: '#10b981' },
  { label: '영화/미디어', value: '영화/미디어', icon: Film, color: '#8b5cf6' },
  { label: '여행/교통', value: '여행/교통', icon: Train, color: '#84cc16' },
  { label: '교육', value: '교육', icon: GraduationCap, color: '#3b82f6' },
  { label: '공연/전시', value: '공연/전시', icon: Theater, color: '#8b5cf6' },
  { label: '액티비티', value: '액티비티', icon: Activity, color: '#06b6d4' },
  { label: '테마파크', value: '테마파크', icon: FerrisWheel, color: '#ec4899' },
  { label: '워터파크/아쿠아리움', value: '워터파크/아쿠아리움', icon: Waves, color: '#06b6d4' },
];

export const BENEFIT_FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all', icon: MapPin, color: '#6366f1' },
  { label: 'APP/기기', value: 'APP/기기', icon: Smartphone, color: '#8b5cf6' },
  { label: '테마파크', value: '테마파크', icon: FerrisWheel, color: '#ec4899' },
  { label: '워터파크/아쿠아리움', value: '워터파크/아쿠아리움', icon: Waves, color: '#06b6d4' },
  { label: '액티비티', value: '액티비티', icon: Activity, color: '#06b6d4' },
  { label: '뷰티', value: '뷰티', icon: Palette, color: '#f97316' },
  { label: '건강', value: '건강', icon: Heart, color: '#10b981' },
  { label: '쇼핑', value: '쇼핑', icon: ShoppingCart, color: '#ec4899' },
  { label: '생활/편의', value: '생활/편의', icon: MdLocalConvenienceStore, color: '#10b981' },
  { label: '베이커리/디저트', value: '베이커리/디저트', icon: Coffee, color: '#f59e0b' },
  { label: '음식점', value: '음식점', icon: UtensilsCrossed, color: '#f59e0b' },
  { label: '영화/미디어', value: '영화/미디어', icon: Film, color: '#8b5cf6' },
  { label: '공연/전시', value: '공연/전시', icon: Theater, color: '#8b5cf6' },
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
