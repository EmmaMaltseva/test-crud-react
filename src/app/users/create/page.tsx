'use client'
import { useRouter } from "next/navigation";
import { message } from 'antd';
import { useUserStore } from "@/store/userStrore";
import Breadcrumbs from "@/components/Breadcrumbs";
import { UserForm } from "@/components/userForm/UserForm";

export default function CreateUserPage() {
  const router = useRouter();
  const { addUser } = useUserStore();
  
  return (
    <div className="w-full max-w-3xl">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Пользователи', href: '/users' },
          {
            label: 'Создание',
            href: `/users/create`,
            active: true,
          },
        ]}
      />
      <UserForm 
        onSubmit={(data) => {
          addUser(data);
          message.success('Пользователь успешно добавлен');
          router.push('/users');
        }}
      />
    </div>
  )
}