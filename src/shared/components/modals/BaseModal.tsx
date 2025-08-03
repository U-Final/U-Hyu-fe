import { useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
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
    <AnimatePresence mode="wait">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <motion.section
          className="bg-white rounded-[16px] w-full px-[20px] py-[20px] min-w-[300px] max-w-lg mx-8 flex flex-col gap-[10px] shadow-2xl"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: -20,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          }}
        >
          <motion.header
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {title && (
              <h3
                id="modal-title"
                className="break-word [overflow-wrap:anywhere] text-body1 font-bold"
              >
                {title}
              </h3>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <IconButton
                icon={
                  <X className="h-4" onClick={closeModal} aria-label="모달 닫기" />
                }
              />
            </motion.div>
          </motion.header>
          <motion.main
            className="break-word flex flex-col"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            {children}
          </motion.main>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};

export default BaseModal;
