import type { FC } from 'react';

interface CroppedImgProps {
  image: string;
}

export const CroppedImg: FC<CroppedImgProps> = ({ image }) => {
  return (
    <figure>
      <img
        src={image}
        alt="크롭된 바코드 이미지"
        className="max-w-full max-h-[600px] object-contain w-full"
      />
    </figure>
  );
};
