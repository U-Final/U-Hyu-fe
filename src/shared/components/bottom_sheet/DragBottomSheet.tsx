import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useCallback, useEffect, useRef } from 'react';

interface DragBottomSheetProps {
  children: React.ReactNode;
  title?: string;
}

export const DragBottomSheet = ({ children, title }: DragBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

  // 3단계 높이 설정
  const expandedY = 60; // 완전히 열린 상태 (위에서 60px)
  const middleY = window.innerHeight * 0.5; // 중간 상태 (화면 높이의 50%)
  const collapsedY = window.innerHeight - 70; // 접힌 상태 (아래에서 70px 만 보인다.)
  const middleThreshold = window.innerHeight * 0.22; // 중간지점을 처리할 범위 (±22%)

  // 움직임 제어 함수들
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
    openMiddle(); // 처음 열릴 때는 중간 상태로
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
        return; //스크롤 영역을 터치하면 드래그 안되게 설정.
      }

      if (last) {
        //드래그 완료시 위치 결정
        const finalY = y.get(); //현재 위치 확인
        if (finalY < middleY - middleThreshold)
          open(); // 중간보다 위에 있으면 완전 열기
        else if (finalY > middleY + middleThreshold)
          close(); // 중간보다 아래에 있으면 접기
        else openMiddle(); // 중간 근처에 있으면 중간으로 고정
      } else {
        //드래그 중일 때 범위 제한
        if (newY < expandedY - 30) return cancel?.(); // 너무 위로 드래그하면 취소
        if (newY > collapsedY + 30) return cancel?.(); // 너무 아래로 드래그하면 취소
        api.start({ y: newY, immediate: true }); // 드래그 중 위치 업데이트
      }
      return memo;
    },
    { from: () => [0, y.get()], pointer: { touch: true } }
  );
  return (
    <div className="flex-1">
      {/* 바텀 시트가 열려있을 때만 보이는 배경 오버레이 - 수정됨 */}
      <div className="fixed inset-0 z-30" onClick={close} />
      <animated.div
        ref={sheetRef}
        {...bind()}
        style={{
          transform: y.to(val => `translateY(${val}px)`),
          height: y.to(val => `calc(100vh - ${val}px)`),
        }}
        className="fixed top-0 left-0 right-0 z-30 bg-white rounded-t-2xl border border-light-gray touch-none flex flex-col"
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
