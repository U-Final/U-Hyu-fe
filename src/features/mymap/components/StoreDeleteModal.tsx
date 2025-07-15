import BaseModal from "@components/modals/BaseModal";
import { PrimaryButton } from "@extra-info/components/PrimaryButton";

interface StoreDeleteModalProps {
  onConfirm: () => void;
}

export const StoreDeleteModal = ({ onConfirm }: StoreDeleteModalProps) => {
  return (
    <BaseModal title="매장 삭제">
      <p className="text-sm text-black">이 매장을 리스트에서 삭제합니다</p>
      <div className="mt-4 flex justify-end gap-2">
        <PrimaryButton onClick={onConfirm}>삭제</PrimaryButton>
      </div>
    </BaseModal>
  );
};
