import { useState } from 'react';

import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useAddMyMapMutation } from '@mymap/hooks/useAddMyMapMutation';
import { useUpdateMyMapMutation } from '@mymap/hooks/useUpdateMyMapMutation';

import { PrimaryButton} from '@/shared/components';
import { useModalStore } from '@/shared/store';
import { Input } from '@/shared/components/shadcn/ui/input';

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
  defaultTitle = '',
  defaultColor = 'RED',
}: MyMapFormProps) => {
  const [title, setTitle] = useState(defaultTitle);
  const [color, setColor] = useState<MarkerColor>(defaultColor);

  const { mutate: addMyMap, isPending: isCreating } = useAddMyMapMutation();
  const { mutate: updateMyMap, isPending: isUpdating } =
    useUpdateMyMapMutation();
  const closeModal = useModalStore(state => state.closeModal);

  const isLoading = isCreating || isUpdating;

  const handleSubmit = () => {
    if (!title.trim()) return;

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
    <div className="flex flex-col gap-6 p-4">
      {/* 제목 입력 */}
      <div>
        <Input
          placeholder="지도 제목을 입력해주세요"
          value={title}
          onChange={e => {
            if (e.target.value.length <= MAX_LENGTH) setTitle(e.target.value);
          }}
        />
        <div className="text-right text-caption text-gray-400 mt-1">
          {title.length}/{MAX_LENGTH}
        </div>
      </div>

      {/* 색상 선택 */}
      <div>
        <p className="text-body1 font-semibold mb-2">색상 선택</p>
        <div className="flex gap-5">
          {COLOR_OPTIONS.map(c => (
            <button
              key={c}
              className={`w-6 h-6 rounded-full ${MYMAP_COLOR[c]} ${color === c ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <PrimaryButton onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '처리 중...' : '완료'}
      </PrimaryButton>
    </div>
  );
};
