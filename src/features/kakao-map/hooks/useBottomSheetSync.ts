import { useCallback } from 'react';

import { useMapUI } from './useMapUI';

/**
 * MapDragBottomSheet와 Context 상태 동기화를 위한 훅
 * Context + ref 하이브리드 패턴으로 최적화됨
 */
export const useBottomSheetSync = () => {
  const {
    bottomSheetState,
    isExplicitlyClosed,
    isBottomSheetAnimating,
    bottomSheetY,
    openBottomSheet,
    closeBottomSheet,
    setExplicitClosed,
  } = useMapUI();

  // 바텀시트 높이 상수들
  const expandedY = 60;
  const middleY = window.innerHeight * 0.5;
  const collapsedY = window.innerHeight - 120;

  /**
   * 바텀시트 열기 (명시적 닫힌 상태 고려)
   */
  const contextOpenBottomSheet = useCallback(
    (level: 'middle' | 'expanded', animate = true) => {
      // 명시적으로 닫힌 상태에서는 middle 열기 차단
      if (isExplicitlyClosed && level !== 'expanded') {
        if (import.meta.env.MODE === 'development') {
          console.log('명시적으로 닫힌 상태 - middle 열기 무시');
        }
        return;
      }

      openBottomSheet(level, animate);
    },
    [openBottomSheet, isExplicitlyClosed]
  );

  /**
   * 바텀시트 닫기
   */
  const contextCloseBottomSheet = useCallback(
    (explicit = false, animate = true) => {
      closeBottomSheet(explicit, animate);
    },
    [closeBottomSheet]
  );

  /**
   * 드래그 완료 시 최종 상태 결정 - 단순화된 로직
   */
  const finalizeDragPosition = useCallback(
    (finalY: number) => {
      const middleThreshold = window.innerHeight * 0.25; // 임계값 조정

      if (import.meta.env.MODE === 'development') {
        console.log('드래그 최종 위치:', finalY, '임계값:', middleThreshold);
      }

      // 드래그 위치에 따른 상태 결정
      if (finalY < middleY - middleThreshold) {
        // 위쪽으로 드래그 → 확장
        setExplicitClosed(false);
        contextOpenBottomSheet('expanded');
      } else if (finalY > middleY + middleThreshold) {
        // 아래쪽으로 드래그 → 닫기
        setExplicitClosed(true);
        contextCloseBottomSheet(true);
      } else {
        // 중간 영역 → 중간 상태
        if (!isExplicitlyClosed) {
          setExplicitClosed(false);
          contextOpenBottomSheet('middle');
        } else {
          // 명시적으로 닫힌 상태라면 닫힌 상태 유지
          contextCloseBottomSheet(true);
        }
      }
    },
    [
      middleY,
      isExplicitlyClosed,
      setExplicitClosed,
      contextOpenBottomSheet,
      contextCloseBottomSheet,
    ]
  );

  /**
   * 바텀시트 초기화
   */
  const initializeBottomSheet = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 초기화, 명시적 닫힘:', isExplicitlyClosed);
    }

    if (isExplicitlyClosed) {
      return;
    }

    // 약간의 지연 후 중간 상태로 열기
    setTimeout(() => {
      if (!isExplicitlyClosed) {
        contextOpenBottomSheet('middle');
      }
    }, 100);
  }, [isExplicitlyClosed, contextOpenBottomSheet]);

  /**
   * 배경 클릭 시 중간 상태로 변경
   */
  const handleBackgroundClick = useCallback(() => {
    if (bottomSheetState === 'expanded' && !isExplicitlyClosed) {
      contextOpenBottomSheet('middle');
    }
  }, [bottomSheetState, isExplicitlyClosed, contextOpenBottomSheet]);

  return {
    // 상태
    bottomSheetState,
    isExplicitlyClosed,
    isBottomSheetAnimating,
    bottomSheetY,

    // 높이 상수
    expandedY,
    middleY,
    collapsedY,

    // 제어 함수들 - 단순화됨
    open: () => contextOpenBottomSheet('expanded'),
    openMiddle: () => contextOpenBottomSheet('middle'),
    close: () => contextCloseBottomSheet(true),
    setExplicitlyClosed: setExplicitClosed,
    initialize: initializeBottomSheet,

    // 드래그 관련
    finalizeDragPosition,

    // 기타
    handleBackgroundClick,
  };
};
