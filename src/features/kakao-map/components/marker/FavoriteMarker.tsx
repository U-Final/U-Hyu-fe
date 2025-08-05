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
    <div className="relative select-none" onClick={onClick} style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      <div
        className={`
          text-3xl
          drop-shadow-xl
          transition-all duration-200
          cursor-pointer
          hover:scale-110
          hover:drop-shadow-2xl
          ${isSelected ? 'ring-4 ring-blue-300 rounded-full bg-white p-1 shadow-2xl' : ''}
        `}
      >
        <div 
          className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-xl"
          style={{
            boxShadow: '0 8px 25px -5px #e6007e40, 0 10px 10px -5px #e6007e30',
          }}
        >
          <MdStar className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteMarker;
