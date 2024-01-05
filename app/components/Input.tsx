import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  id: string;
  type?: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
};

const Input: FC<Props> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return <div></div>;
};

export default Input;
