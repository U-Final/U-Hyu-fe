import type { BrandDetail } from '@benefit/types';
import clsx from 'clsx';

const BrandDetailModal = ({ brand }: { brand: BrandDetail }) => {
  const gradeStyles: Record<string, { bg: string; text: string }> = {
    우수: { bg: 'bg-yellow', text: 'text-brown' },
    VIP: { bg: 'bg-blue', text: 'text-primary' },
    VVIP: { bg: 'bg-purple', text: 'text-purple' },
  };

  const getGradeStyle = (grade: string) =>
    gradeStyles[grade] ?? { bg: 'bg-gray', text: 'text-black' };

  return (
    <div className="flex flex-col gap-4 text-black text-caption">
      <h1 className="text-body1 font-bold">{brand.brand_name}</h1>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold">등급별 혜택</h3>
        <div className="flex flex-col gap-1">
          {brand.benefits.map(benefit => {
            const { bg, text } = getGradeStyle(benefit.grade);
            return (
              <div
                key={benefit.grade}
                className={clsx(
                  'flex justify-between items-center px-3 py-2 rounded-md',
                  bg
                )}
              >
                <span className={clsx('font-bold', text)}>{benefit.grade}</span>
                <span>{benefit.description}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold">제공 횟수</h3>
        <p className="text-black">{brand.usage_limit}</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <h3 className="font-bold">이용방법</h3>
        <p className="text-black">{brand.usage_method}</p>
      </div>
    </div>
  );
};

export default BrandDetailModal;
