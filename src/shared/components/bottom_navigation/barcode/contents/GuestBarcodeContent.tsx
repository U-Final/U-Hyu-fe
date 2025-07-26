import { NavButton } from '@/shared/components/buttons/NavButton';

export const GuestBarcodeContent = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="text-lg text-black">
        멤버십 바코드 기능은 로그인 후 이용하실 수 있어요.
      </p>
      <NavButton
        to={import.meta.env.VITE_KAKAO_LOGIN_URL}
        className="w-full text-lg"
      >
        로그인 하러가기
      </NavButton>
    </div>
  );
};
