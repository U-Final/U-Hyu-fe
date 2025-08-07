export const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl font-bold"
    >
      카카오 로그인
    </button>
  );
};
