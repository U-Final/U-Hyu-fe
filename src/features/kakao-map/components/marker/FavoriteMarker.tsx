import type { FC } from 'react';

import { MdStar } from 'react-icons/md';

interface FavoriteMarkerProps {
  isSelected?: boolean;
  onClick?: () => void;
}

const FavoriteMarker: FC<FavoriteMarkerProps> = ({
  isSelected = false,
  onClick,
}) => {
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
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
          <MdStar className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteMarker;
