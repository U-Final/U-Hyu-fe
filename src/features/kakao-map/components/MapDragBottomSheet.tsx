import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { animated, useSpring } from '@react-spring/web';
// 바텀시트 위치 애니메이션을 위한 라이브러리
import { useGesture } from '@use-gesture/react';

// 드래그 제스처 인식 라이브러리

// 🧾 컴포넌트 외부에서 바텀시트를 제어할 수 있게 만드는 props와 ref 인터페이스 정의
interface MapDragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
}

export interface MapDragBottomSheetRef {
  close: () => void; // 완전히 닫기
  openMiddle: () => void; // 중간까지 열기
  open: () => void; // 완전히 열기
  initialize: () => void; // 최초 한 번만 열림
  setExplicitlyClosed: (closed: boolean) => void; // 외부에서 명시적으로 닫힘 상태 설정
}

// 📦 바텀시트 컴포넌트 정의
export const MapDragBottomSheet = forwardRef<
  MapDragBottomSheetRef,
  MapDragBottomSheetProps
>(({ children, title }, ref) => {
  // 개발 중 리렌더링 확인용 로그
  if (import.meta.env.MODE === 'development') {
    console.log('🔄 MapDragBottomSheet 리렌더링 발생');
  }

  // 📌 내부 상태 관리용 ref
  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false); // initialize()가 한 번만 실행되도록 제어
  const isDragging = useRef(false); // 드래그 중 상태

  // 🧠 바텀시트 상태(local) - context와 분리된 독립적인 상태
  const [localState, setLocalState] = useState<
    'collapsed' | 'middle' | 'expanded'
  >('collapsed');

  // 외부에서 닫힘을 명시했는지 여부 (open/close 제어에 사용)
  const [isExplicitlyClosed, setIsExplicitlyClosed] = useState(false);

  // 🔧 윈도우 높이 동기화 - 반응형 레이아웃 대응
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 📐 위치 스냅 포인트 정의
  const expandedY = 60; // 완전 확장 시 바텀 여백
  const middleY = windowHeight * 0.5; // 중간 위치
  const collapsedY = windowHeight - 130; // 거의 접힌 상태

  // 💡 위치 상태값과 실제 translateY(px) 매핑
  const snapPositions = useMemo(
    () => ({
      expanded: expandedY,
      middle: middleY,
      collapsed: collapsedY,
    }),
    [expandedY, middleY, collapsedY]
  );

  // 🎬 react-spring 기반 y 위치 애니메이션 정의
  const [{ y }, api] = useSpring(() => ({
    y: snapPositions[localState],
    config: { tension: 300, friction: 30 }, // 애니메이션 속성
  }));

  // 🔌 외부에서 조작할 수 있도록 imperative handle 정의
  useImperativeHandle(
    ref,
    () => ({
      close: () => {
        setIsExplicitlyClosed(true);
        setLocalState('collapsed');
      },
      openMiddle: () => {
        setIsExplicitlyClosed(false);
        setLocalState('middle');
      },
      open: () => {
        setIsExplicitlyClosed(false);
        setLocalState('expanded');
      },
      initialize: () => {
        if (!isInitialized.current) {
          isInitialized.current = true;
          setIsExplicitlyClosed(true);
          setLocalState('expanded');
        }
      },
      setExplicitlyClosed: (closed: boolean) => {
        setIsExplicitlyClosed(closed);
        if (closed) {
          setLocalState('collapsed');
        }
      },
    }),
    []
  );

  // 🔄 localState 변경 시 spring 애니메이션 실행
  useEffect(() => {
    // 드래그 중에는 자동 애니메이션을 막음 (사용자 제어 우선)
    if (isDragging.current) {
      if (import.meta.env.MODE === 'development') {
        console.log('⏸️ 드래그 중이므로 상태 변경 무시:', localState);
      }
      return;
    }

    const targetY = snapPositions[localState];
    api.start({
      y: targetY,
      immediate: false,
    });
  }, [localState, snapPositions, api, isExplicitlyClosed]);

  // 👆 드래그 제스처 핸들링
  // 앞부분 동일...

  const bind = useGesture(
    {
      onDrag: ({
        down,
        movement: [, my],
        last,
        first,
        event,
        velocity: [, vy],
      }) => {
        if (first) {
          const target = event.target as HTMLElement;
          const scrollableElement = target.closest('[data-scrollable]');
          if (
            scrollableElement &&
            scrollableElement.scrollHeight > scrollableElement.clientHeight
          ) {
            return;
          }
          if (['INPUT', 'BUTTON', 'A'].includes(target.tagName)) {
            return;
          }

          isDragging.current = true;
          if (import.meta.env.MODE === 'development') {
            console.log('드래그 시작');
          }
        }

        const baseY = snapPositions[localState];
        const newY = baseY + my;

        // ❗ 수정: 최소 최대 범위 고정
        const minY = expandedY;
        const maxY = collapsedY + 120;

        const clampedY = Math.max(minY, Math.min(maxY, newY));

        if (down) {
          api.start({ y: clampedY, immediate: true });
        }

        if (last) {
          isDragging.current = false;

          if (import.meta.env.MODE === 'development') {
            console.log('드래그 완료, 최종 Y:', clampedY);
          }

          const velocityThreshold = 0.5;
          const snapThreshold = 80;

          let newState: typeof localState = localState;

          if (Math.abs(vy) > velocityThreshold) {
            if (vy < 0) {
              newState = 'expanded';
            } else {
              newState = 'collapsed';
            }
          } else {
            const expandedRange = expandedY + snapThreshold;
            const middleRangeMin = middleY - snapThreshold;
            const middleRangeMax = middleY + snapThreshold;
            const collapsedRange = collapsedY - snapThreshold;

            if (clampedY <= expandedRange) {
              newState = 'expanded';
            } else if (
              clampedY >= middleRangeMin &&
              clampedY <= middleRangeMax
            ) {
              newState = 'middle';
            } else if (clampedY >= collapsedRange) {
              newState = 'collapsed';
            } else {
              const distToExpanded = Math.abs(clampedY - expandedY);
              const distToMiddle = Math.abs(clampedY - middleY);
              const distToCollapsed = Math.abs(clampedY - collapsedY);

              if (
                distToExpanded <= distToMiddle &&
                distToExpanded <= distToCollapsed
              ) {
                newState = 'expanded';
              } else if (distToMiddle <= distToCollapsed) {
                newState = 'middle';
              } else {
                newState = 'collapsed';
              }
            }
          }

          // ❗ 명시적 닫힘 여부 반영
          setIsExplicitlyClosed(newState === 'collapsed');
          setLocalState(newState);

          // ✅ 직접 spring 애니메이션 실행해서 위치 복원
          const targetY = snapPositions[newState];
          api.start({ y: targetY, immediate: false });

          if (import.meta.env.MODE === 'development') {
            console.log(
              '드래그 종료 → 상태:',
              newState,
              '→ 애니메이션 실행 (y:',
              targetY,
              ')'
            );
          }
        }
      },
    },
    {
      drag: {
        from: () => [0, y.get()],
        pointer: { touch: true },
        filterTaps: true,
        threshold: 5,
        axis: 'y',
        preventScroll: true,
        rubberband: true,
      },
    }
  );

  return (
    <div className="flex-1 pointer-events-none">
      {/* 📦 바텀시트 전체 컨테이너 - 포인터 이벤트는 내부에서만 활성화 */}
      <animated.div
        ref={sheetRef}
        style={{
          transform: y.to(val => `translateY(${val}px)`),
          height: y.to(val => `calc(100vh - ${val}px)`),
        }}
        className="absolute top-0 left-0 right-0 z-40 bg-white rounded-t-2xl border border-light-gray flex flex-col pointer-events-auto shadow-lg"
        {...bind()}
      >
        {/* 🔘 드래그 핸들 - 사용자 상호작용 유도 */}
        <div className="flex-shrink-0 py-4 px-4 cursor-grab active:cursor-grabbing touch-none">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* 🏷️ 제목 영역 - 클릭시 확장 가능 */}
        {title && (
          <div
            className="flex-shrink-0 px-4 pb-2 cursor-grab active:cursor-grabbing touch-none"
            onClick={() => {
              if (!isExplicitlyClosed) {
                setLocalState('expanded');
              }
            }}
          >
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}

        {/* 🧾 실제 콘텐츠 스크롤 영역 */}
        <div
          data-scrollable
          className="flex-1 overflow-y-auto scrollbar-hidden pb-safe"
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      </animated.div>
    </div>
  );
});
