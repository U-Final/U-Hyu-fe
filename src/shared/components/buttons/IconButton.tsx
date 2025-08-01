import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode; // 꼭 아이콘만
  className?: string;
}

export const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'w-8 h-8 p-0 flex items-center justify-center rounded-full hover:bg-light-gray-hover transition',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
