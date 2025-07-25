import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { animated, useSpring } from '@react-spring/web';

// import { useDrag } from '@use-gesture/react';

interface MapDragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
}

export interface MapDragBottomSheetRef {
  close: () => void;
  openMiddle: () => void;
  open: () => void;
}

export const MapDragBottomSheet = forwardRef<
  MapDragBottomSheetRef,
  MapDragBottomSheetProps
>(({ children, title }, ref) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false); // 초기화 여부 추적
  const [{ y }, api] = useSpring(() => ({
    y: window.innerHeight * 0.5,
    config: { tension: 300, friction: 30 },
  })); // 초기값을 중간 상태로 설정
  const [currentState, setCurrentState] = useState<
    'collapsed' | 'middle' | 'expanded'
  >('collapsed');

  // 3단계 높이 설정
  const expandedY = 60; // 완전히 열린 상태 (위에서 60px)
  const middleY = window.innerHeight * 0.5; // 중간 상태 (화면 높이의 50%)
  const collapsedY = window.innerHeight - 120; // 접힌 상태
  // const middleThreshold = window.innerHeight * 0.22; // 중간지점을 처리할 범위 (±22%)

  // 움직임 제어 함수들
  const open = useCallback(() => {
    api.start({ y: expandedY });
    setCurrentState('expanded');
  }, [api, expandedY]);

  const openMiddle = useCallback(() => {
    console.log('🔽 openMiddle() 함수 호출됨');
    console.log('📍 현재 상태:', currentState, '→ middle로 변경');
    console.trace('🔍 openMiddle 호출 스택:'); // 호출 스택 추적
    api.start({ y: middleY });
    setCurrentState('middle');
    console.log('✅ openMiddle() 함수 실행 완료');
  }, [api, middleY, currentState]);

  const close = useCallback(() => {
    const currentY = y.get();
    console.log('❌ MapDragBottomSheet close() 함수 호출됨');
    console.log('📍 currentState:', currentState);
    console.log('📐 실제 y 값:', currentY);
    console.log('📏 middleY:', middleY, 'collapsedY:', collapsedY);

    // 실제 위치에 따른 상태 판단
    let realState = 'collapsed';
    if (currentY < middleY + 50) {
      // 50px 여유 범위
      realState = currentY < expandedY + 50 ? 'expanded' : 'middle';
    }
    console.log('🎯 실제 상태:', realState, '→ collapsed로 변경');

    // 강제로 닫기 - 모든 애니메이션 중단 후 설정
    console.log('🛑 기존 애니메이션 중단');
    api.stop();

    console.log('🔧 api.set 시도');
    api.set({ y: collapsedY });

    console.log('🔧 api.start immediate 시도');
    api.start({ y: collapsedY, immediate: true });

    // 추가적으로 강제 고정
    console.log('🔒 추가 고정 시도');
    setTimeout(() => {
      api.stop();
      api.set({ y: collapsedY });
    }, 50);

    setCurrentState('collapsed');

    // 확인을 위해 잠시 후 y 값 재확인
    setTimeout(() => {
      console.log('🔍 100ms 후 y 값 확인:', y.get());
    }, 100);

    setTimeout(() => {
      console.log('🔍 1초 후 y 값 확인:', y.get());
    }, 1000);

    console.log('✅ close() 함수 실행 완료');
  }, [api, collapsedY, currentState, y, middleY, expandedY]);

  useEffect(() => {
    // 최초 한 번만 초기화
    if (!isInitialized.current) {
      console.log('🏁 최초 마운트 - 초기화 시작');
      isInitialized.current = true;

      const timer = setTimeout(() => {
        console.log('⏰ 100ms 후 openMiddle() 호출 (최초 마운트만)');
        openMiddle();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      console.log('🔄 재마운트 감지 - 초기화 건너뜀');
    }
  }, [openMiddle]);

  // ref를 통해 외부에서 제어할 수 있는 함수들 노출
  useImperativeHandle(ref, () => {
    console.log('🔧 useImperativeHandle - ref 함수들 노출');
    return {
      close,
      openMiddle,
      open,
    };
  }, [close, openMiddle, open]);

  // const bind = useDrag(
  //   ({ last, target, movement: [, my], cancel, memo, first }) => {
  //     const targetScroll = target as HTMLElement;

  //     // 첫 번째 이벤트에서 드래그 가능 여부 결정
  //     if (first) {
  //       // bottom sheet 영역이 아닌 곳에서 드래그하면 취소
  //       if (!sheetRef.current?.contains(targetScroll)) {
  //         return cancel?.();
  //       }

  //       // 드래그 핸들 영역이 아닌 곳에서 드래그하면 취소
  //       const isDragHandle = targetScroll.closest('.cursor-grab');
  //       if (!isDragHandle) {
  //         return cancel?.();
  //       }

  //       // 스크롤 영역에서 드래그하면 취소 (임시 비활성화)
  //       // if (targetScroll.closest('[data-scrollable]')) {
  //       //   return cancel?.();
  //       // }
  //     }

  //     if (!memo) memo = y.get();
  //     const newY = memo + my;

  //     if (last) {
  //       //드래그 완료시 위치 결정
  //       const finalY = y.get(); //현재 위치 확인
  //       if (finalY < middleY - middleThreshold) {
  //         open(); // 중간보다 위에 있으면 완전 열기
  //       } else if (finalY > middleY + middleThreshold) {
  //         close(); // 중간보다 아래에 있으면 접기
  //       } else {
  //         openMiddle(); // 중간 근처에 있으면 중간으로 고정
  //       }
  //     } else {
  //       //드래그 중일 때 범위 제한
  //       if (newY < expandedY - 30) return cancel?.(); // 너무 위로 드래그하면 취소
  //       if (newY > collapsedY + 30) return cancel?.(); // 너무 아래로 드래그하면 취소
  //       api.start({ y: newY, immediate: true }); // 드래그 중 위치 업데이트
  //     }
  //     return memo;
  //   },
  //   {
  //     from: () => [0, y.get()],
  //     pointer: { touch: true },
  //     filterTaps: true,
  //     threshold: 10,
  //   }
  // );

  const handleBackgroundClick = () => {
    // expanded 상태일 때만 배경 클릭으로 닫기
    if (currentState === 'expanded') {
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
          className="flex-shrink-0 py-4 px-4 cursor-pointer"
          onTouchStart={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        </div>

        {title && (
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={openMiddle}
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
