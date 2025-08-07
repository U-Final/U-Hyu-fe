import { KakaoLoginButton } from '@/shared/components';
import { useKakaoLogin } from '@/shared/hooks';
import { useGA } from '@/shared/hooks/useGA';
import { useModalStore } from '@/shared/store';

import BaseModal from './BaseModal';

const LoginModal = () => {
  const { login } = useKakaoLogin();
  const closeModal = useModalStore(state => state.closeModal);
  const { trackAuthInteraction } = useGA();

  const handleLogin = () => {
    trackAuthInteraction('login_attempted');
    closeModal();
    login();
  };

  const handleCancel = () => {
    trackAuthInteraction('login_modal_cancelled');
    closeModal();
  };

  interface FeatureItemProps {
    icon: React.ReactNode;
    label: string;
    description: string;
  }

  const FeatureItem = ({ icon, label, description }: FeatureItemProps) => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12">
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-black text-sm font-bold">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <BaseModal title=" ">
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          <p className="text-lg text-black font-bold leading-relaxed text-center">
            지금 로그인하고
            <br />
            U-HYU만의 혜택을 누려보세요
          </p>

          <div className="flex bg-primary/5 justify-center rounded-lg p-4 space-y-3">
            <div className="flex flex-col gap-6">
              <FeatureItem
                icon={
                  <img
                    src="/images/kakao-login/1.png"
                    alt="VIP"
                  />
                }
                label="사용자의 정보를 기반한"
                description="등급별 맞춤 혜택 정보"
              />
              <FeatureItem
                icon={
                  <img
                    src="/images/kakao-login/2.png"
                    alt="추천"
                  />
                }
                label="사용내역을 바탕으로"
                description="개인화 추천 서비스"
              />
              <FeatureItem
                icon={
                  <img
                    src="/images/kakao-login/3.png"
                    alt="마이맵"
                  />
                }
                label="제휴처 공유할 수 있는"
                description="마이맵 생성 및 즐겨찾기"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <KakaoLoginButton
            onClick={handleLogin}
            size="md"
            variant="full"
            className="w-full shadow-sm"
          />
          <button
            onClick={handleCancel}
            className="text-primary/60 text-sm text-gray hover:text-primary transition-colors"
          >
            일단 둘러볼게요
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
