import { Star } from 'lucide-react';

import { IconButton } from '@/shared/components';

import { CardBase } from './CardBase';

interface BrandWithFavoriteCardProps {
  logoUrl: string;
  children: React.ReactNode;
  isStarFilled: boolean;
  onFavoriteClick?: () => void;
  className?: string;
}

export const BrandWithFavoriteCard = ({
  logoUrl,
  children,
  isStarFilled,
  onFavoriteClick,
  className,
}: BrandWithFavoriteCardProps) => {
  return (
    <CardBase aria-label="브랜드 카드" className={className}>
      <div className="flex">
        <section className="flex flex-1 items-center gap-[15px]">
          <img
            src={logoUrl}
            alt={'로고'}
            className="w-[80px] h-[80px] object-contain"
          />
          {children}
        </section>
        <div>
          <IconButton
            icon={
              <Star
                className={`w-5 h-5 ${isStarFilled ? 'icon-favorite' : 'icon-favorite-outline'}`}
              />
            }
            onClick={e => {
              e.stopPropagation();
              onFavoriteClick?.();
            }}
            className="hover:bg-transparent h-5"
          />
        </div>
      </div>
    </CardBase>
  );
};
