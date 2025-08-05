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
import { FiPlusCircle } from 'react-icons/fi';
import { MdStars } from 'react-icons/md';
import { MdIosShare } from 'react-icons/md';
import { PiTrashBold } from 'react-icons/pi';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';
import { SkeletonMyMapItem } from '@/shared/components/skeleton';
import { useModalStore } from '@/shared/store';

const MyMapList: FC = () => {
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

  // 추후 uuid를 받아서 보내는 기능 추가
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

  // 마이페이지 이동
  const handleGoToMypage = () => {
    navigate('/mypage/activity');
  };

  return (
    <div className="flex flex-col w-full mx-auto p-4 divide-y divide-gray-200">
      {/* 새 지도 만들기 */}
      <AddMyMapButton onCreateNewMap={handleCreate} />

      {/* 즐겨찾기 */}
      <div className="flex items-center py-3" onClick={handleGoToMypage}>
        <MdStars className="w-5 h-5 text-primary mr-2" />
        <span className="text-body2 font-semibold">즐겨찾기</span>
      </div>

      {/* map 리스트 */}
      {isPending ? (
        <div className="flex flex-col gap-2 mt-4">
          {[...Array(9)].map((_, i) => (
            <SkeletonMyMapItem key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-red-500 mt-4">에러 발생</div>
      ) : !data || data.length === 0 ? (
        <div className="flex  flex-col text-center items-center justify-center">
          <img
            src="/images/empty/empty-state.png"
            alt="생성된 지도가 없습니다."
            className="w-40 object-contain"
          />
          <div className="space-y-2">
            <h3 className="text-body1 font-semibold text-gray-700">
              생성된 지도가 없습니다.
            </h3>

            <p className="flex text-caption text-gray-500 leading-relaxed">
              <span className="flex text-primary font-bold items-center mr-1">
                <FiPlusCircle className="mr-1" />새 지도 만들기
              </span>
              버튼을 눌러주세요
            </p>
          </div>
        </div>
      ) : (
        data.map(map => (
          <div
            key={map.myMapListId}
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-light-gray-hover rounded"
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
                  className="flex justify-between font-medium cursor-pointer"
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
                  className="flex justify-between font-medium cursor-pointer"
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
                  className="flex justify-between font-medium cursor-pointer"
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

export default MyMapList;
