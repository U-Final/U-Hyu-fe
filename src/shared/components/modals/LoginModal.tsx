import { GhostButton, KakaoLoginButton } from '@/shared/components';
import { useKakaoLogin } from '@/shared/hooks';
import { useModalStore } from '@/shared/store';

import BaseModal from './BaseModal';

const LoginModal = () => {
  const { login } = useKakaoLogin();
  const closeModal = useModalStore(state => state.closeModal);

  const handleLogin = () => {
    closeModal();
    login();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <BaseModal title="로그인이 필요합니다">
      <div className="flex flex-col gap-[12px]">
        <p>
          로그인을 해주시면 <br /> 더 많은 기능을 이용할 수 있습니다!
        </p>
        <div className="flex flex-col gap-[8px]">
          <KakaoLoginButton
            onClick={handleLogin}
            size="lg"
            variant="full"
            className="w-full"
          />
          <GhostButton onClick={handleCancel}>
            취소
          </GhostButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
