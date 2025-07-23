import { AddMyMapButton } from '@mymap/components/mymap-list';
import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapListQuery } from '@mymap/hooks/useMyMapListQuery';
import { BsThreeDotsVertical } from 'react-icons/bs';
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
import { useModalStore } from '@/shared/store';

import { MyMapForm } from '../InputMymap';
import { MymapDeleteModal } from '../MymapDeleteModal';
import { ShareModal } from '../ShareModal';

const MyMapList: React.FC = () => {
  const { data, isLoading, isError } = useMyMapListQuery();
  const openModal = useModalStore(state => state.openModal);
  const navigate = useNavigate();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>에러 발생</div>;

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
        <MyMapForm
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
      children: <MyMapForm mode="create" />,
    });
  };

  // 마이페이지 이동
  const handleGoToMypage = () => {
    navigate('/mypage/activity');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 divide-y divide-gray-200">
      {/* 새 지도 만들기 */}
      <AddMyMapButton onCreateNewMap={handleCreate} />

      {/* 즐겨찾기 */}
      <div className="flex items-center py-3" onClick={handleGoToMypage}>
        <MdStars className="w-5 h-5 text-primary mr-2" />
        <span className="text-body2 font-semibold">즐겨찾기</span>
      </div>

      {/* map 리스트 */}
      {data.map(map => (
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
                className="flex justify-between font-medium"
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
                className="flex justify-between font-medium"
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
                className="flex justify-between font-medium"
              >
                삭제
                <PiTrashBold className="mr-2 h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

export default MyMapList;
