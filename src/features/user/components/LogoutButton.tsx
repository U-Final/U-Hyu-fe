import { useNavigate } from 'react-router-dom';

import { userStore } from '@/shared/store/userStore';

export const LogoutButton = () => {
  const logout = userStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // 백엔드 + 상태 초기화
      navigate('/'); // 홈으로 이동 (또는 로그인 페이지)
    } catch (e) {
      console.error('로그아웃 실패', e);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-xl font-semibold"
    >
      로그아웃
    </button>
  );
};
