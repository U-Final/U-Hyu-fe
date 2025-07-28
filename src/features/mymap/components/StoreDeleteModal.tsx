import { useToggleMyMapStoreMutation } from '@mymap/hooks/useToggleMyMapStoreMutation';
import { useSharedMapStore } from '@mymap/store/SharedMapStore';

import { BaseModal, PrimaryButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';

interface StoreDeleteModalProps {
  store_id: number;
  uuid: string;
}

export const StoreDeleteModal = ({ store_id, uuid }: StoreDeleteModalProps) => {
  const { myMapListId } = useSharedMapStore();
  const toggleMutation = useToggleMyMapStoreMutation(uuid);
  const closeModal = useModalStore(state => state.closeModal);

  const handleConfirm = () => {
    if (!myMapListId) return;
    toggleMutation.mutate(
      { myMapListId, store_id },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };
  return (
    <BaseModal title="매장 삭제">
      <div className="flex flex-col gap-5">
        <p className="text-sm text-black">이 매장을 리스트에서 삭제합니다</p>
        <PrimaryButton onClick={handleConfirm}>삭제</PrimaryButton>
      </div>
    </BaseModal>
  );
};
