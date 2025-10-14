export type UserRole = 'Admin' | 'User' | 'Manager';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}