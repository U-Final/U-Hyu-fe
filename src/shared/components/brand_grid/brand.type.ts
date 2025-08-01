import type { ApiBrand } from './api/types';

export interface Brand {
  id: number;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  logo?: string;
  logoAlt?: string;
  imagePath: string;
}

export interface BrandGridProps {
  selectedBrands: number[];
  onBrandToggle?: (brandId: number) => void;
  title: string;
  disabled?: boolean;
}

export interface BrandLogoProps {
  brand: Brand;
  isSelected: boolean;
  onClick?: () => void;
  delay?: number;
  disabled?: boolean;
}

/**
 * API 브랜드를 기존 Brand 타입으로 변환하는 함수
 */
export const convertApiBrandToBrand = (apiBrand: ApiBrand): Brand => ({
  id: apiBrand.brandId,
  name: apiBrand.brandName,
  color: '#3182CE', // 기본 색상
  bgColor: 'bg-blue-500',
  textColor: 'text-white',
  imagePath: apiBrand.logoImage,
  logo: apiBrand.logoImage,
  logoAlt: apiBrand.brandName,
});
