import { KakaoLoginButton } from '@/shared/components/buttons/KakaoLoginButton';

export const GuestBarcodeContent = () => {
  return (
    <div className="flex flex-col w-full gap-4 pb-10">
      <p className="text-lg text-black">
        멤버십 바코드 기능은 로그인 후 이용하실 수 있어요.
      </p>
      <KakaoLoginButton />
    </div>
  );
};
