import type { 
  AdminBrand, 
  BookmarkStat, 
  FilteringStat, 
  RecommendStat, 
  MembershipStat,
  TotalStat 
} from '../api/types';

// === Stats 관련 컴포넌트 Props ===
export interface BookmarkChartProps {
  data: BookmarkStat[];
  selectedCategory?: string;
}

export interface FilteringChartProps {
  data: FilteringStat[];
  selectedCategory?: string;
}

export interface RecommendChartProps {
  data: RecommendStat[];
  selectedCategory?: string;
}

export interface MembershipChartProps {
  data: MembershipStat[];
  selectedCategory?: string;
}

export interface StatsSummaryCardsProps {
  totalStats: TotalStat;
}

// === Brand 관련 컴포넌트 Props ===
export interface AdminBrandCardProps {
  brand: AdminBrand;
}

export interface AdminBrandFormProps {
  brand?: AdminBrand | null;
  onSuccess: () => void;
}

export interface AdminBrandModalProps {
  brandId?: number;
}

export interface BrandFormProps {
  brand?: AdminBrand;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface BrandListItemProps {
  brand: AdminBrand;
  onEdit: (brand: AdminBrand) => void;
  onDelete: (brandId: number) => void;
}

// === Common 컴포넌트 Props ===
export interface CategoryFilterProps {
  selectedCategory: import('../constants/categories').CategoryId;
  onCategoryChange: (category: import('../constants/categories').CategoryId) => void;
}

export interface AdminToggleTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{
    key: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
} 