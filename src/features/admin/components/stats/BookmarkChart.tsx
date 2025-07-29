import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import type { CategoryStat } from '../../api/types';

interface BookmarkChartProps {
  data: CategoryStat[];
}



export function BookmarkChart({ data }: BookmarkChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookmarkIcon className="h-5 w-5" />
            즐겨찾기 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">데이터가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  // 차트 데이터 준비
  const radarData = data.map((category) => ({
    subject: category.categoryName,
    A: category.sumStatisticsBookmarksByCategory || 0,
    fullMark: Math.max(...data.map(c => c.sumStatisticsBookmarksByCategory || 0)) * 1.2,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookmarkIcon className="h-5 w-5" />
          즐겨찾기 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 레이더 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">즐겨찾기 패턴</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="즐겨찾기" dataKey="A" stroke="--text-primary" fill="--text-primary" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 상세 데이터 */}
          <div>
            <h4 className="text-sm font-medium mb-4">브랜드별 상세</h4>
            <div className="space-y-3">
              {data.map((category) => (
                <div key={category.categoryId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.categoryName}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.sumStatisticsBookmarksByCategory || 0}개
                    </span>
                  </div>
                  {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.bookmarksByBrandList.map((brand) => (
                        <div key={brand.brandName} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">• {brand.brandName}</span>
                          <span className="text-muted-foreground">{brand.sumBookmarksByBrand}개</span>
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