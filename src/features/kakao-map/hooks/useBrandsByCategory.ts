import { useMemo } from 'react';

import { getCategoryId } from '../constants/categoryMapping';
import type { StoreCategory } from '../types/category';
import { useCategoryBrandsQuery } from './useMapQueries';

/**
 * 카테고리별 브랜드 목록 조회 훅
 * 프론트엔드 카테고리 키를 받아 해당 카테고리의 브랜드 목록을 반환
 *
 * @param categoryKey - 프론트엔드 카테고리 키 (null이면 쿼리 비활성화)
 * @returns 브랜드 목록, 로딩 상태, 에러 정보
 */
export const useBrandsByCategory = (categoryKey: StoreCategory | null) => {
  // 카테고리 키를 백엔드 카테고리 ID로 변환
  const categoryId = useMemo(() => {
    if (!categoryKey || categoryKey === 'all') {
      return 0; // 전체 카테고리이거나 null인 경우 0으로 처리
    }
    return getCategoryId(categoryKey);
  }, [categoryKey]);

  // 카테고리별 브랜드 조회 쿼리 실행
  const { data, isLoading, error, isError, refetch } = useCategoryBrandsQuery({
    categoryId,
  });

  // 브랜드 목록을 문자열 배열로 변환
  const brands = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }
    return data.data.map(brand => brand.brandName);
  }, [data]);

  // 에러 상태 분석
  const errorMessage = useMemo(() => {
    if (!isError || !error) return null;

    // Axios 에러인 경우
    if (
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'status' in error.response
    ) {
      const status = error.response.status;
      switch (status) {
        case 404:
          return '해당 카테고리에 등록된 브랜드가 없습니다.';
        case 400:
          return '잘못된 카테고리입니다.';
        case 500:
          return '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        default:
          return '브랜드 정보를 가져오는데 실패했습니다.';
      }
    }

    // 네트워크 에러인 경우
    if ('code' in error && error.code === 'NETWORK_ERROR') {
      return '네트워크 연결을 확인해 주세요.';
    }

    return '알 수 없는 오류가 발생했습니다.';
  }, [isError, error]);

  return {
    /** 브랜드 이름 목록 */
    brands,
    /** 브랜드 개수 */
    brandCount: brands.length,
    /** 로딩 상태 */
    isLoading,
    /** 에러 발생 여부 */
    isError,
    /** 에러 메시지 */
    errorMessage,
    /** 데이터가 비어있는지 여부 */
    isEmpty: !isLoading && brands.length === 0,
    /** 쿼리 재실행 함수 */
    refetch,
    /** 원본 응답 데이터 (디버깅용) */
    rawData: data,
  };
};

/**
 * 조건부 브랜드 조회 훅
 * 특정 조건일 때만 브랜드를 조회하는 최적화된 버전
 *
 * @param categoryKey - 프론트엔드 카테고리 키
 * @param enabled - 쿼리 실행 조건
 * @returns 브랜드 목록과 상태 정보
 */
export const useBrandsByCategoryWhen = (
  categoryKey: StoreCategory | null,
  enabled: boolean = true
) => {
  const result = useBrandsByCategory(enabled ? categoryKey : null);

  return {
    ...result,
    /** 쿼리가 비활성화된 상태인지 여부 */
    isDisabled: !enabled,
  };
};

/**
 * 개발 환경에서 브랜드 조회 상태를 디버깅하기 위한 훅
 * 프로덕션에서는 빈 객체 반환
 *
 * @param categoryKey - 카테고리 키
 * @returns 디버깅 정보 (개발 환경에서만)
 */
export const useBrandsCategoryDebug = (categoryKey: StoreCategory | null) => {
  const result = useBrandsByCategory(categoryKey);

  if (import.meta.env.MODE !== 'development') {
    return {};
  }

  return {
    debugInfo: {
      categoryKey,
      categoryId: categoryKey ? getCategoryId(categoryKey) : null,
      brandCount: result.brandCount,
      isLoading: result.isLoading,
      isError: result.isError,
      errorMessage: result.errorMessage,
      isEmpty: result.isEmpty,
    },
    logState: () => {
      // 디버깅 로그는 제거됨
    },
  };
};
