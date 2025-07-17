import { create } from 'zustand';

interface ImageCropState {
  imageSrc: string | null;
  setImageSrc: (src: string | null) => void;

  croppedImage: string | null;
  setCroppedImage: (src: string | null) => void;

  resetCrop: () => void;
}

export const useImageCropStore = create<ImageCropState>(set => ({
  imageSrc: null,
  setImageSrc: src => set({ imageSrc: src }),

  croppedImage: null,
  setCroppedImage: src => set({ croppedImage: src }),

  resetCrop: () => set({ imageSrc: null, croppedImage: null }),
}));