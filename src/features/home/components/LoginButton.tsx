// src/features/auth/components/LoginButton.tsx

export const LoginButton = () => {
  const handleLogin = () => {
    const kakaoAuthUrl = `${import.meta.env.VITE_KAKAO_LOGIN_URL}`;
    console.log('로그인 버튼 클릭');
    console.log(import.meta.env.VITE_KAKAO_LOGIN_URL);

    window.location.href = kakaoAuthUrl;
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
