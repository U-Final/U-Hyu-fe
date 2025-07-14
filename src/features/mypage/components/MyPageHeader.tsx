import UserProfileCard from '@shared/components/user_profile/UserProfileCard';
import { useUserInfoQuery } from '../hooks/useUserInfoQuery';
import type { UserGrade } from '@user/api/types';

const MyPageHeader = () => {
  const { data: user } = useUserInfoQuery();


  const convertGrade = (grade: UserGrade): 'VIP' | 'VVIP' | '우수' => {
    if (grade === 'GOOD') return '우수';
    return grade;
  };

  return (
    <UserProfileCard
      profileImage={user?.profile_image ?? ''}
      nickname={user?.nickname ?? ''}
      updatedAt={new Date().toISOString().split('T')[0]}
      grade={convertGrade(user?.grade ?? 'GOOD')}                    
    />
  );
};

export default MyPageHeader;
