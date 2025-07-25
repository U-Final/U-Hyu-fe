import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import type { BookmarkChartProps } from '@/features/admin/types';

export default function BookmarkChart({ stats, categories, selectedCategoryId }: BookmarkChartProps) {
  if (!stats) return null;
  if (selectedCategoryId) {
    // 브랜드별 차트 (RadarChart)
    const category = stats.find(s => s.categoryId === selectedCategoryId);
    const brandData = (category?.details ?? []).map(b => ({ brand: b.brandName, 즐겨찾기: b.count }));
    return (
      <div>
        <div className="font-bold mb-2">브랜드별 즐겨찾기 수 (Radar)</div>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={brandData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="brand" />
            <Radar name="즐겨찾기" dataKey="즐겨찾기" className="stroke-primary fill-primary" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  // 카테고리별 차트 (RadarChart)
  const data = categories.map(cat => {
    const found = stats.find(s => s.categoryId === cat.categoryId);
    return found ?? { categoryId: cat.categoryId, categoryName: cat.categoryName, count: 0, details: [] };
  });
  const radarData = data.map(d => ({ category: d.categoryName, 즐겨찾기: d.count }));
  return (
    <div>
      <div className="font-bold mb-2">카테고리별 즐겨찾기 수 (Radar)</div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <Radar name="즐겨찾기" dataKey="즐겨찾기" className="stroke-primary fill-primary" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
} 