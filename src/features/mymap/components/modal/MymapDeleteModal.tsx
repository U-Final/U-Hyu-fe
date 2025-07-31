import { useDeleteMyMapMutation } from '@mymap/hooks';
import { toast } from 'sonner';

import { BaseModal, PrimaryButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';

interface MymapDeleteModalProps {
  mapId: number;
  onConfirm?: () => void;
}

export const MymapDeleteModal = ({
  mapId,
  onConfirm,
}: MymapDeleteModalProps) => {
  const { mutate: deleteMyMap, isPending } = useDeleteMyMapMutation();

  const handleClick = () => {
    deleteMyMap(mapId, {
      onSuccess: () => {
        onConfirm?.();
        useModalStore.getState().closeModal();
        toast.success('My Map이 성공적으로 삭제되었습니다.');
      },
      onError: () => {
        toast.error('My Map 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <BaseModal title="My Map 삭제">
      <div className="flex flex-col gap-5">
        <p className="text-sm text-black">
          해당 My Map에 저장된 제휴처도 함께 사라져요
        </p>
        <PrimaryButton onClick={handleClick} disabled={isPending}>
          {isPending ? '삭제 중...' : '삭제'}
        </PrimaryButton>
      </div>
    </BaseModal>
  );
};
