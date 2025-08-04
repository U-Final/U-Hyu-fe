import { FiPlusCircle } from 'react-icons/fi';

import { useGA } from '@/shared/hooks/useGA';

interface AddMyMapButtonProps {
  onCreateNewMap: () => void;
}

const AddMyMapButton: React.FC<AddMyMapButtonProps> = ({ onCreateNewMap }) => {
  const { trackMyMapInteraction } = useGA();

  const handleCreateNewMap = () => {
    // GA 추적: 새 지도 만들기 버튼 클릭
    trackMyMapInteraction('create_map_button_clicked');
    onCreateNewMap();
  };

  return (
    <button
      onClick={handleCreateNewMap}
      className="flex items-center text-primary font-bold text-body1 py-2 cursor-pointer transition-colors"
    >
      <FiPlusCircle className="mr-2" /> 새 지도 만들기
    </button>
  );
};

export default AddMyMapButton;
