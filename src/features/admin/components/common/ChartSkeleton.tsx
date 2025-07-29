import { Card, CardContent, CardHeader } from '@/shared/components/shadcn/ui/card';

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 