import { create } from 'zustand';

interface BarcodeState {
  imageUrl: string | null;
  isOpen: boolean;
  setImageUrl: (url: string) => void;
  open: () => void;
  close: () => void;
}

export const useBarcodeStore = create<BarcodeState>(set => ({
  imageUrl: null,
  isOpen: false,
  setImageUrl: url => set({ imageUrl: url }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
