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
      <div className="flex flex-col gap-6">
        {/* 로그인 필요성 설명 */}
        <div className="text-center space-y-4">
          <p className="text-body1 text-gray-700 leading-relaxed">
            유휴 앱의 모든 혜택을 누리기 위해
            <br />
            로그인해 주세요
          </p>
          
          {/* 제공 기능 리스트 */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <p className="text-body2 font-semibold text-gray-800 mb-3">
              로그인 후 이용 가능한 기능
            </p>
            <ul className="text-body2 text-gray-600 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>등급별 맞춤 혜택 정보</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>개인화 추천 서비스</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>마이맵 생성 및 즐겨찾기</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>바코드 방문 확인 및 활동 내역 관리</span>
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
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            나중에 하기
          </GhostButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
