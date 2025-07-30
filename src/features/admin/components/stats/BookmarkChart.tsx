import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CategoryStat, BrandStatDetail } from '@admin/api/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';

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
  const filteredData = filterDataByCategory(data, selectedCategory);

  // 차트 데이터 준비 - 큰 값부터 정렬
  const sortedData = [...filteredData].sort((a, b) => 
    (b.sumStatisticsBookmarksByCategory || 0) - (a.sumStatisticsBookmarksByCategory || 0)
  );
  
  // 카테고리별 필터가 선택된 경우 브랜드별 데이터 준비
  const lineData = selectedCategory === 'all' 
    ? sortedData.map((category) => ({
        name: category.categoryName,
        즐겨찾기: category.sumStatisticsBookmarksByCategory || 0,
      }))
    : sortedData.flatMap(category => 
        category.bookmarksByBrandList?.map(brand => ({
          name: brand.brandName,
          즐겨찾기: brand.sumBookmarksByBrand || 0,
        })) || []
      ).sort((a, b) => b.즐겨찾기 - a.즐겨찾기);

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
              {sortedData.map((category, index) => (
                <div key={`bookmark-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.categoryName}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.sumStatisticsBookmarksByCategory || 0}개
                    </span>
                  </div>
                  {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.bookmarksByBrandList.map((brand: BrandStatDetail, brandIndex) => (
                        <div key={`bookmark-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center text-sm">
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