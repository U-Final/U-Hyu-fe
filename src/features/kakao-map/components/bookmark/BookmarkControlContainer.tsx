import type { FC } from 'react';

import { useModalStore } from '@/shared/store';
import { useIsLoggedIn } from '@/shared/store/userStore';

import { useMapData } from '../../hooks/useMapData';
import BookmarkButton from './BookmarkButton';

export const BookmarkControlContainer: FC = () => {
  const { isBookmarkMode, toggleBookmarkMode } = useMapData();
  const isLoggedIn = useIsLoggedIn();
  const openModal = useModalStore(state => state.openModal);

  const handleClick = () => {
    if (!isLoggedIn) {
      openModal('login');
      return;
    }

    toggleBookmarkMode();
  };

  return (
    <BookmarkButton isActive={isBookmarkMode} onClick={handleClick} />
  );
};
