import { type FC } from 'react';

import { motion } from 'framer-motion';

/**
 * 바텀시트 토글 버튼 컴포넌트의 Props 인터페이스
 */
interface BottomSheetToggleButtonProps {
  /** 바텀시트 열림/닫힘 상태 */
  isOpen: boolean;
  /** 토글 버튼 클릭 핸들러 */
  onToggle: () => void;
}

/**
 * 바텀시트를 열고 닫을 수 있는 토글 버튼 컴포넌트
 *
 * @description
 * - framer-motion을 사용한 부드러운 아이콘 회전 애니메이션
 * - 바텀시트 상태에 따라 V(닫힘) ↔ ^(열림) 시각적 표현
 * - 접근성을 위한 동적 aria-label 제공
 * - 고급 그림자 효과로 지도 배경과 시각적 구분
 *
 * @param isOpen - 바텀시트가 열려있는지 여부
 * @param onToggle - 토글 버튼 클릭 시 실행할 함수
 *
 * @example
 * ```tsx
 * <BottomSheetToggleButton
 *   isOpen={isBottomSheetOpen}
 *   onToggle={handleToggleBottomSheet}
 * />
 * ```
 */
const BottomSheetToggleButton: FC<BottomSheetToggleButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div className="flex-shrink-0 h-[44px]">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-[44px] h-full bg-white border border-gray-200 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
        aria-label={isOpen ? '매장 목록 닫기' : '매장 목록 열기'}
      >
        <motion.div
          animate={{
            rotate: isOpen ? 0 : 180,
            scale: isOpen ? 1 : 1.1,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
    </div>
  );
};

export default BottomSheetToggleButton;
