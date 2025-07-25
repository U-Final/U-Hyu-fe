import { useRef } from 'react';

import { useBarcodeImageQuery } from '@barcode/hooks/useBarcodeImageQuery';
import {
  usePatchBarcodeImageMutation,
  useUploadBarcodeMutation,
} from '@barcode/hooks/useUploadBarcodeMutation';
import type { CropperRef } from 'react-advanced-cropper';

import { PrimaryButton } from '@/shared/components';
import { useImageCropStore, useModalStore } from '@/shared/store';

import { BarcodeCropper } from './BarcodeCropper';

export function BarcodeCropModal() {
  const closeModal = useModalStore(state => state.closeModal);
  const cropperRef = useRef<CropperRef | null>(null);
  const { imageSrc, setImageSrc, setCroppedImage } = useImageCropStore();

  const { mutate: uploadBarcodeImage } = useUploadBarcodeMutation();
  const { mutate: patchBarcodeImage } = usePatchBarcodeImageMutation();

  const { data: imageUrl } = useBarcodeImageQuery();

  const handleCropConfirm = () => {
    const canvas = cropperRef.current?.getCanvas?.();
    if (!canvas) return;

    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], 'barcode.jpg', { type: 'image/jpeg' });

      const hasUploadedBefore = !!imageUrl;

      const onSuccess = (newImageUrl: string) => {
        setCroppedImage(newImageUrl);
        setImageSrc(null);
        closeModal();
      };

      const onError = () => {
        alert('이미지 업로드 실패');
      };

      if (hasUploadedBefore) {
        patchBarcodeImage(file, { onSuccess, onError });
      } else {
        uploadBarcodeImage(file, { onSuccess, onError });
      }
    }, 'image/jpeg');
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
