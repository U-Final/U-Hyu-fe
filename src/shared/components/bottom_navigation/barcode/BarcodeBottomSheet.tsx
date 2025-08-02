import { type FC, useEffect, useState } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import {
  GuestBarcodeContent,
  LoggedInBarcodeContent,
} from '@/shared/components/bottom_navigation/barcode/contents';
import { useIsLoggedIn, useUser } from '@/shared/store/userStore';

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
  const [mainContentElement, setMainContentElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    // main-content 엘리먼트 찾기
    const element = document.getElementById('main-content');
    if (element) {
      setMainContentElement(element);
      // relative positioning 확인 및 설정
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !mainContentElement) return null;

  const modalContent = (
    <>
      {/* 오버레이 - main-content 전체를 덮음 */}
      <div
        onClick={onClose}
        role="presentation"
        className="absolute inset-0 bg-black/40 z-[50]"
      />

      {/* 바텀시트 - main-content 하단에 고정 */}
      <div
        role="dialog"
        aria-label="바코드 바텀시트"
        className="absolute bottom-0 left-0 right-0 z-[51] desktop-padding"
      >
        <div className="bg-white rounded-t-2xl border border-light-gray flex flex-col max-h-[70vh] shadow-lg">
          {/* 핸들 */}
          <div className="flex justify-center py-3 flex-shrink-0">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* 헤더 */}
          <header className="flex justify-between items-center px-6 pb-4 flex-shrink-0">
            <h2 className="text-lg font-semibold flex-1">
              {user
                ? `${user.userName} ${user.grade} 멤버십 바코드`
                : '멤버십 바코드'}
            </h2>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </header>

          {/* 컨텐츠 */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
            {isLoggedIn ? <LoggedInBarcodeContent /> : <GuestBarcodeContent />}
          </div>
        </div>
      </div>
    </>
  );

  // main-content 컨테이너에 포털로 렌더링
  return createPortal(modalContent, mainContentElement);
};
