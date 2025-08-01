import React, { useRef } from 'react';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface KeywordSearchInputProps {
  /** 현재 검색어 */
  value: string;
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void;
  /** 검색 실행 핸들러 */
  onSearch: (keyword: string) => void;
  /** 검색 취소 핸들러 */
  onCancel?: () => void;
  /** 로딩 상태 */
  loading?: boolean;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 자동 포커스 여부 */
  autoFocus?: boolean;
}

/**
 * 컴팩트한 버전의 키워드 검색 입력
 * 모바일이나 좁은 공간에서 사용
 */
export const KeywordSearchInput: React.FC<KeywordSearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onCancel,
  loading = false,
  placeholder = '장소 검색',
  className = '',
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() && !loading) {
        onSearch(value.trim());
        inputRef.current?.blur();
      }
    }
  };

  const handleClear = () => {
    onChange('');
    onCancel?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center h-[36px] bg-white border border-gray-200 rounded-md shadow-lg hover:shadow-xl focus-within:shadow-xl transition-all duration-200 pr-8">
        {/* 검색 아이콘 */}
        <div className="flex-shrink-0 pl-3">
          <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600" />
        </div>

        {/* 입력 필드 */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          autoFocus={autoFocus}
          className={`
            flex-1 px-2 h-full
            bg-transparent border-none outline-none
            text-base md:text-sm font-semibold text-black placeholder-text-teritary
            disabled:cursor-wait disabled:text-gray-400
          `}
          aria-label="장소 검색"
        />

        {/* 입력 내용 지우기 / 로딩 */}
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
          {loading ? (
            <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-text-teritary hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-150"
                aria-label="검색어 지우기"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * MapTopControls용 간소화된 키워드 검색 입력
 * SearchInput과 동일한 인터페이스를 제공하면서 KeywordSearchInput 디자인 적용
 */
export const MapSearchInput: React.FC<{
  /** 현재 검색어 */
  value: string;
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void;
  /** 검색 실행 핸들러 (엔터키 입력 시) */
  onSearch?: (value: string) => void;
  /** 검색 취소 핸들러 (X 버튼 클릭 시) */
  onCancel?: () => void;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** variant (SearchInput 호환) */
  variant?: 'gray' | 'white';
  /** 추가 CSS 클래스 */
  className?: string;
}> = ({
  value,
  onChange,
  onSearch,
  onCancel,
  placeholder = '장소 검색',
  variant = 'white',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(value);
    }
  };

  const handleCancel = () => {
    onChange('');
    onCancel?.();
    inputRef.current?.blur();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          w-full h-[44px] px-[25px] text-base md:text-sm font-semibold text-black placeholder-text-teritary rounded-md pr-10 transition-all duration-200
          ${variant === 'white' ? 'bg-white border border-gray-200 shadow-lg hover:shadow-xl focus:shadow-xl' : 'bg-light-gray shadow-lg hover:shadow-xl focus:shadow-xl'}
        `}
        aria-label="장소 검색"
      />
      {/* 입력 내용 지우기 버튼 */}
      {value && (
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-text-teritary hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-150"
          aria-label="검색어 지우기"
        >
          <XMarkIcon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
