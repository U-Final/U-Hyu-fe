export type MarkerColor = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN' | 'PURPLE';

export const MYMAP_COLOR: Record<MarkerColor, string> = {
  RED: 'text-[color:var(--text-red)]',
  ORANGE: 'text-[color:var(--text-orange)]',
  YELLOW: 'text-[color:var(--text-yellow)]',
  GREEN: 'text-[color:var(--text-green)]',
  PURPLE: 'text-[color:var(--text-purple)]',
};