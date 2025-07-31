import { Button } from '@/shared/components/shadcn/ui/button';
import { ADMIN_CATEGORIES, type CategoryId } from '@admin/constants/categories';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 pt-2 pl-2 pr-2">
      {/* 전체 버튼 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onCategoryChange('all')}
        className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 flex-shrink-0 ${
          selectedCategory === 'all' 
            ? 'bg-primary/10 border-primary text-primary' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}
      >
        전체
      </Button>
      
      {/* 카테고리 버튼들 */}
      {ADMIN_CATEGORIES.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange(category.id as CategoryId)}
          className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 flex-shrink-0 ${
            selectedCategory === category.id 
              ? 'bg-gray-100 border-gray-300 text-gray-700' 
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
          style={{
            borderColor: selectedCategory === category.id ? category.color : undefined,
            backgroundColor: selectedCategory === category.id ? `${category.color}20` : undefined,
            color: selectedCategory === category.id ? category.color : undefined,
          }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
} 