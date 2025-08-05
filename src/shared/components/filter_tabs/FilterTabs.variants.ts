// CategoryIcon에서 사용하는 아이콘들로 교체
import {
  Activity,
  Coffee,
  FerrisWheel,
  Film,
  GraduationCap,
  Heart,
  MapPin,
  Palette,
  ShoppingCart,
  Smartphone,
  Theater,
  Train,
  UtensilsCrossed,
  Waves,
} from 'lucide-react';
// React Icons (특정 카테고리용 추가 아이콘)
import { MdLocalConvenienceStore } from 'react-icons/md';

import type { FilterTabItem } from './FilterTabs.types';

/**
 * 기본 필터 탭 목록
 * - label: 사용자에게 보여질 텍스트
 * - value: 내부에서 선택 상태를 구분할 값
 * - icon: 카테고리를 나타내는 아이콘 컴포넌트
 * - color: 활성 상태 시 사용할 색상
 */
export const FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all', icon: MapPin, color: '#e6007e' },
  { label: '음식점', value: '음식점', icon: UtensilsCrossed, color: '#f59e0b' },
  {
    label: '베이커리/디저트',
    value: '베이커리/디저트',
    icon: Coffee,
    color: '#d97706',
  },
  {
    label: '생활/편의',
    value: '생활/편의',
    icon: MdLocalConvenienceStore,
    color: '#10b981',
  },
  { label: '쇼핑', value: '쇼핑', icon: ShoppingCart, color: '#ec4899' },
  { label: '뷰티', value: '뷰티', icon: Palette, color: '#f97316' },
  { label: '건강', value: '건강', icon: Heart, color: '#059669' },
  { label: '영화/미디어', value: '영화/미디어', icon: Film, color: '#8b5cf6' },
  { label: '여행/교통', value: '여행/교통', icon: Train, color: '#16a34a' },
  { label: '교육', value: '교육', icon: GraduationCap, color: '#3b82f6' },
  { label: '공연/전시', value: '공연/전시', icon: Theater, color: '#a855f7' },
  { label: '액티비티', value: '액티비티', icon: Activity, color: '#06b6d4' },
  { label: '테마파크', value: '테마파크', icon: FerrisWheel, color: '#e879f9' },
  {
    label: '워터파크/아쿠아리움',
    value: '워터파크/아쿠아리움',
    icon: Waves,
    color: '#0891b2',
  },
];

export const BENEFIT_FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all', icon: MapPin, color: '#e6007e' },
  { label: '음식점', value: '음식점', icon: UtensilsCrossed, color: '#f59e0b' },
  {
    label: '베이커리/디저트',
    value: '베이커리/디저트',
    icon: Coffee,
    color: '#d97706',
  },
  {
    label: '생활/편의',
    value: '생활/편의',
    icon: MdLocalConvenienceStore,
    color: '#10b981',
  },
  { label: '쇼핑', value: '쇼핑', icon: ShoppingCart, color: '#ec4899' },
  { label: '뷰티', value: '뷰티', icon: Palette, color: '#f97316' },
  { label: '건강', value: '건강', icon: Heart, color: '#059669' },
  { label: '영화/미디어', value: '영화/미디어', icon: Film, color: '#8b5cf6' },
  { label: '여행/교통', value: '여행/교통', icon: Train, color: '#16a34a' },
  { label: '교육', value: '교육', icon: GraduationCap, color: '#3b82f6' },
  { label: '공연/전시', value: '공연/전시', icon: Theater, color: '#a855f7' },
  { label: '액티비티', value: '액티비티', icon: Activity, color: '#06b6d4' },
  { label: '테마파크', value: '테마파크', icon: FerrisWheel, color: '#e879f9' },
  {
    label: '워터파크/아쿠아리움',
    value: '워터파크/아쿠아리움',
    icon: Waves,
    color: '#0891b2',
  },
  { label: 'APP/기기', value: 'APP/기기', icon: Smartphone, color: '#8b5cf6' },
];

export const filterTabVariants = {
  gray: {
    base: 'px-3 h-9 flex items-center rounded-xl text-sm font-medium transition-all duration-200 min-w-fit backdrop-blur-sm shadow-sm',
    active: 'bg-light-gray font-semibold shadow-md border-white/40 scale-110',
    inactive: 'hover:bg-white/30 shadow-xs',
  },
  white: {
    base: 'px-3 h-9 flex items-center bg-white/90 rounded-xl text-sm font-medium transition-all duration-200 min-w-fit backdrop-blur-sm shadow-md',
    active: 'font-semibold shadow-lg bg-white border-gray-300 scale-110',
    inactive: 'hover:bg-white hover:border-gray-300/70 shadow-sm',
  },
} as const;
