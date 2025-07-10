import type { NavItemProps } from "./NavItem.types";

const BarcodeItem = ({ label, icon, onClick, isActive }: NavItemProps) => {
  return (
    <div
      className={`w-12 h-12 absolute bottom-4 flex flex-col items-center justify-center text-white font- hover:bg-black hover:text-white rounded-full cursor-pointer transition-all duration-300 
        ${isActive ? "bg-black" : "bg-gray"} `}
      onClick={onClick}
    >
      <span className="">{icon}</span>
      <span className="mt-1">{label}</span>
    </div>
  );
};

export default BarcodeItem;