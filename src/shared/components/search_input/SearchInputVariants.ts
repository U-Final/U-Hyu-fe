import { cva } from "class-variance-authority";

export const SearchInputVariants = cva(
  "w-full px-4 py-2 text-sm font-bold text-black placeholder-text-teritary rounded-md pr-14",
  {
    variants: {
      variant: {
        gray: "bg-light-gray shadow-2xs",
        white: "bg-white shadow-md",
      },
    },
    defaultVariants: {
      variant: "gray",
    },
  }
);
