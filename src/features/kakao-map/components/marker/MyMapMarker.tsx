import type { FC } from 'react';

import { MYMAP_COLOR_BG } from '@mymap/constants/mymapColor';
import type { MarkerColor } from '@mymap/constants/mymapColor';
import { useSharedMapStore } from '@mymap/store/SharedMapStore';
import { MdStar } from 'react-icons/md';

interface MyMapMarkerProps {
  isSelected?: boolean;
  onClick?: () => void;
}

const MyMapMarker: FC<MyMapMarkerProps> = ({ isSelected = false, onClick }) => {
  const markerColor = useSharedMapStore(state => state.markerColor);
  const markerColorClass =
    MYMAP_COLOR_BG[markerColor as MarkerColor] ?? MYMAP_COLOR_BG.RED;
  console.log(`즐겨찾기색: ${markerColorClass}`);

  return (
    <div className="relative" onClick={onClick}>
      <div
        className={`
          text-3xl
          drop-shadow-lg
          transition-transform duration-200
          cursor-pointer
          hover:scale-110
          ${isSelected ? 'ring-4 ring-blue-300 rounded-full bg-white p-1' : ''}
        `}
      >
        <div
          className={`w-6 h-6 rounded-full ${markerColorClass} flex items-center justify-center shadow-md`}
        >
          <MdStar className="w-4 h-4 text-white" />
        </div>
      </div>

      {isSelected && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping" />
      )}
    </div>
  );
};

export default MyMapMarker;
