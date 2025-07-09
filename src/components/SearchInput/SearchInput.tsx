import type { FC, KeyboardEvent } from "react";
import { useRef } from "react";

import clsx from "clsx";
import type { SearchInputProps } from "./SearchInput.types";
import { searchInputVariants } from "./SearchInputVariants";

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onCancel,
  placeholder = "브랜드 검색",
  variant = "gray",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.(value);
    }
  };

  const handleCancel = () => {
    onChange("");
    onCancel?.();
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={clsx(searchInputVariants({ variant }))}
      />
      {value && (
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-text-teritary"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
