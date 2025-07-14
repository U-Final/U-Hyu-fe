import MyPageHeader from './components/MyPageHeader';

const MyPage = () => {
  return (
    <div className="p-[1.6rem] bg-bg-light-gray min-h-screen">
      <MyPageHeader />   {/* ✅ 상단 영역 */}
      {/* 나머지 마이페이지 영역 */}
    </div>
  );
};

export default MyPage;
