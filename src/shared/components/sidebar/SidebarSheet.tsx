import { useIsLoggedIn } from '@user/store/userStore';
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

const SidebarSheet = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          aria-label="사이드바 열기"
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-[36px] h-[36px] bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer desktop-menu-button"
        >
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[70%] overflow-y-auto pb-20"
        containerId="main-content"
      >
        <SheetHeader>
          <div className="flex justify-center items-center">
            <img
              src="/images/Logo/Logo3D.png"
              alt="U-HYU 로고"
              className="w-10 h-10"
            />
            <SheetTitle className="text-h3 font-bold mr-2">U-HYU</SheetTitle>
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
