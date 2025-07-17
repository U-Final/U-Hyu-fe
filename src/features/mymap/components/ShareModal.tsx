import BaseModal from '@components/modals/BaseModal';

export const ShareModal = () => {
  return (
    <BaseModal title="My Map 공유">
      <p className="text-sm text-black">
        클립보드로 복사되었습니다.
      </p>
    </BaseModal>
  );
};
