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
import { useIsLoggedIn } from '@/shared/store/userStore';

const SidebarSheet = () => {
  const isLoggedIn = useIsLoggedIn();
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
