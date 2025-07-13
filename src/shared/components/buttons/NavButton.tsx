import type { ButtonBaseProps } from '@components/buttons/ButtonBase';
import { ButtonBase } from '@components/buttons/ButtonBase';

export const NavButton = ({ type = 'button', ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="nav" type={type} {...props} />;
};
