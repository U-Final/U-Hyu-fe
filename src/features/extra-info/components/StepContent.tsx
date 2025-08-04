import React, { useState } from 'react';

import { ApiBrandGrid, SelectionBottomSheet } from '@/shared/components';
import { Label } from '@/shared/components/shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn/ui/select';

import { MEMBERSHIP_GRADES } from '../constants';
import { type StepContentProps } from '../types';

export const StepContent: React.FC<StepContentProps> = ({
  step,
  data,
  onUpdateData,
  onToggleBrand,
  disabled = false,
}) => {
  const [isMembershipSheetOpen, setIsMembershipSheetOpen] = useState(false);
  const [isGenderSheetOpen, setIsGenderSheetOpen] = useState(false);

  // 나이 옵션 생성 (20세부터 80세까지)
  const ageOptions = Array.from({ length: 61 }, (_, i) => ({
    value: (10 + i).toString(),
    label: `${10 + i}세`,
  }));

  const genderOptions = [
    { value: 'MALE', label: '남성' },
    { value: 'FEMALE', label: '여성' },
    { value: 'OTHER', label: '기타' },
  ];

  const getSelectedGenderLabel = () => {
    const selected = genderOptions.find(option => option.value === data.gender);
    return selected?.label || '성별을 선택해주세요';
  };

  const handleMembershipSelect = (value: string) => {
    onUpdateData({ membershipGrade: value });
    setIsMembershipSheetOpen(false);
  };

  const handleGenderSelect = (value: string) => {
    onUpdateData({ gender: value });
    setIsGenderSheetOpen(false);
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

  const genderItems = genderOptions.map(option => ({
    id: option.value,
    label: option.label,
    description: '',
    isDisabled: false,
  }));

  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-primary-900 mb-2">
              맞춤 혜택을 위한 기본 정보
            </h3>
            <p className="text-xs text-primary-700 leading-relaxed">
              나이와 성별 정보를 통해 회원님의 라이프스타일에 맞는 매장과 혜택을
              우선적으로 추천해드려요!
            </p>
          </div>

          <div>
            <Label className="text-sm text-gray-600">나이</Label>
            <Select
              value={data.age ? data.age.toString() : ''}
              onValueChange={value => onUpdateData({ age: parseInt(value) })}
              disabled={disabled}
            >
              <SelectTrigger className="w-full h-12 bg-gray-50 border border-gray-300 rounded-md mt-2">
                <SelectValue placeholder="나이를 선택해주세요 (만 나이 기준)" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {ageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-gray-600">성별</Label>
            <button
              onClick={() => !disabled && setIsGenderSheetOpen(true)}
              disabled={disabled}
              className={`w-full h-12 bg-gray-50 rounded-md border border-gray-300 px-4 text-left transition-all mt-2 ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary'
              }`}
            >
              <span className={data.gender ? 'text-gray-900' : 'text-gray-500'}>
                {getSelectedGenderLabel()}
              </span>
            </button>

            <SelectionBottomSheet
              isOpen={isGenderSheetOpen}
              onClose={() => setIsGenderSheetOpen(false)}
              title="성별 선택"
              subtitle="성별을 선택해주세요"
              items={genderItems}
              selectedItems={data.gender ? [data.gender] : []}
              onItemSelect={handleGenderSelect}
              multiSelect={false}
              autoCloseOnSelect={true}
              height="medium"
            />
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-primary-900 mb-2">
              멤버십 등급별 특별 혜택
            </h3>
            <p className="text-xs text-primary-700 leading-relaxed">
              LG U+ 멤버십 등급을 알려주시면 등급에 맞는 특별 할인과 포인트 적립
              혜택을 제공해드려요!
            </p>
          </div>

          <div>
            <Label className="text-sm text-gray-600">LG U+ 멤버십 등급</Label>
            <button
              onClick={() => !disabled && setIsMembershipSheetOpen(true)}
              disabled={disabled}
              className={`w-full h-12 bg-gray-50 rounded-md border border-gray-300 px-4 text-left transition-all mt-2 ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary'
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
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-primary-900 mb-2">
              자주 이용하는 브랜드 맞춤 추천
            </h3>
            <p className="text-xs text-primary-700 leading-relaxed">
              최근 이용한 브랜드를 선택하시면 비슷한 스타일의 매장과 연관
              브랜드의 할인 정보를 우선적으로 알려드려요!
            </p>
          </div>

          <ApiBrandGrid
            selectedBrands={data.recentBrands}
            onBrandToggle={
              disabled
                ? undefined
                : brandId => onToggleBrand(brandId, 'recentBrands')
            }
            title="최근 이용한 브랜드"
            disabled={disabled}
          />
        </div>
      );

    case 4:
      return (
        <div className="space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-primary-900 mb-2">
              관심 브랜드 신상품 & 할인 알림
            </h3>
            <p className="text-xs text-primary-700 leading-relaxed">
              관심있는 브랜드를 선택하시면 신상품 출시와 특별 할인 이벤트를 가장
              먼저 알려드려요!
            </p>
          </div>

          <ApiBrandGrid
            selectedBrands={data.selectedBrands}
            onBrandToggle={
              disabled
                ? undefined
                : brandId => onToggleBrand(brandId, 'selectedBrands')
            }
            title="관심있는 브랜드"
            disabled={disabled}
          />
        </div>
      );

    default:
      return null;
  }
};
