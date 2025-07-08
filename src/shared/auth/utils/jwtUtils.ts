export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const getUserInfoFromToken = (token: string) => {
  const payload = parseJwt(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: payload.email,
    nickname: payload.nickname,
    role: payload.role,
    membershipLevel: payload.membershipLevel,
    profileImageUrl: payload.profileImageUrl,
    gender: payload.gender,
    interestedBrands: payload.interestedBrands || [],
    interestedCategories: payload.interestedCategories || [],
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    recentBrands: payload.recentBrands || [],
  };
};
