import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

const defaultUsers: User[] = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    email: 'alexey.smirnov@example.com',
    phone: '+7 (901) 123-45-01',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    email: 'maria.ivanova@example.com',
    phone: '+7 (902) 234-56-02',
    role: 'User'
  },
  {
    id: 3,
    name: 'Дмитрий Кузнецов',
    email: 'dmitry.kuznetsov@example.com',
    phone: '+7 (903) 345-67-03',
    role: 'Manager'
  },
  {
    id: 4,
    name: 'Екатерина Попова',
    email: 'ekaterina.popova@example.com',
    phone: '+7 (904) 456-78-04',
    role: 'User'
  },
  {
    id: 5,
    name: 'Сергей Лебедев',
    email: 'sergey.lebedev@example.com',
    phone: '+7 (905) 567-89-05',
    role: 'User'
  },
  {
    id: 6,
    name: 'Ольга Козлова',
    email: 'olga.kozlova@example.com',
    phone: '+7 (906) 678-90-06',
    role: 'Manager'
  },
  {
    id: 7,
    name: 'Иван Новиков',
    email: 'ivan.novikov@example.com',
    phone: '+7 (907) 789-01-07',
    role: 'User'
  },
  {
    id: 8,
    name: 'Анна Морозова',
    email: 'anna.morozova@example.com',
    phone: '+7 (908) 890-12-08',
    role: 'Admin'
  },
  {
    id: 9,
    name: 'Павел Воробьев',
    email: 'pavel.vorobev@example.com',
    phone: '+7 (909) 901-23-09',
    role: 'User'
  },
  {
    id: 10,
    name: 'Татьяна Федорова',
    email: 'tatiana.fedorova@example.com',
    phone: '+7 (910) 012-34-10',
    role: 'Manager'
  },
  {
    id: 11,
    name: 'Андрей Егоров',
    email: 'andrey.egorov@example.com',
    phone: '+7 (911) 123-45-11',
    role: 'User'
  },
  {
    id: 12,
    name: 'Елена Соколова',
    email: 'elena.sokolova@example.com',
    phone: '+7 (912) 234-56-12',
    role: 'User'
  },
  {
    id: 13,
    name: 'Владимир Павлов',
    email: 'vladimir.pavlov@example.com',
    phone: '+7 (913) 345-67-13',
    role: 'Admin'
  },
  {
    id: 14,
    name: 'Наталья Васильева',
    email: 'natalia.vasileva@example.com',
    phone: '+7 (914) 456-78-14',
    role: 'User'
  },
  {
    id: 15,
    name: 'Константин Голубев',
    email: 'konstantin.golubev@example.com',
    phone: '+7 (915) 567-89-15',
    role: 'User'
  },
  {
    id: 16,
    name: 'Марина Куликова',
    email: 'marina.kulikova@example.com',
    phone: '+7 (916) 678-90-16',
    role: 'Manager'
  },
  {
    id: 17,
    name: 'Денис Никитин',
    email: 'denis.nikitin@example.com',
    phone: '+7 (917) 789-01-17',
    role: 'User'
  },
  {
    id: 18,
    name: 'Светлана Белова',
    email: 'svetlana.belova@example.com',
    phone: '+7 (918) 890-12-18',
    role: 'User'
  },
  {
    id: 19,
    name: 'Артём Киселев',
    email: 'artem.kiselev@example.com',
    phone: '+7 (919) 901-23-19',
    role: 'User'
  },
  {
    id: 20,
    name: 'Юлия Григорьева',
    email: 'yulia.grigorieva@example.com',
    phone: '+7 (920) 012-34-20',
    role: 'Manager'
  }
];

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, data: Partial<User>) => void;
  deleteUser: (id: number) => void;
  getUserById: (id: number) => User | undefined;
}

export const useUserStore = create<UserStore>() (
  persist(
    (set, get) => ({
      users: defaultUsers, //Инициализация начальными данными
      addUser: (user) =>
        set((state) => {
          const nextId = state.users.length > 0 
            ? Math.max(...state.users.map(u => u.id)) + 1 
            : 1;
          
          return {
            users: [...state.users, { ...user, id: nextId }]
          };
        }),
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