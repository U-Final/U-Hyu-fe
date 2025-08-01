import { useEffect, useState } from 'react';

import { PATH } from '@paths';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import { userStore } from '@/shared/store/userStore';

const AuthSuccess = () => {
  useEffect(() => {
    console.log('AuthSuccess mounted', window.location.pathname);
  }, []);

  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processAuth = async () => {
      try {
        await userStore.getState().userInfo();
        navigate(PATH.HOME, { replace: true });
      } catch (error) {
        console.error('로그인 처리 실패:', error);
        navigate(PATH.HOME, { replace: true });
      } finally {
        setIsProcessing(false);
      }
    };

    processAuth();
  }, [navigate]);

  if (isProcessing) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>로그인 처리 중...</p>
        <BeatLoader />
      </div>
    );
  }

  return null;
};

export default AuthSuccess;
