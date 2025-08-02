// 기본 통계 응답 타입
export interface BrandStatDetail {
  brandName: string;
  sumBookmarksByBrand: number;
}

export interface MembershipBrandDetail {
  brandName: string;
  sumMembershipUsageByBrand: number;
}

export interface RecommendBrandDetail {
  brandName: string;
  sumRecommendationsByBrand: number;
}

// 즐겨찾기 통계
export interface BookmarkStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory: number;
  bookmarksByBrandList: BrandStatDetail[];
}

// 필터링 통계
export interface FilteringStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsFilterByCategory: number;
}

// 추천 통계
export interface RecommendStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsRecommendationByCategory: number;
  recommendationsByBrandList: RecommendBrandDetail[];
}

// 멤버십 통계
export interface MembershipStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsMembershipUsageByCategory: number;
  membershipUsageByBrandList: MembershipBrandDetail[];
}

// 통합 카테고리 통계 (하위 호환성을 위해 유지)
export interface CategoryStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory?: number;
  sumStatisticsFilterByCategory?: number;
  sumStatisticsMembershipUsageByCategory?: number;
  bookmarksByBrandList?: BrandStatDetail[];
  membershipUsageByBrandList?: MembershipBrandDetail[];
}

// 전체 통계
export interface TotalStat {
  totalBookmark: number;
  totalFiltering: number;
  totalMembershipUsage: number;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

// 관리자용 브랜드 (전체 정보 - 브랜드 추가/수정 시 사용)
export interface AdminBrand {
  brandId: number;
  brandName: string;
  logoImage: string;
  categoryId: number;
  description: string;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  data: BrandBenefit[];
}

// 제휴처 목록 조회용 브랜드
export interface BrandListItem {
  brandId: number;
  brandName: string;
  logoImage: string;
  description: string;
}

// 제휴처 상세 조회용 브랜드
export interface BrandDetail {
  brandId: number;
  brandName: string;
  logoImage: string;
  usageMethod: string;
  usageLimit: string;
  benefitRes: BrandBenefitDesc[];
}

// 제휴처 상세 조회용 혜택 타입
export interface BrandBenefitDesc {
  grade: 'GOOD' | 'VIP' | 'VVIP';
  description: string;
}

// 제휴처 목록 조회 응답 타입
export interface BrandListResponse {
  brandList: BrandListItem[];
  hasNext: boolean;
  totalPages: number;
  currentPage: number;
}

// 브랜드 혜택 타입
export interface BrandBenefit {
  grade: 'GOOD' | 'VIP' | 'VVIP';
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
  brandImg: string; // 추가/수정 시에는 brandImg 사용
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  data: BrandBenefit[];
}

export interface UpdateBrandRequest {
  brandName?: string;
  brandImg?: string; // 추가/수정 시에는 brandImg 사용
  categoryId?: number;
  usageLimit?: string;
  usageMethod?: string;
  storeType?: 'ONLINE' | 'OFFLINE';
  data?: BrandBenefit[];
} 