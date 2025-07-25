// 관리자 통계 관련 타입
export interface BrandStatDetail {
  brandName: string;
  count: number;
}

export interface CategoryStat {
  categoryId: number;
  categoryName: string;
  count: number;
  details: BrandStatDetail[];
}

export interface TotalStat {
  totalBookmark: number;
  totalFiltering: number;
  totalSearch: number;
  totalMembership: number;
}

export interface RecommendStat {
  categoryId: number;
  categoryName: string;
  count: number;
  details?: BrandStatDetail[];
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

// 브랜드(제휴처) 관련 타입 예시 (추후 확장)
export interface AdminBrand {
  brandId: number;
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  status: boolean; // 활성/비활성 여부(ERD 반영)
  data: BrandBenefit[];
}

export interface BrandBenefit {
  grade: string;
  description: string;
  benefitType: 'DISCOUNT' | 'GIFT';
}

export interface BookmarkChartProps {
  stats: CategoryStat[] | null;
  selectedCategoryId?: number | null;
  categories: Category[];
}

export interface FilteringChartProps {
  stats: CategoryStat[] | null;
  categories: Category[];
}

export interface SearchChartProps {
  stats: CategoryStat[] | null;
  selectedCategoryId?: number | null;
  categories: Category[];
}

export interface MembershipChartProps {
  stats: CategoryStat[] | null;
  selectedCategoryId?: number | null;
  categories: Category[];
}

export interface RecommendChartProps {
  stats: RecommendStat[] | null;
  selectedCategoryId?: number | null;
  categories: Category[];
} 