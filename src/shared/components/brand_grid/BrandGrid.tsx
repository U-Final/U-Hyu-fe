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
        {BRANDS.map((brand, index) => {
          const isStringArray = selectedBrands.length > 0 && typeof selectedBrands[0] === 'string';
          const brandIdValue = isStringArray ? String(brand.id) : brand.id;
          const isSelected = isStringArray 
            ? (selectedBrands as string[]).includes(String(brand.id))
            : (selectedBrands as number[]).includes(brand.id);
          
          return (
            <BrandLogo
              key={brand.id}
              brand={brand}
              isSelected={isSelected}
              onClick={onBrandToggle ? () => onBrandToggle(brandIdValue) : undefined}
              delay={index * 0.1}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  </div>
);
