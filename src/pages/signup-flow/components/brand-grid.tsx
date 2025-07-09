import type React from 'react';
import { BrandLogo } from './brand-logo';
import { BRANDS } from '../constants/brands';

interface BrandGridProps {
  selectedBrands: string[];
  onBrandToggle: (brandId: string) => void;
  title: string;
}

export const BrandGrid: React.FC<BrandGridProps> = ({ selectedBrands, onBrandToggle, title }) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">{title}</p>
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          {BRANDS.map((brand, index) => (
            <BrandLogo
              key={brand.id}
              brand={brand}
              isSelected={selectedBrands.includes(brand.id)}
              onClick={() => onBrandToggle(brand.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
