import type { FC } from 'react';

import {
  AddMyMapButton,
  MyMapFormModal,
  MymapDeleteModal,
  ShareModal,
} from '@mymap/components';
import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapListQuery } from '@mymap/hooks';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import { MdIosShare } from 'react-icons/md';
import { PiTrashBold } from 'react-icons/pi';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { SkeletonMyMapItem } from '@/shared/components/Skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';
import { useModalStore } from '@/shared/store';

const MyMapBody: FC = () => {
  const { data, isPending, isError } = useMyMapListQuery();
  const openModal = useModalStore(state => state.openModal);
  const navigate = useNavigate();

  // 삭제 모달
  const handleDelete = (mapId: number) => {
    openModal('base', {
      title: 'My Map 삭제',
      children: <MymapDeleteModal mapId={mapId} />,
    });
  };

  // 공유 모달
  const handleShare = (uuid: string) => {
    openModal('base', {
      title: 'My Map 공유',
      children: <ShareModal uuid={uuid} />,
    });
  };

  // 수정 모달
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

  // 생성 모달
  const handleCreate = () => {
    openModal('base', {
      title: '새 지도 만들기',
      children: <MyMapFormModal mode="create" />,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto divide-y divide-gray-200">
      {/* 새 지도 만들기 */}
      <AddMyMapButton onCreateNewMap={handleCreate} />

      {/* map 리스트 */}
      {isPending ? (
        <div className="flex flex-col gap-2 mt-4">
          {[...Array(10)].map((_, i) => (
            <SkeletonMyMapItem key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-red-500 mt-4">에러 발생</div>
      ) : !data || data.length === 0 ? (
        <div className="flex text-sm text-gray-400 mt-4">
          새 지도를 만들어주세요
        </div>
      ) : (
        data.map(map => (
          <div
            key={map.myMapListId}
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-light-gray-hover rounded "
          >
            <div
              className="flex flex-9 items-center"
              onClick={() => navigate(`/map/${map.uuid}`)}
            >
              <MdStars
                className={`w-5 h-5 ${MYMAP_COLOR[map.markerColor as MarkerColor] || MYMAP_COLOR.RED}`}
              />
              <span className="ml-2 text-body2 font-semibold">{map.title}</span>
            </div>

            {/* 수정, 삭제, 공유 드롭다운 버튼 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <BsThreeDotsVertical className="flex-1 w-4 h-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-36 divide-gray-200 bg-white border-none"
              >
                <DropdownMenuItem
                  onClick={() => {
                    handleUpdate(map.myMapListId, map.title, map.markerColor);
                  }}
                  className="flex justify-between font-medium cursor-pointer "
                >
                  수정
                  <RiPencilFill className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
                <hr />
                <DropdownMenuItem
                  onClick={e => {
                    e.stopPropagation();
                    handleShare(map.uuid);
                  }}
                  className="flex justify-between font-medium cursor-pointer "
                >
                  공유
                  <MdIosShare className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
                <hr />
                <DropdownMenuItem
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(map.myMapListId);
                  }}
                  className="flex justify-between font-medium cursor-pointer "
                >
                  삭제
                  <PiTrashBold className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      )}
    </div>
  );
};

export default MyMapBody;
