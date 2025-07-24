import type { NearbyStore } from '@barcode/api/barcode.type';
import { useVisitConfirmMutation } from '@barcode/hooks/useVisitConfirmMutation';

import { BaseModal } from '@/shared/components';
import { useModalStore } from '@/shared/store';

interface Props {
  store: NearbyStore;
}

// 임시 UI, 추후 ui 수정 예정

export const VisitConfirmModal = ({ store }: Props) => {
  const closeModal = useModalStore(state => state.closeModal);
  const { mutate: confirmVisit, isPending } = useVisitConfirmMutation();

  const handleVisitConfirm = () => {
    confirmVisit(store.store_id, {
      onSuccess: () => {
        alert(`${store.store_name} 방문 처리 완료`);
        closeModal();
      },
      onError: () => {
        alert('방문 처리 중 오류 발생');
      },
    });
  };

  return (
    <BaseModal title="이 매장을 방문하셨나요?">
      <div className="space-y-2">
        <p className="text-base font-semibold">{store.store_name}</p>
      </div>
      <button
        onClick={handleVisitConfirm}
        className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
      >
        {isPending ? '처리중 ..' : '방문 했어요!'}
      </button>
    </BaseModal>
  );
};
