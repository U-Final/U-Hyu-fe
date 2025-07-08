import type { ButtonBaseProps } from "@/shared/components/ui/ButtonBase";
import { ButtonBase } from "@/shared/components/ui/ButtonBase";

export const GhostButton = ({ type = "button", ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="ghost" type={type} {...props} />;
};
