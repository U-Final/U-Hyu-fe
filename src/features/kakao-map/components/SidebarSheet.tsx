import { LoginButton } from '@home/components/LoginButton';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/shadcn/ui/sheet';

const SidebarSheet = () => {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button className="absolute top-[14px] left-[15px] z-50 p-2 bg-white rounded-md shadow-sm">
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[70%]" containerId="main-content">
        <SheetHeader>
          <SheetTitle>U-HYU</SheetTitle>
        </SheetHeader>
        <div className="px-8">
          <LoginButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
