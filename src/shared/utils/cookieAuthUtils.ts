export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export const checkAuthCookie = (): boolean => {
  const authToken = getCookie('access_token');
  return !!authToken;
};

export const hasValidAuthCookie = (): boolean => {
  try {
    return checkAuthCookie();
  } catch (error) {
    console.warn('쿠키 확인 중 오류:', error);
    return false;
  }
};
