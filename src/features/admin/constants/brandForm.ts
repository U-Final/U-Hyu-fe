import type { AdminBrandBenefit } from '@admin/api/types';

// 초기 혜택 데이터
export const INITIAL_BENEFIT: AdminBrandBenefit = {
  grade: 'GOOD',
  description: '',
  benefitType: 'DISCOUNT',
};

// 등급 뱃지 옵션
export const GRADE_BADGES = [
  { value: 'VVIP', label: 'VVIP', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'VIP', label: 'VIP', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'GOOD', label: 'GOOD', color: 'bg-green-100 text-green-800 border-green-200' },
] as const;

// 혜택 타입 옵션
export const BENEFIT_TYPE_OPTIONS = [
  { value: 'DISCOUNT', label: '할인' },
  { value: 'GIFT', label: '증정품' },
] as const;

// 카테고리별 미리 정의된 스타일 클래스
export const CATEGORY_STYLES: Record<number, { selected: string; unselected: string }> = {
  1: { selected: 'bg-blue-100 text-blue-800 border-blue-300', unselected: 'hover:bg-blue-50 hover:border-blue-200' },
  2: { selected: 'bg-purple-100 text-purple-800 border-purple-300', unselected: 'hover:bg-purple-50 hover:border-purple-200' },
  3: { selected: 'bg-cyan-100 text-cyan-800 border-cyan-300', unselected: 'hover:bg-cyan-50 hover:border-cyan-200' },
  4: { selected: 'bg-emerald-100 text-emerald-800 border-emerald-300', unselected: 'hover:bg-emerald-50 hover:border-emerald-200' },
  5: { selected: 'bg-pink-100 text-pink-800 border-pink-300', unselected: 'hover:bg-pink-50 hover:border-pink-200' },
  6: { selected: 'bg-indigo-100 text-indigo-800 border-indigo-300', unselected: 'hover:bg-indigo-50 hover:border-indigo-200' },
  7: { selected: 'bg-gray-100 text-gray-800 border-gray-300', unselected: 'hover:bg-gray-50 hover:border-gray-200' },
  8: { selected: 'bg-amber-100 text-amber-800 border-amber-300', unselected: 'hover:bg-amber-50 hover:border-amber-200' },
  9: { selected: 'bg-red-100 text-red-800 border-red-300', unselected: 'hover:bg-red-50 hover:border-red-200' },
  10: { selected: 'bg-orange-100 text-orange-800 border-orange-300', unselected: 'hover:bg-orange-50 hover:border-orange-200' },
  11: { selected: 'bg-yellow-100 text-yellow-800 border-yellow-300', unselected: 'hover:bg-yellow-50 hover:border-yellow-200' },
  12: { selected: 'bg-violet-100 text-violet-800 border-violet-300', unselected: 'hover:bg-violet-50 hover:border-violet-200' },
  13: { selected: 'bg-teal-100 text-teal-800 border-teal-300', unselected: 'hover:bg-teal-50 hover:border-teal-200' },
  14: { selected: 'bg-sky-100 text-sky-800 border-sky-300', unselected: 'hover:bg-sky-50 hover:border-sky-200' },
} as const;

// 매장 타입 옵션
export const STORE_TYPE_OPTIONS = [
  { value: 'ONLINE', label: '온라인' },
  { value: 'OFFLINE', label: '오프라인' },
] as const;

// 폼 필드 플레이스홀더
export const FORM_PLACEHOLDERS = {
  brandName: '브랜드명을 입력하세요',
  usageLimit: '예: 일 1회, 월 2회',
  usageMethod: '사용 방법을 입력하세요',
  benefitDescription: '혜택 설명',
} as const;

// 파일 업로드 관련
export const FILE_UPLOAD_CONFIG = {
  accept: 'image/*',
  maxSize: '5MB',
  description: 'JPG, PNG, GIF 파일을 업로드할 수 있습니다. (최대 5MB)',
} as const; 