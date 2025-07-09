import type React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@shared/components/shadcn/ui/input';
import { Label } from '@shared/components/shadcn/ui/label';
import { Button } from '@shared/components/shadcn/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/shadcn/ui/select';
import { StepWrapper } from '../components/step-wrapper';
import { StepTitle } from '../components/step-title';
import { ConfirmButton } from '../components/confirm-button';
import { BrandGrid } from '../components/brand-grid';
import { useSignupStore } from '../stores/signup-store';
import { useSignupNavigation } from '../hooks/use-signup-navigation';
import { MEMBERSHIP_GRADES } from '../constants/membership';
import { getBrandNamesByIds, getMembershipGradeLabel } from '../utils/brand-utils';

// 1. 멤버십 스텝
export const MembershipStep: React.FC = () => {
  const membershipGrade = useSignupStore((state) => state.membershipGrade);
  const setMembershipGrade = useSignupStore((state) => state.setMembershipGrade);
  const { direction, handleNext } = useSignupNavigation();

  // 유효성 검사: 멤버십 등급이 선택되었는지 확인
  const isValid = membershipGrade !== '';

  return (
    <StepWrapper stepKey="step1" direction={direction}>
      <StepTitle>LG U+ 멤버십 등급을 선택해주세요</StepTitle>

      <div className="space-y-4">
        <Select value={membershipGrade} onValueChange={setMembershipGrade}>
          <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-300">
            <SelectValue placeholder="LG U+ 멤버십 등급" />
          </SelectTrigger>
          <SelectContent>
            {MEMBERSHIP_GRADES.map((grade) => (
              <SelectItem key={grade.value} value={grade.value}>
                {grade.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ConfirmButton onClick={handleNext} disabled={!isValid}>
        확인
      </ConfirmButton>
    </StepWrapper>
  );
};

// 2. 최근 브랜드 스텝
export const RecentBrandsStep: React.FC = () => {
  const recentBrands = useSignupStore((state) => state.recentBrands);
  const toggleRecentBrand = useSignupStore((state) => state.toggleRecentBrand);
  const { direction, handleNext } = useSignupNavigation();

  // 유효성 검사: 최소 1개 브랜드가 선택되었는지 확인
  const isValid = recentBrands.length > 0;

  return (
    <StepWrapper stepKey="step2" direction={direction}>
      <StepTitle>최근 이용한 브랜드를 선택해주세요</StepTitle>

      <BrandGrid
        selectedBrands={recentBrands}
        onBrandToggle={toggleRecentBrand}
        title="최근 이용한 브랜드"
      />

      <ConfirmButton onClick={handleNext} disabled={!isValid}>
        확인
      </ConfirmButton>
    </StepWrapper>
  );
};

// 3. 관심 브랜드 스텝
export const InterestedBrandsStep: React.FC = () => {
  const selectedBrands = useSignupStore((state) => state.selectedBrands);
  const toggleSelectedBrand = useSignupStore((state) => state.toggleSelectedBrand);
  const { direction, handleNext } = useSignupNavigation();

  // 유효성 검사: 최소 1개 브랜드가 선택되었는지 확인
  const isValid = selectedBrands.length > 0;

  return (
    <StepWrapper stepKey="step3" direction={direction}>
      <StepTitle>관심있는 브랜드를 선택해주세요</StepTitle>

      <BrandGrid
        selectedBrands={selectedBrands}
        onBrandToggle={toggleSelectedBrand}
        title="관심있는 브랜드"
      />

      <ConfirmButton onClick={handleNext} disabled={!isValid}>
        확인
      </ConfirmButton>
    </StepWrapper>
  );
};

// 4. 이메일 스텝
export const EmailStep: React.FC = () => {
  const email = useSignupStore((state) => state.email);
  const setEmail = useSignupStore((state) => state.setEmail);
  const { direction, handleNext } = useSignupNavigation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 유효성 검사: 이메일 형식이 올바른지 확인
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = email !== '' && emailRegex.test(email);

  return (
    <StepWrapper stepKey="step4" direction={direction}>
      <StepTitle>이메일 주소를 입력해주세요</StepTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="email" className="text-sm text-gray-600">
            이메일
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`
                flex-1 h-12 bg-white border transition-colors
                ${
                  isValid
                    ? 'border-gray-300 focus:border-blue-500'
                    : email !== ''
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-300'
                }
              `}
              placeholder="이메일 주소를 입력해주세요"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                disabled={!isValid}
                className="px-4 h-12 text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300"
              >
                중복확인
              </Button>
            </motion.div>
          </div>
          {/* 이메일 유효성 검사 피드백 */}
          {email !== '' && !isValid && (
            <p className="text-sm text-red-500 mt-1">올바른 이메일 형식을 입력해주세요</p>
          )}
        </div>
      </motion.div>

      <ConfirmButton onClick={handleNext} disabled={!isValid}>
        확인
      </ConfirmButton>
    </StepWrapper>
  );
};

// 5. 완료 스텝
export const CompletionStep: React.FC = () => {
  const membershipGrade = useSignupStore((state) => state.membershipGrade);
  const recentBrands = useSignupStore((state) => state.recentBrands);
  const selectedBrands = useSignupStore((state) => state.selectedBrands);
  const email = useSignupStore((state) => state.email);
  const { direction, handleReset } = useSignupNavigation();

  return (
    <StepWrapper stepKey="step5" direction={direction}>
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-900"
        >
          회원가입이 완료되었습니다!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 text-left bg-gray-50 p-4 rounded-lg mt-6"
        >
          <div>
            <p className="text-sm text-gray-600">멤버십 등급</p>
            <p className="font-medium">{getMembershipGradeLabel(membershipGrade)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">최근 이용한 브랜드</p>
            <p className="font-medium">{getBrandNamesByIds(recentBrands)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">관심있는 브랜드</p>
            <p className="font-medium">{getBrandNamesByIds(selectedBrands)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">이메일</p>
            <p className="font-medium">{email}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          {/* 완료 단계에서는 항상 활성화 */}
          <ConfirmButton onClick={handleReset}>처음으로</ConfirmButton>
        </motion.div>
      </div>
    </StepWrapper>
  );
};
