import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BrandStatDetail, BookmarkChartProps } from '@admin/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';
import { ChartEmptyState } from '@admin/components/common';

export function BookmarkChart({ data, selectedCategory = 'all' }: BookmarkChartProps) {
  // 카테고리 필터링 적용
  const filteredData = filterDataByCategory(data, selectedCategory);

  // 차트 데이터 준비
  const lineData = selectedCategory === 'all' 
    ? // 전체 선택시: 카테고리별 데이터
      [...filteredData]
        .sort((a, b) => (b.sumStatisticsBookmarksByCategory || 0) - (a.sumStatisticsBookmarksByCategory || 0))
        .map((category) => ({
          name: category.categoryName,
          즐겨찾기: category.sumStatisticsBookmarksByCategory || 0,
        }))
    : // 특정 카테고리 선택시: 해당 카테고리의 브랜드별 데이터만
      filteredData.flatMap(category => 
        category.bookmarksByBrandList?.map(brand => ({
          name: brand.brandName,
          즐겨찾기: brand.sumBookmarksByBrand || 0,
        })) || []
      ).sort((a, b) => b.즐겨찾기 - a.즐겨찾기);

  // 데이터가 없거나 모든 값이 0인 경우
  const hasData = lineData.length > 0 && lineData.some(item => item.즐겨찾기 > 0);

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
            
            {hasData ? (
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
            ) : (
              <ChartEmptyState 
                type="bookmark" 
                selectedCategory={selectedCategory}
                categoryDisplayName={selectedCategory !== 'all' ? getCategoryDisplayName(selectedCategory) : undefined}
              />
            )}
          </div>

          {/* 상세 데이터 */}
          {hasData && (
            <div>
              <h4 className="text-sm font-medium mb-4">
                {selectedCategory === 'all' ? '카테고리별 상세' : '브랜드별 상세'}
              </h4>
              <div className="space-y-2">
                {selectedCategory === 'all' ? (
                  // 전체 선택시: 모든 카테고리 표시
                  [...filteredData]
                    .sort((a, b) => (b.sumStatisticsBookmarksByCategory || 0) - (a.sumStatisticsBookmarksByCategory || 0))
                    .map((category, index) => (
                      <div key={`bookmark-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-1">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium text-sm">{category.categoryName}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.sumStatisticsBookmarksByCategory || 0}개
                          </span>
                        </div>
                        {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                          <div className="ml-3 space-y-0.5">
                            {category.bookmarksByBrandList.map((brand: BrandStatDetail, brandIndex) => (
                              <div key={`bookmark-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">• {brand.brandName}</span>
                                <span className="text-muted-foreground">{brand.sumBookmarksByBrand}개</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  // 특정 카테고리 선택시: 카테고리 이름을 크게 하고 브랜드들을 들여쓰기
                  filteredData.map((category, index) => (
                    <div key={`bookmark-selected-${category.categoryId}-${index}`} className="space-y-3">
                      {/* 카테고리 헤더 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: 'var(--admin-bookmark)' }}>
                        <span className="font-semibold text-lg text-gray-800">{category.categoryName}</span>
                        <span className="text-sm text-muted-foreground font-medium">
                          총 {category.sumStatisticsBookmarksByCategory || 0}개
                        </span>
                      </div>
                      
                      {/* 브랜드 목록 */}
                      {category.bookmarksByBrandList && category.bookmarksByBrandList.length > 0 && (
                        <div className="ml-6 space-y-2">
                          {category.bookmarksByBrandList
                            .sort((a, b) => b.sumBookmarksByBrand - a.sumBookmarksByBrand)
                            .map((brand: BrandStatDetail, brandIndex) => (
                              <div key={`bookmark-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                <span className="font-medium text-gray-700">• {brand.brandName}</span>
                                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                                  {brand.sumBookmarksByBrand}개
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