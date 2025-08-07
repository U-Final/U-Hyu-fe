import type { FC, KeyboardEvent } from 'react';
import { useRef } from 'react';

import clsx from 'clsx';

import type { SearchInputProps } from './SearchInput.types';
import { SearchInputVariants } from './SearchInputVariants';

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onCancel,
  placeholder = '제휴 브랜드 검색',
  variant = 'gray',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={clsx(SearchInputVariants({ variant }))}
      />
      {value ? (
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-text-teritary hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
