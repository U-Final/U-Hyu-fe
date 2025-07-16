import { type FC } from 'react';

interface CategorySelectContentProps {
  selectedCategory: string;
  onCategorySelect: (categoryKey: string) => void;
}

const CategorySelectContent: FC<CategorySelectContentProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const categories = [
    { key: 'lifestyle', name: '생활/편의', icon: '🏪' },
    { key: 'food', name: '푸드', icon: '🍽️' },
    { key: 'beauty', name: '뷰티/건강', icon: '💄' },
    { key: 'shopping', name: '쇼핑', icon: '🛍️' },
    { key: 'culture', name: '문화/여가', icon: '🎬' },
    { key: 'activity', name: '액티비티', icon: '🏃' },
    { key: 'education', name: '교육', icon: '📚' },
    { key: 'travel', name: '여행/교통', icon: '✈️' },
  ];

  const handleCategoryClick = (categoryKey: string) => {
    onCategorySelect(categoryKey);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {categories.map(category => {
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
