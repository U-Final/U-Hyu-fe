import { useDeleteMyMapMutation } from '@mymap/hooks';

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
