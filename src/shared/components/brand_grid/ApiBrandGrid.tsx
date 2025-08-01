import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { BrandLogo } from '@/shared/components';
import { getInterestBrands } from '@/shared/components/brand_grid/api/brandApi';
import {
  type BrandGridProps,
  convertApiBrandToBrand,
} from '@/shared/components/brand_grid/brand.type';

export const ApiBrandGrid: React.FC<BrandGridProps> = ({
  selectedBrands,
  onBrandToggle,
  title,
  disabled = false,
}) => {
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['interest-brands'],
    queryFn: getInterestBrands,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">{title}</p>
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">{title}</p>
          <div className="text-center text-red-500">
            브랜드 정보를 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    );
  }

  const brands = apiResponse?.data.map(convertApiBrandToBrand) || [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">{title}</p>
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          {brands.map((brand, index) => {
            const isSelected = selectedBrands.includes(brand.id);

            return (
              <BrandLogo
                key={brand.id}
                brand={brand}
                isSelected={isSelected}
                onClick={
                  onBrandToggle ? () => onBrandToggle(brand.id) : undefined
                }
                delay={index * 0.1}
                disabled={disabled}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
