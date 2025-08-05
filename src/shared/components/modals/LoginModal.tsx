import { GhostButton, KakaoLoginButton } from '@/shared/components';
import { useKakaoLogin } from '@/shared/hooks';
import { useGA } from '@/shared/hooks/useGA';
import { useModalStore } from '@/shared/store';

import BaseModal from './BaseModal';

const LoginModal = () => {
  const { login } = useKakaoLogin();
  const closeModal = useModalStore(state => state.closeModal);
  const { trackAuthInteraction } = useGA();

  const handleLogin = () => {
    // GA 추적: 로그인 시도
    trackAuthInteraction('login_attempted');
    closeModal();
    login();
  };

  const handleCancel = () => {
    // GA 추적: 로그인 모달 취소
    trackAuthInteraction('login_modal_cancelled');
    closeModal();
  };

  return (
    <BaseModal title="로그인이 필요합니다">
      <div className="flex flex-col gap-6">
        {/* 로그인 필요성 설명 */}
        <div className="text-center space-y-4">
          <p className="text-body1 text-gray-700 leading-relaxed">
            LG U+ 유휴의 모든 기능을 누리기 위해
            <br />
            로그인해 주세요
          </p>

          {/* 제공 기능 리스트 */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-3">
            <p className="text-body2 font-semibold text-primary mb-3 text-center">
              로그인 후 이용 가능한 기능
            </p>
            <ul className="text-body2 text-gray-700 space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="flex-1">등급별 맞춤 혜택 정보</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="flex-1">개인화 추천 서비스</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="flex-1">마이맵 생성 및 즐겨찾기</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="flex-1">
                  바코드 방문 확인 및 활동 내역 관리
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3 pt-2">
          <KakaoLoginButton
            onClick={handleLogin}
            size="lg"
            variant="full"
            className="w-full shadow-sm"
          />
          <GhostButton
            onClick={handleCancel}
            className="text-primary/60 hover:text-primary transition-colors"
          >
            나중에 하기
          </GhostButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
