import type { FC } from 'react';

import { useIsLoggedIn } from '@user/store/userStore';

import { useModalStore } from '@/shared/store';

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

  return <BookmarkButton isActive={isBookmarkMode} onClick={handleClick} />;
};
