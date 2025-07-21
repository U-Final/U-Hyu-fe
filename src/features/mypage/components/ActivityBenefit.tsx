import { mockBenefit } from '@mypage/types/mockActivity';

const ActivityBenefit = () => {
  return (
    <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
      <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1.5rem] text-center">
        <p className="text-[0.75rem] text-[var(--text-gray)] mb-[0.5rem]">이번 달 받은 혜택</p>
        <img src="/images/benefit/image.png" alt="benefit" className="mx-auto h-[4.5rem]" />
        <p className="font-bold text-[1.125rem] text-[var(--text-black)] mt-[0.5rem]">
          {mockBenefit.amount.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default ActivityBenefit;