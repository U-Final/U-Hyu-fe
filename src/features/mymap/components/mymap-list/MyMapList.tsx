import { ADDMyMapButton } from '@mymap/components/mymap-list';
import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useMyMapListQuery } from '@mymap/hooks/useMyMapListQuery';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';

interface MapListProps {
  favoriteLabel: string;
  onCreateNewMap: () => void;
  onSelectMap: (id: number) => void;
}

const MyMapList: React.FC<MapListProps> = ({
  favoriteLabel,
  onCreateNewMap,
  onSelectMap,
}) => {
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
        <span className="text-body2 font-semibold">
          {favoriteLabel}
        </span>
      </div>

      {/* map 리스트 */}
      {data.map(map => (
        <div
          key={map.myMapListId}
          className="flex items-center justify-between py-3 cursor-pointer hover:bg-light-gray-hover rounded"
          onClick={() => onSelectMap(map.myMapListId)}
        >
          <div className="flex items-center">
            <MdStars className={`w-5 h-5 ${MYMAP_COLOR[map.markerColor as MarkerColor]}`} />
            <span className="ml-2 text-body2 font-semibold">{map.title}</span>
          </div>
          <BsThreeDotsVertical />
        </div>
      ))}
    </div>
  );
};

export default MyMapList;
