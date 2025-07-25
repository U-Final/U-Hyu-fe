export const useKakaoLogin = () => {
  const login = () => {
    const kakaoAuthUrl = import.meta.env.VITE_KAKAO_LOGIN_URL;
    window.location.href = kakaoAuthUrl;
  };

  return { login };
};
