import { useEffect } from 'react';

import { BaseModal } from '@/shared/components';

interface ShareModalProps {
  uuid: string;
}

export const ShareModal = ({ uuid }: ShareModalProps) => {
  useEffect(() => {
    if (uuid) {
      navigator.clipboard
        .writeText(uuid)
        .then(() => {
          console.log('클립보드 복사 성공:', uuid);
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
        });
    }
  }, [uuid]);

  return (
    <BaseModal title="My Map 공유">
      <p className="text-sm text-black">클립보드로 복사되었습니다.</p>
    </BaseModal>
  );
};
