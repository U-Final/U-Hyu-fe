import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import type { MembershipChartProps } from '@/features/admin/types';

export default function MembershipChart({ stats, categories, selectedCategoryId }: MembershipChartProps) {
  if (!stats) return null;
  if (selectedCategoryId) {
    // 브랜드별 차트
    const category = stats.find(s => s.categoryId === selectedCategoryId);
    const brandData = category?.details ?? [];
    return (
      <div className="mb-[2.5rem]">
        <div className="font-bold mb-2">브랜드별 멤버십 수 (Bar)</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={brandData}>
            <XAxis dataKey="brandName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  const data = categories.map(cat => {
    const found = stats.find(s => s.categoryId === cat.categoryId);
    return found ?? { categoryId: cat.categoryId, categoryName: cat.categoryName, count: 0, details: [] };
  });
  const allZero = data.every(d => d.count === 0);
  return (
    <div>
      <div className="font-bold mb-2">카테고리별 멤버십 수 (RadialBarChart)</div>
      {allZero ? (
        <div className="text-center text-gray-400 py-12">데이터가 없습니다.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart innerRadius="30%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
            <RadialBar
              label={({ value, x, y }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--text-white)"
                  fontSize={12}
                >
                  {value}
                </text>
              )}
              background
              dataKey="count"
              className="fill-primary"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
} 