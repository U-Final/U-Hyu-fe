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
  selectedBrands: string[];
  onBrandToggle?: (brandId: string) => void;
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
