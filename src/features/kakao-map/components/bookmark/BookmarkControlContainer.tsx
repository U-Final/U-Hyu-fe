import type { FC } from 'react';

import { useMapData } from '../../hooks/useMapData';
import BookmarkButton from './BookmarkButton';

export const BookmarkControlContainer: FC = () => {
  const { isBookmarkMode, toggleBookmarkMode } = useMapData();

  return (
    <div className="absolute bottom-48 right-4 z-10">
      <BookmarkButton isActive={isBookmarkMode} onClick={toggleBookmarkMode} />
    </div>
  );
};
