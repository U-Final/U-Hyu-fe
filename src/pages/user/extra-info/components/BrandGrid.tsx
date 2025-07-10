import React from 'react';
import { BrandLogo } from './BrandLogo';
import { BRANDS } from '../constants';
import { type BrandGridProps } from '../types';

export const BrandGrid: React.FC<BrandGridProps> = ({
  selectedBrands,
  onBrandToggle,
  title,
  disabled = false,
}) => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-gray-600 mb-4">{title}</p>
      <div className="grid grid-cols-3 gap-6 justify-items-center">
        {BRANDS.map((brand, index) => (
          <BrandLogo
            key={brand.id}
            brand={brand}
            isSelected={selectedBrands.includes(brand.id)}
            onClick={onBrandToggle ? () => onBrandToggle(brand.id) : undefined}
            delay={index * 0.1}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  </div>
);
