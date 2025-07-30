import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CategoryStat, BrandStatDetail } from '../../api/types';
import { getCategoryDisplayName } from '../../utils/categoryUtils';

interface BookmarkChartProps {
  data: CategoryStat[];
  selectedCategory?: string;
}

export function BookmarkChart({ data, selectedCategory = 'all' }: BookmarkChartProps) {
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

  // 카테고리 필터링 적용
  const filteredData = selectedCategory === 'all' 
    ? data 
    : data.filter(category => {
        // 카테고리 이름 매핑 (실제 구현에서는 더 정확한 매핑 필요)
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
    (b.sumStatisticsBookmarksByCategory || 0) - (a.sumStatisticsBookmarksByCategory || 0)
  );
  
  const lineData = sortedData.map((category) => ({
    name: category.categoryName,
    즐겨찾기: category.sumStatisticsBookmarksByCategory || 0,
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
          {/* 라인 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-8">
              {selectedCategory === 'all' ? '즐겨찾기 트렌드' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="즐겨찾기" 
                  stroke="var(--admin-bookmark)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--admin-bookmark)', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'var(--admin-bookmark)', strokeWidth: 2, fill: 'var(--admin-bookmark)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 상세 데이터 */}
          <div>
            <h4 className="text-sm font-medium mb-4">브랜드별 상세</h4>
            <div className="space-y-3">
              {sortedData.map((category) => (
                <div key={`${category.categoryId}-${category.categoryName}`} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.categoryName}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.sumStatisticsBookmarksByCategory || 0}개
                    </span>
                  </div>
                  {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.bookmarksByBrandList.map((brand: BrandStatDetail) => (
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