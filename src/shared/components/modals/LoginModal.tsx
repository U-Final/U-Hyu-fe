import { NavButton } from '@/shared/components';
import { PATH } from '@paths';
import { useModalStore } from '@/shared/store';
import BaseModal from './BaseModal';

const LoginModal = () => {
  const closeModal = useModalStore(state => state.closeModal);

  const handleLogin = () => {
    closeModal();
  };

  return (
    <BaseModal title="로그인이 필요합니다">
      <div className="flex flex-col gap-[12px]">
        <p>
          로그인을 해주시면 <br /> 더 많은 기능을 이용할 수 있습니다!
        </p>
        <NavButton to={PATH.LOGIN} onClick={handleLogin} className="w-full">
          로그인 하러가기
        </NavButton>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
