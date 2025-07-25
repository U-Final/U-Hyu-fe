import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

// Context 상태는 더 이상 바텀시트 높이와 연동하지 않음

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
  if (import.meta.env.MODE === 'development') {
    console.log('🔄 MapDragBottomSheet 리렌더링 발생');
  }

  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const isDragging = useRef(false);

  // 바텀시트 내부 상태 - 독립적으로 관리
  const [localState, setLocalState] = useState<'collapsed' | 'middle' | 'expanded'>('middle');
  const [isExplicitlyClosed, setIsExplicitlyClosed] = useState(false);

  // 높이 계산 - 리사이즈 대응
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

  // 높이 상수 매핑
  const snapPositions = useMemo(
    () => ({
      expanded: expandedY,
      middle: middleY,
      collapsed: collapsedY,
    }),
    [expandedY, middleY, collapsedY]
  );

  // Spring 애니메이션 - 내부 상태 기반
  const [{ y }, api] = useSpring(() => ({
    y: snapPositions[localState],
    config: { tension: 300, friction: 30 },
  }));

  // 외부 제어를 위한 명령형 API - 내부 상태 직접 제어
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
          setIsExplicitlyClosed(false);
          setLocalState('middle');
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

  // 내부 상태 변경시 Spring 애니메이션 동기화
  useEffect(() => {
    // 드래그 중일 때는 상태 변경을 무시
    if (isDragging.current) return;

    const targetY = snapPositions[localState];
    
    if (import.meta.env.MODE === 'development') {
      console.log('내부 상태 변경 감지:', localState, '-> 목표 Y:', targetY);
    }

    // 내부 상태에 따라 Spring 애니메이션 실행
    api.start({ 
      y: targetY,
      immediate: false
    });
  }, [localState, snapPositions, api]);

  // 드래그 제스처 - 개선된 로직
  const bind = useGesture(
    {
      onDrag: ({ down, movement: [, my], last, first, event, velocity: [, vy] }) => {
        // 드래그 시작 시 유효성 검사
        if (first) {
          const target = event.target as HTMLElement;

          // 스크롤 가능한 영역에서는 드래그 비활성화 (더 정확한 검사)
          const scrollableElement = target.closest('[data-scrollable]');
          if (scrollableElement) {
            const scrollable = scrollableElement as HTMLElement;
            // 실제로 스크롤 가능한 상태인지 확인
            if (scrollable.scrollHeight > scrollable.clientHeight) {
              return;
            }
          }

          // 입력 요소나 버튼에서는 드래그 비활성화
          if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.tagName === 'A') {
            return;
          }

          // 드래그 시작
          isDragging.current = true;

          if (import.meta.env.MODE === 'development') {
            console.log('드래그 시작');
          }
        }

        // 현재 바텀시트 위치를 기준으로 새 위치 계산
        const baseY = snapPositions[localState];
        const newY = baseY + my;

        // 범위 제한
        const minY = expandedY - 50; // 위로 약간 더 드래그 가능
        const maxY = collapsedY + 100; // 아래로 약간 더 드래그 가능

        const clampedY = Math.max(minY, Math.min(maxY, newY));

        if (down) {
          // 드래그 중 - Spring을 직접 조작 (내부 상태 업데이트 안함)
          api.start({ y: clampedY, immediate: true });
        }

        if (last) {
          // 드래그 완료 - 내부 상태만 업데이트 (Spring은 useEffect에서 자동 처리)
          isDragging.current = false;

          if (import.meta.env.MODE === 'development') {
            console.log('드래그 완료, 최종 Y:', clampedY);
          }

          // 스냅 로직을 통해 새로운 내부 상태 결정
          const velocityThreshold = 0.5;
          const snapThreshold = 80;
          
          if (Math.abs(vy) > velocityThreshold) {
            // 속도 기반 스냅
            if (vy < 0) {
              setIsExplicitlyClosed(false);
              setLocalState('expanded');
            } else {
              setIsExplicitlyClosed(true);
              setLocalState('collapsed');
            }
          } else {
            // 위치 기반 스냅
            const expandedRange = expandedY + snapThreshold;
            const middleRangeMin = middleY - snapThreshold;
            const middleRangeMax = middleY + snapThreshold;
            const collapsedRange = collapsedY - snapThreshold;

            if (clampedY <= expandedRange) {
              setIsExplicitlyClosed(false);
              setLocalState('expanded');
            } else if (clampedY >= middleRangeMin && clampedY <= middleRangeMax) {
              setIsExplicitlyClosed(false);
              setLocalState('middle');
            } else if (clampedY >= collapsedRange) {
              setIsExplicitlyClosed(true);
              setLocalState('collapsed');
            } else {
              // 가장 가까운 위치로 스냅
              const distToExpanded = Math.abs(clampedY - expandedY);
              const distToMiddle = Math.abs(clampedY - middleY);
              const distToCollapsed = Math.abs(clampedY - collapsedY);
              
              setIsExplicitlyClosed(false);
              if (distToExpanded <= distToMiddle && distToExpanded <= distToCollapsed) {
                setLocalState('expanded');
              } else if (distToMiddle <= distToCollapsed) {
                setLocalState('middle');
              } else {
                setIsExplicitlyClosed(true);
                setLocalState('collapsed');
              }
            }
          }

          if (import.meta.env.MODE === 'development') {
            console.log('드래그 완료 - 속도:', vy, '위치:', clampedY, '-> 내부 상태 업데이트');
          }
        }
      },
    },
    {
      drag: {
        from: () => [0, y.get()],
        pointer: { touch: true },
        filterTaps: true,
        threshold: 5, // 더 민감하게 드래그 시작
        axis: 'y',
        preventScroll: true, // 스크롤 방지
        rubberband: true, // 경계에서 탄성 효과
      },
    }
  );

  return (
    <div className="flex-1 pointer-events-none">
      {/* 바텀시트 메인 컨테이너 */}
      <animated.div
        ref={sheetRef}
        style={{
          transform: y.to(val => `translateY(${val}px)`),
          height: y.to(val => `calc(100vh - ${val}px)`),
        }}
        className="absolute top-0 left-0 right-0 z-40 bg-white rounded-t-2xl border border-light-gray flex flex-col pointer-events-auto shadow-lg"
        {...bind()}
      >
        {/* 드래그 핸들 */}
        <div className="flex-shrink-0 py-4 px-4 cursor-grab active:cursor-grabbing touch-none">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* 타이틀 (옵션) */}
        {title && (
          <div
            className="flex-shrink-0 px-4 pb-2 cursor-grab active:cursor-grabbing touch-none"
            onClick={() => {
              if (!isExplicitlyClosed) {
                setLocalState('middle');
              }
            }}
          >
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}

        {/* 콘텐츠 영역 */}
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
