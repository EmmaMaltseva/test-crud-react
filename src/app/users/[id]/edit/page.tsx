'use client'
import { useParams, useRouter } from "next/navigation";
import { message} from 'antd';
import { useUserStore } from "@/store/userStrore";
import Breadcrumbs from "@/components/Breadcrumbs";
import { UserForm } from "@/components/UserForm";


export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { getUserById, updateUser } = useUserStore();
  const userId = params?.id as string;
  const user = getUserById(userId);
  if (!user) {
    message.error('Пользователь не найден');
    router.push('/users');
    return null;
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Пользователи', href: '/users' },
          {
            label: 'Редактирование пользователя',
            href: `/users/${userId}/edit`,
            active: true,
          },
        ]}
      />
      <UserForm 
        initialValues={user}
        onSubmit={(data) => {
          updateUser(userId, data);
          message.success('Пользователь успешно обновлён');
          router.push('/users');
        }}
      />
    </div>
  )
}