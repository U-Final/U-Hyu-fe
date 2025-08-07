import { useEffect } from 'react';

/**
 * 스크롤 방지 관련 유틸리티 함수들
 */

interface ScrollPreventionOptions {
  /** 전체 스크롤 방지 여부 */
  preventAll?: boolean;
  /** 세로 스크롤만 방지 여부 */
  preventVerticalOnly?: boolean;
  /** 스크롤 가능한 영역 셀렉터들 */
  scrollableSelectors?: string[];
}

/**
 * 기본 스크롤 가능한 영역 셀렉터들
 */
const DEFAULT_SCROLLABLE_SELECTORS = [
  '[data-scrollable="true"]',
  '.overflow-x-auto',
  '.overflow-y-auto',
  '.overflow-auto',
  '.scrollbar-hide',
  '[class*="overflow-x"]',
  '[class*="overflow-y"]',
  '.bottom-sheet-content',
  '.modal-content',
];

/**
 * 스크롤 방지를 활성화하는 함수
 */
export function enableScrollPrevention(options: ScrollPreventionOptions = {}) {
  const {
    preventAll = false,
    preventVerticalOnly = true,
    scrollableSelectors = DEFAULT_SCROLLABLE_SELECTORS,
  } = options;

  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  const originalHtmlOverflow = htmlElement.style.overflow;
  const originalBodyOverflow = bodyElement.style.overflow;
  const originalBodyOverflowY = bodyElement.style.overflowY;
  const originalBodyOverflowX = bodyElement.style.overflowX;
  const originalBodyPosition = bodyElement.style.position;
  const originalBodyWidth = bodyElement.style.width;
  const originalBodyTop = bodyElement.style.top;
  const originalBodyLeft = bodyElement.style.left;
  const originalBodyHeight = bodyElement.style.height;

  htmlElement.style.overflow = 'hidden';

  if (preventAll) {
    bodyElement.style.overflow = 'hidden';
  } else if (preventVerticalOnly) {
    bodyElement.style.overflowY = 'hidden';
    bodyElement.style.overflowX = 'visible';
  }

  bodyElement.style.position = 'fixed';
  bodyElement.style.width = '100%';
  bodyElement.style.height = '100%';
  bodyElement.style.top = `-${scrollY}px`;
  bodyElement.style.left = `-${scrollX}px`;

  const touchState = {
    startX: 0,
    startY: 0,
    startTime: 0,
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchState.startX = touch.clientX;
      touchState.startY = touch.clientY;
      touchState.startTime = Date.now();
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const target = e.target as HTMLElement;

    const isScrollableArea = scrollableSelectors.some(selector => {
      try {
        const element = target.closest(selector);
        if (!element) return false;

        const computedStyle = window.getComputedStyle(element);
        const hasVerticalScroll = element.scrollHeight > element.clientHeight;
        const hasHorizontalScroll = element.scrollWidth > element.clientWidth;

        return (
          ((computedStyle.overflowY === 'auto' ||
            computedStyle.overflowY === 'scroll') &&
            hasVerticalScroll) ||
          ((computedStyle.overflowX === 'auto' ||
            computedStyle.overflowX === 'scroll') &&
            hasHorizontalScroll) ||
          computedStyle.overflow === 'auto' ||
          computedStyle.overflow === 'scroll'
        );
      } catch {
        return false;
      }
    });

    if (isScrollableArea) {
      return;
    }

    if (preventAll) {
      e.preventDefault();
      return;
    }

    if (preventVerticalOnly) {
      const touch = e.touches[0];
      if (touch) {
        const deltaX = Math.abs(touch.clientX - touchState.startX);
        const deltaY = Math.abs(touch.clientY - touchState.startY);
        const timeElapsed = Date.now() - touchState.startTime;

        if (timeElapsed > 50) {
          const isVerticalSwipe = deltaY > deltaX && deltaY > 15;
          const isHorizontalSwipe = deltaX > deltaY && deltaX > 15;

          if (isVerticalSwipe && !isHorizontalSwipe) {
            e.preventDefault();
          }
        }
      }
    }
  };

  const handleWheel = (e: WheelEvent) => {
    const target = e.target as HTMLElement;

    const isScrollableArea = scrollableSelectors.some(selector => {
      try {
        const element = target.closest(selector);
        if (!element) return false;

        const computedStyle = window.getComputedStyle(element);
        const hasVerticalScroll = element.scrollHeight > element.clientHeight;

        return (
          ((computedStyle.overflowY === 'auto' ||
            computedStyle.overflowY === 'scroll') &&
            hasVerticalScroll) ||
          (computedStyle.overflow === 'auto' ||
            computedStyle.overflow === 'scroll')
        );
      } catch {
        return false;
      }
    });

    if (!isScrollableArea) {
      if (
        preventAll ||
        (preventVerticalOnly && Math.abs(e.deltaY) > Math.abs(e.deltaX))
      ) {
        e.preventDefault();
      }
    }
  };

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    htmlElement.style.overflow = originalHtmlOverflow;
    bodyElement.style.overflow = originalBodyOverflow;
    bodyElement.style.overflowY = originalBodyOverflowY;
    bodyElement.style.overflowX = originalBodyOverflowX;
    bodyElement.style.position = originalBodyPosition;
    bodyElement.style.width = originalBodyWidth;
    bodyElement.style.height = originalBodyHeight;
    bodyElement.style.top = originalBodyTop;
    bodyElement.style.left = originalBodyLeft;

    window.scrollTo(scrollX, scrollY);

    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('wheel', handleWheel);
  };
}

/**
 * 스크롤 방지를 비활성화하는 함수 (enableScrollPrevention의 클린업 함수와 동일)
 */
export function disableScrollPrevention() {
  const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
  const scrollX = Math.abs(parseInt(document.body.style.left || '0', 10));

  document.body.style.overflow = '';
  document.body.style.overflowY = '';
  document.body.style.overflowX = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.left = '';

  window.scrollTo(scrollX, scrollY);
}

/**
 * React Hook으로 스크롤 방지 사용
 */
export function useScrollPrevention(
  enabled: boolean = true,
  options: ScrollPreventionOptions = {}
) {
  const cleanupRef = { current: null as (() => void) | null };

  const enable = () => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    cleanupRef.current = enableScrollPrevention(options);
  };

  const disable = () => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  };

  useEffect(() => {
    if (enabled && !cleanupRef.current) {
      enable();
    } else if (!enabled && cleanupRef.current) {
      disable();
    }
  }, [enabled, enable, disable]);

  return { enable, disable };
}
