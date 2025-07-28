import type { FilterTabItem } from './FilterTabs.types';
import { 
  Squares2X2Icon,
  ShoppingBagIcon, 
  SparklesIcon,
  HomeModernIcon,
  FilmIcon,
  HeartIcon,
  BoltIcon,
  AcademicCapIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid';
import type { ComponentType } from 'react';

/**
 * 기본 필터 탭 목록
 * - label: 사용자에게 보여질 텍스트
 * - value: 내부에서 선택 상태를 구분할 값
 * - icon: 카테고리를 나타내는 아이콘 컴포넌트
 * - color: 활성 상태 시 사용할 색상
 */
export const FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all', icon: Squares2X2Icon, color: '#6366f1' }, // indigo-500 - 전체 카테고리
  { label: '쇼핑', value: 'shopping', icon: ShoppingBagIcon, color: '#ec4899' }, // pink-500 - 쇼핑백
  { label: '푸드', value: 'food', icon: SparklesIcon, color: '#f59e0b' }, // amber-500 - 요리의 반짝임
  { label: '생활/편의', value: 'life', icon: HomeModernIcon, color: '#10b981' }, // emerald-500 - 현대적 홈
  { label: '문화/여가', value: 'culture', icon: FilmIcon, color: '#8b5cf6' }, // violet-500 - 영화/엔터테인먼트
  { label: '뷰티/건강', value: 'beauty', icon: HeartIcon, color: '#f97316' }, // orange-500 - 건강한 마음
  { label: '액티비티', value: 'activity', icon: BoltIcon, color: '#06b6d4' }, // cyan-500 - 에너지/활동
  { label: '교육', value: 'education', icon: AcademicCapIcon, color: '#3b82f6' }, // blue-500 - 학사모
  { label: '여행/교통', value: 'travel', icon: GlobeAltIcon, color: '#84cc16' }, // lime-500 - 지구본
];

export const BENEFIT_FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all' },
  { label: 'APP/기기', value: 'APP/기기' },
  { label: '테마파크', value: '테마파크' },
  { label: '워터파크/아쿠아리움', value: '워터파크/아쿠아리움' },
  { label: '액티비티', value: '액티비티' },
  { label: '뷰티', value: '뷰티' },
  { label: '건강', value: '건강' },
  { label: '쇼핑', value: '쇼핑' },
  { label: '생활/편의', value: '생활/편의' },
  { label: '베이커리/디저트', value: '베이커리/디저트' },
  { label: '음식점', value: '음식점' },
  { label: '영화/미디어', value: '영화/미디어' },
  { label: '공연/전시', value: '공연/전시' },
  { label: '교육', value: '교육' },
  { label: '여행/교통', value: '여행/교통' },
];

export const filterTabVariants = {
  gray: {
    base: 'px-3 h-[36px] flex items-center rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl min-w-fit backdrop-blur-sm',
    active: 'bg-light-gray text-black shadow-2xl scale-105 ring-2 ring-offset-2',
    inactive: 'text-gray-600 hover:bg-white/50 hover:text-gray-800 hover:scale-102',
  },
  white: {
    base: 'px-3 h-[36px] flex items-center bg-white/90 border border-gray-200/50 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl min-w-fit backdrop-blur-sm',
    active: 'shadow-2xl scale-105 ring-2 ring-offset-2 bg-white',
    inactive: 'text-gray-600 hover:bg-white hover:text-gray-800 hover:border-gray-300/70 hover:scale-102',
  },
} as const;
