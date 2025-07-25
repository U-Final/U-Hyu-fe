import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import { useBottomSheetSync } from '../hooks/useBottomSheetSync';

interface MapDragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
}

export interface MapDragBottomSheetRef {
  close: () => void;
  openMiddle: () => void;
  open: () => void;
  initialize: () => void;
  setExplicitlyClosed: (closed: boolean) => void;
}

export const MapDragBottomSheet = forwardRef<
  MapDragBottomSheetRef,
  MapDragBottomSheetProps
>(({ children, title }, ref) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  
  // Context 기반 상태 관리 사용
  const {
    bottomSheetState,
    isExplicitlyClosed,
    bottomSheetY,
    expandedY,
    middleY,
    collapsedY,
    open,
    openMiddle,
    close,
    setExplicitlyClosed,
    initialize,
    updateDragPosition,
    finalizeDragPosition,
    handleBackgroundClick,
  } = useBottomSheetSync();

  // Spring 애니메이션 (Context Y 위치와 동기화)
  const [{ y }, api] = useSpring(() => ({
    y: bottomSheetY,
    config: { tension: 300, friction: 30 },
  }));

  // const middleThreshold = window.innerHeight * 0.22;

  // Context Y 위치 변경에 따른 애니메이션 동기화
  const syncAnimation = useCallback((targetY: number) => {
    api.start({ y: targetY });
  }, [api]);

  // 초기화 래퍼 (기존 ref 인터페이스 유지)
  const initializeWrapper = useCallback(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      initialize();
    }
  }, [initialize]);

  // Context 상태 변경에 따른 애니메이션 동기화
  useEffect(() => {
    let targetY: number;
    switch (bottomSheetState) {
      case 'expanded':
        targetY = expandedY;
        break;
      case 'middle':
        targetY = middleY;
        break;
      case 'collapsed':
      default:
        targetY = collapsedY;
        break;
    }
    
    // 현재 애니메이션 위치와 다른 경우에만 동기화
    if (Math.abs(y.get() - targetY) > 5) {
      syncAnimation(targetY);
    }
  }, [bottomSheetState, expandedY, middleY, collapsedY, syncAnimation, y]);

  // 외부에서 바텀시트를 제어할 수 있는 함수들 노출 (기존 ref 인터페이스 유지)
  useImperativeHandle(ref, () => ({
    close,
    openMiddle,
    open,
    initialize: initializeWrapper,
    setExplicitlyClosed,
  }), [close, openMiddle, open, initializeWrapper, setExplicitlyClosed]);

  // 드래그 제스처를 통한 바텀시트 높이 조절
  const bind = useDrag(
    ({ last, target, movement: [, my], cancel, memo, first }) => {
      const targetScroll = target as HTMLElement;

      // 드래그 시작 시 유효성 검사
      if (first) {
        if (!sheetRef.current?.contains(targetScroll)) {
          return cancel?.();
        }

        const isDragHandle = targetScroll.closest('.cursor-grab');
        if (!isDragHandle) {
          return cancel?.();
        }

        if (targetScroll.closest('[data-scrollable]')) {
          return cancel?.();
        }
      }

      if (!memo) memo = y.get();
      const newY = memo + my;

      // 드래그 완료 시 최종 위치 결정
      if (last) {
        const finalY = y.get();
        finalizeDragPosition(finalY);
      } else {
        // 드래그 중 범위 제한 및 위치 업데이트
        if (newY < expandedY - 30) return cancel?.();
        if (newY > collapsedY + 30) return cancel?.();
        api.start({ y: newY, immediate: true });
        updateDragPosition(newY);
      }
      return memo;
    },
    {
      from: () => [0, y.get()],
      pointer: { touch: true },
      filterTaps: true,
      threshold: 10,
    }
  );


  return (
    <div className="flex-1 pointer-events-none">
      {bottomSheetState === 'expanded' && (
        <div
          className="absolute inset-0 z-30 pointer-events-auto"
          onClick={handleBackgroundClick}
          style={{ top: 0, bottom: `${window.innerHeight - expandedY}px` }}
        />
      )}

      <animated.div
        ref={sheetRef}
        style={{
          transform: y.to(val => `translateY(${val}px)`),
          height: y.to(val => `calc(100vh - ${val}px)`),
        }}
        className="absolute top-0 left-0 right-0 z-40 bg-white rounded-t-2xl border border-light-gray flex flex-col pointer-events-auto"
      >
        <div
          className="flex-shrink-0 py-4 px-4 cursor-grab active:cursor-grabbing"
          {...bind()}
          onTouchStart={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        </div>

        {title && (
          <div
            className="flex-shrink-0 cursor-grab active:cursor-grabbing"
            onClick={() => {
              if (!isExplicitlyClosed) {
                openMiddle();
              }
            }}
            {...bind()}
            onTouchStart={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
          >
            {title}
          </div>
        )}

        <div
          data-scrollable
          className="flex-1 overflow-y-auto scrollbar-hidden pb-[60px]"
        >
          {children}
        </div>
      </animated.div>
    </div>
  );
});
