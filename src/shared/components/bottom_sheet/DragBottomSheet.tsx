import { useCallback, useEffect, useRef } from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface DragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
}

export const DragBottomSheet = ({ children, title }: DragBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

  const expandedY = 60;
  const middleY = window.innerHeight * 0.5;
  const collapsedY = window.innerHeight - 120;
  const middleThreshold = window.innerHeight * 0.22;

  const open = useCallback(() => api.start({ y: expandedY }), [api, expandedY]);
  const openMiddle = useCallback(
    () => api.start({ y: middleY }),
    [api, middleY]
  );
  const close = useCallback(
    () => api.start({ y: collapsedY }),
    [api, collapsedY]
  );

  useEffect(() => {
    openMiddle();
  }, [openMiddle]);

  const bind = useDrag(
    ({ last, target, movement: [, my], cancel, memo }) => {
      const targetScroll = target as HTMLElement;
      if (!memo) memo = y.get();
      const newY = memo + my;

      if (
        sheetRef.current?.contains(targetScroll) &&
        targetScroll.closest('[data-scrollable]')
      ) {
        return;
      }

      if (last) {
        const finalY = y.get();
        if (finalY < middleY - middleThreshold)
          open();
        else if (finalY > middleY + middleThreshold)
          close();
        else openMiddle();
      } else {
        if (newY < expandedY - 30) return cancel?.();
        if (newY > collapsedY + 30) return cancel?.();
        api.start({ y: newY, immediate: true });
      }
      return memo;
    },
    { from: () => [0, y.get()], pointer: { touch: true } }
  );
  return (
    <div className="flex-1">
      <div className="absolute inset-0 z-30" onClick={close} />
      <animated.div
        ref={sheetRef}
        {...bind()}
        style={{
          transform: y.to(val => `translateY(${val}px)`),
          height: y.to(val => `calc(100vh - ${val}px)`),
        }}
        className="absolute top-0 left-0 right-0 z-30 bg-white rounded-t-2xl border border-light-gray touch-none flex flex-col"
      >
        <div className="flex-shrink-0 py-4 px-4">
          <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        </div>

        {title && (
          <div className="flex-shrink-0" onClick={openMiddle}>
            {title}
          </div>
        )}

        <div
          data-scrollable
          className="flex-1 overflow-y-auto scrollbar-hidden pb-[50px]"
        >
          {children}
        </div>
      </animated.div>
    </div>
  );
};
