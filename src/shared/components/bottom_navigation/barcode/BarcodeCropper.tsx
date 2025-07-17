import type { FC } from 'react';
import { Cropper, type CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

interface BarcodeCropperProps {
  imageSrc: string;
  cropperRef: React.RefObject<CropperRef | null>;
}

export const BarcodeCropper: FC<BarcodeCropperProps> = ({
  imageSrc,
  cropperRef,
}) => {
  return (
    <div aria-label="바코드 이미지 자르기 영역" className="relative w-full h-120">
      <Cropper
        ref={cropperRef}
        src={imageSrc}
        stencilProps={{ resizable: true, movable: true }}
        className="h-full w-full border"
      />
    </div>
  );
};
