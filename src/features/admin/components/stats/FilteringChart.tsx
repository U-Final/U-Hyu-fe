import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { FilteringChartProps } from '@/features/admin/types';

export default function FilteringChart({ stats, categories }: FilteringChartProps) {
  if (!stats) return null;
  const data = categories.map(cat => {
    const found = stats.find(s => s.categoryId === cat.categoryId);
    return found ?? { categoryId: cat.categoryId, categoryName: cat.categoryName, count: 0, details: [] };
  });
  return (
    <div>
      <div className="font-bold mb-2">카테고리별 필터링 수 (Bar)</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap={20}>
          <XAxis dataKey="categoryName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 