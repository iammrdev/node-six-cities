export type UserId = string;

export enum UserType {
  Base = 'base',
  Pro = 'pro'
}

export type User = {
  id?: UserId;
  name: string;
  email: string;
  avatar: string;
  type: UserType;
}
