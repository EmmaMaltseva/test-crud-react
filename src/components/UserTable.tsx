'use client'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStrore";
import { Button, Table, Space, List, Card, PaginationProps, Modal, Descriptions } from 'antd';
import { User } from "@/types/user";
import { PlusOutlined, EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";

export default function UserTable() {
  const router = useRouter();
  const { users, deleteUser} = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageSize = 10;
  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const showModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
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
          <Link href={`/users/${user.id}/edit`} prefetch>
            <Button icon={<EditOutlined />} onClick={(e) => e.stopPropagation()}></Button>
          </Link>
          <Button danger onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }} icon={<DeleteOutlined />}></Button>
        </Space>
      ),
      width: 1,
    }
  ]

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-end">
        <Link href="/users/create" prefetch>
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
              onClick={() => showModal(user)}
              actions={[
                <Button key={`edit-${user.id}`} onClick={(e) => { e.stopPropagation(); router.push(`/users/${user.id}/edit`); }} icon={<EditOutlined />}></Button>,
                <Button key={`delete-${user.id}`} danger onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }} icon={<DeleteOutlined />}></Button>,
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
          onRow={(user) => ({
            onClick: () => showModal(user),
          })}
        />
      </div>

      <Modal
        title={selectedUser?.name}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Закрыть
          </Button>,
          <Button key="edit" type="primary" onClick={() => router.push(`/users/${selectedUser?.id}/edit`)}>
            Редактировать
          </Button>,
        ]}
      >
        {selectedUser && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Телефон">{selectedUser.phone}</Descriptions.Item>
            <Descriptions.Item label="Роль">{selectedUser.role}</Descriptions.Item>
            <Descriptions.Item label="ID">{selectedUser.id}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}
