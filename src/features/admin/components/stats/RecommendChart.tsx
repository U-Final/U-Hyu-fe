import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { RecommendChartProps } from '@/features/admin/types';

export default function RecommendChart({ stats, categories, selectedCategoryId }: RecommendChartProps) {
  if (!stats) return null;
  if (selectedCategoryId) {
    // 브랜드별 차트
    const category = stats.find(s => s.categoryId === selectedCategoryId);
    const brandData = category?.details ?? [];
    return (
      <div>
        <div className="font-bold mb-2">브랜드별 추천 수 (Scatter)</div>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <XAxis dataKey="brandName" type="category" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Scatter data={brandData} className="fill-primary" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
  // 카테고리별 차트
  const data = categories.map(cat => {
    const found = stats.find(s => s.categoryId === cat.categoryId);
    return found ?? { categoryId: cat.categoryId, categoryName: cat.categoryName, count: 0 };
  });
  return (
    <div>
      <div className="font-bold mb-2">카테고리별 추천 수 (ScatterChart)</div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="categoryName" type="category" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Scatter data={data} className="fill-primary" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
} 