import { updateUserInfo } from '@mypage/api/mypageApi';
import type { UserInfo } from '@mypage/api/types';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

const MARKERS = [
  { id: 1, filename: 'marker1.png' },
  { id: 2, filename: 'marker2.png' },
  { id: 3, filename: 'marker3.png' },
  { id: 4, filename: 'marker4.png' },
  { id: 5, filename: 'marker5.png' },
  { id: 6, filename: 'marker6.png' },
  { id: 7, filename: 'marker7.png' },
  { id: 8, filename: 'marker8.png' },
];

const MyPageMarker = ({ user, setUser }: Props) => {
  const handleSelect = async (markerId: number) => {
    const previousMarkerId = user.marker?.id;
    if (previousMarkerId === markerId) return; // 이미 선택된 마커면 아무 동작 안함

    setUser((prev: UserInfo | undefined) => {
      if (!prev) return prev;
      return {
        ...prev,
        marker: prev.marker
          ? { ...prev.marker, id: markerId }
          : { id: markerId, createdAt: '', updatedAt: '', markerImage: '' },
      };
    });

    try {
      await updateUserInfo({ markerId });
      console.log('마커 PATCH 요청 성공:', markerId);
    } catch (err) {
      alert('마커 변경 실패');
      console.error(err);
      // 실패 시 이전 상태로 롤백
      setUser(prev =>
        prev && previousMarkerId !== undefined
          ? {
              ...prev,
              marker: prev.marker
                ? { ...prev.marker, id: previousMarkerId }
                : {
                    id: previousMarkerId,
                    createdAt: '',
                    updatedAt: '',
                    markerImage: '',
                  },
            }
          : prev
      );
    }
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-[var(--text-black)]">
        나만의 마커
      </div>

      <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1rem] border border-gray-200">
        <p className="mb-[1rem] text-[0.75rem] text-[var(--text-gray)] text-center">
          나만의 마커를 선택해주세요
        </p>
        <div
          className="overflow-x-auto whitespace-nowrap scrollbar-none"
          style={{ overflowY: 'hidden', maxHeight: '6rem' }}
        >
          <div className="inline-flex gap-[1rem] items-center h-[4.5rem]">
            {MARKERS.map(marker => {
              const markerId = marker.id;
              const isSelected = user.marker?.id === markerId;
              return (
                <button
                  key={marker.filename}
                  onClick={() => handleSelect(markerId)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !isSelected)
                      handleSelect(markerId);
                  }}
                  aria-label={`${marker.filename} 마커 ${isSelected ? '선택됨' : '선택 안됨'}`}
                  aria-pressed={isSelected}
                  className={`flex-shrink-0 transition-transform duration-300 w-[4.5rem] h-[4.5rem] bg-transparent ${isSelected ? 'scale-125' : 'scale-100'}`}
                >
                  <img
                    src={`/images/markers/${marker.filename}`}
                    alt={marker.filename}
                    className={`object-contain rounded-full w-[4rem] h-[4rem] bg-white`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageMarker;
