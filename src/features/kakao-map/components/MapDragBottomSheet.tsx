import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { useBottomNavHeight } from '@/shared/utils/navigationHeight';

// 🧾 컴포넌트 외부에서 바텀시트를 제어할 수 있게 만드는 props와 ref 인터페이스 정의
interface MapDragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
  snapToPositions?: boolean; // 스냅 기능 활성화 여부 (기본값: false)
}

export interface MapDragBottomSheetRef {
  close: () => void; // 닫기
  open: () => void; // 열기
  toggle: () => void; // 토글
  initialize: () => void; // 최초 한 번만 열림
  setExplicitlyClosed: (closed: boolean) => void; // 외부에서 명시적으로 닫힘 상태 설정
  getCurrentPosition: () => number; // 현재 위치 반환
}

// 📦 바텀시트 컴포넌트 정의
// 🔢 상수 정의
const CONSTANTS = {
  // 위치 상수
  EXPANDED_BOTTOM_MARGIN: 60, // 완전 확장 시 바텀 여백

  // 드래그 제한 상수
  MIN_HEIGHT_FROM_TOP: 80, // 화면 상단에서 최소 거리
  EXTRA_DRAG_BUFFER: 0, // 닫힌 위치에서 추가 드래그 허용 범위

  // 스냅 상수
  SNAP_THRESHOLD: 100, // 스냅 위치 임계값

  // 애니메이션 상수
  ANIMATION_DURATION: 300, // CSS transition 지속 시간 (ms)

  // 드래그 민감도 상수
  MIN_DRAG_THRESHOLD: 3, // 최소 드래그 임계값 (px) - 이 값보다 작은 움직임은 무시

  // 부모 요소 탐색 상수
  PARENT_ELEMENT_SEARCH_DEPTH: 5, // 클릭 가능한 부모 요소 탐색 깊이
} as const;

export const MapDragBottomSheet = forwardRef<
  MapDragBottomSheetRef,
  MapDragBottomSheetProps
