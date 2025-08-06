import type { FC } from 'react';

import {
  MyMapFormModal,
  MymapDeleteModal,
  ShareModal,
} from '@mymap/components';
import { type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapListQuery } from '@mymap/hooks';
import { useNavigate } from 'react-router-dom';

import { GhostButton } from '@/shared/components';
import { SkeletonMyMapItem } from '@/shared/components/skeleton';
import { useModalStore } from '@/shared/store';

import { MymapCard } from './MymapCard';

const MyMapBody: FC = () => {
  const navigate = useNavigate();
  const { data, isPending, isError } = useMyMapListQuery();
  const openModal = useModalStore(state => state.openModal);

  const handleCreate = () => {
    openModal('base', {
      title: '새 지도 만들기',
      children: <MyMapFormModal mode="create" />,
    });
  };

  const handleDelete = (mapId: number) => {
    openModal('base', {
      title: 'My Map 삭제',
      children: <MymapDeleteModal mapId={mapId} />,
    });
  };

  const handleShare = (uuid: string) => {
    openModal('base', {
      title: 'My Map 공유',
      children: <ShareModal uuid={uuid} />,
    });
  };

  const handleUpdate = (
    myMapListId: number,
    myMapTitle: string,
    color: string
  ) => {
    openModal('base', {
      title: '수정',
      children: (
        <MyMapFormModal
          mode="edit"
          myMapListId={myMapListId}
          defaultTitle={myMapTitle}
          defaultColor={color as MarkerColor}
        />
      ),
    });
  };

  const handleNavigateToMap = () => {
    navigate('/map');
  };

  const myMapList = data ?? [];
  const showEmptyCard = myMapList.length === 0;

  return (
    <div className="flex flex-col w-full mx-auto">
      {isPending ? (
        <div className="flex flex-col gap-2 mt-4 mb-7">
          {[...Array(10)].map((_, i) => (
            <SkeletonMyMapItem key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-red-500 mt-4">에러 발생</div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div
              className={`${
                showEmptyCard
                  ? 'flex justify-center'
                  : 'flex overflow-x-auto scroll-smooth'
              } gap-4 px-4 py-4 items-center`}
            >
              {myMapList.map(map => (
                <MymapCard
                  key={map.myMapListId}
                  title={map.title}
                  uuid={map.uuid}
                  markerColor={map.markerColor as MarkerColor}
                  onUpdate={() =>
                    handleUpdate(map.myMapListId, map.title, map.markerColor)
                  }
                  onDelete={() => handleDelete(map.myMapListId)}
                  onShare={() => handleShare(map.uuid)}
                />
              ))}
              <div
                onClick={handleCreate}
                className="w-[216px] h-[296px] rounded-4xl bg-white border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold cursor-pointer shrink-0"
              >
                + 새 폴더 만들기
              </div>
            </div>
            {!showEmptyCard && (
              <p className="flex text-gray justify-center text-sm">
                아이콘을 누르면 해당 My Map 폴더로 이동해요
              </p>
            )}
          </div>

          <GhostButton size="lg" onClick={handleCreate}>
            폴더 생성하기
          </GhostButton>
          <GhostButton size="lg" onClick={handleNavigateToMap}>
            폴더에 매장 추가하러가기
          </GhostButton>
        </div>
      )}
    </div>
  );
};

export default MyMapBody;
