import { cva } from 'class-variance-authority';

export const SearchInputVariants = cva(
  'w-full h-[44px] px-[25px] text-base md:text-sm font-semibold text-black placeholder-text-teritary rounded-md pr-10 transition-all duration-200',
  {
    variants: {
      variant: {
        gray: 'bg-light-gray',
        white: 'bg-white border border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  }
);
