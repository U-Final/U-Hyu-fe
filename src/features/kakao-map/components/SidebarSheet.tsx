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
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[70%]" containerId="main-content">
        <SheetHeader>
          <SheetTitle>추천 제휴처</SheetTitle>
        </SheetHeader>
        <p>이러고 하나씩 넣음녀 되는ㄴ건가?</p>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
