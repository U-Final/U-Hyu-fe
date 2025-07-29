import { Button } from '@/shared/components/shadcn/ui/button';
import type { Tab, TabKey } from '../../api/types';

interface StatsTabButtonsProps {
  tabs: Tab[];
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export function StatsTabButtons({ tabs, selectedTab, onTabChange }: StatsTabButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant={selectedTab === tab.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTabChange(tab.key as TabKey)}
          className="flex items-center gap-2"
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
} 