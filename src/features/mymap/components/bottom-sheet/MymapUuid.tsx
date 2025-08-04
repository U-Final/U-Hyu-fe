import { useEffect, useState } from 'react';

import type { Store } from '@mymap/api/types';
import { ShareModal, StoreDeleteModal } from '@mymap/components';
import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapUuidGuestQuery, useMyMapUuidQuery } from '@mymap/hooks';
import { useSharedMapStore } from '@mymap/store/SharedMapStore';
import { MdIosShare, MdStars } from 'react-icons/md';
import { PiTrashBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { BrandCard } from '@/shared/components';
import { BackButton } from '@/shared/components';
import { SkeletonMyMapUuidItem } from '@/shared/components/skeleton';
import { useModalStore } from '@/shared/store';
import { useIsLoggedIn } from '@/shared/store/userStore';

interface MyMapUuidProps {
  uuid: string;
  onStoreClick?: (store: Store) => void;
}

const MyMapUuid = ({ uuid, onStoreClick }: MyMapUuidProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const resultAuth = useMyMapUuidQuery(uuid, isLoggedIn);
  const resultGuest = useMyMapUuidGuestQuery(uuid, !isLoggedIn);
  // console.log(`로그인상태: ${isLoggedIn}`);

  const data = isLoggedIn ? resultAuth.data : resultGuest.data;
  const isPending = isLoggedIn ? resultAuth.isPending : resultGuest.isPending;
  const isError = isLoggedIn ? resultAuth.isError : resultGuest.isError;

  const openModal = useModalStore(state => state.openModal);
  const { stores, title, markerColor, isMine, setSharedMap } =
    useSharedMapStore();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  useEffect(() => {
    if (data) {
      setSharedMap({
        uuid: data.uuid,
        isMine: data.isMine,
        myMapListId: data.myMapListId,
        markerColor: data.markerColor,
        stores: data.storeList,
        title: data.title,
      });
    }
  }, [data, setSharedMap]);

  // 매장 삭제 모달
  const handleDelete = (store_id: number) => {
    openModal('base', {
      title: '매장 삭제',
      children: <StoreDeleteModal uuid={uuid} store_id={store_id} />,
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
    <div className="divide-y divide-gray-100">
      <div className="grid grid-cols-[1fr_5fr_1fr] h-full px-6 py-4">
        <div></div>

        <div className="flex flex-col flex-8 justify-center items-center w-full gap-3 ">
          <div className="flex flex-row items-center gap-1">
            <MdStars
              className={`w-6 h-6 ${MYMAP_COLOR[markerColor as MarkerColor] || MYMAP_COLOR.RED}`}
            />
            <div className="text-h4 font-bold">{title}</div>
            {data && (
              <button
                className="flex flex-row items-center text-body2 text-black font-bold py-1.5  rounded-lg gap-2"
                onClick={e => {
                  e.stopPropagation();
                  handleShare(data.uuid);
                }}
              >
                <MdIosShare className="h-4 w-4 text-primary" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-start justify-end flex-1">
          <div className="flex justify-end items-start">
            {canGoBack && <BackButton onClick={() => navigate(-1)} />}
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="divide-y divide-gray-100 mt-4">
          {[...Array(7)].map((_, i) => (
            <SkeletonMyMapUuidItem key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-red-500 mt-4">에러 발생</div>
      ) : (
        <div className="divide-y divide-gray-100 mt-4 mb-13">
          {stores.map(store => (
            <div
              key={store.storeId}
              className=" hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                onStoreClick?.(store);
              }}
            >
              <BrandCard logoUrl={store.logoImage}>
                <div className="flex-1 min-w-0 ">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-black font-bold">
                      {store.storeName}
                    </div>
                    {isMine && (
                      <PiTrashBold
                        className="h-4 w-4 text-gray cursor-pointer"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(store.storeId);
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
      )}
    </div>
  );
};

export default MyMapUuid;
