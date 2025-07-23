import React from 'react';

import { BrandLogo } from '@/shared/components';
import { type BrandGridProps } from '@/shared/components/brand_grid/brand.type';
import { BRANDS } from '@/shared/components/brand_grid/constants';

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
            isSelected={selectedBrands.includes(String(brand.id))}
            onClick={onBrandToggle ? () => onBrandToggle(String(brand.id)) : undefined}
            delay={index * 0.1}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  </div>
);
