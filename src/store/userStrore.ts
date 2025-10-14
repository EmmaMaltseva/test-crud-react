import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

const defaultUsers: User[] = [
  {
    id: '1a2b3c4d-0001-4f5e-9a1b-123456789001',
    name: 'Алексей Смирнов',
    email: 'alexey.smirnov@example.com',
    phone: '+7 (901) 123-45-01',
    role: 'Admin'
  },
  {
    id: '1a2b3c4d-0002-4f5e-9a1b-123456789002',
    name: 'Мария Иванова',
    email: 'maria.ivanova@example.com',
    phone: '+7 (902) 234-56-02',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0003-4f5e-9a1b-123456789003',
    name: 'Дмитрий Кузнецов',
    email: 'dmitry.kuznetsov@example.com',
    phone: '+7 (903) 345-67-03',
    role: 'Manager'
  },
  {
    id: '1a2b3c4d-0004-4f5e-9a1b-123456789004',
    name: 'Екатерина Попова',
    email: 'ekaterina.popova@example.com',
    phone: '+7 (904) 456-78-04',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0005-4f5e-9a1b-123456789005',
    name: 'Сергей Лебедев',
    email: 'sergey.lebedev@example.com',
    phone: '+7 (905) 567-89-05',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0006-4f5e-9a1b-123456789006',
    name: 'Ольга Козлова',
    email: 'olga.kozlova@example.com',
    phone: '+7 (906) 678-90-06',
    role: 'Manager'
  },
  {
    id: '1a2b3c4d-0007-4f5e-9a1b-123456789007',
    name: 'Иван Новиков',
    email: 'ivan.novikov@example.com',
    phone: '+7 (907) 789-01-07',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0008-4f5e-9a1b-123456789008',
    name: 'Анна Морозова',
    email: 'anna.morozova@example.com',
    phone: '+7 (908) 890-12-08',
    role: 'Admin'
  },
  {
    id: '1a2b3c4d-0009-4f5e-9a1b-123456789009',
    name: 'Павел Воробьев',
    email: 'pavel.vorobev@example.com',
    phone: '+7 (909) 901-23-09',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0010-4f5e-9a1b-123456789010',
    name: 'Татьяна Федорова',
    email: 'tatiana.fedorova@example.com',
    phone: '+7 (910) 012-34-10',
    role: 'Manager'
  },
  {
    id: '1a2b3c4d-0011-4f5e-9a1b-123456789011',
    name: 'Андрей Егоров',
    email: 'andrey.egorov@example.com',
    phone: '+7 (911) 123-45-11',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0012-4f5e-9a1b-123456789012',
    name: 'Елена Соколова',
    email: 'elena.sokolova@example.com',
    phone: '+7 (912) 234-56-12',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0013-4f5e-9a1b-123456789013',
    name: 'Владимир Павлов',
    email: 'vladimir.pavlov@example.com',
    phone: '+7 (913) 345-67-13',
    role: 'Admin'
  },
  {
    id: '1a2b3c4d-0014-4f5e-9a1b-123456789014',
    name: 'Наталья Васильева',
    email: 'natalia.vasileva@example.com',
    phone: '+7 (914) 456-78-14',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0015-4f5e-9a1b-123456789015',
    name: 'Константин Голубев',
    email: 'konstantin.golubev@example.com',
    phone: '+7 (915) 567-89-15',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0016-4f5e-9a1b-123456789016',
    name: 'Марина Куликова',
    email: 'marina.kulikova@example.com',
    phone: '+7 (916) 678-90-16',
    role: 'Manager'
  },
  {
    id: '1a2b3c4d-0017-4f5e-9a1b-123456789017',
    name: 'Денис Никитин',
    email: 'denis.nikitin@example.com',
    phone: '+7 (917) 789-01-17',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0018-4f5e-9a1b-123456789018',
    name: 'Светлана Белова',
    email: 'svetlana.belova@example.com',
    phone: '+7 (918) 890-12-18',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0019-4f5e-9a1b-123456789019',
    name: 'Артём Киселев',
    email: 'artem.kiselev@example.com',
    phone: '+7 (919) 901-23-19',
    role: 'User'
  },
  {
    id: '1a2b3c4d-0020-4f5e-9a1b-123456789020',
    name: 'Юлия Григорьева',
    email: 'yulia.grigorieva@example.com',
    phone: '+7 (920) 012-34-20',
    role: 'Manager'
  }
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