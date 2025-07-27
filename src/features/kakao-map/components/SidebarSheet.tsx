import { useEffect, useState } from 'react';

import { USER_ENDPOINTS } from '@user/index';
import { Menu } from 'lucide-react';

import { client } from '@/shared/client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/shadcn/ui/sheet';

interface UserInfo {
  userName: string;
  email: string;
  profileImage?: string;
}

const SidebarSheet = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  // 페이지 로드될 때 유저 정보 요청
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await client.get(USER_ENDPOINTS.USER, {});
        setUser(response.data.data); // 응답 구조에 맞게 조정 필요
      } catch (error) {
        console.warn('로그인 안 된 상태 또는 에러 발생:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          aria-label="사이드바 열기"
          className="absolute top-[14px] left-[15px] z-50 p-2 bg-white rounded-md shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[70%]" containerId="main-content">
        <SheetHeader>
          <SheetTitle>U-HYU</SheetTitle>
        </SheetHeader>

        <div className="px-8 mt-4">
          {user ? (
            <p className="text-base font-semibold">
              안녕하세요, {user.userName}님!
            </p>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl font-bold"
            >
              카카오 로그인
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
