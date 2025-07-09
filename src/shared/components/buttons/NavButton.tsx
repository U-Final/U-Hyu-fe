import type { ButtonBaseProps } from "@/shared/components/buttons/ButtonBase";
import { ButtonBase } from "@/shared/components/buttons/ButtonBase";

export const NavButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="nav" type={type} {...props} />;
};
