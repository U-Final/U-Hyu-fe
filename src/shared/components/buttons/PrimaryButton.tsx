import type { ButtonBaseProps } from "@/shared/components/ui/ButtonBase";
import { ButtonBase } from "@/shared/components/ui/ButtonBase";

export const PrimaryButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="primary" type={type} {...props} />;
};
