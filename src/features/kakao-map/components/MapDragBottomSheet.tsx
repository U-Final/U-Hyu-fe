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
  initialize: () => void; // 수동 초기화 함수
  setExplicitlyClosed: (closed: boolean) => void; // 플래그 설정 함수
}

export const MapDragBottomSheet = forwardRef<
  MapDragBottomSheetRef,
  MapDragBottomSheetProps
>(({ children, title }, ref) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false); // 초기화 여부 추적
  const isExplicitlyClosed = useRef(false); // 명시적으로 닫힌 상태 추적
  const [{ y }, api] = useSpring(() => ({
    y: window.innerHeight - 120, // 초기값을 닫힌 상태로 설정
    config: { tension: 300, friction: 30 },
  }));
  const [currentState, setCurrentState] = useState<
    'collapsed' | 'middle' | 'expanded'
  >('collapsed');

  // 3단계 높이 설정
  const expandedY = 60; // 완전히 열린 상태 (위에서 60px)
  const middleY = window.innerHeight * 0.5; // 중간 상태 (화면 높이의 50%)
  const collapsedY = window.innerHeight - 120; // 접힌 상태
  const middleThreshold = window.innerHeight * 0.22; // 중간지점을 처리할 범위 (±22%)

  // 움직임 제어 함수들
  const open = useCallback(() => {
    console.log('🔼 바텀시트 완전히 열기');
    isExplicitlyClosed.current = false; // 다시 열릴 때 플래그 리셋
    api.start({ y: expandedY });
    setCurrentState('expanded');
  }, [api, expandedY]);

  const openMiddle = useCallback(() => {
    console.log('🔽 바텀시트 중간으로 열기');
    console.log('🚫 명시적으로 닫힌 상태:', isExplicitlyClosed.current);

    // 명시적으로 닫힌 상태라면 열지 않음
    if (isExplicitlyClosed.current) {
      console.log('⛔ 명시적으로 닫힌 상태 - openMiddle 무시');
      return;
    }

    isExplicitlyClosed.current = false; // 열 때 플래그 리셋
    api.start({ y: middleY });
    setCurrentState('middle');
    console.log('✅ openMiddle() 함수 실행 완료');
  }, [api, middleY]);

  const initialize = useCallback(() => {
    console.log('🚀 수동 초기화 시작');
    console.log(
      '🚫 초기화 시점 명시적으로 닫힌 상태:',
      isExplicitlyClosed.current
    );

    if (!isInitialized.current) {
      isInitialized.current = true;

      // 명시적으로 닫힌 상태라면 초기화하지 않음
      if (isExplicitlyClosed.current) {
        console.log('⛔ 명시적으로 닫힌 상태 - 초기화 건너뜀');
        return;
      }

      isExplicitlyClosed.current = false; // 초기화 시 플래그 리셋
      setTimeout(() => {
        // 다시 한번 확인 (타이밍 이슈 방지)
        if (!isExplicitlyClosed.current) {
          console.log('⏰ 초기화: openMiddle() 호출');
          openMiddle();
        } else {
          console.log(
            '⛔ setTimeout 내에서도 명시적으로 닫힌 상태 - openMiddle 건너뜀'
          );
        }
      }, 100);
    } else {
      console.log('⚠️ 이미 초기화됨 - 건너뜀');
    }
  }, [openMiddle]);

  const setExplicitlyClosed = useCallback((closed: boolean) => {
    console.log('🚫 플래그 설정:', closed);
    isExplicitlyClosed.current = closed;
  }, []);

  const close = useCallback(() => {
    const currentY = y.get();
    console.log('❌ MapDragBottomSheet close() 함수 호출됨');
    console.log('📍 currentState:', currentState);
    console.log('📐 실제 y 값:', currentY);
    console.log('📏 middleY:', middleY, 'collapsedY:', collapsedY);

    // 명시적으로 닫힌 상태로 설정
    isExplicitlyClosed.current = true;
    console.log('🚫 명시적으로 닫힌 상태로 설정');

    // 실제 위치에 따른 상태 판단
    let realState = 'collapsed';
    if (currentY < middleY + 50) {
      // 50px 여유 범위
      realState = currentY < expandedY + 50 ? 'expanded' : 'middle';
    }
    console.log('🎯 실제 상태:', realState, '→ collapsed로 변경');

    // 부드러운 애니메이션으로 닫기
    console.log('🔽 부드러운 애니메이션으로 닫기');
    api.start({ y: collapsedY });

    setCurrentState('collapsed');
    console.log('✅ close() 함수 실행 완료');
  }, [api, collapsedY, currentState, y, middleY, expandedY]);

  // 자동 초기화 비활성화 - 수동으로만 제어
  // useEffect(() => {
  //   // 최초 한 번만 초기화
  //   if (!isInitialized.current) {
  //     console.log('🏁 최초 마운트 - 초기화 시작');
  //     console.log('📍 마운트 시점 currentState:', currentState);
  //     isInitialized.current = true;

  //     const timer = setTimeout(() => {
  //       console.log('⏰ 100ms 후 openMiddle() 호출 (최초 마운트만)');
  //       console.log('📍 openMiddle 호출 전 currentState:', currentState);
  //       openMiddle();
  //     }, 100);

  //     return () => {
  //       console.log('🧹 useEffect cleanup (컴포넌트 언마운트)');
  //       clearTimeout(timer);
  //     };
  //   } else {
  //     console.log('🔄 재마운트 감지 - 초기화 건너뜀');
  //     console.log('📍 재마운트 시점 currentState:', currentState);
  //   }
  // }, [openMiddle, currentState]);

  // ref를 통해 외부에서 제어할 수 있는 함수들 노출
  useImperativeHandle(ref, () => {
    console.log('🔧 useImperativeHandle - ref 함수들 노출');
    return {
      close,
      openMiddle,
      open,
      initialize,
      setExplicitlyClosed,
    };
  }, [close, openMiddle, open, initialize, setExplicitlyClosed]);

  const bind = useDrag(
    ({ last, target, movement: [, my], cancel, memo, first }) => {
      const targetScroll = target as HTMLElement;

      // 첫 번째 이벤트에서 드래그 가능 여부 결정
      if (first) {
        // bottom sheet 영역이 아닌 곳에서 드래그하면 취소
        if (!sheetRef.current?.contains(targetScroll)) {
          return cancel?.();
        }

        // 드래그 핸들 영역이 아닌 곳에서 드래그하면 취소
        const isDragHandle = targetScroll.closest('.cursor-grab');
        if (!isDragHandle) {
          return cancel?.();
        }

        // 스크롤 영역에서 드래그하면 취소
        if (targetScroll.closest('[data-scrollable]')) {
          return cancel?.();
        }
      }

      if (!memo) memo = y.get();
      const newY = memo + my;

      if (last) {
        //드래그 완료시 위치 결정
        const finalY = y.get(); //현재 위치 확인
        if (finalY < middleY - middleThreshold) {
          isExplicitlyClosed.current = false; // 드래그로 열 때 플래그 리셋
          open(); // 중간보다 위에 있으면 완전 열기
        } else if (finalY > middleY + middleThreshold) {
          isExplicitlyClosed.current = true; // 드래그로 닫을 때 플래그 설정
          close(); // 중간보다 아래에 있으면 접기
        } else {
          // 명시적으로 닫힌 상태가 아닐 때만 중간으로 이동
          if (!isExplicitlyClosed.current) {
            isExplicitlyClosed.current = false; // 드래그로 중간으로 갈 때 플래그 리셋
            openMiddle(); // 중간 근처에 있으면 중간으로 고정
          }
        }
      } else {
        //드래그 중일 때 범위 제한
        if (newY < expandedY - 30) return cancel?.(); // 너무 위로 드래그하면 취소
        if (newY > collapsedY + 30) return cancel?.(); // 너무 아래로 드래그하면 취소
        api.start({ y: newY, immediate: true }); // 드래그 중 위치 업데이트
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

  const handleBackgroundClick = () => {
    // expanded 상태일 때만 배경 클릭으로 닫기
    if (currentState === 'expanded' && !isExplicitlyClosed.current) {
      openMiddle();
    }
  };

  return (
    <div className="flex-1 pointer-events-none">
      {/* 배경 오버레이 - expanded 상태일 때만 활성화 */}
      {currentState === 'expanded' && (
        <div
          className="absolute inset-0 z-30 pointer-events-auto"
          onClick={handleBackgroundClick}
          style={{ top: 0, bottom: `${window.innerHeight - expandedY}px` }}
        />
      )}

      {/* Sheet */}
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
