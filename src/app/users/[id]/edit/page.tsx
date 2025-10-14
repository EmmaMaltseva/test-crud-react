'use client'
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Input, message, Select } from 'antd';
import { useUserStore } from "@/store/userStrore";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

const schema = yup.object({
  name: yup.string().required('Введите имя').min(2, 'Минимум 2 символа'),
  email: yup.string().email('Неверный email').required('Введите email'),
  phone: yup
    .string()
    .required('Введите телефон')
    .matches(/^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, 'Введите корректный формат: +7 (9XX) XXX-XX-XX'),
  role: yup.string().oneOf(['Admin', 'User', 'Manager']).required('Выберите роль'),
});

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { getUserById, updateUser } = useUserStore();
  const userId = params?.id as string;

  const { control, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  useEffect(() => {
    const user = getUserById(userId);
    if (user) {
      reset(user);
    } else {
      message.error('Пользователь не найден');
      router.push('/users');
    }
  }, [userId, getUserById, reset, router]);

  const onSubmit = (data: any) => {
    updateUser(userId, data);
    message.success('Пользователь успешно обновлен');
    router.push('/users');
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
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Имя" validateStatus={errors.name ? 'error': ''} help={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Иван"/>}
          />
        </Form.Item>
        <Form.Item label="Email" validateStatus={errors.email ? 'error': ''} help={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="example@gmail.com"/>}
          />
        </Form.Item>
        <Form.Item label="Телефон" validateStatus={errors.phone ? 'error': ''} help={errors.phone?.message}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input {...field} placeholder="+7 (999) 000-00-00" />}
          />
        </Form.Item>
        <Form.Item label="Роль" validateStatus={errors.role ? 'error': ''} help={errors.role?.message}>
          <Controller 
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { label: 'Admin', value: 'Admin' },
                  { label: 'Manager', value: 'Manager' },
                  { label: 'User', value: 'User' },
                ]}
                placeholder="Выберите роль"
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end gap-3">
            <Button onClick={() => router.push('/users')} color="cyan">
              Отменить
            </Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}