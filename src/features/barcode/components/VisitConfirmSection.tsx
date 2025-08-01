import { useVisitConfirmMutation } from '@barcode/hooks/useVisitConfirmMutation';
import type { StoreSummary } from '@kakao-map/api/types';

import { GhostButton, PrimaryButton } from '@/shared/components';

interface StoreProps {
  store: StoreSummary;
  onConfirm: () => void;
  onReject: () => void;
}

const VisitConfirmSection = ({ store, onConfirm, onReject }: StoreProps) => {
  const { mutate: confirmVisit, isPending } = useVisitConfirmMutation();

  const handleVisitConfirm = () => {
    confirmVisit(store.storeId, {
      onSuccess: () => {
        console.log(`${store.storeName} 방문 처리 완료`);
        onConfirm();
      },
      onError: () => {
        alert('방문 처리 중 오류 발생');
      },
    });
  };
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-md">
          <span className="text-lg font-bold">{store.storeName} </span>
          매장을 방문하셨나요?
        </p>
      </div>
      <div className="flex gap-4">
        <GhostButton size="sm" onClick={onReject}>
          아니요
        </GhostButton>
        <PrimaryButton
          size="sm"
          className="w-fit"
          onClick={handleVisitConfirm}
          disabled={isPending}
        >
          {isPending ? '처리중 ..' : '확인'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default VisitConfirmSection;
