import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
  const scatterData = data.map((category, index) => ({
    x: index,
    y: category.sumStatisticsRecommendByCategory || 0,
    name: category.categoryName,
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
          {/* 산점도 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">추천 분포</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={scatterData}>
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Scatter dataKey="y" fill="--text-warning" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* 상세 데이터 */}
          <div>
            <h4 className="text-sm font-medium mb-4">카테고리별 상세</h4>
            <div className="space-y-3">
              {data.map((category) => (
                <div key={category.categoryId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{category.categoryName}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.sumStatisticsRecommendByCategory || 0}회
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