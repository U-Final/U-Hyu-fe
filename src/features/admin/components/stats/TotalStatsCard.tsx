import type { TotalStat } from '@/features/admin/types';

interface TotalStatsCardProps {
  data: TotalStat;
}

export default function TotalStatsCard({ data }: TotalStatsCardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full mb-6">
      <div className="p-4 rounded-lg shadow bg-white flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-1">즐겨찾기</span>
        <span className="text-2xl font-bold text-primary">{data.totalBookmark}</span>
      </div>
      <div className="p-4 rounded-lg shadow bg-white flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-1">필터링</span>
        <span className="text-2xl font-bold text-primary">{data.totalFiltering}</span>
      </div>

      <div className="p-4 rounded-lg shadow bg-white flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-1">멤버십</span>
        <span className="text-2xl font-bold text-primary">{data.totalMembershipUsage}</span>
      </div>
    </div>
  );
} 