import type { UserInfo } from '@mypage/types';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
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
  const handleSelect = (marker: string) => {
    setUser(prev => ({
      ...prev,
      markers: [marker],
    }));
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-black">나만의 마커</div>

      <div className="
        rounded-[1rem] 
        bg-white 
        px-[1.25rem] 
        py-[1rem]
        overflow-x-auto 
        whitespace-nowrap
        scrollbar-none
      ">
        <p className="mb-[1rem] text-[0.75rem] text-gray-500 text-center">
          나만의 마커를 선택해주세요
        </p>

        <div className="inline-flex gap-[1rem]">
          {MARKERS.map((img) => {
            const isSelected = user.markers[0] === img;

            return (
              <button
                key={img}
                onClick={() => handleSelect(img)}
                className={`flex-shrink-0 transition-transform duration-300 ${
                  isSelected ? 'scale-125' : 'scale-100'
                }`}
                style={{ width: '4.5rem', height: '4.5rem' }}
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
