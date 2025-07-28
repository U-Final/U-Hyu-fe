import { useRef } from 'react';

import { useBarcodeImageQuery } from '@barcode/hooks/useBarcodeImageQuery';
import {
  usePatchBarcodeImageMutation,
  useUploadBarcodeMutation,
} from '@barcode/hooks/useUploadBarcodeMutation';
import { useBarcodeStore } from '@barcode/store/barcodeStore';
import type { CropperRef } from 'react-advanced-cropper';

import { PrimaryButton } from '@/shared/components';
import { useImageCropStore, useModalStore } from '@/shared/store';
import { isApiError } from '@/shared/utils/isApiError';

import { BarcodeCropper } from './BarcodeCropper';

export function BarcodeCropModal() {
  const closeModal = useModalStore(state => state.closeModal);
  const cropperRef = useRef<CropperRef | null>(null);
  const { imageSrc, setImageSrc, setCroppedImage } = useImageCropStore();
  const { setImageUrl } = useBarcodeStore();
  const { data: imageUrl, isLoading, error } = useBarcodeImageQuery(); //기존에 업로드된 이미지 인데 만약에 없으면?

  const { mutate: uploadBarcodeImage } = useUploadBarcodeMutation();
  const { mutate: patchBarcodeImage } = usePatchBarcodeImageMutation();

  const isInitialUpload = imageUrl == null; // 바코드 최초 업로드로 판단.

  const handleCropConfirm = () => {
    const canvas = cropperRef.current?.getCanvas?.();
    if (!canvas) return;

    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], 'barcode.jpg', { type: 'image/jpeg' });

      const onSuccess = (newImageUrl: string) => {
        setCroppedImage(newImageUrl);
        setImageUrl(newImageUrl);
        setImageSrc(null);
        closeModal();
      };

      const onError = () => {
        alert('이미지 업로드 실패');
      };

      if (isInitialUpload) {
        uploadBarcodeImage(file, { onSuccess, onError });
      } else {
        patchBarcodeImage(file, { onSuccess, onError });
      }
    }, 'image/jpeg');
  };

  if (!imageSrc) return <p>이미지를 불러오지 못했습니다.</p>;
  if (isLoading) return <p>불러오는 중...</p>;
  if (error && isApiError(error)) {
    if (error.statusCode !== 4103) {
      return <p>{error.message}</p>;
    }
  }
  return (
    <section aria-label="바코드 자르기" className="space-y-4">
      <BarcodeCropper imageSrc={imageSrc} cropperRef={cropperRef} />
      <PrimaryButton className="w-full" onClick={handleCropConfirm}>
        완료
      </PrimaryButton>
    </section>
  );
}
