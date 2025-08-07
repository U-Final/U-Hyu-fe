export type MarkerColor = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN' | 'PURPLE';

export const MYMAP_COLOR: Record<MarkerColor, string> = {
  RED: 'text-[#FBCEF5]',
  ORANGE: 'text-[#C9E7FC]',
  YELLOW: 'text-[#FAEE6C]',
  GREEN: 'text-[#DDF0A3]',
  PURPLE: 'text-[#B798D3]',
};

export const MYMAP_COLOR_BG: Record<MarkerColor, string> = {
  RED: '#FBCEF5',
  ORANGE: '#C9E7FC',
  YELLOW: '#FAEE6C',
  GREEN: '#DDF0A3',
  PURPLE: '#B798D3',
}; 

export const MARKER_COLOR_IMAGE: Record<MarkerColor, string> = {
  RED: '/images/mymap/date.png',
  ORANGE: '/images/mymap/travel.png',
  YELLOW: '/images/mymap/etc.png',
  GREEN: '/images/mymap/lifestyle.png',
  PURPLE: '/images/mymap/social.png',
};