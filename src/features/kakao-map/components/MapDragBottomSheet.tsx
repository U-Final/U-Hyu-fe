import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

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
  if (import.meta.env.MODE === 'development') {
    console.log('🔄 MapDragBottomSheet 리렌더링 발생');
  }

  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const isDragging = useRef(false);
  const customY = useRef<number | null>(null); // 커스텀 드래그 위치 저장

  // Context 기반 상태 관리 사용
  const {
    bottomSheetState,
    isExplicitlyClosed,
    expandedY,
    middleY,
    collapsedY,
    open,
    openMiddle,
    close,
    setExplicitlyClosed,
    initialize,
  } = useBottomSheetSync();

  // Spring 애니메이션 - 초기값은 middle로 설정
  const [{ y }, api] = useSpring(() => ({
    y: middleY,
    config: { tension: 300, friction: 30 },
  }));

  // 높이 상수 매핑 - useMemo로 메모화하여 불필요한 리렌더 방지
  const snapPositions = useMemo(
    () => ({
      expanded: expandedY,
      middle: middleY,
      collapsed: collapsedY,
    }),
    [expandedY, middleY, collapsedY]
  );

  // Imperative API 구현 - 플래그 리셋 보장
  useImperativeHandle(
    ref,
    () => ({
      close: () => {
        customY.current = null;
        close();
        api.start({ y: collapsedY });
      },
      openMiddle: () => {
        customY.current = null;
        setExplicitlyClosed(false); // 반드시 먼저 리셋
        openMiddle();
        api.start({ y: middleY });
      },
      open: () => {
        customY.current = null;
        setExplicitlyClosed(false); // 반드시 먼저 리셋
        open();
        api.start({ y: expandedY });
      },
      initialize: () => {
        if (!isInitialized.current) {
          isInitialized.current = true;
          customY.current = null;
          setExplicitlyClosed(false); // 초기화시에도 리셋
          initialize();
        }
      },
      setExplicitlyClosed: (closed: boolean) => {
        if (closed) {
          customY.current = null;
        }
        setExplicitlyClosed(closed);
      },
    }),
    [
      close,
      openMiddle,
      open,
      initialize,
      setExplicitlyClosed,
      api,
      collapsedY,
      middleY,
      expandedY,
    ]
  );

  // Context 상태 변경에 따른 애니메이션 동기화 - 최소한만 처리
  useEffect(() => {
    if (isDragging.current) return;

    const targetY = customY.current ?? snapPositions[bottomSheetState];

    // 명시적으로 닫힌 상태인 경우에만 collapsed 위치로
    if (isExplicitlyClosed && bottomSheetState === 'collapsed') {
      customY.current = null;
      api.start({ y: collapsedY });
      return;
    }

    // 현재 위치와 목표 위치가 다른 경우에만 애니메이션
    if (Math.abs(y.get() - targetY) > 5) {
      api.start({ y: targetY });
    }
  }, [bottomSheetState, isExplicitlyClosed, snapPositions, api, y, collapsedY]);

  // 드래그 제스처 - 개선된 로직
  const bind = useGesture(
    {
      onDrag: ({ down, movement: [, my], last, first, event }) => {
        // 드래그 시작 시 유효성 검사
        if (first) {
          const target = event.target as HTMLElement;

          // 스크롤 가능한 영역에서는 드래그 비활성화
          if (target.closest('[data-scrollable]')) {
            return;
          }

          // 드래그 시작
          isDragging.current = true;

          if (import.meta.env.MODE === 'development') {
            console.log('드래그 시작');
          }
        }

        // 현재 바텀시트 위치를 기준으로 새 위치 계산
        const baseY =
          customY.current !== null
            ? customY.current
            : snapPositions[bottomSheetState];
        const newY = baseY + my;

        // 범위 제한
        const minY = expandedY - 50; // 위로 약간 더 드래그 가능
        const maxY = collapsedY + 100; // 아래로 약간 더 드래그 가능

        const clampedY = Math.max(minY, Math.min(maxY, newY));

        if (down) {
          // 드래그 중 - 즉시 애니메이션 (Context 업데이트 없음)
          api.start({ y: clampedY, immediate: true });
        }

        if (last) {
          // 드래그 완료
          isDragging.current = false;

          if (import.meta.env.MODE === 'development') {
            console.log('드래그 완료, 최종 Y:', clampedY);
          }

          // 스냅 영역 정의 (더 관대하게)
          const snapThreshold = 65; // 스냅 임계값
          const expandedRange = expandedY + snapThreshold;
          const middleRangeMin = middleY - snapThreshold;
          const middleRangeMax = middleY + snapThreshold;
          const collapsedRange = collapsedY - snapThreshold;

          // 스냅 위치 결정
          if (clampedY <= expandedRange) {
            // 상단 스냅 영역 - expanded
            customY.current = null;
            setExplicitlyClosed(false);
            open();
          } else if (clampedY >= middleRangeMin && clampedY <= middleRangeMax) {
            // 중간 스냅 영역 - middle
            customY.current = null;
            setExplicitlyClosed(false);
            openMiddle();
          } else if (clampedY >= collapsedRange) {
            // 하단 스냅 영역 - collapsed
            customY.current = null;
            setExplicitlyClosed(true);
            close();
          } else {
            // 스냅 영역이 아닌 곳 - 현재 위치에 고정
            customY.current = clampedY;
            api.start({ y: clampedY });

            // Context 상태와 동기화를 위해 가장 가까운 상태로 설정
            setExplicitlyClosed(false);
            if (clampedY < middleY) {
              // expanded에 가까움
              open();
            } else {
              // middle에 가까움
              openMiddle();
            }

            if (import.meta.env.MODE === 'development') {
              console.log('커스텀 위치에 고정:', clampedY);
            }
          }
        }
      },
    },
    {
      drag: {
        from: () => [0, y.get()],
        pointer: { touch: true },
        filterTaps: true,
        threshold: 10,
        axis: 'y',
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
                customY.current = null;
                openMiddle();
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
