'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { PrimaryButton } from '@shared/components/buttons/PrimaryButton';
import { BUTTON_ANIMATIONS } from '../constants/animations';

interface ConfirmButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <motion.div {...BUTTON_ANIMATIONS}>
      <PrimaryButton onClick={onClick} disabled={disabled} className="w-full h-12">
        {children}
      </PrimaryButton>
    </motion.div>
  );
};
