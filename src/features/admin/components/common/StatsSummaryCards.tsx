import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { 
  BookmarkIcon, 
  FunnelIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';
import type { TotalStat } from '../../api/types';

interface StatsSummaryCardsProps {
  totalStats: TotalStat;
}

export function StatsSummaryCards({ totalStats }: StatsSummaryCardsProps) {
  const cards = [
    {
      title: '총 즐겨찾기',
      value: totalStats.totalBookmark,
      icon: BookmarkIcon,
      description: '전체 즐겨찾기 수',
    },
    {
      title: '총 필터링',
      value: totalStats.totalFiltering,
      icon: FunnelIcon,
      description: '전체 필터링 수',
    },
    {
      title: '총 멤버십 사용',
      value: totalStats.totalMembershipUsage,
      icon: UserGroupIcon,
      description: '전체 멤버십 사용 수',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 