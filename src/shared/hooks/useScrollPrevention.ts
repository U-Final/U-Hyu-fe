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
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      return;
    }

    cleanupRef.current = enableScrollPrevention({
      preventAll,
      preventVerticalOnly,
      scrollableSelectors,
    });

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [enabled, preventAll, preventVerticalOnly, scrollableSelectors]);

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