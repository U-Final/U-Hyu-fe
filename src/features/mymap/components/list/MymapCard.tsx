import {
  MARKER_COLOR_IMAGE,
  MYMAP_COLOR_BG,
  type MarkerColor,
} from '@mymap/constants/mymapColor';
import { motion } from 'framer-motion';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiTrashBold } from 'react-icons/pi';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';

interface MymapCardProps {
  title: string;
  uuid: string;
  markerColor: MarkerColor;
  onUpdate: () => void;
  onDelete: () => void;
  onShare: () => void;
}
export const MymapCard = ({
  title,
  uuid,
  markerColor,
  onUpdate,
  onDelete,
  onShare,
}: MymapCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: MYMAP_COLOR_BG[markerColor] || MYMAP_COLOR_BG.RED,
      }}
      className="w-full max-w-[240px] aspect-[3/4] rounded-4xl p-5 flex flex-col justify-between shadow-sm shrink-0 transition-all"
    >
      {/* 상단: 타이틀 + 드롭다운 */}
      <div className="flex justify-between items-center">
        <h4 className="text-black text-h4 font-bold truncate">{title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <BsThreeDotsVertical className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-36 divide-gray-200 bg-white border-none"
          >
            <DropdownMenuItem
              onClick={onUpdate}
              className="flex justify-between font-medium"
            >
              수정
              <RiPencilFill className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
            <hr />
            <DropdownMenuItem
              onClick={onDelete}
              className="flex justify-between font-medium"
            >
              삭제
              <PiTrashBold className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 중간: 공유 버튼 */}
      <div className="flex w-full justify-center">
        <button
          onClick={onShare}
          className="bg-[rgba(255,255,255,0.54)] text-black text-h4 font-semibold px-5 py-2 rounded-3xl"
        >
          공유하기
        </button>
      </div>

      {/* 하단: 이미지 */}
      <div
        onClick={() => navigate(`/map/${uuid}`)}
        className="cursor-pointer flex justify-center"
      >
        <img
          src={MARKER_COLOR_IMAGE[markerColor]}
          alt={markerColor}
          className="w-[80%] h-auto object-contain"
        />
      </div>
    </motion.div>
  );
};
