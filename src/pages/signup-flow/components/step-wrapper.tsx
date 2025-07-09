import type React from 'react';
import { motion } from 'framer-motion';
import { SLIDE_VARIANTS, SLIDE_TRANSITION } from '../constants/animations';

interface StepWrapperProps {
  stepKey: string;
  direction: number;
  children: React.ReactNode;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({ stepKey, direction, children }) => {
  return (
    <motion.div
      key={stepKey}
      custom={direction}
      variants={SLIDE_VARIANTS}
      initial="enter"
      animate="center"
      exit="exit"
      transition={SLIDE_TRANSITION}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
};
