import { type FC, useEffect } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import {
  GuestBarcodeContent,
  LoggedInBarcodeContent,
} from '@/shared/components/bottom_navigation/barcode/contents';
import { useBarcodeStore } from '@/shared/store/barcodeStore';
import { useIsLoggedIn, useUser } from '@/shared/store/userStore';

export const BarcodeBottomSheet: FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const user = useUser();
  const { isOpen, close } = useBarcodeStore();

  // ESC 닫기 + 바디 스크롤 잠금(선택)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);

    // 열려있을 때 body 스크롤 잠금
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* 오버레이 */}
      <div
        onClick={close}
        role="presentation"
        className="fixed inset-0 bg-black/40 z-[1000]"
      />

      {/* 바텀시트 */}
      <div
        role="dialog"
        aria-label="바코드 바텀시트"
        className="fixed left-0 right-0 bottom-0 z-[1001]"
      >
        <div
          className="
            bg-white rounded-t-2xl border border-light-gray
            flex flex-col max-h-[70vh] shadow-lg
          "
          // 하단 네비+안전영역만큼 패딩으로 겹침 방지
          style={{
            paddingBottom:
              'calc(env(safe-area-inset-bottom, 0px) + var(--bottom-nav-height, 0px))',
          }}
        >
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
              onClick={close}
              aria-label="닫기"
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </header>

          {/* 컨텐츠 */}
          <div
            className="flex-1 overflow-y-auto px-6 pb-18 sm:pb-10 min-h-0"
            data-scrollable="true"
          >
            {isLoggedIn ? <LoggedInBarcodeContent /> : <GuestBarcodeContent />}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
