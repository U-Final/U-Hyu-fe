import { ButtonBase } from '@/shared/components';
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

  return (
    <BaseModal title="로그인이 필요합니다">
      <div className="flex flex-col gap-[12px]">
        <p>
          로그인을 해주시면 <br /> 더 많은 기능을 이용할 수 있습니다!
        </p>
        <ButtonBase onClick={handleLogin} variant="nav">
          로그인 하러 가기
        </ButtonBase>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
