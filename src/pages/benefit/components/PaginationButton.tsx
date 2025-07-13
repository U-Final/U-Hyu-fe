import type { PaginationButtonProps } from "@benefit/components/PaginationButton.types";
import type { FC } from "react";

const PaginationButton: FC<PaginationButtonProps> = ({ onClick, disabled, direction }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-white text-gray border border-gray rounded-sm disabled:opacity-50 cursor-pointer hover:bg-gray-hover"
      disabled={disabled}
    >
      {direction === "prev" ? "<" : ">"}
    </button>
  );
};

export default PaginationButton;
