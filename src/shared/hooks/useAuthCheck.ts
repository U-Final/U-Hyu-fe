import { useModalStore } from '@/shared/store';
import { useIsLoggedIn } from '@/shared/store/userStore';

export const useAuthCheck = () => {
  const isLoggedIn = useIsLoggedIn();
  const openModal = useModalStore(state => state.openModal);

  const checkAuthAndExecute = (callback: () => void) => {
    if (!isLoggedIn) {
      openModal('login');
      return false;
    }
    callback();
    return true;
  };

  return { checkAuthAndExecute, isLoggedIn };
};