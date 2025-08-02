import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FilteringChartProps } from '@admin/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';
import { ChartEmptyState } from '@admin/components/common';

export function FilteringChart({ data, selectedCategory = 'all' }: FilteringChartProps) {
  // 카테고리 필터링 적용
  const filteredData = filterDataByCategory(data, selectedCategory);

  // 차트 데이터 준비 - 큰 값부터 정렬
  const chartData = [...filteredData]
    .sort((a, b) => (b.sumStatisticsFilterByCategory || 0) - (a.sumStatisticsFilterByCategory || 0))
    .map((category) => ({
      name: category.categoryName,
      필터링: category.sumStatisticsFilterByCategory || 0,
    }));

  // 데이터가 없거나 모든 값이 0인 경우
  const hasData = chartData.length > 0 && chartData.some(item => item.필터링 > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          필터링 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 바 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-8">
              {selectedCategory === 'all' ? '필터링 트렌드' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            
            {hasData ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="필터링" 
                    fill="var(--admin-filtering)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState 
                type="filtering" 
                selectedCategory={selectedCategory}
                categoryDisplayName={selectedCategory !== 'all' ? getCategoryDisplayName(selectedCategory) : undefined}
              />
            )}
          </div>

          {/* 상세 데이터 */}
          {hasData && (
            <div>
              <h4 className="text-sm font-medium mb-4">카테고리별 상세</h4>
              <div className="space-y-2">
                {selectedCategory === 'all' ? (
                  // 전체 선택시: 모든 카테고리 표시
                  [...filteredData]
                    .sort((a, b) => (b.sumStatisticsFilterByCategory || 0) - (a.sumStatisticsFilterByCategory || 0))
                    .map((category, index) => (
                      <div key={`filtering-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-1">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium text-sm">{category.categoryName}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.sumStatisticsFilterByCategory || 0}회
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  // 특정 카테고리 선택시: 카테고리 이름을 크게 하고 스타일링
                  filteredData.map((category, index) => (
                    <div key={`filtering-selected-${category.categoryId}-${index}`} className="space-y-3">
                      {/* 카테고리 헤더 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: 'var(--admin-filtering)' }}>
                        <span className="font-semibold text-lg text-gray-800">{category.categoryName}</span>
                        <span className="text-sm text-muted-foreground font-medium">
                          총 {category.sumStatisticsFilterByCategory || 0}회
                        </span>
                      </div>
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