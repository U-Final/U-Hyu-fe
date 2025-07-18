import { GhostButton } from '@/shared/components';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { PrimaryButton } from '../components/PrimaryButton';
import { type ActionButtonsProps } from '../types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentStep,
  isStepValid,
  onNext,
  onPrev,
}) => {
  if (currentStep > 4) return null;

  return (
    <div className="w-full bg-white">
      <div className="flex gap-3">
        {currentStep > 1 && (
          <GhostButton
            onClick={onPrev}
            className="flex items-center gap-2 h-12"
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </GhostButton>
        )}
        <PrimaryButton
          onClick={onNext}
          disabled={!isStepValid}
          className="flex-1"
        >
          {currentStep === 4 ? '완료' : '다음'}
        </PrimaryButton>
      </div>
    </div>
  );
};
