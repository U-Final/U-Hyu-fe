import { motion } from 'framer-motion';
import React from 'react';
import { type PrimaryButtonProps } from '../types';

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className = '',
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full h-12 bg-primary text-white font-medium rounded-md
      hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed
      transition-colors duration-200 ${className}
    `}
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
  >
    {children}
  </motion.button>
);
