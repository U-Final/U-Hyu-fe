import { PrimaryButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';
import { X } from 'lucide-react';
import { useRef, type FC } from 'react';
import { useImageCropStore } from '../../../store/useImageCropStore';
import { BarcodeCropModal } from './BarcodeCropModal';
import { CroppedImg } from './CroppedImg';

interface BarcodeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BarcodeBottomSheet: FC<BarcodeBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="바코드 업로드 바텀시트"
      className="fixed bottom-12 w-full z-10"
    >
      <div className="bg-white rounded-t-2xl shadow-2xl z-50 flex flex-col border border-light-gray p-4">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">OOO님 멤버십</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="cursor-pointer hover:bg-gray-200 rounded-md"
          >
            <X size={20} />
          </button>
        </header>
        <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
};
