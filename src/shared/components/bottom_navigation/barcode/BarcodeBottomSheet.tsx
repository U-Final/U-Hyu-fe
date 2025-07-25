import { type FC, useEffect } from 'react';

import { X } from 'lucide-react';

import {
  GuestBarcodeContent,
  LoggedInBarcodeContent,
} from '@/shared/components/bottom_navigation/barcode/contents';
import { useIsLoggedIn, useUser } from '@/shared/store/useUserStore';

interface BarcodeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BarcodeBottomSheet: FC<BarcodeBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const isLoggedIn = useIsLoggedIn();
  const user = useUser();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        role="presentation"
        className="fixed inset-0 bg-black/4"
      />

      <div
        role="dialog"
        aria-label="바코드 바텀시트"
        className="absolute bottom-[0.5px] left-0 right-0"
      >
        <div className="bg-white rounded-t-2xl z-30 flex flex-col border border-light-gray p-4 min-h-[150px]">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {user
                ? `${user.userName} ${user.grade} 멤버십 바코드`
                : '멤버십 바코드'}
            </h2>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="cursor-pointer hover:bg-gray-200 rounded-md"
            >
              <X size={20} />
            </button>
          </header>

          {isLoggedIn ? <LoggedInBarcodeContent /> : <GuestBarcodeContent />}
        </div>
      </div>
    </>
  );
};
