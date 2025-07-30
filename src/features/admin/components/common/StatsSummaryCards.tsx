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
      color: 'var(--admin-bookmark)',
    },
    {
      title: '총 필터링',
      value: totalStats.totalFiltering,
      icon: FunnelIcon,
      description: '전체 필터링 수',
      color: 'var(--admin-filtering)',
    },
    {
      title: '총 멤버십 사용',
      value: totalStats.totalMembershipUsage,
      icon: UserGroupIcon,
      description: '전체 멤버십 사용 수',
      color: 'var(--admin-membership)',
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 pt-4 px-4">
      {cards.map((card) => (
        <Card key={card.title} className="min-w-[8.75rem] flex-shrink-0 border-2 border-[var(--color-brand-blue)] transition-transform duration-200 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4" style={{ color: card.color }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 