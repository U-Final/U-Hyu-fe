import { useActivityStatisticsQuery } from '@mypage/hooks/useActivityQuery';

const ActivityBenefit = () => {
  const { data, isLoading, error } = useActivityStatisticsQuery();
  if (isLoading) return <div>로딩중...</div>;
  if (error || !data) return <div>에러 발생</div>;
  return (
    <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
      <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1.5rem] text-center">
        <p className="text-[0.75rem] text-gray mb-[0.5rem]">이번 달 받은 혜택</p>
        <img src="/images/benefit/image.png" alt="benefit" className="mx-auto h-[4.5rem]" />
        <p className="font-bold text-[1.125rem] text-black mt-[0.5rem]">
          {data.discountMoney !== null ? `${data.discountMoney.toLocaleString()}원` : '-'}
        </p>
      </div>
    </div>
  );
};

export default ActivityBenefit;