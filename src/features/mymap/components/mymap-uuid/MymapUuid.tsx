import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapUuidQuery } from '@mymap/hooks/useMyMapUuidQuery';
import { MdIosShare, MdStars } from 'react-icons/md';
import { PiTrashBold } from 'react-icons/pi';

import { BrandCard } from '@/shared/components';
import { useModalStore } from '@/shared/store';

import { ShareModal } from '../ShareModal';
import { StoreDeleteModal } from '../StoreDeleteModal';

interface MyMapUuidProps {
  uuid: string;
}

const MyMapUuid = ({ uuid }: MyMapUuidProps) => {
  const { data, isLoading, isError } = useMyMapUuidQuery(uuid);
  const openModal = useModalStore(state => state.openModal);
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  const stores = data.storeList ?? [];

  // 매장 삭제 모달
  const handleDelete = (myMapListId: number, store_id: number) => {
    openModal('base', {
      title: '매장 삭제',
      children: (
        <StoreDeleteModal
          uuid={uuid}
          myMapListId={myMapListId}
          store_id={store_id}
        />
      ),
    });
  };

  // 공유 모달
  const handleShare = (uuid: string) => {
    openModal('base', {
      title: 'My Map 공유',
      children: <ShareModal uuid={uuid} />,
    });
  };

  return (
    <div className="divide-y divide-gray-100 mt-4">
      <div className="flex flex-col justify-center items-center w-full p-5 gap-3">
        <div className="flex flex-row items-center gap-1">
          <MdStars
            className={`w-6 h-6 ${MYMAP_COLOR[data.markerColor as MarkerColor] || MYMAP_COLOR.RED}`}
          />
          <div className="text-h4 font-bold">{data.title}</div>
        </div>
        <button
          className="flex flex-row items-center text-body2 text-black font-bold bg-light-gray py-1.5 px-3 rounded-lg gap-2"
          onClick={e => {
            e.stopPropagation();
            handleShare(data.uuid);
          }}
        >
          <MdIosShare className="h-4 w-4" />
          공유
        </button>
      </div>

      <div className="divide-y divide-gray-100 mt-4">
        {stores.map(store => (
          <div
            key={store.storeId}
            className=" hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <BrandCard logoUrl={store.logo_image}>
              <div className="flex-1 min-w-0 ">
                <div className="flex flex-row items-center justify-between">
                  <div className="text-black font-bold">{store.storeName}</div>
                  {data.isMine && (
                    <PiTrashBold
                      className="h-4 w-4 text-gray cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(data.myMapListId, store.storeId);
                      }}
                    />
                  )}
                </div>
                <div className="text-xs text-secondary font-bold mt-1 truncate">
                  {store.addressDetail}
                </div>
                <div className="text-xs text-red font-bold mt-1">
                  {store.benefit}
                </div>
              </div>
            </BrandCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMapUuid;
