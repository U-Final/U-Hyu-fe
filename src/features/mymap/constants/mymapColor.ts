export type MarkerColor = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN' | 'PURPLE';

export const MYMAP_COLOR: Record<MarkerColor, string> = {
  RED: 'text-red',
  ORANGE: 'text-orange',
  YELLOW: 'text-yellow',
  GREEN: 'text-green',
  PURPLE: 'text-purple',
};

export const MYMAP_COLOR_BG: Record<MarkerColor, string> = {
  RED: 'bg-red-star',
  ORANGE: 'bg-orange-star',
  YELLOW: 'bg-yellow-star',
  GREEN: 'bg-green-star',
  PURPLE: 'bg-purple-star',
};