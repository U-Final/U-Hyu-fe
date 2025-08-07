import { useIsLoggedIn } from '@user/store/userStore';

import { useModalStore } from '@/shared/store';

export const useAuthCheckModal = () => {
  const isLoggedIn = useIsLoggedIn();
  const openModal = useModalStore(state => state.openModal);

  const checkAuthAndExecuteModal = (
    callback: () => void,
    onCancel?: () => void
  ) => {
    if (!isLoggedIn) {
      openModal('login', {}, onCancel);
      return false;
    }
    callback();
    return true;
  };

  return { checkAuthAndExecuteModal, isLoggedIn };
};
