import { type FC } from 'react';

import { X } from 'lucide-react';

import GuestBarcodeContent from '@/shared/components/bottom_navigation/barcode/contents/GuestBarcodeSection';
import { LoggedInBarcodeContent } from '@/shared/components/bottom_navigation/barcode/contents/LoggedInBarcodeContent';
import { useIsLoggedIn } from '@/shared/store/useUserStore';

interface BarcodeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BarcodeBottomSheet: FC<BarcodeBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const isLoggedIn = useIsLoggedIn();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="바코드 업로드 바텀시트"
      className="absolute bottom-12 left-0 right-0 z-10"
    >
      <div className="bg-white rounded-t-2xl shadow-2xl z-50 flex flex-col border border-light-gray p-4">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">바코드 멤버십</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="cursor-pointer hover:bg-gray-200 rounded-md"
          >
            <X size={20} />
          </button>
        </header>

        {isLoggedIn ? (
          <LoggedInBarcodeContent onClose={onClose} />
        ) : (
          <GuestBarcodeContent />
        )}
      </div>
    </div>
  );
};
