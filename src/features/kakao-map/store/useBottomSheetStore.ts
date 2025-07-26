// stores/useBottomSheetStore.ts
import { create } from 'zustand';

type Step = 'collapsed' | 'half' | 'full';

interface BottomSheetState {
  isOpen: boolean;
  step: Step;
  isExplicitlyClosed: boolean;
  open: (step?: Step) => void;
  close: () => void;
  setExplicitlyClosed: (v: boolean) => void;
  setStep: (step: Step) => void;
}

const useBottomSheetStore = create<BottomSheetState>(set => ({
  isOpen: false,
  step: 'collapsed',
  isExplicitlyClosed: false,

  open: (step = 'half') =>
    set({ isOpen: true, step, isExplicitlyClosed: false }),

  close: () => set({ isOpen: false, isExplicitlyClosed: true }),

  setExplicitlyClosed: value => set({ isExplicitlyClosed: value }),

  setStep: step => set({ step }),
}));

export default useBottomSheetStore;
