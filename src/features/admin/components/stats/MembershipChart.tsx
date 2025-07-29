import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import type { CategoryStat } from '../../api/types';

interface MembershipChartProps {
  data: CategoryStat[];
}



export function MembershipChart({ data }: MembershipChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserGroupIcon className="h-5 w-5" />
            멤버십 사용 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">데이터가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  // 차트 데이터 준비
  const chartData = data.map((category) => ({
    name: category.categoryName,
    value: category.sumStatisticsMembershipUsageByCategory || 0,
  }));

  const radialData = data.map((category, index) => ({
    name: category.categoryName,
    value: category.sumStatisticsMembershipUsageByCategory || 0,
    fill: index % 2 === 0 ? '--text-purple' : '--text-primary',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserGroupIcon className="h-5 w-5" />
          멤버십 사용 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 막대 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">카테고리별 멤버십 사용 수</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="--text-purple" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 방사형 막대 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">멤버십 사용 분포</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart data={radialData} cx="50%" cy="50%" innerRadius="20%" outerRadius="80%">
                <RadialBar dataKey="value" />
                <Legend />
                <Tooltip />
              </RadialBarChart>
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
                    {category.sumStatisticsMembershipUsageByCategory || 0}회
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