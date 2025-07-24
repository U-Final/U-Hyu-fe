import { useEffect, useRef } from 'react';

import { postNearbyStore } from '@barcode/api/nearbyStoreApi';
import { VisitConfirmModal } from '@barcode/components/VisitConfirmModal';
import { ImageUp } from 'lucide-react';

import { IconButton, PrimaryButton } from '@/shared/components';
import { BarcodeCropModal } from '@/shared/components/bottom_navigation/barcode/BarcodeCropModal';
import { CroppedImg } from '@/shared/components/bottom_navigation/barcode/CroppedImg';
import { useImageCropStore, useModalStore } from '@/shared/store';

interface Props {
  onClose: () => void;
}

export const LoggedInBarcodeContent = ({ onClose }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { croppedImage, setImageSrc } = useImageCropStore();
  const openModal = useModalStore(state => state.openModal);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      openModal('base', {
        title: '바코드 자르기',
        children: <BarcodeCropModal />,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        radius: 50,
      };

      const store = await postNearbyStore(coords);
      if (store) {
        onClose();
        openModal('base', {
          children: <VisitConfirmModal store={store} />,
        });
      } else {
        console.log('근처에 방문 가능한 제휴 매장이 없습니다.');
      }
    });
  }, [onClose, openModal]);

  return (
    <div className="flex flex-col w-full">
      {croppedImage ? (
        <div className="relative w-full">
          <CroppedImg image={croppedImage} />
          <IconButton
            icon={<ImageUp size={16} />}
            className="absolute top-[-34.5px] right-9 hover:bg-gray-hover cursor-pointer"
            onClick={handleUploadClick}
            aria-label="바코드 이미지 재업로드"
          />
        </div>
      ) : (
        <PrimaryButton
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          바코드 업로드 하기
        </PrimaryButton>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};
