import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import type { CategoryStat } from '@admin/api/types';
import { getCategoryDisplayName } from '@admin/utils/categoryUtils';
import { filterDataByCategory } from '@admin/utils/categoryMapping';

interface MembershipChartProps {
  data: CategoryStat[];
  selectedCategory?: string;
}

export function MembershipChart({ data, selectedCategory = 'all' }: MembershipChartProps) {
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

  // 카테고리 필터링 적용
  const filteredData = filterDataByCategory(data, selectedCategory);

  // 방사형 차트 데이터 준비 - 큰 값부터 정렬
  const sortedData = [...filteredData].sort((a, b) => 
    (b.sumStatisticsMembershipUsageByCategory || 0) - (a.sumStatisticsMembershipUsageByCategory || 0)
  );
  
  // 카테고리별 필터가 선택된 경우 브랜드별 데이터 준비
  const radialData = selectedCategory === 'all' 
    ? sortedData.map((category, index) => ({
        name: category.categoryName,
        value: category.sumStatisticsMembershipUsageByCategory || 0,
        fill: index % 2 === 0 ? 'var(--admin-membership)' : 'var(--admin-membership-light)',
      }))
    : sortedData.flatMap(category => 
        category.membershipUsageByBrandList?.map((brand, index) => ({
          name: brand.brandName,
          value: brand.sumMembershipUsageByBrand || 0,
          fill: index % 2 === 0 ? 'var(--admin-membership)' : 'var(--admin-membership-light)',
        })) || []
      ).sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserGroupIcon className="h-5 w-5" />
          멤버십 사용 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* 방사형 막대 차트 */}
          <div>
            <h4 className="text-sm font-medium">
              {selectedCategory === 'all' ? '멤버십 분포' : `${getCategoryDisplayName(selectedCategory)} 상세`}
            </h4>
            <ResponsiveContainer width="100%" height={450}>
              <RadialBarChart data={radialData} cx="50%" cy="50%" innerRadius="20%" outerRadius="80%">
                <RadialBar dataKey="value" />
                <Legend />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* 상세 데이터 */}
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-4">카테고리별 상세</h4>
            <div className="space-y-3">
              {sortedData.map((category, index) => (
                <div key={`membership-${category.categoryId}-${category.categoryName}-${index}`} className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{category.categoryName}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.sumStatisticsMembershipUsageByCategory || 0}회
                    </span>
                  </div>
                  {category.membershipUsageByBrandList && category.membershipUsageByBrandList.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.membershipUsageByBrandList.map((brand, brandIndex) => (
                        <div key={`membership-brand-${category.categoryId}-${brand.brandName}-${brandIndex}`} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">• {brand.brandName}</span>
                          <span className="text-muted-foreground">{brand.sumMembershipUsageByBrand}회</span>
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
