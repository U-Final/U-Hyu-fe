import type React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Brand } from '../types';

interface BrandLogoProps {
  brand: Brand;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, isSelected, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex flex-col items-center space-y-2"
    >
      <motion.button
        onClick={onClick}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl
          ${
            isSelected
              ? `${brand.bgColor} ${brand.textColor} ring-4 ring-blue-500 ring-opacity-50`
              : `${brand.bgColor} ${brand.textColor} hover:scale-105`
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xs font-bold leading-tight text-center px-1">{brand.name}</span>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.button>
      <span className="text-xs text-gray-600 text-center leading-tight">{brand.name}</span>
    </motion.div>
  );
};
