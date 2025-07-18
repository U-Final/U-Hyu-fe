import { BaseModal, PrimaryButton } from '@/shared/components';

interface MymapDeleteModalProps {
  onConfirm: () => void;
}

export const MymapDeleteModal = ({ onConfirm }: MymapDeleteModalProps) => {
  return (
    <BaseModal title="My Map 삭제">
      <div className="flex flex-col gap-5">
        <p className="text-sm text-black">
          해당 My Map에 저장된 제휴처도 함께 사라져요
        </p>
        <PrimaryButton onClick={onConfirm}>삭제</PrimaryButton>
      </div>
    </BaseModal>
  );
};
