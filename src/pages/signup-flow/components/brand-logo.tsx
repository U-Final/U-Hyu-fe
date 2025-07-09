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
      {/* 체크 표시를 위한 여유 공간 확보 */}
      <div className="relative p-1">
        {' '}
        {/* 패딩으로 여유 공간 확보 */}
        <motion.button
          onClick={onClick}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-200 shadow-lg hover:shadow-xl
            ${
              isSelected
                ? 'ring-4 ring-blue-500 ring-opacity-50 bg-white'
                : 'bg-white hover:scale-105 border-2 border-gray-200'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* 로고 이미지 컨테이너 */}
          {brand.logo ? (
            <div
              className="w-12 h-12 relative rounded-full"
              style={{
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={brand.logo}
                alt={brand.logoAlt || `${brand.name} 로고`}
                width={36}
                height={36}
                className="object-contain"
                style={{
                  maxWidth: '36px',
                  maxHeight: '36px',
                  borderRadius: '50%',
                }}
              />
            </div>
          ) : (
            <span className="text-xs font-bold leading-tight text-center px-1 text-gray-700">
              {brand.name}
            </span>
          )}
        </motion.button>
        {/* 체크 표시 - 패딩 영역 내에 배치 */}
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

      {/* 브랜드 이름 */}
      <span className="text-xs text-gray-600 text-center leading-tight">{brand.name}</span>
    </motion.div>
  );
};
