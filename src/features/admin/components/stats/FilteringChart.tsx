import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { CategoryStat } from '@admin/api/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';

interface FilteringChartProps {
  data: CategoryStat[];
  selectedCategory?: string;
}

export function FilteringChart({ data, selectedCategory = 'all' }: FilteringChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5" />
            필터링 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">데이터가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  // 카테고리 필터링 적용
  const filteredData = filterDataByCategory(data, selectedCategory);

  // 차트 데이터 준비 - 큰 값부터 정렬
  const sortedData = [...filteredData].sort((a, b) => 
    (b.sumStatisticsFilterByCategory || 0) - (a.sumStatisticsFilterByCategory || 0)
  );
  
  const chartData = sortedData.map((category) => ({
    name: category.categoryName,
    value: category.sumStatisticsFilterByCategory || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5" />
          필터링 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 막대 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">
              {selectedCategory === 'all' ? '카테고리별 필터링 수' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="var(--admin-filtering)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 상세 데이터 */}
          <div>
            <h4 className="text-sm font-medium mb-4">카테고리별 상세</h4>
            <div className="space-y-3">
              {sortedData.map((category, index) => (
                <div key={`filtering-${category.categoryId}-${category.categoryName}-${index}`} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{category.categoryName}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.sumStatisticsFilterByCategory || 0}회
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 