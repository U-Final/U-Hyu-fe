import type { NavItemProps } from '@/shared/components/bottom_navigation/NavItem.types';

const BarcodeItem = ({ label, icon, onClick, isActive, disabled = false }: NavItemProps) => {
  return (
    <div
      className={`w-12 h-12 z-10 absolute bottom-4 shadow-nav flex flex-col items-center justify-center text-white font- rounded-full cursor-pointer transition-all duration-300 
        ${isActive ? 'bg-black' : 'bg-gray'} 
        ${disabled ? 'opacity-50' : 'hover:bg-black hover:text-white'}`}
      onClick={onClick}
    >
      <span className="text-base">{icon}</span>
      <span className="mt-1">{label}</span>
    </div>
  );
};

export default BarcodeItem;
