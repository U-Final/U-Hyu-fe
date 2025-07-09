import type { ButtonBaseProps } from "@/shared/components/buttons/ButtonBase";
import { ButtonBase } from "@/shared/components/buttons/ButtonBase";

export const GhostButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="ghost" type={type} {...props} />;
};
