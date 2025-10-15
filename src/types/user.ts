export type UserRole = 'Admin' | 'User' | 'Manager';
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}