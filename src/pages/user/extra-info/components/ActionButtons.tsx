import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { GhostButton } from '@shared/components/buttons/GhostButton';

interface ActionButtonsProps {
  currentStep: number;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
}

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
          <GhostButton onClick={onPrev} className="flex items-center gap-2 h-12">
            <ChevronLeft className="w-4 h-4" />
            이전
          </GhostButton>
        )}
        <PrimaryButton onClick={onNext} disabled={!isStepValid} className="flex-1">
          {currentStep === 4 ? '완료' : '다음'}
        </PrimaryButton>
      </div>
    </div>
  );
};
