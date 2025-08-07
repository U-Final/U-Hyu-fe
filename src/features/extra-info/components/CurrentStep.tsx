import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ActionButtons } from '../components/ActionButtons';
import { PrimaryButton } from '../components/PrimaryButton';
import { StepContent } from '../components/StepContent';
import { StepTitle } from '../components/StepTitle';
import { STEP_TITLES } from '../constants';
import { type CurrentStepProps } from '../types';

interface EnhancedCurrentStepProps extends CurrentStepProps {
  isSubmitting?: boolean;
  submitError?: Error | null;
}

export const CurrentStep: React.FC<EnhancedCurrentStepProps> = ({
  currentStep,
  data,
  onUpdateData,
  onToggleBrand,
  onReset,
  isStepValid,
  onNext,
  onPrev,
  isSubmitting = false,
  submitError = null,
}) => {
  const navigate = useNavigate();

  const renderErrorState = () => (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-6"
    >
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        회원가입 중 오류가 발생했습니다
      </h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        {submitError?.message || '알 수 없는 오류가 발생했습니다.'}
      </p>

      <div className="space-y-3">
        <PrimaryButton
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          다시 시도하기
        </PrimaryButton>

        <button
          onClick={() => navigate('/')}
          className="w-full h-12 text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          홈으로 돌아가기
        </button>
      </div>
    </motion.div>
  );

  const renderSuccessState = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-gray-900 mb-4"
      >
        🎉 회원가입 완료!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 mb-8 leading-relaxed"
      >
        모든 정보가 성공적으로 등록되었습니다.
        <br />
        잠시 후 홈페이지로 자동 이동됩니다.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <PrimaryButton onClick={() => navigate('/')} className="w-full">
          지금 홈으로 가기
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );

  const renderCompletionState = () => {
    if (submitError) {
      return renderErrorState();
    }
    return renderSuccessState();
  };

  return (
    <div className="bg-white z-10 px-6 py-8">
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
              disabled={isSubmitting}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="pt-4"
            >
              <div className="bw-full bg-white px-6 py-4">
                <ActionButtons
                  currentStep={currentStep}
                  isStepValid={isStepValid}
                  onNext={onNext}
                  onPrev={onPrev}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          renderCompletionState()
        )}
      </AnimatePresence>
    </div>
  );
};
