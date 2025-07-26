import type { StatsSummaryCardsProps } from '@/features/admin/types/component';

export default function StatsSummaryCards({ cards }: StatsSummaryCardsProps) {
  return (
    <div className="flex gap-3 mb-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`flex-1 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${card.bgClass} ${card.textClass || ''} hover:scale-105 hover:shadow-lg`}
        >
          <div className="text-2xl mb-1">{card.icon}</div>
          <div className="text-lg font-bold mb-1">{card.value}</div>
          <div className="text-xs font-medium opacity-80 mb-1">{card.title}</div>
          {card.subText && <div className="text-xs opacity-70">{card.subText}</div>}
        </div>
      ))}
    </div>
  );
} 