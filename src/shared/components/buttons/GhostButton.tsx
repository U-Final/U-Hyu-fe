import { ButtonBase } from '@/shared/components';
import type { ButtonBaseProps } from '@/shared/components/buttons/ButtonBase';

export const GhostButton = ({
  type = 'button',
  className = '',
  ...props
}: ButtonBaseProps) => {
  return (
    <ButtonBase variant="ghost" type={type} className={className} {...props} />
  );
};
