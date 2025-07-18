import type { ButtonBaseProps } from '@/shared/components/buttons/ButtonBase';
import { ButtonBase } from '@/shared/components';

export const PrimaryButton = ({
  type = 'button',
  disabled = false,
  ...props
}: ButtonBaseProps) => {
  return (
    <ButtonBase variant="primary" type={type} disabled={disabled} {...props} />
  );
};
