import type { FC, MouseEventHandler } from 'react';

interface CroppedImgProps {
  imageUrl: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

export const CroppedImg: FC<CroppedImgProps> = ({ imageUrl, onClick }) => {
  return (
    <figure>
      <img
        src={imageUrl}
        alt="크롭된 바코드 이미지"
        onClick={onClick}
        className="max-w-full max-h-[600px] object-contain w-full"
      />
    </figure>
  );
};
