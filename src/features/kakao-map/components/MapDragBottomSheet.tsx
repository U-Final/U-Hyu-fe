import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  const startY = useRef(0); // 드래그 시작 Y 좌표
  const currentY = useRef(0); // 현재 Y 좌표
  const animationFrame = useRef<number | null>(null);

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

  // 🎬 CSS transform을 통한 위치 제어
  const [translateY, setTranslateY] = useState(collapsedY);
  const [isAnimating, setIsAnimating] = useState(false);

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
          setIsExplicitlyClosed(false);
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

  // 애니메이션 함수
  const animateToPosition = useCallback((targetY: number) => {
    setIsAnimating(true);
    setTranslateY(targetY);
    currentY.current = targetY;

    // 애니메이션 완료 후 상태 리셋
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // CSS transition duration과 동일
  }, []);

  // 🔄 localState 변경 시 CSS 애니메이션 실행
  useEffect(() => {
    // 드래그 중에는 자동 애니메이션을 막음 (사용자 제어 우선)
    if (isDragging.current) {
      if (import.meta.env.MODE === 'development') {
        console.log('⏸️ 드래그 중이므로 상태 변경 무시:', localState);
      }
      return;
    }

    const targetY = snapPositions[localState];
    animateToPosition(targetY);
  }, [localState, snapPositions, isExplicitlyClosed, animateToPosition]);

  // translateY 초기화
  useEffect(() => {
    const initialY = snapPositions[localState];
    setTranslateY(initialY);
    currentY.current = initialY;
  }, [snapPositions, localState]);

  const handleTouchMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!isDragging.current) return;

      e.preventDefault();
      const event = 'touches' in e ? e.touches[0] : e;
      const deltaY = event.clientY - startY.current;
      const newY = currentY.current + deltaY;

      // 🔸 간소한 드래그 취소 로직
      // collapsed 위치에서 80px까지만 허용
      const maxAllowedY = collapsedY + 80;

      // 취소 근처에서만 디버깅 정보 출력 (성능 고려)
      if (import.meta.env.MODE === 'development' && newY > collapsedY + 30) {
        console.log('📊 취소 위험 구간 진입:', {
          newY: newY.toFixed(1),
          maxAllowedY,
          collapsedY,
          '여유 공간': (maxAllowedY - newY).toFixed(1) + 'px',
          '아래쪽 취소 여부': newY > maxAllowedY ? '🚨 취소!' : '⚠️ 주의',
          windowHeight,
        });
      }

      if (newY > maxAllowedY) {
        if (import.meta.env.MODE === 'development') {
          console.log('⬇️ 너무 아래로 드래그하여 취소:', {
            newY: newY.toFixed(1),
            maxAllowedY,
            collapsedY,
            초과량: (newY - maxAllowedY).toFixed(1) + 'px',
            '취소 이유': 'collapsed 위치에서 80px 초과',
            '복원할 위치': snapPositions[localState],
          });
        }

        // 🚨 강제 드래그 중단 및 즉시 복원
        isDragging.current = false;

        // 전역 이벤트 리스너 즉시 정리
        if (cleanupGlobalListeners.current) {
          cleanupGlobalListeners.current();
        }

        // 애니메이션 프레임 취소
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }

        // 즉시 원래 위치로 복원 (애니메이션 포함)
        const originalPosition = snapPositions[localState];
        setIsAnimating(true);
        setTranslateY(originalPosition);
        currentY.current = originalPosition;

        // 애니메이션 완료 후 상태 리셋
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);

        if (import.meta.env.MODE === 'development') {
          console.log('✅ 드래그 취소 완료 - 위치 복원:', originalPosition);
        }

        return;
      }

      // 위쪽 드래그 취소 (기존보다 더 관대하게)
      const minAllowedY = expandedY - 30; // 확장 위치에서 30px 위까지만 허용

      if (newY < minAllowedY) {
        if (import.meta.env.MODE === 'development') {
          console.log('⬆️ 너무 위로 드래그하여 취소:', {
            newY: newY.toFixed(1),
            minAllowedY,
            expandedY,
            초과량: (minAllowedY - newY).toFixed(1) + 'px',
            '취소 이유': '바텀시트가 화면 위로 너무 올라감',
            '복원할 위치': snapPositions[localState],
          });
        }

        // 🚨 강제 드래그 중단 및 즉시 복원
        isDragging.current = false;

        // 전역 이벤트 리스너 즉시 정리
        if (cleanupGlobalListeners.current) {
          cleanupGlobalListeners.current();
        }

        // 애니메이션 프레임 취소
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }

        // 즉시 원래 위치로 복원 (애니메이션 포함)
        const originalPosition = snapPositions[localState];
        setIsAnimating(true);
        setTranslateY(originalPosition);
        currentY.current = originalPosition;

        // 애니메이션 완료 후 상태 리셋
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);

        if (import.meta.env.MODE === 'development') {
          console.log(
            '✅ 위쪽 드래그 취소 완료 - 위치 복원:',
            originalPosition
          );
        }

        return;
      }

      // 정상 범위 내 드래그 처리
      const minY = expandedY;
      const maxY = collapsedY + 50; // 접힌 상태에서 50px 아래까지
      const clampedY = Math.max(minY, Math.min(maxY, newY));

      // requestAnimationFrame으로 부드러운 드래그
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        setTranslateY(clampedY);
      });
    },
    [expandedY, collapsedY, windowHeight, snapPositions, localState]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) {
      if (import.meta.env.MODE === 'development') {
        console.log('🚫 드래그가 이미 종료되어 handleTouchEnd 스킵');
      }
      return;
    }

    isDragging.current = false;
    const finalY = translateY;

    if (import.meta.env.MODE === 'development') {
      console.log('📍 드래그 정상 완료, 최종 Y:', finalY.toFixed(1));
    }

    // 드래그 취소된 경우 처리하지 않음 (이미 위치가 복원됨)
    const maxAllowedY = collapsedY + 80;
    const minAllowedY = expandedY - 30;

    if (finalY > maxAllowedY || finalY < minAllowedY) {
      if (import.meta.env.MODE === 'development') {
        console.log('⚠️ 비정상 위치에서 드래그 종료 - 추가 보정 없음:', {
          finalY: finalY.toFixed(1),
          minAllowedY,
          maxAllowedY,
          이유: '이미 취소 로직에서 처리됨',
        });
      }
      return;
    }

    // 스냅 위치 계산 (정상 범위 내에서만)
    const snapThreshold = 80;
    let newState: typeof localState = localState;

    const expandedRange = expandedY + snapThreshold;
    const middleRangeMin = middleY - snapThreshold;
    const middleRangeMax = middleY + snapThreshold;
    const collapsedRange = collapsedY - snapThreshold;

    if (finalY <= expandedRange) {
      newState = 'expanded';
    } else if (finalY >= middleRangeMin && finalY <= middleRangeMax) {
      newState = 'middle';
    } else if (finalY >= collapsedRange) {
      newState = 'collapsed';
    } else {
      // 가장 가까운 위치로 스냅
      const distToExpanded = Math.abs(finalY - expandedY);
      const distToMiddle = Math.abs(finalY - middleY);
      const distToCollapsed = Math.abs(finalY - collapsedY);

      if (distToExpanded <= distToMiddle && distToExpanded <= distToCollapsed) {
        newState = 'expanded';
      } else if (distToMiddle <= distToCollapsed) {
        newState = 'middle';
      } else {
        newState = 'collapsed';
      }
    }

    // 상태 업데이트
    setIsExplicitlyClosed(newState === 'collapsed');
    setLocalState(newState);

    if (import.meta.env.MODE === 'development') {
      console.log(
        '✅ 드래그 정상 종료 → 상태:',
        newState,
        '위치:',
        snapPositions[newState]
      );
    }
  }, [translateY, expandedY, middleY, collapsedY, localState, snapPositions]);

  // 전역 이벤트 리스너 정리 함수
  const cleanupGlobalListeners = useRef<(() => void) | null>(null);

  // 드래그 시작 시 전역 이벤트 리스너 등록
  const startDragging = useCallback(() => {
    const handleGlobalMove = (e: TouchEvent | MouseEvent) => {
      handleTouchMove(e);
    };

    const handleGlobalEnd = () => {
      // 드래그가 취소로 인해 이미 종료된 경우 처리하지 않음
      if (!isDragging.current) {
        if (import.meta.env.MODE === 'development') {
          console.log('🚫 드래그가 이미 취소되어 종료 처리 스킵');
        }
        // 이벤트 리스너만 제거
        cleanupListeners();
        return;
      }

      handleTouchEnd();
      // 이벤트 리스너 제거
      cleanupListeners();
    };

    const cleanupListeners = () => {
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('touchend', handleGlobalEnd);
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      cleanupGlobalListeners.current = null;
    };

    // 전역 이벤트 리스너 등록
    document.addEventListener('touchmove', handleGlobalMove, {
      passive: false,
    });
    document.addEventListener('touchend', handleGlobalEnd);
    document.addEventListener('mousemove', handleGlobalMove);
    document.addEventListener('mouseup', handleGlobalEnd);

    // 정리 함수 저장 (취소 시 즉시 호출 가능)
    cleanupGlobalListeners.current = cleanupListeners;
  }, [handleTouchMove, handleTouchEnd]);

  // 👆 순수 JavaScript 드래그 핸들링
  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const event = 'touches' in e ? e.touches[0] : e;
      const target = e.target as HTMLElement;

      // 클릭 가능한 요소들에서는 드래그 비활성화 (더 포괄적으로)
      const clickableElements = ['INPUT', 'BUTTON', 'A', 'SELECT', 'TEXTAREA'];
      if (clickableElements.includes(target.tagName)) {
        if (import.meta.env.MODE === 'development') {
          console.log('클릭 가능한 요소에서 드래그 차단:', target.tagName);
        }
        return;
      }

      // 클릭 가능한 역할을 가진 요소들도 체크
      const interactiveRoles = ['button', 'link', 'menuitem', 'tab'];
      const role = target.getAttribute('role');
      if (role && interactiveRoles.includes(role)) {
        if (import.meta.env.MODE === 'development') {
          console.log('인터랙티브 역할 요소에서 드래그 차단:', role);
        }
        return;
      }

      // 클릭 가능한 부모 요소가 있는지 확인 (5단계까지)
      let currentElement = target;
      let depth = 0;
      while (currentElement && depth < 5) {
        if (
          clickableElements.includes(currentElement.tagName) ||
          currentElement.onclick ||
          currentElement.getAttribute('role') === 'button' ||
          currentElement.classList.contains('cursor-pointer')
        ) {
          return;
        }
        currentElement = currentElement.parentElement as HTMLElement;
        depth++;
      }

      // 스크롤 가능한 영역이나 폼 요소에서는 드래그 비활성화
      const scrollableElement = target.closest('[data-scrollable]');
      if (
        scrollableElement &&
        scrollableElement.scrollHeight > scrollableElement.clientHeight
      ) {
        return;
      }

      isDragging.current = true;
      startY.current = event.clientY;
      currentY.current = translateY;

      if (import.meta.env.MODE === 'development') {
        const maxAllowedY = collapsedY + 80;
        const minAllowedY = expandedY - 30;

        console.log('🎯 드래그 시작 (간소한 취소 로직):', {
          windowHeight,
          expandedY,
          middleY,
          collapsedY,
          currentY: translateY.toFixed(1),
          maxAllowedY: `${maxAllowedY} (collapsed + 80px)`,
          minAllowedY: `${minAllowedY} (expanded - 30px)`,
          '허용 범위': `${minAllowedY} ~ ${maxAllowedY}`,
          '취소 조건': {
            아래로: `Y > ${maxAllowedY}`,
            위로: `Y < ${minAllowedY}`,
          },
        });
      }

      // 애니메이션 비활성화
      setIsAnimating(false);

      // 전역 드래그 이벤트 리스너 등록
      startDragging();
    },
    [translateY, startDragging, windowHeight, expandedY, middleY, collapsedY]
  );

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className="flex-1 pointer-events-none">
      {/* 📦 바텀시트 전체 컨테이너 - 포인터 이벤트는 내부에서만 활성화 */}
      <div
        ref={sheetRef}
        style={{
          transform: `translateY(${translateY}px)`,
          height: `calc(100vh - ${translateY}px)`,
          transition: isAnimating
            ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none',
        }}
        className="absolute top-0 left-0 right-0 z-40 bg-white rounded-t-2xl border border-light-gray flex flex-col pointer-events-auto shadow-lg"
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
      >
        {/* 🔘 드래그 핸들 - 사용자 상호작용 유도 */}
        <div className="flex-shrink-0 py-4 px-4 cursor-grab active:cursor-grabbing touch-none select-none">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* 🏷️ 제목 영역 - 클릭시 확장 가능 */}
        {title && (
          <div
            className="flex-shrink-0 px-4 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
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
      </div>
    </div>
  );
});
