import { useEffect, useState } from 'react';

import { BaseModal } from '@/shared/components';

interface ShareModalProps {
  uuid: string;
}

export const ShareModal = ({ uuid }: ShareModalProps) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );

  useEffect(() => {
    if (uuid) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(uuid)
          .then(() => {
            setCopyStatus('success');
            console.log('클립보드 복사 성공:', uuid);
          })
          .catch(err => {
            setCopyStatus('error');
            console.error('클립보드 복사 실패:', err);
          });
      } else {
        setCopyStatus('error');
        console.error('클립보드 API가 지원되지 않습니다');
      }
    }
  }, [uuid]);

  return (
    <BaseModal title="My Map 공유">
      <p className="text-sm text-black">
        {copyStatus === 'success' && '클립보드로 복사되었습니다.'}
        {copyStatus === 'error' && '복사에 실패했습니다. 다시 시도해주세요.'}
        {copyStatus === 'idle' && '복사 중...'}
      </p>
    </BaseModal>
  );
};
