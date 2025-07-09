import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepTitle } from '../components/StepTitle';
import { StepContent } from '../components/StepContent';
import { PrimaryButton } from '../components/PrimaryButton';
import { type SignupData } from '../types';
import { STEP_TITLES } from '../constants';

interface CurrentStepProps {
  currentStep: number;
  data: SignupData;
  onUpdateData: (updates: Partial<SignupData>) => void;
  onToggleBrand: (brandId: string, field: 'recentBrands' | 'selectedBrands') => void;
  onReset: () => void;
}

export const CurrentStep: React.FC<CurrentStepProps> = ({
  currentStep,
  data,
  onUpdateData,
  onToggleBrand,
  onReset,
}) => (
  <div className="sticky top-0 bg-white z-10 px-6 py-8">
    <AnimatePresence mode="wait">
      {currentStep <= 4 ? (
        <motion.div
          key={`current-${currentStep}`}
          layoutId={`step-${currentStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <StepTitle>{STEP_TITLES[currentStep - 1]}</StepTitle>
          <StepContent
            step={currentStep}
            data={data}
            onUpdateData={onUpdateData}
            onToggleBrand={onToggleBrand}
            disabled={false}
          />
        </motion.div>
      ) : (
        <motion.div
          key="completion"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🎉 회원가입이 완료되었습니다!</h1>
          <p className="text-gray-600 mb-8">모든 정보가 성공적으로 등록되었습니다.</p>
          <PrimaryButton onClick={onReset}>처음으로</PrimaryButton>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
