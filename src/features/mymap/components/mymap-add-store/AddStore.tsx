import { type FC, useEffect, useState } from 'react';

import { useToggleFavoriteMutation } from '@kakao-map/hooks/useMapQueries';
import { MYMAP_COLOR, type MarkerColor } from '@mymap/constants/mymapColor';
import { useStoreBookmarkStatusQuery } from '@mymap/hooks/useStoreBookmarkStatusQuery';
import { useToggleMyMapStoreMutation } from '@mymap/hooks/useToggleMyMapStoreMutation';
import { MdStars } from 'react-icons/md';

import { PrimaryButton, PrimaryCheckbox } from '@/shared/components';
import { useModalStore } from '@/shared/store';

import { MyMapForm } from '../InputMymap';
import { AddMyMapButton } from '../mymap-list';

interface AddStoreProps {
  storeId: number;
}

const AddStore: FC<AddStoreProps> = ({ storeId }) => {
  const { data, isLoading, isError } = useStoreBookmarkStatusQuery(storeId);
  const toggleMutation = useToggleMyMapStoreMutation();
  const toggleFavoriteMutation = useToggleFavoriteMutation();
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  // my map 초기 체크 상태 저장용
  const [initialCheckedMap, setInitialCheckedMap] = useState<
    Record<number, boolean>
  >({});
  // my map 현재 체크 상태
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});

  // 즐겨찾기 초기 체크 상태 저장용
  const [initialIsBookmarked, setInitialIsBookmarked] = useState(false);

  // 즐겨찾기 현재 체크 상태
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 데이터 로딩 후 초기값 저장
  useEffect(() => {
    if (data?.bookmarkedMyMapLists) {
      const initial = Object.fromEntries(
        data.bookmarkedMyMapLists.map(map => [map.myMapListId, map.isMyMapped])
      );
      setInitialCheckedMap(initial);
      setCheckedMap(initial);
    }
    if (typeof data?.isBookmarked === 'boolean') {
      setInitialIsBookmarked(data.isBookmarked);
      setIsBookmarked(data.isBookmarked);
    }
  }, [data]);

  // 체크 상태 토글
  const handleCheckToggle = (id: number, value: boolean) => {
    setCheckedMap(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // 즐겨찾기 토글
  const handleBookmarkToggle = (checked: boolean) => {
    setIsBookmarked(checked);
  };

  // 지도 생성 모달
  const handleCreate = () => {
    openModal('base', {
      title: '새 지도 만들기',
      children: <MyMapForm mode="create" />,
    });
  };

  // 저장 버튼 클릭 시 변경된 것만 요청
  const handleSave = () => {
    // 즐겨찾기 상태 변경 감지
    if (initialIsBookmarked !== isBookmarked) {
      toggleFavoriteMutation.mutate({ storeId });
    }

    // MyMap 항목 변경 감지
    Object.entries(checkedMap).forEach(([id, isChecked]) => {
      const myMapListId = Number(id);
      const initial = initialCheckedMap[myMapListId];

      if (
        (initial === false && isChecked === true) ||
        (initial === true && isChecked === false)
      ) {
        toggleMutation.mutate({ myMapListId, store_id: storeId });
      }
    });
    closeModal();
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>에러 발생</div>;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 divide-y divide-gray-200">
      {/* 새 지도 만들기 */}
      <AddMyMapButton onCreateNewMap={handleCreate} />

      {/* 즐겨찾기 */}
      <div
        className="flex items-center justify-between py-3"
        onClick={() => handleBookmarkToggle(!isBookmarked)}
      >
        <div className="flex flex-row">
          <MdStars className="w-5 h-5 text-primary mr-2" />
          <span className="text-body2 font-semibold">즐겨찾기</span>
        </div>
        <PrimaryCheckbox
          checked={isBookmarked}
          onCheckedChange={handleBookmarkToggle}
          onClick={e => e.stopPropagation()}
        />
      </div>

      {/* MyMap 리스트 */}
      {data.bookmarkedMyMapLists.map(map => {
        const isChecked = checkedMap[map.myMapListId] ?? false;

        return (
          <div
            key={map.myMapListId}
            className="flex items-center justify-between py-3 rounded"
            onClick={() => handleCheckToggle(map.myMapListId, !isChecked)}
          >
            <div className="flex flex-9 items-center">
              <MdStars
                className={`w-5 h-5 ${
                  MYMAP_COLOR[map.markerColor as MarkerColor] || MYMAP_COLOR.RED
                }`}
              />
              <span className="ml-2 text-body2 font-semibold">{map.title}</span>
            </div>
            <PrimaryCheckbox
              checked={isChecked}
              onCheckedChange={checked =>
                handleCheckToggle(map.myMapListId, checked as boolean)
              }
              onClick={e => e.stopPropagation()}
            />
          </div>
        );
      })}

      <PrimaryButton className="mt-5" onClick={handleSave}>
        저장
      </PrimaryButton>
    </div>
  );
};

export default AddStore;
