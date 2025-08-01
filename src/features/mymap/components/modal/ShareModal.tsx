import { useState } from 'react';



import { useKakaoShare } from '@mymap/hooks';
import { toast } from 'sonner';



import { BaseModal } from '@/shared/components';
import { useModalStore } from '@/shared/store';





interface ShareModalProps {
  uuid: string;
}

export const ShareModal = ({ uuid }: ShareModalProps) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const closeModal = useModalStore(state => state.closeModal);
  const shareToKakao = useKakaoShare();
  const shareUrl = `${location.origin}/map/${uuid}`;

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          setCopyStatus('success');
          toast.success('클립보드에 링크가 복사되었습니다.');
        })
        .catch(err => {
          setCopyStatus('error');
          toast.error('링크 복사 중 오류가 발생했습니다.');
          console.error('클립보드 복사 실패:', err);
        });
    } else {
      setCopyStatus('error');
      toast.error('클립보드 API가 지원되지 않습니다.');
      console.error('클립보드 API가 지원되지 않습니다');
    }
  };

  const handleKakaoShare = () => {
    shareToKakao(shareUrl);
    closeModal();
  };

  return (
    <BaseModal title="My Map 공유">
      <div className="flex gap-10 justify-center items-center m-5">
        <button
          className="flex flex-col items-center justify-center gap-2"
          onClick={handleKakaoShare}
        >
          <img
            src="/images/share/kakao.png"
            alt="카카오톡 공유"
            className="w-16 h-16"
          />
          <p className="text-sm font-bold">카카오톡</p>
        </button>
        <button
          className="flex flex-col items-center justify-center gap-2"
          onClick={handleCopy}
        >
          <img
            src="/images/share/url.png"
            alt="URL 복사"
            className="w-16 h-16"
          />
          <p className="text-sm font-bold">URL 복사</p>
        </button>
      </div>
      {copyStatus === 'success' && (
        <p className="text-center font-bold text-green mt-2">
          URL이 복사되었습니다!
        </p>
      )}
      {copyStatus === 'error' && (
        <p className="text-center font-bold text-red mt-2">복사 실패</p>
      )}
    </BaseModal>
  );
};