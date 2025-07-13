import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepTitle } from '../components/StepTitle';
import { StepContent } from '../components/StepContent';
import { PrimaryButton } from '../components/PrimaryButton';
import { ActionButtons } from '../components/ActionButtons';
import { type CurrentStepProps } from '../types';
import { STEP_TITLES } from '../constants';

export const CurrentStep: React.FC<CurrentStepProps> = ({
  currentStep,
  data,
  onUpdateData,
  onToggleBrand,
  onReset,
  isStepValid,
  onNext,
  onPrev,
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="pt-4"
          >
            <ActionButtons
              currentStep={currentStep}
              isStepValid={isStepValid}
              onNext={onNext}
              onPrev={onPrev}
            />
          </motion.div>
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
