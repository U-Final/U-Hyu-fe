import type { UserInfo } from '@mypage/types/types';

interface Props {
  user: UserInfo;
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

const MyPageMarker = ({ user }: Props) => {
  const handleSelect = (marker: string) => {
    // TODO: 실제 API 호출로 마커 업데이트
    console.log('마커 선택:', marker);
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-[var(--text-black)]">
        나만의 마커
      </div>

      <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1rem] overflow-x-auto whitespace-nowrap scrollbar-none border border-gray-200">
        <p className="mb-[1rem] text-[0.75rem] text-[var(--text-gray)] text-center">
          나만의 마커를 선택해주세요
        </p>

        <div className="inline-flex gap-[1rem]">
          {MARKERS.map(img => {
            const isSelected = user.markers[0] === img;

            return (
              <button
                key={img}
                onClick={() => handleSelect(img)}
                onKeyDown={e => e.key === 'Enter' && handleSelect(img)} //키보드 접근성
                aria-label={`${img} 마커 ${isSelected ? '선택됨' : '선택 안됨'}`} //스크린 리더
                aria-pressed={isSelected} //토글 상태 알림
                className={`flex-shrink-0 transition-transform duration-300 w-[4.5rem] h-[4.5rem] ${
                  isSelected ? 'scale-125' : 'scale-100'
                }`} //스타일 통일
              >
                <img
                  src={`/images/markers/${img}`}
                  alt={img}
                  className={`object-contain rounded-full w-[4rem] h-[4rem] ${
                    isSelected ? 'shadow-lg' : ''
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPageMarker;
