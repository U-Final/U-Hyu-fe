import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { 
  BookmarkIcon, 
  FunnelIcon, 
  HeartIcon, 
  UserGroupIcon,
  InboxIcon 
} from '@heroicons/react/24/outline';

interface EmptyStateProps {
  type: 'bookmark' | 'filtering' | 'recommendation' | 'membership';
  selectedCategory?: string;
  categoryDisplayName?: string;
  variant?: 'full' | 'chart-only';
}

const getIconAndTitle = (type: string) => {
  switch (type) {
    case 'bookmark':
      return {
        icon: BookmarkIcon,
        title: '즐겨찾기 통계',
        color: 'var(--admin-bookmark)',
        emoji: '🔖'
      };
    case 'filtering':
      return {
        icon: FunnelIcon,
        title: '필터링 통계',
        color: 'var(--admin-filtering)',
        emoji: '🔍'
      };
    case 'recommendation':
      return {
        icon: HeartIcon,
        title: '추천 통계',
        color: 'var(--admin-recommendation)',
        emoji: '💖'
      };
    case 'membership':
      return {
        icon: UserGroupIcon,
        title: '멤버십 사용 통계',
        color: 'var(--admin-membership)',
        emoji: '👥'
      };
    default:
      return {
        icon: InboxIcon,
        title: '통계',
        color: 'var(--color-brand-blue)',
        emoji: '📊'
      };
  }
};

// 차트 영역만을 위한 빈 상태 컴포넌트
export function ChartEmptyState({ type, selectedCategory, categoryDisplayName }: Omit<EmptyStateProps, 'variant'>) {
  const { emoji, title } = getIconAndTitle(type);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      {/* 메인 아이콘 */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
          <span className="text-3xl">{emoji}</span>
        </div>
        {/* 장식용 원들 */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-100 opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-100 opacity-60"></div>
      </div>
      
      {/* 메인 메시지 */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        데이터가 없습니다
      </h3>
      
      {/* 서브 메시지 */}
      <p className="text-gray-600 text-center mb-6 max-w-sm leading-relaxed">
        {selectedCategory && selectedCategory !== 'all' ? (
          <>
            <span className="font-semibold text-gray-700">{categoryDisplayName}</span> 카테고리에 대한 {title.toLowerCase()} 데이터가 아직 없습니다.
          </>
        ) : (
          `아직 ${title.toLowerCase()} 데이터가 수집되지 않았습니다.`
        )}
      </p>
      
      {/* 추가 정보 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>사용자 활동이 쌓이면 통계가 표시됩니다</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>다른 카테고리를 선택해보세요</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 전체 카드 형태의 빈 상태 컴포넌트
export function EmptyState({ type, selectedCategory, categoryDisplayName, variant = 'full' }: EmptyStateProps) {
  const { icon: Icon, title, color } = getIconAndTitle(type);

  if (variant === 'chart-only') {
    return <ChartEmptyState type={type} selectedCategory={selectedCategory} categoryDisplayName={categoryDisplayName} />;
  }

  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color }} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          {/* 아이콘 */}
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon className="h-8 w-8 text-gray-400" />
          </div>
          
          {/* 메인 메시지 */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            데이터가 없습니다
          </h3>
          
          {/* 서브 메시지 */}
          <p className="text-gray-500 mb-4 max-w-sm mx-auto">
            {selectedCategory && selectedCategory !== 'all' ? (
              <>
                <span className="font-medium text-gray-700">{categoryDisplayName}</span> 카테고리에 대한 {title.toLowerCase()} 데이터가 아직 없습니다.
              </>
            ) : (
              `아직 ${title.toLowerCase()} 데이터가 수집되지 않았습니다.`
            )}
          </p>
          
          {/* 추가 정보 */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>• 사용자 활동이 쌓이면 통계가 표시됩니다</p>
            <p>• 다른 카테고리를 선택해보세요</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 