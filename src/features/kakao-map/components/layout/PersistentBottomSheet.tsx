import React, { useState, useCallback, useEffect, useRef } from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { FaFilter } from 'react-icons/fa';

interface Step {
  key: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  showBackButton?: boolean;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
  showMymapButton?: boolean;
  onMymapClick?: () => void;
}
type BottomSheetState = 'collapsed' | 'middle' | 'expanded';

interface PersistentBottomSheetProps {
  /** 바텀시트에 표시할 스텝들의 배열 */
  steps: Step[];

  /** 현재 표시되어야 하는 스텝의 키 (부모에서 완전히 제어) */
  currentStepKey: string;

  /** 스텝이 변경될 때 호출될 콜백 함수 */
  onStepChange: (stepKey: string) => void;

  /** 바텀시트의 최소 높이 (접힌 상태) */
  minHeight?: number;

  /** 바텀시트의 최대 높이 (펼쳐진 상태) */
  maxHeight?: number;

  /** 초기에 펼쳐진 상태로 시작할지 여부 */
  defaultExpanded?: boolean;

  /** 하단 네비게이션 바의 높이 (바텀시트 위치 계산용) */
  bottomNavHeight?: number;

  /** 외부에서 제어하는 확장 상태 */
  isExpanded?: boolean;

  /** 확장 상태 변경 콜백 */
  onExpandedChange?: (expanded: boolean) => void;

  /** 드래그 기능 활성화 여부 */
  enableDrag?: boolean;
}

