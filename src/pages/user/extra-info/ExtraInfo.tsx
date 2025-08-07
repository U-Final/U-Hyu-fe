import React, { useCallback, useEffect, useRef } from 'react';

import { CompletedSteps } from '@extra-info/components/CompletedSteps';
import { CurrentStep } from '@extra-info/components/CurrentStep';
import { useSignupFlow } from '@extra-info/hooks/useSignupFlow';
import type { SignupData } from '@extra-info/types';
import { mapMembershipGrade } from '@extra-info/utils/membershipGrade';
import { PATH } from '@paths';
import { useSubmitExtraInfo } from '@user/hooks/useUserMutation';
import { LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { UserGender } from '@/shared/types';

const ExtraInfo: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const submitExtraInfo = useSubmitExtraInfo();

  const handleComplete = useCallback(
    async (data: SignupData) => {
      try {
        const apiData = {
          age: data.age,
          gender: data.gender as UserGender,
          grade: mapMembershipGrade(data.membershipGrade),
          recentBrands: data.recentBrands,
          interestedBrands: data.selectedBrands,
        };

        await submitExtraInfo.mutateAsync(apiData);

        toast.success('🎉 회원가입이 완료되었습니다!', {
          description: '환영합니다! 홈페이지로 이동합니다.',
          duration: 2000,
        });

        setTimeout(() => {
          navigate(PATH.AUTH_SUCCESS, { replace: true });
        }, 1500);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.';

        toast.error('회원가입 실패', {
          description: errorMessage,
          duration: 4000,
        });
      }
    },
    [submitExtraInfo, navigate]
  );

  const {
    data,
    currentStep,
    completedSteps,
    updateData,
    toggleBrand,
    goToNextStep: originalGoToNextStep,
    goToPrevStep,
    resetFlow,
    isStepValid,
  } = useSignupFlow();

  const handleNext = useCallback(async () => {
    if (currentStep === 4) {
      await handleComplete(data);
    } else {
      await originalGoToNextStep();
    }
  }, [currentStep, data, handleComplete, originalGoToNextStep]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    resetFlow();
    submitExtraInfo.reset();
  }, [resetFlow, submitExtraInfo]);

  const currentStepValid = isStepValid(currentStep);

  const isSubmitting = submitExtraInfo.isPending;
  const submitError = submitExtraInfo.error;

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="desktop-padding-sheet mx-auto py-6">
          <div className="flex items-center gap-3 mx-[2rem]">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min((currentStep / 4) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium min-w-[2.5rem] text-right">
              {currentStep > 4 ? '완료' : `${currentStep}/4`}
            </span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="h-[calc(100vh-64px)] overflow-y-auto">
        <LayoutGroup>
          <CurrentStep
            currentStep={currentStep}
            data={data}
            onUpdateData={updateData}
            onToggleBrand={toggleBrand}
            onReset={handleReset}
            isStepValid={currentStepValid}
            onNext={handleNext}
            onPrev={goToPrevStep}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />

          <CompletedSteps completedSteps={completedSteps} />
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ExtraInfo;
