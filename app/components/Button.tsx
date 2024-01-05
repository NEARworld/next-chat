import { FC, PropsWithChildren } from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
};

const Button: FC<PropsWithChildren<Props>> = ({
  type,
  fullWidth,
  onClick,
  secondary,
  danger,
  disabled,
  children,
}) => {
  return <button>button</button>;
};

export default Button;
1;
