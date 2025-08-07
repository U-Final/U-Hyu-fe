/**
 * 매장 타입
 * - 'ONLINE' : 온라인 제휴처
 * - 'OFFLINE' : 오프라인 제휴처
 */
export type StoreType = 'ONLINE' | 'OFFLINE';

/**
 * 혜택 타입
 * - 'DISCOUNT' : 할인 혜택
 * - 'GIFT' : 사은품 제공
 */
export type BenefitType = 'DISCOUNT' | 'GIFT';

/**
 * 브랜드 정보 타입
 */
export interface Brand {
  brandId: number;
  brandName: string;
  logoImage: string;
  description: string | null;
}

/**
 * 제휴처 목록 조회 응답
 * 브랜드 리스트 + 페이지네이션 정보 타입
 */
export interface BrandListRes {
  brandList: Brand[];
  hasNext: boolean;
  totalPages: number;
  currentPage: number;
}

/**
 * 제휴처 목록 조회 API 파라미터
 */
export interface BrandListParams {
  category?: string;
  storeType?: StoreType;
  benefitType?: BenefitType;
  brand_name?: string;
  page?: number;
  size?: number;
}

/**
 * 등급별 혜택
 */
export interface GradeBenefit {
  grade: string;
  description: string;
}

/**
 * 제휴처 정보 상세 조회 응답
 */
export interface BrandDetailRes {
  brandId: number;
  brandName: string;
  logoImage: string;
  usageMethod: string;
  usageLimit: string;
  benefitRes: GradeBenefit[];
}