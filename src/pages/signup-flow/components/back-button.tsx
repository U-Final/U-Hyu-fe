'use client';

import { motion } from 'framer-motion';
import { Button } from '@shared/components/shadcn/ui/button';
import { ChevronLeft } from 'lucide-react';

export const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
      <Button
        variant="ghost"
        onClick={onClick}
        className="p-0 h-auto text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        이전
      </Button>
    </motion.div>
  );
};
