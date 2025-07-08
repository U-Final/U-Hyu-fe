import type { ButtonBaseProps } from "@/shared/components/ui/ButtonBase";
import { ButtonBase } from "@/shared/components/ui/ButtonBase";

export const NavButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="nav" type={type} {...props} />;
};
