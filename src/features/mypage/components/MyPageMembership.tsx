interface Props {
  grade: 'VVIP' | 'VIP' | '우수';
}

const MyPageMembership = ({ grade }: Props) => {
  return (
    <div>
      <p>당신의 멤버십 등급 : {grade}</p>
    </div>
  );
};

export default MyPageMembership;
