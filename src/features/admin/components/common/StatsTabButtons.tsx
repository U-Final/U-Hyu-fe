import type { StatsTabButtonsProps } from '@/features/admin/types/component';

export default function StatsTabButtons({ tabs, selected, onSelect }: StatsTabButtonsProps) {
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`flex-1 flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all duration-150
            ${selected === tab.key ? 'bg-primary text-white shadow-lg scale-105' : 'bg-white text-primary border border-primary'}
            hover:scale-105 hover:shadow-lg focus:outline-none`}
          style={{ minWidth: 80 }}
          onClick={() => onSelect(tab.key)}
        >
          <span className="mb-1 text-xl">{tab.icon}</span>
          <span className="text-sm font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
} 