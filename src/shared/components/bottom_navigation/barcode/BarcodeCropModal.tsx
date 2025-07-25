import { useRef } from 'react';

import { useUploadBarcodeMutation } from '@barcode/hooks/useUploadBarcodeMutation';
import type { CropperRef } from 'react-advanced-cropper';

import { PrimaryButton } from '@/shared/components';
import { useImageCropStore, useModalStore } from '@/shared/store';

import { BarcodeCropper } from './BarcodeCropper';

// 추후 필요없는 코드 삭제 예정

export function BarcodeCropModal() {
  const closeModal = useModalStore(state => state.closeModal);
  const cropperRef = useRef<CropperRef | null>(null);
  const { imageSrc, setImageSrc, setCroppedImage } = useImageCropStore();

  const { mutate: uploadBarcodeImage } = useUploadBarcodeMutation();

  const handleCropConfirm = () => {
    const canvas = cropperRef.current?.getCanvas?.();
    if (!canvas) return;

    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], 'barcode.jpg', { type: 'image/jpeg' });

      uploadBarcodeImage(file, {
        onSuccess: imageUrl => {
          console.log('✅ 업로드 성공 URL:', imageUrl);
          setCroppedImage(imageUrl);
          setImageSrc(null);
          closeModal();
        },
        onError: () => {
          alert('이미지 업로드 실패');
        },
      });
    }, 'image/jpeg');

    // const dataUrl = canvas.toDataURL('image/jpeg');
    // setCroppedImage(dataUrl);
    // setImageSrc(null);
    // closeModal();
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
