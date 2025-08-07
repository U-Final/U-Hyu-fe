import { useEffect } from 'react';

const { Kakao } = window;

export const useKakaoShare = () => {
  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

    Kakao.cleanup();
    Kakao.init(key);
  }, []);

  const share = (url: string) => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'u-hyu',
        description: 'U+ 제휴처 공유 지도 도착! 몰랐던 혜택들을 발견할 수 있어요',
        imageUrl: 'https://www.u-hyu.site/images/share/share.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },

      buttons: [
        {
          title: '지도 보러가기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
  return share;
};
