import { FiPlusCircle } from 'react-icons/fi';

interface ADDMyMapButtonProps {
  onCreateNewMap: () => void;
}

const ADDMyMapButton: React.FC<ADDMyMapButtonProps> = ({ onCreateNewMap }) => {
  return (
    <div className="hover:bg-light-gray-hover cursor-pointer">
      <button
        onClick={onCreateNewMap}
        className="flex items-center text-primary font-bold text-body1 py-2 "
      >
        <FiPlusCircle className="mr-2" /> 새 지도 만들기
      </button>
    </div>
  );
};

export default ADDMyMapButton;
