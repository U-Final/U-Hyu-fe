import { ADDMyMapButton } from '@mymap/components/mymap-list';
import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapListQuery } from '@mymap/hooks/useMyMapListQuery';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import { MdIosShare } from 'react-icons/md';
import { PiTrashBold } from 'react-icons/pi';
import { RiPencilFill } from 'react-icons/ri';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';

interface MapListProps {
  onCreateNewMap: () => void;
  onSelectMap: (id: number) => void;
}

const MyMapList: React.FC<MapListProps> = ({ onCreateNewMap, onSelectMap }) => {
  const { data, isLoading, isError } = useMyMapListQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>에러 발생</div>;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 divide-y divide-gray-200">
      {/* 새 지도 만들기 */}
      <ADDMyMapButton onCreateNewMap={onCreateNewMap} />

      {/* 즐겨찾기 */}
      {/* 즐겨찾기 누르면 마이페이지 즐겨찾기 수정으로 이동 */}
      <div className="flex items-center py-3">
        <MdStars className="w-5 h-5 text-primary mr-2" />
        <span className="text-body2 font-semibold">즐겨찾기</span>
      </div>

      {/* map 리스트 */}
      {data.map(map => (
        <div
          key={map.myMapListId}
          className="flex items-center justify-between py-3 cursor-pointer hover:bg-light-gray-hover rounded"
          onClick={() => onSelectMap(map.myMapListId)}
        >
          <div className="flex items-center">
            <MdStars
              className={`w-5 h-5 ${MYMAP_COLOR[map.markerColor as MarkerColor] || MYMAP_COLOR.RED}`}
            />
            <span className="ml-2 text-body2 font-semibold">{map.title}</span>
          </div>
          {/* 수정, 삭제, 공유 드롭다운 버튼 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BsThreeDotsVertical className="w-4 h-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36 divide-gray-200 bg-white border-none"
            >
              <DropdownMenuItem
                onClick={() => console.log('수정', map.myMapListId)}
                className="flex justify-between font-medium"
              >
                수정
                <RiPencilFill className="mr-2 h-4 w-4" />
              </DropdownMenuItem>
              <hr />
              <DropdownMenuItem
                onClick={() => console.log('공유', map.myMapListId)}
                className="flex justify-between font-medium"
              >
                공유
                <MdIosShare className="mr-2 h-4 w-4" />
              </DropdownMenuItem>
              <hr />
              <DropdownMenuItem
                onClick={() => console.log('삭제', map.myMapListId)}
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
