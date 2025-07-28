import { useEffect, useRef, useState } from 'react';

import VisitConfirmSection from '@barcode/components/VisitConfirmSection';
import { useBarcodeImageQuery } from '@barcode/hooks/useBarcodeImageQuery';
import { useNearbyStoreQuery } from '@barcode/hooks/useNearbyStoreQuery';

import { PrimaryButton } from '@/shared/components';
import { BarcodeCropModal } from '@/shared/components/bottom_navigation/barcode/BarcodeCropModal';
import { CroppedImg } from '@/shared/components/bottom_navigation/barcode/CroppedImg';
import { useImageCropStore, useModalStore } from '@/shared/store';
import { useBarcodeStore } from '@/shared/store/barcodeStore';
import { isApiError } from '@/shared/utils/isApiError';

export const LoggedInBarcodeContent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setImageSrc } = useImageCropStore();
  const openModal = useModalStore(state => state.openModal);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const {
    data: serverImageUrl,
    isSuccess,
    isLoading,
    error,
  } = useBarcodeImageQuery();
  const { imageUrl, setImageUrl } = useBarcodeStore();

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

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (isSuccess && serverImageUrl) {
      setImageUrl(serverImageUrl);
    }
  }, [isSuccess, serverImageUrl, setImageUrl]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      err => {
        console.error('위치 정보를 가져올 수 없습니다.', err);
      }
    );
  }, []);

  const { data: store } = useNearbyStoreQuery(
    {
      lat: coords?.lat ?? 0,
      lon: coords?.lon ?? 0,
      radius: 100,
    },
    !!coords
  );

  if (isLoading) return <p>바코드 불러오는 중...</p>;

  if (error && isApiError(error)) {
    if (error.statusCode !== 4103) {
      return <p>{error.message}</p>;
    }
  }

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
          <CroppedImg imageUrl={imageUrl} onClick={triggerFileSelect} />
        </div>
      ) : (
        <PrimaryButton className="w-full" onClick={triggerFileSelect}>
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
