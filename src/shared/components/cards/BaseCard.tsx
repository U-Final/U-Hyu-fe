import { cn } from "@shared/lib/utils";

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BaseCard = ({ children, className, onClick }: BaseCardProps) => {
  return (
    <div onClick={onClick} className={cn("rounded-[16px] p-4 bg-white", className)}>
      {children}
    </div>
  );
};
