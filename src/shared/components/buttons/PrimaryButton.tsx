import type { ButtonBaseProps } from "@/shared/components/buttons/ButtonBase";
import { ButtonBase } from "@/shared/components/buttons/ButtonBase";

export const PrimaryButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="primary" type={type} {...props} />;
};
