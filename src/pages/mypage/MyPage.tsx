import { useUserInfo } from '@/features/user';
import MyPageBrand from '@mypage/components/MyPageBrand';
import MyPageHeader from '@mypage/components/MyPageHeader';
import MyPageMarker from '@mypage/components/MyPageMarker';
import MyPageMembership from '@mypage/components/MyPageMembership';
import MyPageUserInfo from '@mypage/components/MyPageUserInfo';
import type { UserInfo } from '@mypage/types/types';

const MyPage = () => {
  const { data: userResponse, isLoading, error } = useUserInfo();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen max-w-[22.5rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !userResponse?.data) {
    return (
      <div className="min-h-screen max-w-[22.5rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            사용자 정보를 불러오는데 실패했습니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const user = userResponse.data;

  // mypage 전용 필드를 가진 사용자 정보로 변환
  const mypageUser: UserInfo = {
    ...user,
    favoriteBrands: [], // 기본값 설정, 실제로는 API에서 받아와야 함
    markers: ['marker1.png'], // 기본값 설정
  };

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div className="p-[1rem] space-y-[1.5rem] pb-[6rem]">
        <MyPageHeader user={mypageUser} />
        <MyPageUserInfo user={mypageUser} />
        <MyPageMembership user={mypageUser} />
        <MyPageBrand user={mypageUser} />
        <MyPageMarker user={mypageUser} />
      </div>
    </div>
  );
};

export default MyPage;
