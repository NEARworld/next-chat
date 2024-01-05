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
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
