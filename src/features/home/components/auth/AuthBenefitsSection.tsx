import { useBenefitsQuery } from "@home/hooks/useBenefitsQuery";
import { useUserInfoQuery } from "@home/hooks/useUserInfoQuery";

export const AuthBenefitsSection = () => {
  const { data: user } = useUserInfoQuery();
  const grade = user?.grade;

  const { data: benefits, isLoading, isError } = useBenefitsQuery(grade ?? '');

  if (!grade) return null;
  if (isLoading) return <p>멤버십 혜택 불러오는 중...</p>;
  if (isError || !benefits) return <p>혜택 정보를 불러오지 못했어요.</p>;
  
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">🎁 {grade} 등급 멤버십 혜택</h2>
      <ul className="space-y-3">
        {benefits.map((benefit, idx) => (
          <li
            key={idx}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="text-sm text-gray-700">{benefit.benefit_type === 'DISCOUNT' ? '할인 혜택' : '기프트 혜택'}</div>
            <div className="text-base font-medium">{benefit.description}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
