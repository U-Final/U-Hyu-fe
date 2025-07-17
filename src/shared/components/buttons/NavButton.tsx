import { Link, type LinkProps } from 'react-router-dom';
import { ButtonBase, type ButtonBaseProps } from './ButtonBase';

type NavButtonProps = LinkProps & ButtonBaseProps;

export const NavButton = ({ to, children, ...rest }: NavButtonProps) => {
  return (
    <Link to={to}>
      <ButtonBase variant="nav" {...rest}>
        {children}
      </ButtonBase>
    </Link>
  );
};
