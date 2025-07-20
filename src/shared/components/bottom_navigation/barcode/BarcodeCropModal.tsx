import { useRef } from 'react';

import type { CropperRef } from 'react-advanced-cropper';

import { PrimaryButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';

import { useImageCropStore } from '../../../store/useImageCropStore';
import { BarcodeCropper } from './BarcodeCropper';

export function BarcodeCropModal() {
  const closeModal = useModalStore(state => state.closeModal);
  const cropperRef = useRef<CropperRef | null>(null);
  const { imageSrc, setImageSrc, setCroppedImage } = useImageCropStore();

  const handleCropConfirm = () => {
    const canvas = cropperRef.current?.getCanvas?.();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/jpeg');
    setCroppedImage(dataUrl);
    setImageSrc(null);
    closeModal();
  };

  if (!imageSrc) return <p>이미지를 불러오지 못했습니다.</p>;

  return (
    <section aria-label="바코드 자르기" className="space-y-4">
      <BarcodeCropper imageSrc={imageSrc} cropperRef={cropperRef} />
      <PrimaryButton className="w-full" onClick={handleCropConfirm}>
        완료
      </PrimaryButton>
    </section>
  );
}
