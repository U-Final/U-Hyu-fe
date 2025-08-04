import { useState } from 'react';

import { useRecommendExcludeMutation } from '@recommendation/hooks/useRecommendMutation';

import { useModalStore } from '@/shared/store';

interface ConfirmExcludeModalContentProps {
  brandId: number;
  brandName: string;
}

const ConfirmExcludeModalContent = ({
  brandId,
  brandName,
}: ConfirmExcludeModalContentProps) => {
  const { closeModal } = useModalStore();
  const { mutate: excludeStore } = useRecommendExcludeMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    excludeStore(brandId, {
      onSettled: () => {
        setIsLoading(false);
        closeModal();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-black">
        정말 <strong className="text-primary text-lg">{brandName}</strong>{' '}
        브랜드를 추천에서 제외하시겠습니까?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => closeModal()}
          className="px-4 py-2 bg-light-gray rounded hover:bg-gray-hover"
        >
          취소
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '확인'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmExcludeModalContent;
