import { type FC } from 'react';

import { trackFilterUsed } from '@/shared/utils/actionlogTracker';

import {
  type CategoryType,
  FILTERED_CATEGORIES,
} from '../../../constants/categories';
import type { StoreCategory } from '../../../types/category';

interface CategorySelectContentProps {
  selectedCategory: string;
  onCategorySelect: (categoryKey: StoreCategory) => void;
}

const CategorySelectContent: FC<CategorySelectContentProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const categories: CategoryType[] = FILTERED_CATEGORIES;

  const handleCategoryClick = (categoryKey: StoreCategory) => {
    onCategorySelect(categoryKey);

    if (categoryKey !== 'all') {
      trackFilterUsed(categoryKey);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-7">
            {categories.map((category: CategoryType) => {
              const isSelected = selectedCategory === category.key;

              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className={`
                    flex flex-col items-center justify-center
                    p-4 rounded-xl border transition-colors duration-200
                    h-20 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  <span className="text-lg mb-1">{category.icon}</span>
                  <span className="text-xs font-medium text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectContent;
