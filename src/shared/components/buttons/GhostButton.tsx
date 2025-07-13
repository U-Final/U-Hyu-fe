import type { ButtonBaseProps } from '@components/buttons/ButtonBase';
import { ButtonBase } from '@components/buttons/ButtonBase';

export const GhostButton = ({ type = 'button', className = '', ...props }: ButtonBaseProps) => {
  return <ButtonBase variant="ghost" type={type} className={className} {...props} />;
};
