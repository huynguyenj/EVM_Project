export interface CreateAccount {
  username: string;
  password: string;
  fullname?: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export type SignIn = Pick<CreateAccount, 'email' | 'password'>;
export interface JwtPayload {
  userId: string | number;
  role: string;
}
