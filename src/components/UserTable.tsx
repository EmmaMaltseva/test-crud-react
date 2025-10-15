'use client'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStrore";
import { Button, Table, Space, List, Card, PaginationProps } from 'antd';
import { User } from "@/types/user";
import { PlusOutlined, EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";

export default function UserTable() {
  const router = useRouter();
  const { users, deleteUser} = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const columns: ColumnsType<User> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 1 },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    { title: 'Роль', dataIndex: 'role', key: 'role' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_text, user) => (
        <Space>
          <Link href={`/users/${user.id}/edit`} prefetch passHref>
            <Button icon={<EditOutlined />}></Button>
          </Link>
          <Button danger onClick={() => deleteUser(user.id)} icon={<DeleteOutlined />}></Button>
        </Space>
      ),
      width: 1,
    }
  ]

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-end">
        <Link href="/users/create" prefetch passHref>
          <Button type="primary" icon={<PlusOutlined />} className="!mb-4">
            Добавить пользователя
          </Button>
        </Link>
      </div>

      <div className="md:hidden">
        <List
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: users.length,
            onChange: handlePageChange,
            align: 'center',
            showSizeChanger: false,
          }}
          dataSource={users}
          renderItem={(user) => (
            <Card
              key={user.id}
              title={user.name}
              extra={<span className="text-gray-500 text-sm">{user.role}</span>}
              className="!mb-3"
              actions={[
                <Button key={`edit-${user.id}`} onClick={() => router.push(`/users/${user.id}/edit`)} icon={<EditOutlined />}></Button>,
                <Button key={`delete-${user.id}`} danger onClick={() => deleteUser(user.id)} icon={<DeleteOutlined />}></Button>,
              ]}
            >
              <p><MailOutlined className="!mr-2"/>{user.email}</p>
              <p><PhoneOutlined className="!mr-2"/>{user.phone}</p>
            </Card>
          )}
        />
      </div>
      
      <div className="hidden md:block">
        <Table 
          size="small"
          rowKey="id"
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    </div>
  );
}
