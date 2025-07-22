import {
  AuthHomeSheetContent,
  GuestHomeSheetContent,
} from '@features/home/components';
import { LoginButton } from '@home/components/LoginButton';

import { DragBottomSheet } from '@/shared/components';

const HomePage = () => {
  const isLoggedIn = true; // 로그인 여부를 확인하는 로직이 필요합니다.
  return (
    <div>
      <div></div>
      <DragBottomSheet>
        <LoginButton />
        {isLoggedIn ? <AuthHomeSheetContent /> : <GuestHomeSheetContent />}
      </DragBottomSheet>
    </div>
  );
};

export default HomePage;
