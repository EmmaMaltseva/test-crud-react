import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

const defaultUsers: User[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    phone: '+7 (989) 809-17-37',
    role: 'Admin'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    phone: '+7 (900) 809-17-37',
    role: 'Manager'
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    phone: '+7 (861) 809-17-37',
    role: 'User'
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    phone: '+7 (921) 888-17-37',
    role: 'User'
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    phone: '+7 (921) 888-00-00',
    role: 'User'
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    phone: '+7 (921) 888-11-11',
    role: 'User'
  },
]

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
}

export const useUserStore = create<UserStore>() (
  persist(
    (set, get) => ({
      users: defaultUsers, //Инициализация начальными данными
      addUser: (user) =>
        set((state) => ({
            users: [...state.users, {...user, id: crypto.randomUUID() }]
        })),
      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? {...u, ...data} : u
          ), 
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id)
        })),
      getUserById: (id) => {
        const { users } = get();
        return users.find((u) => u.id === id);
      },
    }),
    { name: 'user-storage' }
  )
);