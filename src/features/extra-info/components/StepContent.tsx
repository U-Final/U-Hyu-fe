import {
  BrandGrid,
  ButtonBase,
  SelectionBottomSheet,
} from '@/shared/components';
import { Input } from '@/shared/components/shadcn/ui/input';
import { Label } from '@/shared/components/shadcn/ui/label';
import React, { useState } from 'react';
import { EMAIL_REGEX, MEMBERSHIP_GRADES } from '../constants';
import { type StepContentProps } from '../types';

export const StepContent: React.FC<StepContentProps> = ({
  step,
  data,
  onUpdateData,
  onToggleBrand,
  disabled = false,
}) => {
  const [isMembershipSheetOpen, setIsMembershipSheetOpen] = useState(false);

  const handleEmailVerification = () => {
    // 테스트용: 중복확인 완료 처리
    onUpdateData({ emailVerified: true });
  };

  const handleMembershipSelect = (value: string) => {
    onUpdateData({ membershipGrade: value });
    setIsMembershipSheetOpen(false);
  };

  const getSelectedMembershipLabel = () => {
    const selectedGrade = MEMBERSHIP_GRADES.find(
      grade => grade.value === data.membershipGrade
    );
    return selectedGrade?.label || 'LG U+ 멤버십 등급을 선택해주세요';
  };

  const membershipItems = MEMBERSHIP_GRADES.map(grade => ({
    id: grade.value,
    label: grade.label,
    description: '',
    isDisabled: false,
  }));

  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm text-gray-600">
              이메일
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={
                  disabled
                    ? undefined
                    : e =>
                        onUpdateData({
                          email: e.target.value,
                          emailVerified: false,
                        })
                }
                className="w-full h-12 bg-gray-50 border border-gray-300 rounded-md"
                placeholder="이메일 주소를 입력해주세요"
                disabled={disabled}
              />
              <ButtonBase
                disabled={
                  disabled || !data.email || !EMAIL_REGEX.test(data.email)
                }
                onClick={handleEmailVerification}
                className={`px-4 h-12 font-medium transition-all duration-200 ${
                  data.emailVerified
                    ? 'bg-gray-300 text-gray-500 border-gray-300 hover:bg-gray-300 shadow-sm'
                    : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-md'
                } ${
                  disabled || !data.email || !EMAIL_REGEX.test(data.email)
                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed hover:bg-gray-300 hover:shadow-none'
                    : ''
                }`}
              >
                {data.emailVerified ? '✓ 확인완료' : '중복확인'}
              </ButtonBase>
            </div>
            <div className="min-h-[20px] mt-1 text-xs text-red-500 transition-all">
              {data.email !== '' &&
              !EMAIL_REGEX.test(data.email) &&
              !disabled ? (
                <span>올바른 이메일 형식을 입력해주세요</span>
              ) : (
                ''
              )}
            </div>
            {data.emailVerified && (
              <div className="mt-1 text-xs text-green-600">
                ✓ 이메일 중복확인이 완료되었습니다
              </div>
            )}
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <button
            onClick={() => !disabled && setIsMembershipSheetOpen(true)}
            disabled={disabled}
            className={`w-full h-12 bg-gray-50 rounded-md border border-gray-300 px-4 text-left transition-all ${
              disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            <span
              className={
                data.membershipGrade ? 'text-gray-900' : 'text-gray-500'
              }
            >
              {getSelectedMembershipLabel()}
            </span>
          </button>

          <SelectionBottomSheet
            isOpen={isMembershipSheetOpen}
            onClose={() => setIsMembershipSheetOpen(false)}
            title="LG U+ 멤버십 등급"
            subtitle="멤버십 등급을 선택해주세요"
            items={membershipItems}
            selectedItems={data.membershipGrade ? [data.membershipGrade] : []}
            onItemSelect={handleMembershipSelect}
            multiSelect={false}
            autoCloseOnSelect={true}
            height="medium"
          />
        </div>
      );

    case 3:
      return (
        <BrandGrid
          selectedBrands={data.recentBrands}
          onBrandToggle={
            disabled
              ? undefined
              : brandId => onToggleBrand(brandId, 'recentBrands')
          }
          title="최근 이용한 브랜드"
          disabled={disabled}
        />
      );

    case 4:
      return (
        <BrandGrid
          selectedBrands={data.selectedBrands}
          onBrandToggle={
            disabled
              ? undefined
              : brandId => onToggleBrand(brandId, 'selectedBrands')
          }
          title="관심있는 브랜드"
          disabled={disabled}
        />
      );

    default:
      return null;
  }
};
