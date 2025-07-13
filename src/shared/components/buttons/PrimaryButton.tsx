import type { ButtonBaseProps } from "@components/buttons/ButtonBase";
import { ButtonBase } from "@components/buttons/ButtonBase";

export const PrimaryButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="primary" type={type} {...props} />;
};
