import { FiPlusCircle } from 'react-icons/fi';

interface AddMyMapButtonProps {
  onCreateNewMap: () => void;
}

const AddMyMapButton: React.FC<AddMyMapButtonProps> = ({ onCreateNewMap }) => {
  return (
    <button
      onClick={onCreateNewMap}
      className="flex items-center text-primary font-bold text-body1 py-2 cursor-pointer transition-colors"
    >
      <FiPlusCircle className="mr-2" /> 새 지도 만들기
    </button>
  );
};

export default AddMyMapButton;
