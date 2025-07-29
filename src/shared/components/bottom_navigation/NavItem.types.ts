export type NavItemProps = {
  label: string;
  icon: React.ReactNode;
  onClick: (e?: React.MouseEvent) => void;
  isActive: boolean;
  disabled?: boolean;
};
