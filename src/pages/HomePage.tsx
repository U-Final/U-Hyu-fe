import { DragBottomSheet } from '@/shared/components';
import {
  AuthHomeSheetContent,
  GuestHomeSheetContent,
} from '@home/components';

const HomePage = () => {
  const isLoggedIn = true; // 로그인 여부를 확인하는 로직이 필요합니다.
  return (
    <div>
      <div>지도 부분</div>
      <DragBottomSheet>
        {isLoggedIn ? <AuthHomeSheetContent /> : <GuestHomeSheetContent />}
      </DragBottomSheet>
    </div>
  );
};

export default HomePage;
