import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/shadcn/ui/sheet';
import LoggedInContent from '@/shared/components/sidebar/LoggedInContent';
import LoggedOutContent from '@/shared/components/sidebar/LoggedOutContent';
import { useIsLoggedIn } from '@/shared/store/userStore';

const SidebarSheet = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          aria-label="사이드바 열기"
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-[44px] h-[44px] bg-white border border-gray-200 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 desktop-content-position cursor-pointer"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[70%]" containerId="main-content">
        <SheetHeader>
          <div className="flex justify-center items-center gap-4">
            <img
              src="/images/Logo/Logo3D.png"
              alt="U-HYU 로고"
              className="w-10 h-10"
            />
            <SheetTitle className="text-h3">U-HYU Menu</SheetTitle>
          </div>
        </SheetHeader>

        <div className="px-4 flex flex-col">
          {isLoggedIn ? <LoggedInContent /> : <LoggedOutContent />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
