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
    <BaseModal title="유휴 혜택을 위해 로그인이 필요합니다">
      <div className="flex flex-col gap-[12px]">
        <p>
          등급별 맞춤 혜택 정보, 개인화 추천 서비스, 마이맵 생성 및 즐겨찾기,
          바코드 방문 확인, 활동 내역 관리 등 모든 기능을 이용하실 수 있습니다!
        </p>
        <div className="flex flex-col gap-[8px]">
          <KakaoLoginButton
            onClick={handleLogin}
            size="lg"
            variant="full"
            className="w-full"
          />
          <GhostButton onClick={handleCancel}>취소</GhostButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
