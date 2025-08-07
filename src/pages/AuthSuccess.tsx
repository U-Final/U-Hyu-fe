import { useEffect, useState } from 'react';

import { PATH } from '@paths';
import { userStore } from '@user/store/userStore';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processAuth = async () => {
      try {
        await userStore.getState().userInfo();
        navigate(PATH.HOME, { replace: true });
      } catch {
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
