import { AuthHomeSheetContent, GuestHomeSheetContent } from '@home/components';
import { LoginButton } from '@home/components/LoginButton';
import {
  useIsAuthInitialized,
  useIsAuthLoading,
  useIsLoggedIn,
} from '@useUserStore';

import { DragBottomSheet } from '@/shared/components';

const HomePage = () => {
  const isLoggedIn = useIsLoggedIn();
  const isLoading = useIsAuthLoading();
  const isInitialized = useIsAuthInitialized();

  // 초기화가 완료되지 않았거나 로딩 중이면 로딩 화면 표시
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <div></div>
      <DragBottomSheet>
        {!isLoggedIn && <LoginButton />}
        {isLoggedIn ? <AuthHomeSheetContent /> : <GuestHomeSheetContent />}
      </DragBottomSheet>
    </div>
  );
};

export default HomePage;
