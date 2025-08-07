import { BenefitHeader, BenefitList } from '@benefit/components';

const BenefitPage = () => {
  return (
    <div className="flex flex-col gap-4 pb-10 pt-6 sm:pt-2">
      <BenefitHeader />
      <BenefitList />
    </div>
  );
};

export default BenefitPage;
