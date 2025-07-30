import type { FC } from 'react';

import { MYMAP_COLOR } from '@mymap/constants/mymapColor';
import type { MarkerColor } from '@mymap/constants/mymapColor';
import { useSharedMapStore } from '@mymap/store/SharedMapStore';
import { MdStars } from 'react-icons/md';

interface MyMapMarkerProps {
  isSelected?: boolean;
  onClick?: () => void;
}

const MyMapMarker: FC<MyMapMarkerProps> = ({ isSelected = false, onClick }) => {
  const markerColor = useSharedMapStore(state => state.markerColor);
  const markerColorClass =
    MYMAP_COLOR[markerColor as MarkerColor] ?? 'RED';

  return (
    <div className="relative" onClick={onClick}>
      <div
        className={`
          text-3xl
          ${markerColorClass}
          drop-shadow-lg
          transition-transform duration-200
          cursor-pointer
          hover:scale-110
          ${isSelected ? 'ring-4 ring-blue-300 rounded-full bg-white p-1' : ''}
        `}
      >
        <MdStars />
      </div>

      {isSelected && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping" />
      )}
    </div>
  );
};

export default MyMapMarker;
