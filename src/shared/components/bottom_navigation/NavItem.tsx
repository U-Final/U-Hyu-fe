import type { NavItemProps } from '@/shared/components/bottom_navigation/NavItem.types';

const NavItem = ({ label, icon, onClick, isActive, disabled = false }: NavItemProps) => {
  return (
    <div
      className={`w-12 h-12 flex flex-col items-center cursor-pointer transition-opacity 
        ${isActive ? 'text-black' : 'text-gray'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
      onClick={disabled ? undefined : onClick}
    >
      <span className="text-base">{icon}</span>
      <span className="mt-1">{label}</span>
    </div>
  );
};

export default NavItem;
