import React from 'react';

// Lucide React icons (더 나은 카테고리별 아이콘)
import {
  Baby,
  Banknote,
  Bed,
  Building2,
  Camera,
  Car,
  Coffee,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  Palette,
  Pill,
  ShoppingCart,
  Train,
  UtensilsCrossed,
} from 'lucide-react';
// React Icons (특정 카테고리용 추가 아이콘)
import {
  MdLocalConvenienceStore,
  MdLocalGasStation,
  MdSchool,
} from 'react-icons/md';

import { getCategoryColorFromFilter } from '../../utils/categoryColorMapping';

/**
 * 카카오 맵 카테고리 그룹 코드별 아이콘 매핑 (더 적절한 아이콘 사용)
 */
const CATEGORY_ICON_MAP = {
  // 대형마트 - 쇼핑카트 아이콘
  MT1: ShoppingCart,
  // 편의점 - 편의점 전용 아이콘
  CS2: MdLocalConvenienceStore,
  // 어린이집, 유치원 - 아기 아이콘
  PS3: Baby,
  // 학교 - 학교 건물 아이콘
  SC4: MdSchool,
  // 학원 - 졸업모 아이콘
  AC5: GraduationCap,
  // 주차장 - 자동차 아이콘
  PK6: Car,
  // 주유소, 충전소 - 주유소 전용 아이콘
  OL7: MdLocalGasStation,
  // 지하철역 - 기차 아이콘
  SW8: Train,
  // 은행 - 지폐 아이콘
  BK9: Banknote,
  // 문화시설 - 팔레트 아이콘
  CT1: Palette,
  // 중개업소 - 집 아이콘
  AG2: Home,
  // 공공기관 - 건물 아이콘
  PO3: Building2,
  // 관광명소 - 카메라 아이콘
  AT4: Camera,
  // 숙박 - 침대 아이콘
  AD5: Bed,
  // 음식점 - 식기 아이콘
  FD6: UtensilsCrossed,
  // 카페 - 커피 아이콘
  CE7: Coffee,
  // 병원 - 하트 아이콘
  HP8: Heart,
  // 약국 - 알약 아이콘
  PM9: Pill,
  // 일반 마커 (카테고리 코드가 없거나 매칭되지 않는 경우)
  DEFAULT: MapPin,
} as const;

/**
 * 카테고리별 색상 매핑
 */
export const CATEGORY_COLOR_MAP = {
  MT1: '#ef4444', // red-500 - 대형마트
  CS2: '#22c55e', // green-500 - 편의점
  PS3: '#f59e0b', // amber-500 - 어린이집, 유치원
  SC4: '#3b82f6', // blue-500 - 학교
  AC5: '#8b5cf6', // violet-500 - 학원
  PK6: '#6b7280', // gray-500 - 주차장
  OL7: '#f97316', // orange-500 - 주유소, 충전소
  SW8: '#06b6d4', // cyan-500 - 지하철역
  BK9: '#eab308', // yellow-500 - 은행
  CT1: '#ec4899', // pink-500 - 문화시설
  AG2: '#84cc16', // lime-500 - 중개업소
  PO3: '#64748b', // slate-500 - 공공기관
  AT4: '#10b981', // emerald-500 - 관광명소
  AD5: '#6366f1', // indigo-500 - 숙박
  FD6: '#f59e0b', // amber-500 - 음식점
  CE7: '#a855f7', // purple-500 - 카페
  HP8: '#ef4444', // red-500 - 병원
  PM9: '#059669', // emerald-600 - 약국
  DEFAULT: '#6b7280', // gray-500 - 일반 마커
} as const;

/**
 * 카테고리 그룹 코드 추출 함수
 * @param category 카테고리 문자열 ("음식점 > 한식 > 고기구이")
 * @param categoryGroupCode 카테고리 그룹 코드 (우선 사용)
 * @returns 카테고리 그룹 코드
 */
