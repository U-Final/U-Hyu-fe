import type { FilterTabItem } from './FilterTabs.types';

/**
 * 기본 필터 탭 목록
 * - label: 사용자에게 보여질 텍스트
 * - value: 내부에서 선택 상태를 구분할 값
 */
export const FILTER_TABS: FilterTabItem[] = [
  { label: '전체', value: 'all' },
  { label: '쇼핑', value: 'shopping' },
  { label: '푸드', value: 'food' },
  { label: '생활/편의', value: 'life' },
  { label: '문화/여가', value: 'culture' },
  { label: '뷰티/건강', value: 'beauty' },
  { label: '액티비티', value: 'activity' },
  { label: '교육', value: 'education' },
  { label: '여행/교통', value: 'travel' },
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
    base: 'px-[21px] h-[36px] flex items-center rounded-md text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl',
    active: 'bg-light-gray text-black shadow-xl',
    inactive: 'text-secondary hover:bg-gray-50',
  },
  white: {
    base: 'px-[21px] h-[36px] flex items-center bg-white border border-gray-200 rounded-md text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl',
    active: 'border-black text-primary shadow-xl',
    inactive: 'text-secondary hover:bg-gray-50',
  },
} as const;
