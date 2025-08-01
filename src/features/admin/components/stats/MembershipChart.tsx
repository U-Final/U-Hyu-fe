import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { MembershipStat, MembershipBrandDetail } from '@admin/api/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';
import { ChartEmptyState } from '@admin/components/common';

interface MembershipChartProps {
  data: MembershipStat[];
  selectedCategory?: string;
}

export function MembershipChart({ data, selectedCategory = 'all' }: MembershipChartProps) {
  // 카테고리 필터링 적용
  const filteredData = filterDataByCategory(data, selectedCategory);

  // 차트 데이터 준비
  const chartData = selectedCategory === 'all' 
    ? // 전체 선택시: 카테고리별 데이터
      [...filteredData]
        .sort((a, b) => (b.sumStatisticsMembershipUsageByCategory || 0) - (a.sumStatisticsMembershipUsageByCategory || 0))
        .map((category, index) => ({
          name: category.categoryName,
          value: category.sumStatisticsMembershipUsageByCategory || 0,
          fill: index % 2 === 0 ? 'var(--admin-membership)' : 'var(--admin-membership-light)',
        }))
    : // 특정 카테고리 선택시: 해당 카테고리의 브랜드별 데이터만
      filteredData.flatMap(category => 
        category.membershipUsageByBrandList?.map((brand: MembershipBrandDetail, index) => ({
          name: brand.brandName,
          value: brand.sumMembershipUsageByBrand || 0,
          fill: index % 2 === 0 ? 'var(--admin-membership)' : 'var(--admin-membership-light)',
        })) || []
      ).sort((a, b) => b.value - a.value);

  // 데이터가 없거나 모든 값이 0인 경우
  const hasData = chartData.length > 0 && chartData.some(item => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5" />
          멤버십 사용 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 파이 차트 */}
          <div>
            <h4 className="text-sm font-medium mb-4">
              {selectedCategory === 'all' ? '멤버십 사용 분포' : `${getCategoryDisplayName(selectedCategory)} 상세`}
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
                      if ((percent || 0) * 100 > 8) {  // 8% 이상만 표시
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;
                        const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
                        const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);
                        
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="var(--admin-membership)"
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
                    fill="var(--admin-membership)"
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
                type="membership" 
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
                    .sort((a, b) => (b.sumStatisticsMembershipUsageByCategory || 0) - (a.sumStatisticsMembershipUsageByCategory || 0))
                    .map((category, index) => (
                      <div key={`membership-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-1">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium text-sm">{category.categoryName}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.sumStatisticsMembershipUsageByCategory || 0}회
                          </span>
                        </div>
                        {category.membershipUsageByBrandList && category.membershipUsageByBrandList.length > 0 && (
                          <div className="ml-3 space-y-0.5">
                            {category.membershipUsageByBrandList.map((brand: MembershipBrandDetail, brandIndex: number) => (
                              <div key={`membership-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">• {brand.brandName}</span>
                                <span className="text-muted-foreground">{brand.sumMembershipUsageByBrand}회</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  // 특정 카테고리 선택시: 카테고리 이름을 크게 하고 브랜드들을 들여쓰기
                  filteredData.map((category, index) => (
                    <div key={`membership-selected-${category.categoryId}-${index}`} className="space-y-3">
                      {/* 카테고리 헤더 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: 'var(--admin-membership)' }}>
                        <span className="font-semibold text-lg text-gray-800">{category.categoryName}</span>
                        <span className="text-sm text-muted-foreground font-medium">
                          총 {category.sumStatisticsMembershipUsageByCategory || 0}회
                        </span>
                      </div>
                      
                      {/* 브랜드 목록 */}
                      {category.membershipUsageByBrandList && category.membershipUsageByBrandList.length > 0 && (
                        <div className="ml-6 space-y-2">
                          {category.membershipUsageByBrandList
                            .sort((a: MembershipBrandDetail, b: MembershipBrandDetail) => b.sumMembershipUsageByBrand - a.sumMembershipUsageByBrand)
                            .map((brand: MembershipBrandDetail, brandIndex: number) => (
                              <div key={`membership-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                <span className="font-medium text-gray-700">• {brand.brandName}</span>
                                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                                  {brand.sumMembershipUsageByBrand}회
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
