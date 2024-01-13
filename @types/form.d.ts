type Variant = 'LOGIN' | 'REGISTER';
type FormFields = Pick<User, 'name' | 'email'> &
  Record<'password' | 'confirm', string>;
type FormSchema = Record<keyof FormFields, z.ZodString>;
