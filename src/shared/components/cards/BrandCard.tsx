import { CardBase } from './CardBase';

interface BrandCardProps {
  logoUrl: string;
  children: React.ReactNode;
}

export const BrandCard = ({ logoUrl, children }: BrandCardProps) => {
  return (
    <CardBase>
      <div className="flex items-center gap-[15px]">
        <img
          src={logoUrl}
          alt={'로고'}
          className="w-[80px] h-[80px] object-contain"
        />
        {children}
      </div>
    </CardBase>
  );
};