>(({ children, title, snapToPositions = false }, ref) => {
  // 개발 중 리렌더링 확인용 로그
  if (import.meta.env.MODE === 'development') {
    console.log('🔄 MapDragBottomSheet 리렌더링 발생');
  }

  // 📌 내부 상태 관리용 ref
  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false); // initialize()가 한 번만 실행되도록 제어
  const isDragging = useRef(false); // 드래그 중 상태
  const startY = useRef(0); // 드래그 시작 Y 좌표
  const startTranslateY = useRef(0); // 드래그 시작 시 바텀시트 위치
  const hasMovedEnough = useRef(false); // 임계값 이상 움직였는지 여부
  const animationFrame = useRef<number | null>(null);
  const lastDragEndTime = useRef(0); // 마지막 드래그 종료 시간

  // 바텀시트 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);

  // 🔧 윈도우 크기 동기화 - 반응형 레이아웃 대응
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const bottomNavHeight = useBottomNavHeight(); // 고정 네비게이션 높이 사용

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 📐 위치 제한값 정의 - 패딩이 적용된 컨테이너 기준
  const availableHeight = windowHeight - bottomNavHeight; // 패딩 제외된 사용 가능한 높이

  // 모바일/데스크톱별 반응형 핸들 높이 계산
  const calculateHandleHeight = () => {
    const isMobile = windowWidth <= 640;

    if (isMobile) {
      // 모바일: 더 작은 비율과 적절한 제한값
      const mobileRatio = 0.08; // 사용 가능 높이의 8% (모바일 최적화)
      const minHeight = 20; // 최소 60px (모바일에서 적절한 터치 영역)
      const maxHeight = 80; // 최대 80px (모바일에서 과도하지 않게)

      return Math.min(
        Math.max(availableHeight * mobileRatio, minHeight),
        maxHeight
      );
    } else {
      // 데스크톱: 기존 로직 (더 큰 핸들 영역)
      const desktopRatio = 0.12; // 사용 가능 높이의 12%
      const minHeight = 80; // 최소 80px
      const maxHeight = 120; // 최대 120px

      return Math.min(
        Math.max(availableHeight * desktopRatio, minHeight),
        maxHeight
      );
    }
  };

  const dynamicHandleHeight = calculateHandleHeight();

  const minY = CONSTANTS.MIN_HEIGHT_FROM_TOP; // 최대로 올라갈 수 있는 위치
  const maxY =
    availableHeight - dynamicHandleHeight + CONSTANTS.EXTRA_DRAG_BUFFER; // 최대로 내려갈 수 있는 위치

  // 기본 위치 정의 (스냅용) - 패딩된 컨테이너 기준
  const openY = CONSTANTS.EXPANDED_BOTTOM_MARGIN; // 열린 상태 기본 위치
  const closedY = availableHeight - dynamicHandleHeight; // 닫힌 상태: 핸들이 네비게이션 바로 위에 위치

  // 🎬 CSS transform을 통한 위치 제어
  const [translateY, setTranslateY] = useState(closedY);
  const [isAnimating, setIsAnimating] = useState(false);

  // 애니메이션 함수
  const animateToPosition = useCallback((targetY: number) => {
    setIsAnimating(true);
    setTranslateY(targetY);

    // 애니메이션 완료 후 상태 리셋
    setTimeout(() => {
      setIsAnimating(false);
    }, CONSTANTS.ANIMATION_DURATION);
  }, []);

  // 🔌 외부에서 조작할 수 있도록 imperative handle 정의
  useImperativeHandle(
    ref,
    () => ({
      close: () => {
        setIsOpen(false);
        animateToPosition(closedY);
      },
      open: () => {
        setIsOpen(true);
        animateToPosition(openY);
      },
      toggle: () => {
        if (isOpen) {
          setIsOpen(false);
          animateToPosition(closedY);
        } else {
          setIsOpen(true);
          animateToPosition(openY);
        }
      },
      initialize: () => {
        if (!isInitialized.current) {
          isInitialized.current = true;
          setIsOpen(true);
          animateToPosition(openY);
        }
      },
      setExplicitlyClosed: (closed: boolean) => {
        setIsOpen(!closed);
        animateToPosition(closed ? closedY : openY);
      },
      getCurrentPosition: () => translateY,
    }),
    [translateY, openY, closedY, isOpen, animateToPosition]
  );

  // translateY 초기화
  useEffect(() => {
    setTranslateY(closedY);
  }, [closedY]);

  const handleTouchMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!isDragging.current) return;

      e.preventDefault();
      e.stopPropagation();

      const event = 'touches' in e ? e.touches[0] : e;

      // 🔧 수정된 계산 방식: 시작점으로부터의 실제 이동거리만 계산
      const deltaY = event.clientY - startY.current;

      // 📏 최소 이동 거리 임계값 체크
      if (
        !hasMovedEnough.current &&
        Math.abs(deltaY) < CONSTANTS.MIN_DRAG_THRESHOLD
      ) {
        // 임계값보다 작은 움직임은 무시
        return;
      }

      // 임계값을 넘었으면 드래그로 인정
      if (!hasMovedEnough.current) {
        hasMovedEnough.current = true;
        if (import.meta.env.MODE === 'development') {
          console.log(
            '🎯 드래그 임계값 초과, 드래그 시작:',
            Math.abs(deltaY).toFixed(1) + 'px'
          );
        }
      }

      const newY = startTranslateY.current + deltaY;

      // 🔸 최소/최대값으로 제한 (취소하지 않고 클램핑)
      const clampedY = Math.max(minY, Math.min(maxY, newY));

      if (import.meta.env.MODE === 'development' && Math.abs(deltaY) % 10 < 1) {
        // 10px마다 한 번씩만 로그 출력 (성능 최적화)
        console.log('📊 드래그 위치 계산:', {
          델타Y: deltaY.toFixed(1),
          시작위치: startTranslateY.current.toFixed(1),
          계산된위치: newY.toFixed(1),
          최종위치: clampedY.toFixed(1),
        });
      }

      // 즉시 위치 업데이트
      setTranslateY(clampedY);
    },
    [minY, maxY]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) {
      return;
    }

    const wasDragging = hasMovedEnough.current;
    isDragging.current = false;
    hasMovedEnough.current = false; // 다음 드래그를 위해 리셋

    if (wasDragging) {
      lastDragEndTime.current = Date.now(); // 실제 드래그가 있었을 때만 시간 기록
    }

    const finalY = translateY;

    if (import.meta.env.MODE === 'development') {
      console.log('📍 드래그 종료, 최종 Y:', finalY.toFixed(1));
    }

    // 스냅 기능이 활성화된 경우에만 스냅 적용
    if (snapToPositions) {
      const midPoint = (openY + closedY) / 2;
      const shouldOpen = finalY < midPoint;

      animateToPosition(shouldOpen ? openY : closedY);
      setIsOpen(shouldOpen);

      if (import.meta.env.MODE === 'development') {
        console.log(
          '✅ 스냅 적용 → 위치:',
          shouldOpen ? 'open' : 'closed',
          shouldOpen ? openY : closedY
        );
      }
    } else {
      // 스냅 없이 현재 위치 유지 (별도 처리 불필요)
      if (import.meta.env.MODE === 'development') {
        console.log('✅ 드래그 위치 유지:', finalY.toFixed(1));
      }
    }
  }, [translateY, openY, closedY, snapToPositions, animateToPosition]);

  // 전역 이벤트 리스너 정리 함수
  const cleanupGlobalListeners = useRef<(() => void) | null>(null);

  // 전역 이벤트 처리 함수들을 상위에서 정의
  const handleGlobalMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      handleTouchMove(e);
    },
    [handleTouchMove]
  );

  const handleGlobalEnd = useCallback(() => {
    if (!isDragging.current) {
      if (import.meta.env.MODE === 'development') {
        console.log('🚫 드래그가 이미 종료되어 handleGlobalEnd 스킵');
      }
      return;
    }

    if (import.meta.env.MODE === 'development') {
      console.log('🏁 전역 드래그 종료 이벤트 처리');
    }

    handleTouchEnd();

    // 이벤트 리스너 정리
    document.removeEventListener('touchmove', handleGlobalMove);
    document.removeEventListener('touchend', handleGlobalEnd);
    document.removeEventListener('mousemove', handleGlobalMove);
    document.removeEventListener('mouseup', handleGlobalEnd);
    cleanupGlobalListeners.current = null;
  }, [handleTouchEnd, handleGlobalMove]);

  // 드래그 시작 시 전역 이벤트 리스너 등록
  const startDragging = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🚀 전역 드래그 이벤트 리스너 등록');
    }

    // 전역 이벤트 리스너 등록
    document.addEventListener('touchmove', handleGlobalMove, {
      passive: false,
    });
    document.addEventListener('touchend', handleGlobalEnd);
    document.addEventListener('mousemove', handleGlobalMove);
    document.addEventListener('mouseup', handleGlobalEnd);

    // 정리 함수 저장
    cleanupGlobalListeners.current = () => {
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('touchend', handleGlobalEnd);
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      cleanupGlobalListeners.current = null;
    };
  }, [handleGlobalMove, handleGlobalEnd]);

  // 👆 드래그 핸들링
  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      // 이미 드래그 중이면 무시
      if (isDragging.current) {
        if (import.meta.env.MODE === 'development') {
          console.log('🚫 이미 드래그 중이므로 무시');
        }
        return;
      }

      const event = 'touches' in e ? e.touches[0] : e;

      // 드래그 시작
      isDragging.current = true;
      hasMovedEnough.current = false; // 드래그 시작 시 초기화
      startY.current = event.clientY;
      startTranslateY.current = translateY;

      if (import.meta.env.MODE === 'development') {
        console.log('🎯 드래그 시작:', {
          현재위치: translateY.toFixed(1),
          최소위치: minY,
          최대위치: maxY,
          시작Y좌표: event.clientY,
          이벤트타입: e.type,
          타겟: (e.target as HTMLElement).className,
          '드래그 가능 범위': `${minY} ~ ${maxY}`,
        });
      }

      // 애니메이션 비활성화
      setIsAnimating(false);

      // 기본 동작 방지
      e.preventDefault();
      e.stopPropagation();

      // 전역 드래그 이벤트 리스너 등록
      startDragging();
    },
    [translateY, startDragging, minY, maxY]
  );

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      const currentAnimationFrame = animationFrame.current;
      const currentCleanup = cleanupGlobalListeners.current;

      if (currentAnimationFrame) {
        cancelAnimationFrame(currentAnimationFrame);
      }
      if (currentCleanup) {
        currentCleanup();
      }
    };
  }, []);

  // 바텀시트가 닫힌 위치 근처에 있는지 확인 (동적 핸들 높이 반영)
  const isNearClosed = translateY > closedY - dynamicHandleHeight * 0.5;

  return (
    <div
      className="flex-1 pointer-events-none"
      style={{ paddingBottom: `${bottomNavHeight}px` }}
    >
      {/* 📦 바텀시트 전체 컨테이너 */}
      <div
        ref={sheetRef}
        style={{
          transform: `translateY(${translateY}px)`,
          height: `${availableHeight - translateY}px`, // 패딩된 컨테이너 내에서의 높이
          transition: isAnimating
            ? `transform ${CONSTANTS.ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
          // 네비게이션 위에 표시되도록 z-index 조정
          zIndex: 40,
        }}
        className="absolute top-0 left-0 right-0 bg-white rounded-t-2xl border border-light-gray flex flex-col pointer-events-auto shadow-lg"
      >
        {/* 🔘 드래그 핸들 - 사용자 상호작용 유도 */}
        <div
          className="flex-shrink-0 py-4 px-4 cursor-grab active:cursor-grabbing touch-none select-none"
          onTouchStart={handleTouchStart}
          onMouseDown={handleTouchStart}
          onClick={() => {
            // 최근 실제 드래그 종료 후 150ms 이내면 클릭 무시 (드래그 vs 클릭 구분)
            const timeSinceLastDrag = Date.now() - lastDragEndTime.current;
            if (timeSinceLastDrag < 150) {
              if (import.meta.env.MODE === 'development') {
                console.log(
                  '🚫 최근 드래그 종료로 인한 클릭 무시 (',
                  timeSinceLastDrag,
                  'ms)'
                );
              }
              return;
            }

            // 핸들바 클릭 시 토글
            if (isOpen) {
              setIsOpen(false);
              animateToPosition(closedY);
            } else {
              setIsOpen(true);
              animateToPosition(openY);
            }

            if (import.meta.env.MODE === 'development') {
              console.log('👆 핸들 클릭으로 토글:', isOpen ? 'close' : 'open');
            }
          }}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* 🏷️ 제목 영역 */}
        {title && (
          <div
            className="flex-shrink-0 px-4 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
            onTouchStart={handleTouchStart}
            onMouseDown={handleTouchStart}
            style={{
              // 거의 닫힌 상태에서 제목 숨기기
              opacity: isNearClosed ? 0 : 1,
              transition: 'opacity 200ms ease-in-out',
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
            // 거의 닫힌 상태에서 콘텐츠 숨기기
            opacity: isNearClosed ? 0 : 1,
            transition: 'opacity 200ms ease-in-out',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
