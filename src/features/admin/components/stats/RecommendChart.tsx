import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { HeartIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { RecommendStat } from '@admin/api/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';
import { ChartEmptyState } from '@admin/components/common';

interface RecommendChartProps {
  data: RecommendStat[];
  selectedCategory?: string;
}

export function RecommendChart({ data, selectedCategory = 'all' }: RecommendChartProps) {
  const filteredData = filterDataByCategory(data, selectedCategory);

  const chartData = selectedCategory === 'all' 
    ? 
      [...filteredData]
        .sort((a, b) => (b.sumStatisticsRecommendationByCategory || 0) - (a.sumStatisticsRecommendationByCategory || 0))
        .map((category, index) => ({
          name: category.categoryName,
          value: category.sumStatisticsRecommendationByCategory || 0,
          fill: index % 2 === 0 ? 'var(--admin-recommendation)' : 'var(--admin-recommendation-light)',
        }))
    : 
      filteredData.flatMap(category => 
        category.recommendationsByBrandList?.map((brand, index) => ({
          name: brand.brandName,
          value: brand.sumRecommendationsByBrand || 0,
          fill: index % 2 === 0 ? 'var(--admin-recommendation)' : 'var(--admin-recommendation-light)',
        })) || []
      ).sort((a, b) => b.value - a.value);

  const hasData = chartData.length > 0 && chartData.some(item => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartIcon className="h-5 w-5" />
          추천 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-4">
              {selectedCategory === 'all' ? '추천 분포' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            
            {hasData ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent, cx, cy, midAngle, outerRadius }) => {
                      if ((percent || 0) * 100 > 8) {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;
                        const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
                        const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);
                        
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="var(--admin-recommendation)"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            fontSize="10"
                          >
                            {`${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          </text>
                        );
                      }
                      return null;
                    }}
                    outerRadius={70}
                    fill="var(--admin-recommendation)"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState 
                type="recommendation" 
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
                    .sort((a, b) => (b.sumStatisticsRecommendationByCategory || 0) - (a.sumStatisticsRecommendationByCategory || 0))
                    .map((category, index) => (
                      <div key={`recommend-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-1">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium text-sm">{category.categoryName}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.sumStatisticsRecommendationByCategory || 0}회
                          </span>
                        </div>
                        {category.recommendationsByBrandList && category.recommendationsByBrandList.length > 0 && (
                          <div className="ml-3 space-y-0.5">
                            {category.recommendationsByBrandList.map((brand, brandIndex) => (
                              <div key={`recommend-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">• {brand.brandName}</span>
                                <span className="text-muted-foreground">{brand.sumRecommendationsByBrand}회</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  filteredData.map((category, index) => (
                    <div key={`recommend-selected-${category.categoryId}-${index}`} className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: 'var(--admin-recommendation)' }}>
                        <span className="font-semibold text-lg text-gray-800">{category.categoryName}</span>
                        <span className="text-sm text-muted-foreground font-medium">
                          총 {category.sumStatisticsRecommendationByCategory || 0}회
                        </span>
                      </div>
                      {category.recommendationsByBrandList && category.recommendationsByBrandList.length > 0 && (
                        <div className="ml-6 space-y-2">
                          {category.recommendationsByBrandList
                            .sort((a, b) => (b.sumRecommendationsByBrand || 0) - (a.sumRecommendationsByBrand || 0))
                            .map((brand, brandIndex) => (
                              <div key={`recommend-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                <span className="font-medium text-gray-700">• {brand.brandName}</span>
                                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                                  {brand.sumRecommendationsByBrand}회
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
