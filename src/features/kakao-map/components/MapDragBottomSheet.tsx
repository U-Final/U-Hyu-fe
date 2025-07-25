import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

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
  const isInitialized = useRef(false); // 초기화 완료 여부 추적
  const isExplicitlyClosed = useRef(false); // 사용자가 명시적으로 닫은 상태 추적
  const [{ y }, api] = useSpring(() => ({ // 바텀시트 Y 위치 애니메이션
    y: window.innerHeight - 120,
    config: { tension: 300, friction: 30 },
  }));
  const [currentState, setCurrentState] = useState<
    'collapsed' | 'middle' | 'expanded'
  >('collapsed');

  // 바텀시트 3단계 높이 정의
  const expandedY = 60;
  const middleY = window.innerHeight * 0.5;
  const collapsedY = window.innerHeight - 120;
  const middleThreshold = window.innerHeight * 0.22;

  // 바텀시트를 완전히 열어서 전체 화면으로 표시
  const open = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 완전히 열기');
    }
    isExplicitlyClosed.current = false;
    api.start({ y: expandedY });
    setCurrentState('expanded');
  }, [api, expandedY]);

  // 바텀시트를 중간 높이로 열기 (기본 상태)
  const openMiddle = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 중간으로 열기');
    }

    // 명시적으로 닫힌 상태에서는 열지 않음
    if (isExplicitlyClosed.current) {
      if (import.meta.env.MODE === 'development') {
        console.log('명시적으로 닫힌 상태 - openMiddle 무시');
      }
      return;
    }

    isExplicitlyClosed.current = false;
    api.start({ y: middleY });
    setCurrentState('middle');
  }, [api, middleY]);

  // 바텀시트 수동 초기화 (페이지 로드 후 호출)
  const initialize = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 수동 초기화');
    }

    if (!isInitialized.current) {
      isInitialized.current = true;

      if (isExplicitlyClosed.current) {
        return;
      }

      isExplicitlyClosed.current = false;
      setTimeout(() => {
        if (!isExplicitlyClosed.current) {
          openMiddle();
        }
      }, 100);
    }
  }, [openMiddle]);

  // 바텀시트 명시적 닫힘 상태 플래그 설정
  const setExplicitlyClosed = useCallback((closed: boolean) => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 닫힘 플래그 설정:', closed);
    }
    isExplicitlyClosed.current = closed;
  }, []);

  // 바텀시트를 애니메이션과 함께 닫기
  const close = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 닫기');
    }

    isExplicitlyClosed.current = true;
    api.start({ y: collapsedY });
    setCurrentState('collapsed');
  }, [api, collapsedY]);

  // 외부에서 바텀시트를 제어할 수 있는 함수들 노출
  useImperativeHandle(ref, () => ({
    close,
    openMiddle,
    open,
    initialize,
    setExplicitlyClosed,
  }), [close, openMiddle, open, initialize, setExplicitlyClosed]);

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
        if (finalY < middleY - middleThreshold) {
          isExplicitlyClosed.current = false;
          open();
        } else if (finalY > middleY + middleThreshold) {
          isExplicitlyClosed.current = true;
          close();
        } else {
          if (!isExplicitlyClosed.current) {
            isExplicitlyClosed.current = false;
            openMiddle();
          }
        }
      } else {
        // 드래그 중 범위 제한
        if (newY < expandedY - 30) return cancel?.();
        if (newY > collapsedY + 30) return cancel?.();
        api.start({ y: newY, immediate: true });
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

  // 전체 화면 상태에서 배경 클릭 시 중간 상태로 변경
  const handleBackgroundClick = () => {
    if (currentState === 'expanded' && !isExplicitlyClosed.current) {
      openMiddle();
    }
  };

  return (
    <div className="flex-1 pointer-events-none">
      {currentState === 'expanded' && (
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
              if (!isExplicitlyClosed.current) {
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
