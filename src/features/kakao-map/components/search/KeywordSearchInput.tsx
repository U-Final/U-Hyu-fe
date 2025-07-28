import React, { useRef, useState } from 'react';

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
 * 카카오 키워드 검색을 위한 입력 컴포넌트
 * 기존 SearchInput 컴포넌트와 유사하지만 지도 검색에 최적화됨
 */
export const KeywordSearchInput: React.FC<KeywordSearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onCancel,
  loading = false,
  placeholder = '장소, 업체명 검색',
  className = '',
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !loading) {
      onSearch(value.trim());
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div
        className={`
          relative flex items-center h-[44px]
          bg-white border border-gray-200 rounded-md
          shadow-lg hover:shadow-xl focus-within:shadow-xl
          transition-all duration-200 pr-[120px]
          ${loading ? 'cursor-wait' : ''}
        `}
      >
        {/* 검색 아이콘 */}
        <div className="flex-shrink-0 pl-[25px]">
          <MagnifyingGlassIcon
            className={`
              w-4 h-4 transition-colors duration-200
              ${isFocused ? 'text-blue-500' : 'text-gray-600'}
            `}
          />
        </div>

        {/* 입력 필드 */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={loading}
          autoFocus={autoFocus}
          className={`
            flex-1 px-3 h-full
            bg-transparent border-none outline-none
            text-sm font-semibold text-black placeholder-text-teritary
            disabled:cursor-wait disabled:text-gray-400
          `}
          aria-label="장소 검색"
        />

        {/* 입력 내용 지우기 버튼 */}
        {value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[80px] top-1/2 -translate-y-1/2 p-1 text-text-teritary hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-150"
            aria-label="검색어 지우기"
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 로딩 스피너 */}
        {loading && (
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2">
            <div
              className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
              aria-label="검색 중"
            />
          </div>
        )}

        {/* 검색 버튼 */}
        <button
          type="submit"
          disabled={!value.trim() || loading}
          className={`
            absolute right-1.5 top-1/2 -translate-y-1/2
            px-3 py-1.5 text-xs font-semibold rounded-md
            transition-all duration-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500/20
            ${
              value.trim() && !loading
                ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md active:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
          aria-label="검색 실행"
        >
          검색
        </button>
      </div>

      {/* 개발 모드에서 현재 상태 표시 */}
      {import.meta.env.MODE === 'development' && (
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500">
          focused: {isFocused.toString()}, loading: {loading.toString()}, value
          length: {value.length}
        </div>
      )}
    </form>
  );
};

/**
 * 컴팩트한 버전의 키워드 검색 입력
 * 모바일이나 좁은 공간에서 사용
 */
export const CompactKeywordSearchInput: React.FC<KeywordSearchInputProps> = ({
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
            text-sm font-semibold text-black placeholder-text-teritary
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

export default KeywordSearchInput;
