import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { HeartIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { RecommendStat } from '../../api/types';

interface RecommendChartProps {
  data: RecommendStat[];
}

export function RecommendChart({ data }: RecommendChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartIcon className="h-5 w-5" />
            추천 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">데이터가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  // 차트 데이터 준비
  const chartData = data.map((category, index) => ({
    name: category.categoryName,
    value: category.sumStatisticsRecommendationByCategory || 0,
    fill: index % 2 === 0 ? '#8884d8' : '#82ca9d',
  }));

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
          {/* 파이 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">카테고리별 추천 분포</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
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
          </div>

          {/* 상세 데이터 */}
          <div>
            <h4 className="text-sm font-medium mb-4">카테고리별 상세</h4>
            <div className="space-y-3">
              {data.map((category) => (
                <div key={category.categoryId} className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{category.categoryName}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.sumStatisticsRecommendationByCategory || 0}회
                    </span>
                  </div>
                  {category.recommendationsByBrandList && category.recommendationsByBrandList.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.recommendationsByBrandList.map((brand) => (
                        <div key={brand.brandName} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">• {brand.brandName}</span>
                          <span className="text-muted-foreground">{brand.sumRecommendationsByBrand}회</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
