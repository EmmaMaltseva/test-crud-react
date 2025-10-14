'use client'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStrore";
import { Button, Table, Space } from 'antd';
import { User } from "@/types/user";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnsType } from "antd/es/table";

export default function UserTable() {
  const router = useRouter();
  const { users, deleteUser} = useUserStore();

  const columns: ColumnsType<User> = [
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    { title: 'Роль', dataIndex: 'role', key: 'role' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_text, user) => (
        <Space>
          <Button onClick={() => router.push(`/users/${user.id}/edit`)} icon={<EditOutlined />}></Button>
          <Button danger onClick={() => deleteUser(user.id)} icon={<DeleteOutlined />}></Button>
        </Space>
      ),
      width: 1,
    }
  ]

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex justify-end">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('/users/create')} style={{ marginBottom: 16 }}>
          Добавить пользователя
        </Button>
      </div>
      <Table 
        rowKey="id"
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}
