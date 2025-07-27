import { LoginButton } from '@user/components/LoginButton';
import { LogoutButton } from '@user/components/LogoutButton';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/shadcn/ui/sheet';
import { useIsLoggedIn, useUser } from '@/shared/store/userStore';

const SidebarSheet = () => {
  const isLoggedIn = useIsLoggedIn();
  const user = useUser();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          aria-label="사이드바 열기"
          className="absolute top-[14px] left-[15px] z-50 p-2 bg-white rounded-md shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[70%]" containerId="main-content">
        <SheetHeader>
          <SheetTitle>U-HYU</SheetTitle>
        </SheetHeader>

        <div className="px-8 mt-4">
          <div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>
          {isLoggedIn ? (
            <div>
              <p>{user?.userName}님 반가워요!</p>
              <p>등급: {user?.grade}</p>
              <p>마커 아이디: {user?.markerId}</p>
              <img src={user?.profileImage} alt="프로필 이미지" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
