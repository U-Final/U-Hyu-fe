import React from 'react';

import { ChevronLeft } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

import { GhostButton } from '@/shared/components';

import { PrimaryButton } from '../components/PrimaryButton';
import { type ActionButtonsProps } from '../types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentStep,
  isStepValid,
  onNext,
  onPrev,
  isSubmitting = false,
  submitError = null,
}) => {
  if (currentStep > 4) return null;

  const isLastStep = currentStep === 4;
  const isButtonDisabled = !isStepValid || isSubmitting;

  return (
    <div className="w-full bg-white">
      {/* 에러 메시지 표시 */}
      {submitError && isLastStep && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">
            {submitError.message || '오류가 발생했습니다. 다시 시도해 주세요.'}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {currentStep > 1 && (
          <GhostButton
            onClick={onPrev}
            disabled={isSubmitting}
            className={`flex items-center gap-2 h-12 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </GhostButton>
        )}

        <PrimaryButton
          onClick={onNext}
          disabled={isButtonDisabled}
          className="flex-1 relative"
        >
          {isSubmitting && isLastStep ? (
            <div className="flex items-center justify-center gap-3">
              <BeatLoader color="#ffffff" size={8} speedMultiplier={0.8} />
              <span>회원가입 중...</span>
            </div>
          ) : (
            <span>{isLastStep ? '회원가입 완료' : '다음'}</span>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
};
