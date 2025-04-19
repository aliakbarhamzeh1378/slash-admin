import { Iconify } from '@/components/icon';
import { Button, Card, Modal, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'blocked';
  lastLogin: string;
  createdAt: string;
}

const UserManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Mock data - Replace with actual API call
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUsers: User[] = [
        {
          id: '1',
          username: 'user1',
          email: 'user1@example.com',
          status: 'active',
          lastLogin: '2024-03-20T10:00:00Z',
          createdAt: '2024-01-01T00:00:00Z',
        },
        // Add more mock users as needed
      ];
      setUsers(mockUsers);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId: string) => {
    try {
      // TODO: Replace with actual API call
      message.success('User blocked successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      message.error('Failed to block user');
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      // TODO: Replace with actual API call
      message.success('User unblocked successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      message.error('Failed to unblock user');
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'active' ? (
            <Button
              danger
              icon={<Iconify icon="mdi:block-helper" />}
              onClick={() => {
                Modal.confirm({
                  title: 'Block User',
                  content: `Are you sure you want to block ${record.username}?`,
                  onOk: () => handleBlockUser(record.id),
                });
              }}
            >
              Block
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<Iconify icon="mdi:check-circle" />}
              onClick={() => {
                Modal.confirm({
                  title: 'Unblock User',
                  content: `Are you sure you want to unblock ${record.username}?`,
                  onOk: () => handleUnblockUser(record.id),
                });
              }}
            >
              Unblock
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="SDK User Management"
      extra={
        <Button type="primary" onClick={fetchUsers}>
          Refresh
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
      />
    </Card>
  );
};

export default UserManagementPage; 