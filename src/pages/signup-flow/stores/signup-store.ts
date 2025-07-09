import { create } from 'zustand';
import type { SignupData } from '../types';

interface SignupState extends SignupData {
  currentStep: number;
  direction: number;
}

interface SignupActions {
  // 네비게이션
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number, direction?: number) => void;

  // 상태 업데이트
  setMembershipGrade: (grade: string) => void;
  toggleRecentBrand: (brandId: string) => void;
  toggleSelectedBrand: (brandId: string) => void;
  setEmail: (email: string) => void;

  // 유틸리티
  reset: () => void;
  canGoNext: () => boolean;
  canGoBack: () => boolean;
}

type SignupStore = SignupState & SignupActions;

const initialState: SignupState = {
  currentStep: 1,
  direction: 1,
  membershipGrade: '',
  recentBrands: [],
  selectedBrands: [],
  email: 'example@gmail.com',
};

export const useSignupStore = create<SignupStore>((set, get) => ({
  // 초기 상태
  ...initialState,

  // 네비게이션 액션
  nextStep: () => {
    const state = get();
    if (state.canGoNext() && state.currentStep < 5) {
      set({
        currentStep: state.currentStep + 1,
        direction: 1,
      });
    }
  },

  prevStep: () => {
    const state = get();
    if (state.canGoBack()) {
      set({
        currentStep: state.currentStep - 1,
        direction: -1,
      });
    }
  },

  setStep: (step: number, direction = 1) => {
    set({ currentStep: step, direction });
  },

  // 상태 업데이트 액션
  setMembershipGrade: (grade: string) => {
    set({ membershipGrade: grade });
  },

  toggleRecentBrand: (brandId: string) => {
    set((state) => ({
      recentBrands: state.recentBrands.includes(brandId)
        ? state.recentBrands.filter((id) => id !== brandId)
        : [...state.recentBrands, brandId],
    }));
  },

  toggleSelectedBrand: (brandId: string) => {
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brandId)
        ? state.selectedBrands.filter((id) => id !== brandId)
        : [...state.selectedBrands, brandId],
    }));
  },

  setEmail: (email: string) => {
    set({ email });
  },

  // 유틸리티 함수
  reset: () => {
    set(initialState);
  },

  canGoNext: () => {
    const state = get();
    switch (state.currentStep) {
      case 1:
        return state.membershipGrade !== '';
      case 2:
        return state.recentBrands.length > 0;
      case 3:
        return state.selectedBrands.length > 0;
      case 4:
        return state.email !== '' && state.email.includes('@');
      case 5:
        return false; // 마지막 단계
      default:
        return false;
    }
  },

  canGoBack: () => {
    const state = get();
    return state.currentStep > 1;
  },
}));
