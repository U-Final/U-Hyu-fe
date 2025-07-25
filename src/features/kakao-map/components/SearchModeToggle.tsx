import { Search, SearchX } from 'lucide-react';
import React from 'react';

interface SearchModeToggleProps {
  /** 수동 검색 모드 활성화 여부 */
  isManualMode: boolean;
  /** 모드 변경 핸들러 */
  onToggle: (isManual: boolean) => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 자동/수동 검색 모드 토글 컴포넌트
 * 사용자가 검색 방식을 선택할 수 있도록 함
 */
export const SearchModeToggle: React.FC<SearchModeToggleProps> = ({
  isManualMode,
  onToggle,
  className = '',
}) => {
  const handleToggle = () => {
    onToggle(!isManualMode);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 font-medium">검색 모드:</span>
      
      <button
        onClick={handleToggle}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full
          transition-all duration-200 text-sm font-medium
          ${isManualMode
            ? 'bg-orange-100 text-orange-700 border border-orange-200'
            : 'bg-blue-100 text-blue-700 border border-blue-200'
          }
          hover:shadow-sm active:scale-95
        `}
        aria-label={`${isManualMode ? '수동' : '자동'} 검색 모드 (클릭하여 변경)`}
      >
        {isManualMode ? (
          <>
            <SearchX size={14} />
            <span>수동</span>
          </>
        ) : (
          <>
            <Search size={14} />
            <span>자동</span>
          </>
        )}
      </button>
      
      <span className="text-xs text-gray-500">
        {isManualMode ? '이동 시 버튼으로 검색' : '이동 시 자동 검색'}
      </span>
    </div>
  );
};

/**
 * 간단한 토글 스위치 버전
 */
export const SearchModeSwitch: React.FC<SearchModeToggleProps> = ({
  isManualMode,
  onToggle,
  className = '',
}) => {
  const handleToggle = () => {
    onToggle(!isManualMode);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-gray-700">자동 검색</span>
      
      <button
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out focus:outline-none
          ${isManualMode ? 'bg-orange-400' : 'bg-blue-400'}
        `}
        role="switch"
        aria-checked={!isManualMode}
        aria-label="자동 검색 모드 토글"
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            transition-transform duration-200 ease-in-out
            ${isManualMode ? 'translate-x-1' : 'translate-x-6'}
          `}
        />
      </button>
      
      <span className="text-sm text-gray-700">수동 검색</span>
    </div>
  );
};

export default SearchModeToggle;