export const PersistentBottomSheet: React.FC<PersistentBottomSheetProps> = ({
  steps,
  currentStepKey,
  onStepChange,
  minHeight = 80,
  maxHeight = 400,
  defaultExpanded = false,
  bottomNavHeight = 60,
  isExpanded: controlledIsExpanded,
  onExpandedChange,
  enableDrag = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [{ y }, api] = useSpring(() => ({ 
    y: defaultExpanded ? window.innerHeight - maxHeight : window.innerHeight * 0.5 
  }));
  const [internalState, setInternalState] = useState<BottomSheetState>(
    defaultExpanded ? 'expanded' : 'middle'
  );

  // DragBottomSheet와 동일한 3단계 높이 설정
  const expandedY = window.innerHeight - maxHeight;
  const middleY = window.innerHeight * 0.5;
  const collapsedY = window.innerHeight - minHeight;
  const middleThreshold = window.innerHeight * 0.22;

  const currentStep = steps.find(step => step.key === currentStepKey);

  const goBackToFirstStep = () => {
    if (steps.length > 0 && steps[0]) {
      onStepChange(steps[0].key);
    }
  };

  // DragBottomSheet와 동일한 움직임 제어 함수들
  const open = useCallback(() => {
    api.start({ y: expandedY });
    setInternalState('expanded');
    onExpandedChange?.(true);
  }, [api, expandedY, onExpandedChange]);

  const openMiddle = useCallback(() => {
    api.start({ y: middleY });
    setInternalState('middle');
    onExpandedChange?.(false);
  }, [api, middleY, onExpandedChange]);

  const close = useCallback(() => {
    api.start({ y: collapsedY });
    setInternalState('collapsed');
    onExpandedChange?.(false);
  }, [api, collapsedY, onExpandedChange]);

  // 초기 상태 설정
  useEffect(() => {
    // 컴포넌트 마운트 후 약간의 지연을 두고 정확한 위치로 이동
    const timer = setTimeout(() => {
      if (defaultExpanded) {
        open();
      } else {
        openMiddle();
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [defaultExpanded, open, openMiddle]);

  // 외부에서 제어하는 경우 상태 동기화
  useEffect(() => {
    if (controlledIsExpanded !== undefined) {
      if (controlledIsExpanded && internalState !== 'expanded') {
        open();
      } else if (!controlledIsExpanded && internalState !== 'collapsed') {
        close();
      }
    }
  }, [controlledIsExpanded, internalState, open, close]);

  const bind = useDrag(
    ({ last, target, movement: [, my], cancel, memo }) => {
      if (!enableDrag) return;

      const targetScroll = target as HTMLElement;
      if (!memo) memo = y.get();
      const newY = memo + my;

      if (
        sheetRef.current?.contains(targetScroll) &&
        targetScroll.closest('[data-scrollable]')
      ) {
        return; // 스크롤 영역을 터치하면 드래그 안되게 설정
      }

      if (last) {
        // 드래그 완료시 위치 결정
        const finalY = y.get(); // 현재 위치 확인
        if (finalY < middleY - middleThreshold) {
          open(); // 중간보다 위에 있으면 완전 열기
        } else if (finalY > middleY + middleThreshold) {
          close(); // 중간보다 아래에 있으면 접기
        } else {
          openMiddle(); // 중간 근처에 있으면 중간으로 고정
        }
      } else {
        // 드래그 중일 때 범위 제한
        if (newY < expandedY - 30) return cancel?.(); // 너무 위로 드래그하면 취소
        if (newY > collapsedY + 30) return cancel?.(); // 너무 아래로 드래그하면 취소
        api.start({ y: newY, immediate: true }); // 드래그 중 위치 업데이트
      }
      return memo;
    },
    { from: () => [0, y.get()], pointer: { touch: true } }
  );

  const handleHeaderClick = () => {
    if (!enableDrag) {
      // 드래그가 비활성화된 경우 기존 토글 방식 사용
      if (internalState === 'expanded') {
        close();
      } else {
        open();
      }
    } else {
      // 드래그가 활성화된 경우 3단계 순환
      if (internalState === 'collapsed') {
        openMiddle();
      } else if (internalState === 'middle') {
        open();
      } else {
        close();
      }
    }
  };

  const bottomSheetStyle = {
    bottom: `${bottomNavHeight}px`,
  };

  if (!currentStep) {
    console.error(`스텝을 찾을 수 없습니다: ${currentStepKey}`);
    return null;
  }

  const isContentVisible = internalState !== 'collapsed';

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 배경 오버레이 */}
      {internalState !== 'collapsed' && (
        <div className="absolute inset-0 z-30 pointer-events-auto" onClick={close} />
      )}
      
      {/* Bottom Sheet */}
      <animated.div
        ref={sheetRef}
        style={{
          ...bottomSheetStyle,
          transform: y.to(val => `translateY(${val}px)`),
          height: y.to(val => `calc(100vh - ${val}px - ${bottomNavHeight}px)`),
        }}
        className="absolute left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-40 border border-gray-200 pointer-events-auto flex flex-col"
      >
        {/* 드래그 핸들 */}
        <div
          {...(enableDrag ? bind() : {})}
          className="flex justify-center py-3 cursor-pointer flex-shrink-0 border-b border-gray-100 hover:bg-gray-50 transition-colors touch-none"
          onClick={handleHeaderClick}
          role="button"
          aria-label={internalState === 'expanded' ? '바텀시트 접기' : '바텀시트 펼치기'}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* 헤더 영역 */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                {currentStep.title}
              </h2>
              {currentStep.subtitle && (
                <p className="text-sm text-gray-500 mt-1">
                  {currentStep.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-row gap-2">
              {/* MyMap 버튼 추가 */}
              <div className="flex items-center gap-2">
                {currentStep.showMymapButton && currentStep.onMymapClick && (
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-light-gray shadow-sm hover:shadow-md"
                    onClick={currentStep.onMymapClick}
                    aria-label="MyMap으로 이동"
                  >
                    <span>My Map</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* 필터 버튼 */}
                {currentStep.showFilterButton && currentStep.onFilterClick && (
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-light-gray shadow-sm hover:shadow-md"
                    onClick={currentStep.onFilterClick}
                    aria-label="필터 설정"
                  >
                    <FaFilter className="w-3.5 h-3.5" />
                    <span>필터</span>
                  </button>
                )}
              </div>

              {/* 뒤로 가기 버튼 */}
              {currentStep.showBackButton &&
                currentStepKey !== steps[0]?.key && (
                  <button
                    className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                    onClick={goBackToFirstStep}
                    aria-label="이전 화면으로 돌아가기"
                  >
                    뒤로
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        {isContentVisible && (
          <div
            className="flex-1 min-h-0 overflow-hidden"
            data-scrollable
          >
            <div className="h-full overflow-y-auto scrollbar-hidden">
              {currentStep.content}
            </div>
          </div>
        )}

        {/* 접힌 상태에서의 미리보기 */}
        {!isContentVisible && (
          <div className="flex-1 px-6 py-2 flex items-center">
            <span className="text-sm text-gray-500">
              탭하여 열기
            </span>
          </div>
        )}
      </animated.div>
    </div>
  );
};
