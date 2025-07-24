import { useState } from 'react';

import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useAddMyMapMutation } from '@mymap/hooks/useAddMyMapMutation';
import { useUpdateMyMapMutation } from '@mymap/hooks/useUpdateMyMapMutation';

import { PrimaryButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';

interface MyMapFormProps {
  mode: 'create' | 'edit';
  myMapListId?: number;
  defaultTitle?: string;
  defaultColor?: MarkerColor;
}

const MAX_LENGTH = 20;
const COLOR_OPTIONS: MarkerColor[] = [
  'RED',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'PURPLE',
];

export const MyMapForm = ({
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
      console.error('Edit mode requires myMapListId');
      return;
    }

    if (mode === 'create') {
      addMyMap(
        { title: title.trim(), markerColor: color, uuid: crypto.randomUUID() },
        { onSuccess: closeModal }
      );
    } else {
      updateMyMap(
        { myMapListId: myMapListId!, title: title.trim(), markerColor: color },
        { onSuccess: closeModal }
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

      {/* 색상 선택 */}
      <div>
        <p className="text-body1 text-black font-semibold mb-2">색상 선택</p>
        <div className="flex justify-between items-center">
          {COLOR_OPTIONS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`
        w-6 h-6 rounded-full 
        ${MYMAP_COLOR[c]}
        ${color === c ? 'scale-125 ring-2 ring-primary' : 'scale-100'} 
        transition-transform duration-200 ease-in-out
      `}
              style={{ backgroundColor: 'currentColor' }}
            />
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
