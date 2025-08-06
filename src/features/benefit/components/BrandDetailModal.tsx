import { useGetBrandDetailQuery } from '@benefit/hooks';
import { formatUsageText } from '@benefit/utils/formatUsageText';
import clsx from 'clsx';

import { BrandDetailSkeleton } from '@/shared/components/skeleton';
import { formatNewlines } from '@/shared/utils/formatNewlines';

const BrandDetailModal = ({ brandId }: { brandId: number }) => {
  const { data: brand, isPending, isError } = useGetBrandDetailQuery(brandId);

  const gradeStyles: Record<string, { bg: string; text: string }> = {
    GOOD: { bg: 'bg-yellow', text: 'text-brown' },
    VIP: { bg: 'bg-blue', text: 'text-blue-500' },
    VVIP: { bg: 'bg-purple', text: 'text-purple' },
  };

  const getGradeStyle = (grade: string) =>
    gradeStyles[grade] ?? { bg: 'bg-secondary', text: 'text-black' };

  const formatGrade = (grade: string) => {
    if (grade === 'GOOD') return '우수';
    return grade;
  };

  return isPending ? (
    <BrandDetailSkeleton />
  ) : isError || !brand ? (
    <div className="text-sm text-red mt-4">에러 발생</div>
  ) : (
    <div className="flex flex-col gap-4 text-black text-caption max-h-[80vh] overflow-y-auto">
      <h1 className="text-body1 font-bold">{brand.brandName}</h1>
      <div className="flex flex-col gap-1 text-body2">
        <h3 className=" font-bold">등급별 혜택</h3>
        <div className="flex flex-col gap-1 text-black">
          {(() => {
            const gradeOrder = ['VVIP', 'VIP', 'GOOD'];
            const sortedBenefitRes = [...brand.benefitRes].sort(
              (a, b) =>
                gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
            );

            return sortedBenefitRes.map(benefit => {
              const { bg, text } = getGradeStyle(benefit.grade);
              return (
                <div
                  key={benefit.grade}
                  className={clsx(
                    'flex justify-between items-center px-3 py-2 rounded-md gap-2',
                    bg
                  )}
                >
                  <span className={clsx('font-bold shrink-0 w-10', text)}>
                    {formatGrade(benefit.grade)}
                  </span>
                  <span>{formatNewlines(benefit.description)}</span>
                </div>
              );
            });
          })()}
        </div>
      </div>

      <div className="flex flex-col gap-1 text-body2">
        <h3 className="font-bold">제공 횟수</h3>
        <p className="text-black">{formatNewlines(brand.usageLimit)}</p>
      </div>

      <div className="flex flex-col gap-1 text-body2">
        <h3 className="font-bold">이용방법</h3>
        <div
          className="text-black overflow-y-auto"
          style={{ maxHeight: '200px' }}
        >
          <p className="whitespace-pre-wrap">
            {formatUsageText(brand.usageMethod)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandDetailModal;
