import { useEffect, useRef } from 'react';

import { postNearbyStore } from '@barcode/api/nearbyStoreApi';
import { VisitConfirmModal } from '@barcode/components/VisitConfirmModal';

import { PrimaryButton } from '@/shared/components';
import { BarcodeCropModal } from '@/shared/components/bottom_navigation/barcode/BarcodeCropModal';
import { CroppedImg } from '@/shared/components/bottom_navigation/barcode/CroppedImg';
import { useImageCropStore, useModalStore } from '@/shared/store';
import { useUserStore } from '@/shared/store/useUserStore';

interface Props {
  onClose: () => void;
}

export const LoggedInBarcodeContent = ({ onClose }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { croppedImage, setImageSrc } = useImageCropStore();
  const openModal = useModalStore(state => state.openModal);
  const user = useUserStore();

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
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">{user.user?.userName} 멤버십</p>

      {croppedImage && <CroppedImg image={croppedImage} />}

      <PrimaryButton
        className="w-full"
        onClick={() => fileInputRef.current?.click()}
      >
        바코드 업로드 하기
      </PrimaryButton>

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
