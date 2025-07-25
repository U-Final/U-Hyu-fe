import { useCallback } from 'react';
import { useMapUI } from './useMapUI';

/**
 * MapDragBottomSheet와 Context 상태 동기화를 위한 훅
 * 기존 ref 기반 제어를 Context 기반으로 전환하는 과도기 단계
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
    setBottomSheetY,
  } = useMapUI();

  // 바텀시트 높이 상수들
  const expandedY = 60;
  const middleY = window.innerHeight * 0.5;
  const collapsedY = window.innerHeight - 120;

  /**
   * Context에서 바텀시트 열기
   */
  const contextOpenBottomSheet = useCallback((level: 'middle' | 'expanded', animate = true) => {
    // 명시적으로 닫힌 상태에서는 middle 열기 차단
    if (isExplicitlyClosed && level !== 'expanded') {
      if (import.meta.env.MODE === 'development') {
        console.log('명시적으로 닫힌 상태 - middle 열기 무시');
      }
      return;
    }
    
    openBottomSheet(level, animate);
  }, [openBottomSheet, isExplicitlyClosed]);

  /**
   * Context에서 바텀시트 닫기
   */
  const contextCloseBottomSheet = useCallback((explicit = false, animate = true) => {
    closeBottomSheet(explicit, animate);
  }, [closeBottomSheet]);

  /**
   * 드래그 중 Y 위치 업데이트
   */
  const updateDragPosition = useCallback((y: number) => {
    setBottomSheetY(y);
  }, [setBottomSheetY]);

  /**
   * 드래그 완료 시 최종 상태 결정
   */
  const finalizeDragPosition = useCallback((finalY: number) => {
    const middleThreshold = window.innerHeight * 0.22;
    
    if (finalY < middleY - middleThreshold) {
      setExplicitClosed(false);
      contextOpenBottomSheet('expanded');
    } else if (finalY > middleY + middleThreshold) {
      setExplicitClosed(true);
      contextCloseBottomSheet(true);
    } else {
      if (!isExplicitlyClosed) {
        setExplicitClosed(false);
        contextOpenBottomSheet('middle');
      }
    }
  }, [middleY, isExplicitlyClosed, setExplicitClosed, contextOpenBottomSheet, contextCloseBottomSheet]);

  /**
   * 바텀시트 초기화
   */
  const initializeBottomSheet = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 Context 초기화');
    }

    if (isExplicitlyClosed) {
      return;
    }

    setTimeout(() => {
      if (!isExplicitlyClosed) {
        contextOpenBottomSheet('middle');
      }
    }, 100);
  }, [isExplicitlyClosed, contextOpenBottomSheet]);

  /**
   * 전체 화면에서 배경 클릭 시 중간 상태로 변경
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
    
    // 제어 함수들
    open: () => contextOpenBottomSheet('expanded'),
    openMiddle: () => contextOpenBottomSheet('middle'),
    close: () => contextCloseBottomSheet(true),
    setExplicitlyClosed: setExplicitClosed,
    initialize: initializeBottomSheet,
    
    // 드래그 관련
    updateDragPosition,
    finalizeDragPosition,
    
    // 기타
    handleBackgroundClick,
  };
};