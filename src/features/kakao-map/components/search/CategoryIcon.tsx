import React from 'react';

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
import {
  MdLocalConvenienceStore,
  MdLocalGasStation,
  MdSchool,
} from 'react-icons/md';

import { getCategoryColorFromFilter } from '../../utils/categoryColorMapping';

const CATEGORY_ICON_MAP = {
  MT1: ShoppingCart,
  CS2: MdLocalConvenienceStore,
  PS3: Baby,
  SC4: MdSchool,
  AC5: GraduationCap,
  PK6: Car,
  OL7: MdLocalGasStation,
  SW8: Train,
  BK9: Banknote,
  CT1: Palette,
  AG2: Home,
  PO3: Building2,
  AT4: Camera,
  AD5: Bed,
  FD6: UtensilsCrossed,
  CE7: Coffee,
  HP8: Heart,
  PM9: Pill,
  DEFAULT: MapPin,
} as const;

export const CATEGORY_COLOR_MAP = {
  MT1: '#ef4444',
  CS2: '#22c55e',
  PS3: '#f59e0b',
  SC4: '#3b82f6',
  AC5: '#8b5cf6',
  PK6: '#6b7280',
  OL7: '#f97316',
  SW8: '#06b6d4',
  BK9: '#eab308',
  CT1: '#ec4899',
  AG2: '#84cc16',
  PO3: '#64748b',
  AT4: '#10b981',
  AD5: '#6366f1',
  FD6: '#f59e0b',
  CE7: '#a855f7',
  HP8: '#ef4444',
  PM9: '#059669',
  DEFAULT: '#6b7280',
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
  if (categoryGroupCode && categoryGroupCode.trim() !== '') {
    return categoryGroupCode;
  }

  if (!category || category.trim() === '') {
    return 'DEFAULT';
  }

  const categoryParts = category.split(' > ').map(part => part.trim());

  const matchCategory = (parts: string[]): string => {
    const firstCategory = parts[0];
    const secondCategory = parts[1];
    const thirdCategory = parts[2];

    const categoryMappings: Record<string, string> = {
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

    if (firstCategory && categoryMappings[firstCategory]) {
      return categoryMappings[firstCategory];
    }

    if (secondCategory && categoryMappings[secondCategory]) {
      return categoryMappings[secondCategory];
    }

    if (thirdCategory && categoryMappings[thirdCategory]) {
      return categoryMappings[thirdCategory];
    }

    return 'DEFAULT';
  };

  return matchCategory(categoryParts);
};

interface CategoryIconProps {
  category: string;
  categoryGroupCode?: string;
  size?: number;
  isSelected?: boolean;
  className?: string;
  color?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  categoryGroupCode,
  size = 18,
  isSelected = false,
  className = '',
  color,
}) => {
  const code = getCategoryGroupCode(category, categoryGroupCode);

  const IconComponent =
    CATEGORY_ICON_MAP[code as keyof typeof CATEGORY_ICON_MAP] ||
    CATEGORY_ICON_MAP.DEFAULT;

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

export const CategoryIconContainer: React.FC<
  CategoryIconProps & {
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
