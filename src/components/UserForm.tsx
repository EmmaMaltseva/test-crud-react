import { Button, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { User } from "@/types/user";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const schema = yup.object({
  name: yup.string().required('Введите имя').min(2, 'Минимум 2 символа'),
  email: yup.string().email('Неверный email').required('Введите email'),
  phone: yup
    .string()
    .required('Введите телефон')
    .matches(/^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, 'Введите корректный формат: +7 (9XX) XXX-XX-XX'),
  role: yup.string().oneOf(['Admin', 'User', 'Manager']).required('Выберите роль'),
});

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (data: Omit<User, 'id'>) => void;
}

export function UserForm({ initialValues, onSubmit }: UserFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(initialValues?.id)

  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'User',
      ...initialValues
    },
    mode: 'onTouched',
  })

  return (
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
          <Link href="/users" prefetch>
            <Button color="cyan">
              Отменить
            </Button>
          </Link>
          <Button type="primary" htmlType="submit">
            {isEditMode ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </Form.Item>
    </Form>
    )
}