export type UserId = string;

export type User = {
  id?: UserId;
  name: string;
  email: string;
  avatar: string;
  type: 'base' | 'pro';
}
