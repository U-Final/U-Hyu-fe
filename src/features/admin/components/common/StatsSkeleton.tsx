import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { BookmarkIcon, FunnelIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export function StatsSkeleton() {
  const stats = [
    { 
      icon: BookmarkIcon, 
      label: '총 저장된 매장', 
      color: 'var(--admin-bookmark)',
      description: '즐겨찾기 및 마이맵에 저장된 매장 수'
    },
    { 
      icon: FunnelIcon, 
      label: '총 필터링', 
      color: 'var(--admin-filtering)',
      description: '전체 필터링 수'
    },
    { 
      icon: UserGroupIcon, 
      label: '총 멤버십 사용', 
      color: 'var(--admin-membership)',
      description: '전체 멤버십 사용 수'
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 pt-4 px-4">
      {stats.map((stat, i) => (
        <Card key={i} className="min-w-[10rem] sm:min-w-[12rem] lg:min-w-[14rem] flex-1 max-w-[18rem] flex-shrink-0 border-2 border-[var(--color-brand-blue)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" style={{ backgroundColor: stat.color }} />
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 