import BaseModal from "@components/modals/BaseModal";
import { PrimaryButton } from "@extra-info/components/PrimaryButton";

interface MymapDeleteModalProps {
  onConfirm: () => void;
}

export const MymapDeleteModal = ({ onConfirm }: MymapDeleteModalProps) => {
  return (
    <BaseModal title="My Map 삭제">
      <p className="text-sm text-black">
        해당 My Map에 저장된 제휴처도 함께 사라져요
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <PrimaryButton onClick={onConfirm}>삭제</PrimaryButton>
      </div>
    </BaseModal>
  );
};
