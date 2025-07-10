import type { FilterTabItem } from "./FilterTabs.types";

/**
 * 기본 필터 탭 목록
 * - label: 사용자에게 보여질 텍스트
 * - value: 내부에서 선택 상태를 구분할 값
 */
export const FILTER_TABS: FilterTabItem[] = [
  { label: "전체", value: "all" },
  { label: "액티비티", value: "activity" },
  { label: "뷰티/건강", value: "beauty" },
  { label: "쇼핑", value: "shopping" },
  { label: "생활/편의", value: "life" },
  { label: "푸드", value: "food" },
  { label: "문화/여가", value: "culture" },
  { label: "교육", value: "education" },
  { label: "여행/교통", value: "travel" },
];

export const filterTabVariants = {
  gray: {
    base: "px-4 py-2 rounded-lg text-sm font-bold",
    active: "bg-light-gray text-black",
    inactive: "text-secondary",
  },
  white: {
    base: "px-4 py-2 bg-white rounded-lg shadow-md text-sm font-bold ",
    active: "border-black text-primary",
    inactive: "text-secondary",
  },
} as const;
