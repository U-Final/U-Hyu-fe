import { PrimaryButton } from '@components/buttons/PrimaryButton';
import BaseModal from '@components/modals/BaseModal';

interface StoreDeleteModalProps {
  onConfirm: () => void;
}

export const StoreDeleteModal = ({ onConfirm }: StoreDeleteModalProps) => {
  return (
    <BaseModal title="매장 삭제">
      <div className='flex flex-col gap-5'>
        <p className="text-sm text-black">이 매장을 리스트에서 삭제합니다</p>
        <PrimaryButton onClick={onConfirm}>삭제</PrimaryButton>
      </div>
    </BaseModal>
  );
};