export const getCategoryGroupCode = (
  category: string,
  categoryGroupCode?: string
): string => {
  // categoryGroupCode가 있고 빈 문자열이 아니면 우선 사용
  if (categoryGroupCode && categoryGroupCode.trim() !== '') {
    return categoryGroupCode;
  }

  // category도 비어있으면 기본 마커 사용
  if (!category || category.trim() === '') {
    return 'DEFAULT';
  }

  // 기존 로직 (하위 호환성을 위해 유지)
  const categoryParts = category.split(' > ').map(part => part.trim());

  // 카테고리 매칭 함수
  const matchCategory = (parts: string[]): string => {
    // 첫 번째 카테고리로 매칭
    const firstCategory = parts[0];
    const secondCategory = parts[1];
    const thirdCategory = parts[2];

    // 정확한 매칭을 위한 매핑
    const categoryMappings: Record<string, string> = {
      // 첫 번째 카테고리 매칭
      대형마트: 'MT1',
      편의점: 'CS2',
      어린이집: 'PS3',
      유치원: 'PS3',
      학교: 'SC4',
      학원: 'AC5',
      주차장: 'PK6',
      주유소: 'OL7',
      충전소: 'OL7',
      지하철역: 'SW8',
      은행: 'BK9',
      문화시설: 'CT1',
      중개업소: 'AG2',
      공공기관: 'PO3',
      관광명소: 'AT4',
      숙박: 'AD5',
      음식점: 'FD6',
      카페: 'CE7',
      병원: 'HP8',
      약국: 'PM9',
      부동산: 'AG2',
      여행: 'AT4',
      '가정,생활': 'CS2',
      '서비스,산업': 'PO3',
      '교통,수송': 'SW8',
      '금융,보험': 'BK9',

      // 두 번째 카테고리 매칭
      드럭스토어: 'CS2',
      주거시설: 'AG2',
      금융서비스: 'BK9',
      교통시설: 'SW8',
      미용실: 'PO3',
      피부관리: 'PO3',
      밀키트: 'CS2',
      정보통신: 'PO3',
      부동산서비스: 'AG2',
      '지하철,전철': 'SW8',
      도로시설: 'SW8',
      미용: 'PO3',
      식품판매: 'CS2',
      '관광,명소': 'AT4',
    };

    // 첫 번째 카테고리로 매칭 시도
    if (firstCategory && categoryMappings[firstCategory]) {
      return categoryMappings[firstCategory];
    }

    // 두 번째 카테고리로 매칭 시도
    if (secondCategory && categoryMappings[secondCategory]) {
      return categoryMappings[secondCategory];
    }

    // 세 번째 카테고리로 매칭 시도
    if (thirdCategory && categoryMappings[thirdCategory]) {
      return categoryMappings[thirdCategory];
    }

    // 기본값: 일반 마커 (매칭되지 않는 카테고리)
    return 'DEFAULT';
  };

  return matchCategory(categoryParts);
};

interface CategoryIconProps {
  /** 카테고리 문자열 */
  category: string;
  /** 카테고리 그룹 코드 (우선 사용) */
  categoryGroupCode?: string;
  /** 아이콘 크기 */
  size?: number;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 아이콘 색상 오버라이드 */
  color?: string;
}

/**
 * 카테고리별 아이콘을 표시하는 컴포넌트
 */
export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  categoryGroupCode,
  size = 18,
  isSelected = false,
  className = '',
  color,
}) => {
  // 카테고리 그룹 코드 추출
  const code = getCategoryGroupCode(category, categoryGroupCode);

  // 아이콘 컴포넌트 가져오기
  const IconComponent =
    CATEGORY_ICON_MAP[code as keyof typeof CATEGORY_ICON_MAP] ||
    CATEGORY_ICON_MAP.DEFAULT;

  // 색상 가져오기 - color prop이 있으면 우선 사용
  const iconColor =
    color || (isSelected ? '#3b82f6' : getCategoryColorFromFilter(category));

  return (
    <IconComponent
      width={size}
      height={size}
      style={{
        color: iconColor,
      }}
      className={`transition-colors duration-200 ${className}`}
    />
  );
};

/**
 * 카테고리별 배경색을 포함한 아이콘 컨테이너 컴포넌트
 */
export const CategoryIconContainer: React.FC<
  CategoryIconProps & {
    /** 컨테이너 크기 */
    containerSize?: number;
  }
> = ({
  category,
  categoryGroupCode,
  size = 18,
  isSelected = false,
  className = '',
  containerSize = 40,
}) => {
  // 배경 색상 (더 연한 버전)
  const backgroundColor = isSelected ? '#dbeafe' : '#f3f4f6';
  const borderColor = isSelected ? '#3b82f6' : 'transparent';

  return (
    <div
      className={`
        flex items-center justify-center rounded-lg transition-all duration-200
        ${className}
      `}
      style={{
        width: containerSize,
        height: containerSize,
        backgroundColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <CategoryIcon
        category={category}
        categoryGroupCode={categoryGroupCode}
        size={size}
        isSelected={isSelected}
      />
    </div>
  );
};

export default CategoryIcon;
