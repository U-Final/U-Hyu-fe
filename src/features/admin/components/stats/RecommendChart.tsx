import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { HeartIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { RecommendStat } from '../../api/types';
import { getCategoryDisplayName } from '../../utils/categoryUtils';

interface RecommendChartProps {
  data: RecommendStat[];
  selectedCategory?: string;
}

export function RecommendChart({ data, selectedCategory = 'all' }: RecommendChartProps) {
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

  // 카테고리 필터링 적용
  const filteredData = selectedCategory === 'all' 
    ? data 
    : data.filter(category => {
        const categoryMap: Record<string, string[]> = {
          'movie': ['영화 / 미디어'],
          'themepark': ['테마파크'],
          'waterpark': ['워터파크/아쿠아리움'],
          'activity': ['액티비티'],
          'beauty': ['뷰티(피부과, 클리닉)'],
          'health': ['건강(제약, 영양제 등)'],
          'shopping': ['쇼핑'],
          'convenience': ['생활/편의'],
          'bakery': ['베이커리/디저트'],
          'restaurant': ['음식점'],
          'performance': ['공연/전시'],
          'education': ['교육'],
          'travel': ['여행/교통'],
        };
        return categoryMap[selectedCategory]?.includes(category.categoryName) || false;
      });

  // 차트 데이터 준비 - 큰 값부터 정렬
  const sortedData = [...filteredData].sort((a, b) => 
    (b.sumStatisticsRecommendationByCategory || 0) - (a.sumStatisticsRecommendationByCategory || 0)
  );
  
  const chartData = sortedData.map((category, index) => ({
    name: category.categoryName,
    value: category.sumStatisticsRecommendationByCategory || 0,
    fill: index % 2 === 0 ? 'var(--admin-recommendation)' : 'var(--admin-recommendation-light)',
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
            <h4 className="text-sm font-medium mb-4">
              {selectedCategory === 'all' ? '추천 분포' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent, cx, cy, midAngle, outerRadius }) => {
                    if ((percent || 0) * 100 > 8) {  // 8% 이상만 표시
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
          </div>

          {/* 상세 데이터 */}
          <div>
            <h4 className="text-sm font-medium mb-4">카테고리별 상세</h4>
            <div className="space-y-2">
              {sortedData.map((category) => (
                <div key={`${category.categoryId}-${category.categoryName}`} className="space-y-1">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">{category.categoryName}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.sumStatisticsRecommendationByCategory || 0}회
                    </span>
                  </div>
                  {category.recommendationsByBrandList && category.recommendationsByBrandList.length > 0 && (
                    <div className="ml-3 space-y-0.5">
                      {category.recommendationsByBrandList.map((brand) => (
                        <div key={brand.brandName} className="flex justify-between items-center text-xs">
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
