import { useModalStore } from '@/shared/store';
import { useIsLoggedIn } from '@/shared/store/userStore';

export const useAuthCheckModal = () => {
  const isLoggedIn = useIsLoggedIn();
  const openModal = useModalStore(state => state.openModal);

  const checkAuthAndExecuteModal = (callback: () => void) => {
    if (!isLoggedIn) {
      openModal('login');
      return false;
    }
    callback();
    return true;
  };

  return { checkAuthAndExecuteModal, isLoggedIn };
};
