import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BrandStatDetail } from '@admin/api/types';
import type { BookmarkChartProps } from '@admin/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';
import { ChartEmptyState } from '@admin/components/common';

export function BookmarkChart({ data, selectedCategory = 'all' }: BookmarkChartProps) {
  const filteredData = filterDataByCategory(data, selectedCategory);
  const lineData = selectedCategory === 'all' 
    ? 
      [...filteredData]
        .sort((a, b) => (b.sumStatisticsBookmarksByCategory || 0) - (a.sumStatisticsBookmarksByCategory || 0))
        .map((category) => ({
          name: category.categoryName,
          '저장된 매장': category.sumStatisticsBookmarksByCategory || 0,
        }))
    : 
      filteredData.flatMap(category => 
        category.bookmarksByBrandList?.map(brand => ({
          name: brand.brandName,
          '저장된 매장': brand.sumBookmarksByBrand || 0,
        })) || []
      ).sort((a, b) => b['저장된 매장'] - a['저장된 매장']);

  const hasData = lineData.length > 0 && lineData.some(item => item['저장된 매장'] > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookmarkIcon className="h-5 w-5" />
          저장된 매장 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-8">
              {selectedCategory === 'all' ? '저장된 매장 트렌드' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            
            {hasData ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="저장된 매장" 
                    stroke="var(--admin-bookmark)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--admin-bookmark)', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: 'var(--admin-bookmark)', strokeWidth: 2, fill: 'var(--admin-bookmark)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState 
                type="bookmark" 
                selectedCategory={selectedCategory}
                categoryDisplayName={selectedCategory !== 'all' ? getCategoryDisplayName(selectedCategory) : undefined}
              />
            )}
          </div>

          {hasData && (
            <div>
              <h4 className="text-sm font-medium mb-4">
                {selectedCategory === 'all' ? '카테고리별 상세' : '브랜드별 상세'}
              </h4>
              <div className="space-y-2">
                {selectedCategory === 'all' ? (
                  [...filteredData]
                    .sort((a, b) => (b.sumStatisticsBookmarksByCategory || 0) - (a.sumStatisticsBookmarksByCategory || 0))
                    .map((category, index) => (
                      <div key={`bookmark-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-1">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium text-sm">{category.categoryName}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.sumStatisticsBookmarksByCategory || 0}개
                          </span>
                        </div>
                        {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                          <div className="ml-3 space-y-0.5">
                            {category.bookmarksByBrandList.map((brand: BrandStatDetail, brandIndex) => (
                              <div key={`bookmark-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">• {brand.brandName}</span>
                                <span className="text-muted-foreground">{brand.sumBookmarksByBrand}개</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  filteredData.map((category, index) => (
                    <div key={`bookmark-selected-${category.categoryId}-${index}`} className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: 'var(--admin-bookmark)' }}>
                        <span className="font-semibold text-lg text-gray-800">{category.categoryName}</span>
                        <span className="text-sm text-muted-foreground font-medium">
                          총 {category.sumStatisticsBookmarksByCategory || 0}개
                        </span>
                      </div>
                      {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                        <div className="ml-6 space-y-2">
                          {category.bookmarksByBrandList
                            .sort((a, b) => (b.sumBookmarksByBrand || 0) - (a.sumBookmarksByBrand || 0))
                            .map((brand: BrandStatDetail, brandIndex) => (
                              <div key={`bookmark-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                <span className="font-medium text-gray-700">• {brand.brandName}</span>
                                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                                  {brand.sumBookmarksByBrand}개
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 