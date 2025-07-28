import { create } from 'zustand';

interface BarcodeState {
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
}

export const useBarcodeStore = create<BarcodeState>(set => ({
  imageUrl: null,
  setImageUrl: url => set({ imageUrl: url }),
}));
