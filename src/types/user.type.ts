export type UserId = string;

export type UserType = 'base' | 'pro'

export type User = {
  id?: UserId;
  name: string;
  email: string;
  avatar: string;
  type: UserType;
}
