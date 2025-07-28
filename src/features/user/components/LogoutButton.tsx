import { useLogout } from '@user/hooks/useUserMutation';

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-xl font-semibold"
    >
      {isPending ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
};
