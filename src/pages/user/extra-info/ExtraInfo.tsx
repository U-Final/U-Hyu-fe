import React, { useCallback, useRef } from 'react';

import { CompletedSteps } from '@extra-info/components/CompletedSteps';
import { CurrentStep } from '@extra-info/components/CurrentStep';
import { useSignupFlow } from '@extra-info/hooks/useSignupFlow';
import type { SignupData } from '@extra-info/types';
import { useSubmitExtraInfo } from '@user/hooks/useUserMutation';
import { LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { UserGender, UserGrade } from '@/shared/types';

// 멤버십 등급 매핑 함수
const mapMembershipGrade = (grade: string): UserGrade => {
  const gradeMap: Record<string, UserGrade> = {
    Excellent: 'GOOD',
    vip: 'VIP',
    vvip: 'VVIP',
  };
  return gradeMap[grade] || 'GOOD';
};

const ImprovedSignupFlow: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // API 상태 관리
  const submitExtraInfo = useSubmitExtraInfo();

  // 회원가입 완료 처리 함수
  const handleComplete = useCallback(
    async (data: SignupData) => {
      try {
        // API 요청 데이터 준비
        const apiData = {
          age: data.age,
          gender: data.gender as UserGender,
          grade: mapMembershipGrade(data.membershipGrade),
          recentBrands: data.recentBrands,
          interestedBrands: data.selectedBrands,
        };

        // API 요청 실행
        await submitExtraInfo.mutateAsync(apiData);

        // 성공 처리 - 토스트 알림
        toast.success('🎉 회원가입이 완료되었습니다!', {
          description: '환영합니다! 홈페이지로 이동합니다.',
          duration: 2000,
        });

        // 성공 후 홈으로 리다이렉트
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      } catch (error) {
        console.error('회원가입 실패:', error);

        // 에러 처리 - 토스트 알림
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

  // useSignupFlow 훅 사용 (콜백은 제거하고 직접 처리)
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

  // 커스텀 goToNextStep 함수
  const handleNext = useCallback(async () => {
    if (currentStep === 4) {
      // 마지막 단계에서는 API 호출
      await handleComplete(data);
    } else {
      // 일반 스텝 진행
      await originalGoToNextStep();
    }
  }, [currentStep, data, handleComplete, originalGoToNextStep]);

  // 전체 플로우 리셋 함수
  const handleReset = useCallback(() => {
    resetFlow();
    submitExtraInfo.reset(); // mutation 상태도 리셋
  }, [resetFlow, submitExtraInfo]);

  // 현재 스텝 유효성 확인
  const currentStepValid = isStepValid(currentStep);

  // 제출 상태들
  const isSubmitting = submitExtraInfo.isPending;
  const submitError = submitExtraInfo.error;

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
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

      {/* 메인 콘텐츠 */}
      <div ref={containerRef}>
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

export default ImprovedSignupFlow;
