// 순환 의존성 방지: 컴포넌트 단일 경로로 직접 import
import React, { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';

import { IconButton } from '@/shared/components/buttons/IconButton';

import type { BaseBottomSheetProps } from './bottomSheet.type';

export const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  showBackButton = false,
  onBack,
  children,
  height = 'auto',
  className = '',
  closeOnBackdrop = true,
  showHandle = true,
  showCloseButton = true,
}) => {
  // body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // cleanup: 스크롤 위치 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const getHeightClass = () => {
    switch (height) {
      case 'small':
        return 'max-h-[40vh]';
      case 'medium':
        return 'max-h-[60vh]';
      case 'large':
        return 'max-h-[80vh]';
      case 'full':
        return 'h-screen rounded-t-none';
      case 'auto':
      default:
        return 'max-h-[85vh]';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          <motion.div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 flex flex-col border border-light-gray ${getHeightClass()} ${className}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {showHandle && (
              <div className="flex justify-center py-3 flex-shrink-0">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>
            )}

            {(title || showBackButton || showCloseButton) && (
              <div className="flex items-center justify-between px-6 pb-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  {showBackButton && (
                    <IconButton
                      icon={<ChevronLeft size={18} />}
                      onClick={onBack}
                      className="bg-light-gray hover:bg-gray-200 rounded-md"
                    />
                  )}

                  {(title || subtitle) && (
                    <div>
                      {title && (
                        <h2 className="text-xl font-bold text-black">
                          {title}
                        </h2>
                      )}
                      {subtitle && (
                        <p className="text-sm text-secondary mt-1">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {showCloseButton && (
                  <IconButton
                    icon={<X size={18} />}
                    onClick={onClose}
                    className="bg-light-gray hover:bg-gray-200 rounded-md"
                  />
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
              <div className="h-full">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
