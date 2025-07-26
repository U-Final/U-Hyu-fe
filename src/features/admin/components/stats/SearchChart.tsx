import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { SearchChartProps } from '@/features/admin/types';

export default function SearchChart({ stats, categories, selectedCategoryId }: SearchChartProps) {
  if (!stats) return null;
  if (selectedCategoryId) {
    // 브랜드별 차트
    const category = stats.find(s => s.categoryId === selectedCategoryId);
    const brandData = category?.details ?? [];
    return (
      <div className="mb-[2rem]">
        <div className="font-bold mb-2">브랜드별 검색 수 (Line)</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={brandData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brandName" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" className="stroke-primary" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  // 카테고리별 차트
  const data = categories.map(cat => {
    const found = stats.find(s => s.categoryId === cat.categoryId);
    return found ?? { categoryId: cat.categoryId, categoryName: cat.categoryName, count: 0, details: [] };
  });
  return (
    <div className="mb-[2rem]">
      <div className="font-bold mb-2">카테고리별 검색 수 (Line)</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoryName" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" className="stroke-primary" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 