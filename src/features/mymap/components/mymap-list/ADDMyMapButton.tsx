import { FiPlusCircle } from 'react-icons/fi';

interface ADDMyMapButtonProps {
  onCreateNewMap: () => void;
}

const AddMyMapButton: React.FC<ADDMyMapButtonProps> = ({ onCreateNewMap }) => {
  return (
    <button
      onClick={onCreateNewMap}
      className="flex items-center text-primary font-bold text-body1 py-2 hover:bg-light-gray-hover cursor-pointer transition-colors"
    >
      <FiPlusCircle className="mr-2" /> 새 지도 만들기
    </button>
  );
};

export default AddMyMapButton;
