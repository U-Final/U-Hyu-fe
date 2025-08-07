import { useState } from 'react';

import { MARKER_COLOR_IMAGE, type MarkerColor } from '@mymap/constants/mymapColor';
import { useAddMyMapMutation, useUpdateMyMapMutation } from '@mymap/hooks';
import { toast } from 'sonner';

import { PrimaryButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';

interface MyMapFormProps {
  mode: 'create' | 'edit';
  myMapListId?: number;
  defaultTitle?: string;
  defaultColor?: MarkerColor;
}

const MAX_LENGTH = 10;
const CATEGORY_OPTIONS: {
  color: MarkerColor;
  label: string;
  description: string;
}[] = [
  {
    color: 'RED',
    label: '데이트 / 여가',
    description: '연인, 가족, 친구와 특별한 시간',
  },
  {
    color: 'PURPLE',
    label: '친목 / 소셜',
    description: '지인들과 소통하고 즐기는 공간',
  },
  {
    color: 'GREEN',
    label: '생활 / 실속',
    description: '일상 속 자주 가는 실용적인 제휴처',
  },
  {
    color: 'ORANGE',
    label: '여행 / 이동',
    description: '여행, 나들이, 교통 관련 장소',
  },
  {
    color: 'YELLOW',
    label: '기타',
    description: '위 테마에 포함되지 않는 다양한 제휴처',
  },
];

export const MyMapFormModal = ({
  mode,
  myMapListId,
  defaultTitle,
  defaultColor,
}: MyMapFormProps) => {
  const [title, setTitle] = useState(defaultTitle ?? '');
  const [color, setColor] = useState<MarkerColor>(defaultColor || 'RED');

  const { mutate: addMyMap, isPending: isCreating } = useAddMyMapMutation();
  const { mutate: updateMyMap, isPending: isUpdating } =
    useUpdateMyMapMutation();
  const closeModal = useModalStore(state => state.closeModal);

  const isLoading = isCreating || isUpdating;

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (mode === 'edit' && !myMapListId) {
      return;
    }

    const trimmedTitle = title.trim();

    if (mode === 'create') {
      addMyMap(
        { title: trimmedTitle, markerColor: color, uuid: crypto.randomUUID() },
        {
          onSuccess: () => {
            closeModal();
            toast.success(`"${trimmedTitle}" 지도가 생성되었습니다.`);
          },
          onError: () => {
            toast.error('My Map 생성 중 오류가 발생했습니다.');
          },
        }
      );
    } else {
      updateMyMap(
        { myMapListId: myMapListId!, title: trimmedTitle, markerColor: color },
        {
          onSuccess: () => {
            closeModal();
            toast.success(`"${trimmedTitle}" 지도가 수정되었습니다.`);
          },
          onError: () => {
            toast.error('My Map 수정 중 오류가 발생했습니다.');
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 제목 입력 */}
      <div className="flex border-b pb-2">
        <input
          className="flex-9 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none placeholder:text-sm placeholder:font-semibold"
          placeholder="지도 제목을 입력해주세요"
          value={title}
          onChange={e => {
            if (e.target.value.length <= MAX_LENGTH) setTitle(e.target.value);
          }}
        />
        <div className="flex-1 text-right font-semibold text-sm text-gray mt-1">
          {title.length}/{MAX_LENGTH}
        </div>
      </div>

      {/* 테마 선택 */}
      <div>
        <p className="text-body1 text-black font-semibold mb-2">테마 선택</p>
        <div className="flex flex-col gap-3">
          {CATEGORY_OPTIONS.map(({ color: c, label, description }) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`
                flex items-center justify-between border-2 border-gray-50 px-4 py-3 rounded-xl
                ${color === c ? 'border-primary ring-primary' : 'border-gray'}
              `}
            >
              <div className="flex items-center gap-3">
                <img
                  src={MARKER_COLOR_IMAGE[c]}
                  alt={`${label} 아이콘`}
                  className="w-7 h-7 object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-black">{label}</p>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <PrimaryButton onClick={handleSubmit} disabled={isLoading}>
        완료
      </PrimaryButton>
    </div>
  );
};
