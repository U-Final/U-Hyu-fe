import { type FC, useEffect } from 'react';

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

  return (
    <>
      {/* 오버레이 (바텀 네비게이션 영역 제외) */}
      <div
        onClick={close}
        role="presentation"
        className="fixed top-0 left-0 right-0 bg-black/40 z-[998]"
        style={{
          bottom: 'calc(48px + env(safe-area-inset-bottom, 0px))',
        }}
      />

      {/* 바텀시트 */}
      <div
        role="dialog"
        aria-label="바코드 바텀시트"
        className="fixed left-0 right-0 bottom-0 z-[999] desktop-padding"
      >
        <div
          className="
            bg-white rounded-t-2xl border border-light-gray
            flex flex-col shadow-lg
          "
          // 바텀 네비게이션 높이(48px)와 안전영역을 고려한 최대 높이 설정
          style={{
            maxHeight:
              'calc(100vh - 48px - env(safe-area-inset-bottom, 0px) - 20px)',
            marginBottom: 'calc(48px + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* 핸들 */}
          <div className="flex justify-center py-3 flex-shrink-0">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* 헤더 */}
          <header className="flex justify-center items-center px-6 pb-4 flex-shrink-0">
            <h2 className="text-lg font-semibold">
              {user
                ? `${user.userName} ${user.grade} 멤버십 바코드`
                : '멤버십 바코드'}
            </h2>
          </header>

          {/* 안내 문구 */}
          <div className="px-6 pb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                실제 U+ 멤버십에서 사용하는 바코드를 등록 후 사용해주세요!{' '}
                <br className="hidden sm:block" />
                U-HYU가 방문처리 및 추천을 더 정확하게 해드릴게요!
              </p>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div
            className="flex-1 overflow-y-auto px-6 pb-6 min-h-0"
            data-scrollable="true"
          >
            {isLoggedIn ? <LoggedInBarcodeContent /> : <GuestBarcodeContent />}
          </div>
        </div>
      </div>
    </>
  );
};
