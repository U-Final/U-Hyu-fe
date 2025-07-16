import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

interface Step {
  key: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  showBackButton?: boolean;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
}
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
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(defaultExpanded);

  // 외부에서 제어하는 경우 외부 상태를, 그렇지 않으면 내부 상태를 사용
  const isExpanded =
    controlledIsExpanded !== undefined
      ? controlledIsExpanded
      : internalIsExpanded;

  const currentStep = steps.find(step => step.key === currentStepKey);

  const goBackToFirstStep = () => {
    const firstStep = steps[0];
    if (firstStep) {
      onStepChange(firstStep.key);
    }
  };

  const toggleExpansion = () => {
    if (onExpandedChange) {
      onExpandedChange(!isExpanded);
    } else {
      setInternalIsExpanded(prev => !prev);
    }
  };

  const bottomSheetStyle = {
    bottom: `${bottomNavHeight}px`,
  };

  if (!currentStep) {
    console.error(`스텝을 찾을 수 없습니다: ${currentStepKey}`);
    return null;
  }

  return (
    <motion.div
      className="fixed left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-40 border border-gray-200"
      style={bottomSheetStyle}
      initial={{ height: minHeight }}
      animate={{
        height: isExpanded ? maxHeight : minHeight,
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200,
      }}
    >
      <div className="flex flex-col h-full">
        <div
          className="flex justify-center py-3 cursor-pointer flex-shrink-0 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          onClick={toggleExpansion}
          role="button"
          aria-label={isExpanded ? '바텀시트 접기' : '바텀시트 펼치기'}
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

            <div className="flex items-center gap-2">
              {/* 필터 버튼 */}
              {currentStep.showFilterButton && currentStep.onFilterClick && (
                <button
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                  onClick={currentStep.onFilterClick}
                  aria-label="필터 설정"
                >
                  <FaFilter className="w-3.5 h-3.5" />
                  <span>필터</span>
                </button>
              )}

              {/* 뒤로 가기 버튼 */}
              {currentStep.showBackButton &&
                currentStepKey !== steps[0]?.key && (
                  <button
                    className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
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
        {isExpanded && (
          <div className="flex-1 min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepKey}
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {currentStep.content}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 접힌 상태에서의 미리보기 */}
        {!isExpanded && (
          <div className="flex-1 px-6 py-2 flex items-center"></div>
        )}
      </div>
    </motion.div>
  );
};
