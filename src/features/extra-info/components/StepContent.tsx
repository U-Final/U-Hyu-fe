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
        <div className="space-y-4">
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
                  : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
      );

    case 4:
      return (
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
      );

    default:
      return null;
  }
};
