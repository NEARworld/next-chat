import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { z };
export const fieldNamesRegister: (keyof FormFields)[] = [
  'name',
  'email',
  'password',
  'confirm',
];
export const fieldNamesLogin: (keyof Omit<FormFields, 'name' | 'confirm'>)[] = [
  'email',
  'password',
];

export const formSchemaLogin = z.object<Pick<FormSchema, 'email' | 'password'>>(
  {
    email: z.string().email('유효하지 않은 이메일입니다.'),
    password: z
      .string()
      .min(8, '8글자 이상이어야 합니다.')
      .max(16, '16글자까지 가능합니다.'),
  }
);
export const formSchemaRegister = z
  .object<FormSchema>({
    name: z
      .string()
      .min(2, '2글자 이상이어야 합니다.')
      .max(8, '8글자까지 가능합니다.'),
    email: z.string().email('유효하지 않은 이메일입니다.'),
    password: z
      .string()
      .min(8, '8글자 이상이어야 합니다.')
      .max(16, '16글자까지 가능합니다.'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm'],
  });

export const fieldDetails: Record<
  keyof FormFields,
  { label: string; placeholder: string }
> = {
  name: {
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요',
  },
  email: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
  },
  password: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
  },
  confirm: {
    label: '비밀번호 확인',
    placeholder: '비밀번호를 한 번 더 입력해주세요',
  },
};
