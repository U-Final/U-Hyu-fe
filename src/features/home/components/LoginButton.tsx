import { useKakaoLogin } from '@/shared/hooks';

export const LoginButton = () => {
  const { login } = useKakaoLogin();

  return (
    <button
      onClick={login}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl font-bold"
    >
      카카오 로그인
    </button>
  );
};
