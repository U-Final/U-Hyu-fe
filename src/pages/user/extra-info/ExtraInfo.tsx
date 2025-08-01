import React, { useCallback, useRef, useState } from 'react';

import { CompletedSteps } from '@extra-info/components/CompletedSteps';
import { CurrentStep } from '@extra-info/components/CurrentStep';
import { useSignupFlow } from '@extra-info/hooks/useSignupFlow';
import type { SignupData } from '@extra-info/types';
import type { UserGrade } from '@user/api/types';
import { useSubmitExtraInfo } from '@user/hooks/useUserMutation';
import { LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // 회원가입 완료 처리 함수
  const handleComplete = useCallback(
    async (data: SignupData) => {
      try {
        setSubmitResult({}); // 이전 결과 초기화

        // API 요청 데이터 준비
        const apiData = {
          grade: mapMembershipGrade(data.membershipGrade),
          recentBrands: data.recentBrands,
          interestedBrands: data.selectedBrands,
        };

        // API 요청 실행
        await submitExtraInfo.mutateAsync(apiData);

        // 성공 처리
        setSubmitResult({
          success: true,
          message: '회원가입이 성공적으로 완료되었습니다!',
        });

        // 성공 후 잠시 대기한 다음 홈으로 이동
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      } catch (error) {
        console.error('회원가입 실패:', error);

        // 에러 메시지 설정
        const errorMessage =
          error instanceof Error
            ? error.message
            : '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.';

        setSubmitResult({
          success: false,
          message: errorMessage,
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
    setSubmitResult({});
    submitExtraInfo.reset(); // mutation 상태도 리셋
  }, [resetFlow, submitExtraInfo]);

  // 현재 스텝 유효성 확인
  const currentStepValid = isStepValid(currentStep);

  // 제출 상태들
  const isSubmitting = submitExtraInfo.isPending;
  const submitError =
    submitExtraInfo.error ||
    (submitResult.success === false ? new Error(submitResult.message) : null);
  const submitSuccess = submitResult.success === true;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-30 bg-white">
        <div className="px-4 py-2">
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
      <div
        className="bg-white min-h-[calc(100vh-73px)] relative"
        ref={containerRef}
      >
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
            submitSuccess={submitSuccess}
          />

          <CompletedSteps completedSteps={completedSteps} />
        </LayoutGroup>
      </div>

      {/* 성공 시 자동 이동 알림 */}
      {submitSuccess && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">
              잠시 후 홈페이지로 이동합니다
            </span>
          </div>
        </div>
      )}

      {/* 개발 환경 디버그 정보 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono max-w-xs">
          <div className="space-y-1">
            <p>Step: {currentStep}/4</p>
            <p>Valid: {currentStepValid ? '✓' : '✗'}</p>
            <p>Submitting: {isSubmitting ? '✓' : '✗'}</p>
            <p>Success: {submitSuccess ? '✓' : '✗'}</p>
            {submitError && (
              <p className="text-red-300 text-wrap">
                Error: {submitError.message}
              </p>
            )}
            <hr className="border-gray-600" />
            <p>Email: {data.email || 'Empty'}</p>
            <p>Grade: {data.membershipGrade || 'Empty'}</p>
            <p>Recent: {data.recentBrands.length}</p>
            <p>Interest: {data.selectedBrands.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedSignupFlow;
