// StatsTabButtons
export interface Tab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export interface StatsTabButtonsProps {
  tabs: Tab[];
  selected: string;
  onSelect: (key: string) => void;
}

// StatsSummaryCards
export interface SummaryCard {
  key: string;
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subText?: string;
  bgClass: string;
  textClass?: string;
}

export interface StatsSummaryCardsProps {
  cards: SummaryCard[];
}

// StatsPerformanceCard
interface PerformanceItem {
  key: string;
  label: string;
  value: string | number;
  barPercent?: number;
  barColorClass?: string;
  subText?: string;
  valueClass?: string;
}

export interface StatsPerformanceCardProps {
  items: PerformanceItem[];
} 