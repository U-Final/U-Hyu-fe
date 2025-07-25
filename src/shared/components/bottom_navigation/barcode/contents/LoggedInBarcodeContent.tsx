import { useEffect, useRef, useState } from 'react';

import type { NearbyStore } from '@barcode/api/barcode.type';
import { postNearbyStore } from '@barcode/api/nearbyStoreApi';
import VisitConfirmSection from '@barcode/components/VisitConfirmSection';
import { useBarcodeImageQuery } from '@barcode/hooks/useBarcodeImageQuery';
import { ImageUp } from 'lucide-react';

import { IconButton, PrimaryButton } from '@/shared/components';
import { BarcodeCropModal } from '@/shared/components/bottom_navigation/barcode/BarcodeCropModal';
import { CroppedImg } from '@/shared/components/bottom_navigation/barcode/CroppedImg';
import { useImageCropStore, useModalStore } from '@/shared/store';

export const LoggedInBarcodeContent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setImageSrc } = useImageCropStore();
  const openModal = useModalStore(state => state.openModal);
  const [store, setStore] = useState<NearbyStore | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const { data: imageUrl, isLoading, error } = useBarcodeImageQuery();

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
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          radius: 50,
        };
        try {
          const store = await postNearbyStore(coords);
          if (store) {
            setStore(store);
          }
        } catch (error) {
          console.error('근처 매장 검색 중 오류 발생', error);
        }
      },
      error => {
        console.error(
          '위치 정보를 가져올 수 없습니다. 위치 동의가 필요합니다.',
          error
        );
      }
    );
  }, []);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col w-full gap-4">
      {store && !isConfirmed && !isRejected && (
        <VisitConfirmSection
          store={store}
          onConfirm={() => setIsConfirmed(true)}
          onReject={() => setIsRejected(true)}
        />
      )}
      {imageUrl ? (
        <div className="w-full flex">
          <CroppedImg image={imageUrl} />
          <IconButton
            icon={<ImageUp size={16} />}
            className="hover:bg-gray-hover cursor-pointer"
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
