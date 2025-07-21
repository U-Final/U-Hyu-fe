import React from 'react';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { type BrandLogoProps } from '@/shared/components/brand_grid/brand.type';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brand,
  isSelected,
  onClick,
  delay = 0,
  disabled = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex flex-col items-center space-y-2"
  >
    <div className="relative p-1">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-200 shadow-lg overflow-hidden bg-white
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
          ${
            isSelected
              ? 'ring-4 ring-blue-500 ring-opacity-50'
              : 'hover:scale-105 border-2 border-gray-200'
          }
        `}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        <img
          src={brand.imagePath}
          alt={brand.name}
          className="w-14 h-14 object-cover rounded-full bg-white"
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallbackText = target.nextElementSibling as HTMLElement;
            if (fallbackText) {
              fallbackText.style.display = 'block';
            }
          }}
        />
        <span
          className="text-xs font-bold leading-tight text-center px-1 text-gray-700 hidden"
          style={{ display: 'none' }}
        >
          {brand.name}
        </span>
      </motion.button>
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute top-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-20"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </div>
    <span className="text-xs text-gray-600 text-center leading-tight">
      {brand.name}
    </span>
  </motion.div>
);
