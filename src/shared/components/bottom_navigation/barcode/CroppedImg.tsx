import type { FC } from 'react';

interface CroppedImgProps {
  imageUrl: string;
}

export const CroppedImg: FC<CroppedImgProps> = ({ imageUrl }) => {
  return (
    <figure>
      <img
        src={imageUrl}
        alt="크롭된 바코드 이미지"
        className="max-w-full max-h-[600px] object-contain w-full"
      />
    </figure>
  );
};
