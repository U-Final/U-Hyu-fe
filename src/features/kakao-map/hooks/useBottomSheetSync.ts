import { useCallback, useEffect, useState } from 'react';

import { useMapUI } from './useMapUI';

/**
 * MapDragBottomSheet와 Context 상태 동기화를 위한 훅
 * Context + ref 하이브리드 패턴으로 최적화됨 - 최소 관심사 분리
 */
export const useBottomSheetSync = () => {
  const {
    bottomSheetState,
    isExplicitlyClosed,
    openBottomSheet,
    closeBottomSheet,
    setExplicitClosed,
  } = useMapUI();

  // 바텀시트 높이 상수들 - 리사이즈 대응
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const expandedY = 60;
  const middleY = windowHeight * 0.5;
  const collapsedY = windowHeight - 120;

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
   * 바텀시트 초기화 - 단순화
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

  return {
    // 상태 - 드래그/애니메이션 관련 제거
    bottomSheetState,
    isExplicitlyClosed,

    // 높이 상수
    expandedY,
    middleY,
    collapsedY,

    // 제어 함수들 - 단순화됨, Context 상태만 변경
    open: () => contextOpenBottomSheet('expanded'),
    openMiddle: () => contextOpenBottomSheet('middle'),
    close: () => contextCloseBottomSheet(true),
    setExplicitlyClosed: setExplicitClosed,
    initialize: initializeBottomSheet,
  };
};
