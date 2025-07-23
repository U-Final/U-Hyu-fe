import type { UserInfo } from '@mypage/api/types';
import { updateUserInfo } from '@mypage/api/mypageApi';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

const MARKERS = [
  'marker1.png',
  'marker8.png',
  'marker2.png',
  'marker3.png',
  'marker4.png',
  'marker5.png',
  'marker6.png',
  'marker7.png',  
];

const MyPageMarker = ({ user, setUser }: Props) => {
  const handleSelect = async (markerId: number) => {
    setUser((prev: UserInfo | undefined) => {
      if (!prev) return prev;
      if (prev.marker.id === markerId) return prev; // 이미 선택된 마커면 아무 동작 안함
      updateUserInfo({ markerId })
        .then(() => {
          console.log('마커 PATCH 요청 성공:', markerId);
        })
        .catch((err: Error) => {
          alert('마커 변경 실패');
          console.error(err);
        });
      return {
        ...prev,
        marker: { ...prev.marker, id: markerId },
      };
    });
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-[var(--text-black)]">나만의 마커</div>

      <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1rem] border border-gray-200">
        <p className="mb-[1rem] text-[0.75rem] text-[var(--text-gray)] text-center">
          나만의 마커를 선택해주세요
        </p>
        <div className="overflow-x-auto whitespace-nowrap scrollbar-none" style={{ overflowY: 'hidden', maxHeight: '6rem' }}>
          <div className="inline-flex gap-[1rem] items-center h-[4.5rem]">
            {MARKERS.map((img) => {
              const markerId = Number(img.replace(/[^0-9]/g, ''));
              const isSelected = user.marker.id === markerId;
              return (
                <button
                  key={img}
                  onClick={() => handleSelect(markerId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSelected) handleSelect(markerId);
                  }}
                  aria-label={`${img} 마커 ${isSelected ? '선택됨' : '선택 안됨'}`}
                  aria-pressed={isSelected}
                  className={`flex-shrink-0 transition-transform duration-300 w-[4.5rem] h-[4.5rem] bg-transparent ${isSelected ? 'scale-125' : 'scale-100'}`}
                >
                  <img
                    src={`/images/markers/${img}`}
                    alt={img}
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
