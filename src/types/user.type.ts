export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  email: string;
  avatar: string;
  password: string;
  type: 'base' | 'pro';
}
