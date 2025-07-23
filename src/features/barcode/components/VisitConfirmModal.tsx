import type { NearbyStore } from '@barcode/api/barcode.type';

import { BaseModal } from '@/shared/components';
import { useModalStore } from '@/shared/store';

interface Props {
  store: NearbyStore;
}

// 임시 UI

export const VisitConfirmModal = ({ store }: Props) => {
  const closeModal = useModalStore(state => state.closeModal);

  const handleVisitConfirm = () => {
    // 추후 방문 처리 API 연결
    alert(`${store.store_name} 방문 처리 완료`);
    closeModal();
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
        방문했어요
      </button>
    </BaseModal>
  );
};
