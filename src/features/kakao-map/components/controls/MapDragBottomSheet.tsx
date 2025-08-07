import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface MapDragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
  snapToPositions?: boolean;
}

export interface MapDragBottomSheetRef {
  close: () => void;
  open: () => void;
  openMiddle: () => void;
  toggle: () => void;
  initialize: () => void;
  setExplicitlyClosed: (closed: boolean) => void;
  getCurrentPosition: () => number;
}

const CONSTANTS = {
  EXPANDED_BOTTOM_MARGIN: 0,

  MIN_HEIGHT_FROM_TOP: 0,
  EXTRA_DRAG_BUFFER: 0,

  SNAP_THRESHOLD: 100,

  ANIMATION_DURATION: 300,

  MIN_DRAG_THRESHOLD: 3,

  PARENT_ELEMENT_SEARCH_DEPTH: 5,
} as const;

export const MapDragBottomSheet = forwardRef<
  MapDragBottomSheetRef,
  MapDragBottomSheetProps
>(({ children, title, snapToPositions = false }, ref) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startTranslateY = useRef(0);
  const hasMovedEnough = useRef(false);
  const animationFrame = useRef<number | null>(null);
  const lastDragEndTime = useRef(0);

  const [isOpen, setIsOpen] = useState(false);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const availableHeight = windowHeight;

  const dynamicHandleHeight = 100;

  const minY = CONSTANTS.MIN_HEIGHT_FROM_TOP;
  const maxY =
    availableHeight - dynamicHandleHeight + CONSTANTS.EXTRA_DRAG_BUFFER;

  const openY = CONSTANTS.EXPANDED_BOTTOM_MARGIN;
  const closedY = availableHeight - dynamicHandleHeight;
  const middleY = availableHeight * 0.4;

  const [translateY, setTranslateY] = useState(closedY);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateToPosition = useCallback((targetY: number) => {
    setIsAnimating(true);
    setTranslateY(targetY);

    setTimeout(() => {
      setIsAnimating(false);
    }, CONSTANTS.ANIMATION_DURATION);
  }, []);

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
      openMiddle: () => {
        setIsOpen(true);
        animateToPosition(middleY);
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
          setIsOpen(false);
          animateToPosition(closedY);
        }
      },
      setExplicitlyClosed: (closed: boolean) => {
        setIsOpen(!closed);
        animateToPosition(closed ? closedY : openY);
      },
      getCurrentPosition: () => translateY,
    }),
    [translateY, openY, closedY, middleY, isOpen, animateToPosition]
  );

  useEffect(() => {
    setTranslateY(closedY);
  }, [closedY]);

  const handleTouchMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!isDragging.current) return;

      e.preventDefault();
      e.stopPropagation();

      const event = 'touches' in e ? e.touches[0] : e;

      const deltaY = event.clientY - startY.current;

      if (
        !hasMovedEnough.current &&
        Math.abs(deltaY) < CONSTANTS.MIN_DRAG_THRESHOLD
      ) {
        return;
      }

      if (!hasMovedEnough.current) {
        hasMovedEnough.current = true;
      }

      const newY = startTranslateY.current + deltaY;

      const clampedY = Math.max(minY, Math.min(maxY, newY));

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
    hasMovedEnough.current = false;

    if (wasDragging) {
      lastDragEndTime.current = Date.now();
    }

    const finalY = translateY;
    if (snapToPositions) {
      const midPoint = (openY + closedY) / 2;
      const shouldOpen = finalY < midPoint;

      animateToPosition(shouldOpen ? openY : closedY);
      setIsOpen(shouldOpen);
    }
  }, [translateY, openY, closedY, snapToPositions, animateToPosition]);

  const cleanupGlobalListeners = useRef<(() => void) | null>(null);

  const handleGlobalMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      handleTouchMove(e);
    },
    [handleTouchMove]
  );

  const handleGlobalEnd = useCallback(() => {
    if (!isDragging.current) {
      return;
    }

    handleTouchEnd();

    document.removeEventListener('touchmove', handleGlobalMove);
    document.removeEventListener('touchend', handleGlobalEnd);
    document.removeEventListener('mousemove', handleGlobalMove);
    document.removeEventListener('mouseup', handleGlobalEnd);
    cleanupGlobalListeners.current = null;
  }, [handleTouchEnd, handleGlobalMove]);

  const startDragging = useCallback(() => {
    document.addEventListener('touchmove', handleGlobalMove, {
      passive: false,
    });
    document.addEventListener('touchend', handleGlobalEnd);
    document.addEventListener('mousemove', handleGlobalMove);
    document.addEventListener('mouseup', handleGlobalEnd);

    cleanupGlobalListeners.current = () => {
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('touchend', handleGlobalEnd);
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      cleanupGlobalListeners.current = null;
    };
  }, [handleGlobalMove, handleGlobalEnd]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isDragging.current) {
        return;
      }

      const event = 'touches' in e ? e.touches[0] : e;

      isDragging.current = true;
      hasMovedEnough.current = false;
      startY.current = event.clientY;
      startTranslateY.current = translateY;

      setIsAnimating(false);

      e.preventDefault();
      e.stopPropagation();

      startDragging();
    },
    [translateY, startDragging, minY, maxY]
  );

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

  const isNearClosed = translateY > closedY - dynamicHandleHeight * 0.5;

  return (
    <div
      className="flex-1 pointer-events-none"
      style={{ paddingBottom: `0px` }}
    >
      <div
        ref={sheetRef}
        style={{
          transform: `translateY(${translateY}px)`,
          height: `${availableHeight - translateY}px`,
          transition: isAnimating
            ? `transform ${CONSTANTS.ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
          zIndex: 40,
        }}
        className="absolute top-0 left-0 right-0 bg-white rounded-t-2xl border border-light-gray flex flex-col pointer-events-auto shadow-lg"
      >
        <div
          className="flex-shrink-0 py-4 px-4 cursor-grab active:cursor-grabbing touch-none select-none"
          onTouchStart={handleTouchStart}
          onMouseDown={handleTouchStart}
          onClick={() => {
            const timeSinceLastDrag = Date.now() - lastDragEndTime.current;
            if (timeSinceLastDrag < 150) {
              return;
            }

            if (isOpen) {
              setIsOpen(false);
              animateToPosition(closedY);
            } else {
              setIsOpen(true);
              animateToPosition(openY);
            }
          }}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        {title && (
          <div
            className="flex-shrink-0 px-4 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
            onTouchStart={handleTouchStart}
            onMouseDown={handleTouchStart}
            style={{
              opacity: isNearClosed ? 0 : 1,
              transition: 'opacity 200ms ease-in-out',
            }}
          >
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}

        <div
          data-scrollable
          className="flex-1 overflow-y-auto scrollbar-hidden pb-safe pb-8"
          style={{
            overscrollBehavior: 'contain',
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
