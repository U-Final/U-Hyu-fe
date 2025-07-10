import React from 'react';
import { NavButton } from '@shared/components/buttons/NavButton';
import { Input } from '@shared/components/shadcn/ui/input';
import { Label } from '@shared/components/shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/shadcn/ui/select';
import { BrandGrid } from './BrandGrid';
import { type SignupData } from '../types';
import { MEMBERSHIP_GRADES, EMAIL_REGEX } from '../constants';

interface StepContentProps {
  step: number;
  data: SignupData;
  onUpdateData: (updates: Partial<SignupData>) => void;
  onToggleBrand: (brandId: string, field: 'recentBrands' | 'selectedBrands') => void;
  disabled?: boolean;
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  data,
  onUpdateData,
  onToggleBrand,
  disabled = false,
}) => {
  const handleEmailVerification = () => {
    // 테스트용: 중복확인 완료 처리
    onUpdateData({ emailVerified: true });
  };

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
                    : (e) => onUpdateData({ email: e.target.value, emailVerified: false })
                }
                className="w-full h-12 bg-gray-50 border border-gray-300 rounded-md"
                placeholder="이메일 주소를 입력해주세요"
                disabled={disabled}
              />
              <NavButton
                disabled={disabled || !data.email || !EMAIL_REGEX.test(data.email)}
                onClick={handleEmailVerification}
                className={`px-4 h-12 text-white border-blue-400 hover:bg-blue-600 ${
                  data.emailVerified ? 'bg-green-500 border-green-500 hover:bg-green-600' : ''
                }`}
              >
                {data.emailVerified ? '확인완료' : '중복확인'}
              </NavButton>
            </div>
            <div className="min-h-[20px] mt-1 text-xs text-red-500 transition-all">
              {data.email !== '' && !EMAIL_REGEX.test(data.email) && !disabled ? (
                <span>올바른 이메일 형식을 입력해주세요</span>
              ) : (
                ''
              )}
            </div>
            {data.emailVerified && (
              <div className="mt-1 text-xs text-green-600">✓ 이메일 중복확인이 완료되었습니다</div>
            )}
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <Select
            value={data.membershipGrade}
            onValueChange={
              disabled ? undefined : (value) => onUpdateData({ membershipGrade: value })
            }
            disabled={disabled}
          >
            <SelectTrigger className="w-full h-12 bg-gray-50 rounded-md shadow-none border-0 focus:ring-0 focus:outline-none placeholder:text-gray-300">
              <SelectValue placeholder="LG U+ 멤버십 등급을 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="bg-white border-0 shadow-none rounded-md p-0">
              {MEMBERSHIP_GRADES.map((grade) => (
                <SelectItem
                  key={grade.value}
                  value={grade.value}
                  className="hover:bg-gray-100 focus:bg-gray-100 border-0 shadow-none px-4 py-2 text-sm pl-8"
                >
                  {grade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case 3:
      return (
        <BrandGrid
          selectedBrands={data.recentBrands}
          onBrandToggle={disabled ? undefined : (brandId) => onToggleBrand(brandId, 'recentBrands')}
          title="최근 이용한 브랜드"
          disabled={disabled}
        />
      );

    case 4:
      return (
        <BrandGrid
          selectedBrands={data.selectedBrands}
          onBrandToggle={
            disabled ? undefined : (brandId) => onToggleBrand(brandId, 'selectedBrands')
          }
          title="관심있는 브랜드"
          disabled={disabled}
        />
      );

    default:
      return null;
  }
};
