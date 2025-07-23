import React from 'react';

import { ChevronLeft, Loader2 } from 'lucide-react';

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
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>회원가입 중...</span>
            </div>
          ) : (
            <span>{isLastStep ? '회원가입 완료' : '다음'}</span>
          )}
        </PrimaryButton>
      </div>

      {/* 마지막 단계에서 제출 중일 때 추가 안내 */}
      {isSubmitting && isLastStep && (
        <p className="text-xs text-gray-500 text-center mt-2">
          잠시만 기다려 주세요. 회원가입을 처리하고 있습니다.
        </p>
      )}
    </div>
  );
};
