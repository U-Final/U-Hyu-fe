export interface BrandStatDetail {
  brandName: string;
  sumBookmarksByBrand: number;
}

export interface CategoryStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory?: number;
  sumStatisticsFilterByCategory?: number;
  sumStatisticsMembershipUsageByCategory?: number;
  bookmarksByBrandList?: BrandStatDetail[];
  membershipUsageByBrandList?: {
    brandName: string;
    sumMembershipUsageByBrand: number;
  }[];
}

export interface TotalStat {
  totalBookmark: number;
  totalFiltering: number;
  totalMembershipUsage: number;
}

export interface RecommendStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsRecommendationByCategory: number;
  recommendationsByBrandList: {
    brandName: string;
    sumRecommendationsByBrand: number;
  }[];
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

// 브랜드 관리 관련 타입
export interface AdminBrand {
  brandId: number;
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  status: boolean; // 활성/비활성 여부
  data: BrandBenefit[];
}

export interface BrandBenefit {
  grade: string;
  description: string;
  benefitType: 'DISCOUNT' | 'GIFT';
}

// 탭 관련 타입
export interface Tab {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type TabKey = 'bookmark' | 'filtering' | 'recommendation' | 'membership' | 'total' | 'brands';

// 브랜드 생성/수정 요청 타입
export interface CreateBrandRequest {
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  data: BrandBenefit[];
}

export interface UpdateBrandRequest {
  brandName?: string;
  brandImg?: string;
  categoryId?: number;
  usageLimit?: string;
  usageMethod?: string;
  storeType?: 'ONLINE' | 'OFFLINE';
  status?: boolean;
  data?: BrandBenefit[];
} 