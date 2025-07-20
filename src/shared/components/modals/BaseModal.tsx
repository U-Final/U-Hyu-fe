import { useEffect } from 'react';

import { X } from 'lucide-react';

import { IconButton } from '@/shared/components/buttons/IconButton';
import { useModalStore } from '@/shared/store';

interface BaseModalProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const BaseModal = ({ title, children }: BaseModalProps) => {
  const closeModal = useModalStore(state => state.closeModal);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <section className="bg-white rounded-[16px] w-full px-[20px] py-[20px] min-w-[300px] max-w-lg mx-8 flex flex-col gap-[10px]">
        <header className="flex justify-between items-center">
          {title && (
            <h3
              id="modal-title"
              className="break-word [overflow-wrap:anywhere] text-body1 font-bold"
            >
              {title}
            </h3>
          )}
          <IconButton
            icon={
              <X className="h-4" onClick={closeModal} aria-label="모달 닫기" />
            }
          />
        </header>
        <main className="break-word flex flex-col">{children}</main>
      </section>
    </div>
  );
};

export default BaseModal;
