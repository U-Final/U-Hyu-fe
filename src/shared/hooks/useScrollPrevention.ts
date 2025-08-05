import { useEffect, useRef } from 'react';

import { enableScrollPrevention } from '../utils/scrollUtils';

interface UseScrollPreventionOptions {
  /** 전체 스크롤 방지 여부 */
  preventAll?: boolean;
  /** 세로 스크롤만 방지 여부 */
  preventVerticalOnly?: boolean;
  /** 스크롤 가능한 영역 셀렉터들 */
  scrollableSelectors?: string[];
  /** 스크롤 방지 활성화 여부 */
  enabled?: boolean;
}

/**
 * 스크롤 방지를 위한 React Hook
 * 
 * @example
 * ```tsx
 * // 기본 사용 (세로 스크롤만 방지)
 * useScrollPrevention();
 * 
 * // 전체 스크롤 방지
 * useScrollPrevention({ preventAll: true });
 * 
 * // 조건부 활성화
 * useScrollPrevention({ enabled: isModalOpen });
 * ```
 */
export function useScrollPrevention(options: UseScrollPreventionOptions = {}) {
  const {
    preventAll = false,
    preventVerticalOnly = true,
    scrollableSelectors,
    enabled = true,
  } = options;

  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled) {
      // 비활성화 시 기존 클린업 실행
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      return;
    }

    // 스크롤 방지 활성화
    cleanupRef.current = enableScrollPrevention({
      preventAll,
      preventVerticalOnly,
      scrollableSelectors,
    });

    // 컴포넌트 언마운트 시 클린업
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [enabled, preventAll, preventVerticalOnly, scrollableSelectors]);

  // 수동 제어 함수들 반환
  return {
    enable: () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      cleanupRef.current = enableScrollPrevention({
        preventAll,
        preventVerticalOnly,
        scrollableSelectors,
      });
    },
    disable: () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    },
  };
}