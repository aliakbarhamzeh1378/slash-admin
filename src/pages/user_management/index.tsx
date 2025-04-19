import { Iconify } from '@/components/icon';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

const { Text } = Typography;

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'assistant';
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  lastMessageAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'blocked';
  lastLogin: string;
  createdAt: string;
  chatSessions: ChatSession[];
}

const UserManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [isSessionModalVisible, setIsSessionModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  // Mock data - Replace with actual API call
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUsers: User[] = [
        {
          id: '1',
          username: 'john_doe',
          email: 'john.doe@example.com',
          status: 'active',
          lastLogin: '2024-03-20T10:00:00Z',
          createdAt: '2024-01-01T00:00:00Z',
          chatSessions: [
            {
              id: 'session1',
              title: 'General Support',
              createdAt: '2024-03-19T10:00:00Z',
              lastMessageAt: '2024-03-19T11:00:00Z',
              messages: [
                {
                  id: 'msg1',
                  content: "Hello, I need help with my account",
                  timestamp: '2024-03-19T10:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg2',
                  content: "Sure, I can help you with that. What seems to be the issue?",
                  timestamp: '2024-03-19T10:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg3',
                  content: "I can't access my dashboard",
                  timestamp: '2024-03-19T10:10:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg4',
                  content: "I understand. Have you tried clearing your browser cache?",
                  timestamp: '2024-03-19T10:15:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg5',
                  content: "Yes, I've tried that but it didn't help",
                  timestamp: '2024-03-19T10:20:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg6',
                  content: "Let's try resetting your session. Could you please log out and log back in?",
                  timestamp: '2024-03-19T10:25:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg7',
                  content: "I've done that already",
                  timestamp: '2024-03-19T10:30:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg8',
                  content: "I'll need to check your account settings. Could you confirm your email address?",
                  timestamp: '2024-03-19T10:35:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg9',
                  content: "It's john.doe@example.com",
                  timestamp: '2024-03-19T10:40:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg10',
                  content: "I've found the issue. Your account has been temporarily locked due to multiple failed login attempts. I'll unlock it now.",
                  timestamp: '2024-03-19T10:45:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg11',
                  content: "Thank you! Can I try logging in now?",
                  timestamp: '2024-03-19T10:50:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg12',
                  content: "Yes, you should be able to access your dashboard now. Let me know if you need any further assistance!",
                  timestamp: '2024-03-19T10:55:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '2',
          username: 'jane_smith',
          email: 'jane.smith@example.com',
          status: 'active',
          lastLogin: '2024-03-19T15:30:00Z',
          createdAt: '2024-01-15T00:00:00Z',
          chatSessions: [
            {
              id: 'session2',
              title: 'API Integration Help',
              createdAt: '2024-03-18T14:00:00Z',
              lastMessageAt: '2024-03-18T15:30:00Z',
              messages: [
                {
                  id: 'msg13',
                  content: "I need help integrating the API into my application",
                  timestamp: '2024-03-18T14:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg14',
                  content: "I can help you with that. Which programming language are you using?",
                  timestamp: '2024-03-18T14:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg15',
                  content: "I'm using Python with Flask",
                  timestamp: '2024-03-18T14:10:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg16',
                  content: "Great! Here's a sample code snippet to get you started...",
                  timestamp: '2024-03-18T14:15:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg17',
                  content: "Could you explain the authentication process?",
                  timestamp: '2024-03-18T14:20:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg18',
                  content: "You'll need to use OAuth 2.0 for authentication. Here's how to implement it...",
                  timestamp: '2024-03-18T14:25:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg19',
                  content: "What about rate limiting?",
                  timestamp: '2024-03-18T14:30:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg20',
                  content: "We have a rate limit of 1000 requests per hour per API key. You can monitor your usage in the dashboard.",
                  timestamp: '2024-03-18T14:35:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg21',
                  content: "How do I handle errors?",
                  timestamp: '2024-03-18T14:40:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg22',
                  content: "All errors return standard HTTP status codes. Here's a list of common errors and how to handle them...",
                  timestamp: '2024-03-18T14:45:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg23',
                  content: "Thanks for the help!",
                  timestamp: '2024-03-18T14:50:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg24',
                  content: "You're welcome! Let me know if you need any clarification or run into issues.",
                  timestamp: '2024-03-18T14:55:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '3',
          username: 'bob_wilson',
          email: 'bob.wilson@example.com',
          status: 'blocked',
          lastLogin: '2024-03-15T09:45:00Z',
          createdAt: '2024-02-01T00:00:00Z',
          chatSessions: [
            {
              id: 'session3',
              title: 'Billing Issue',
              createdAt: '2024-03-14T09:00:00Z',
              lastMessageAt: '2024-03-14T10:00:00Z',
              messages: [
                {
                  id: 'msg25',
                  content: "I was charged twice for my subscription",
                  timestamp: '2024-03-14T09:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg26',
                  content: "I apologize for the inconvenience. Could you please provide your transaction ID?",
                  timestamp: '2024-03-14T09:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg27',
                  content: "Here's the transaction ID: TXN123456",
                  timestamp: '2024-03-14T09:10:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg28',
                  content: "Thank you. I can see the duplicate charge. I'll initiate a refund right away.",
                  timestamp: '2024-03-14T09:15:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg29',
                  content: "How long will the refund take?",
                  timestamp: '2024-03-14T09:20:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg30',
                  content: "The refund should appear in your account within 5-7 business days.",
                  timestamp: '2024-03-14T09:25:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg31',
                  content: "That's too long. I need the money back immediately",
                  timestamp: '2024-03-14T09:30:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg32',
                  content: "I understand your concern. I can escalate this to our finance team for faster processing.",
                  timestamp: '2024-03-14T09:35:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg33',
                  content: "Please do that",
                  timestamp: '2024-03-14T09:40:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg34',
                  content: "I've escalated your case. You should receive an email from our finance team within the next hour.",
                  timestamp: '2024-03-14T09:45:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg35',
                  content: "Thank you for your help",
                  timestamp: '2024-03-14T09:50:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg36',
                  content: "You're welcome. I'm sorry for the inconvenience. Is there anything else I can help you with?",
                  timestamp: '2024-03-14T09:55:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '4',
          username: 'alice_brown',
          email: 'alice.brown@example.com',
          status: 'active',
          lastLogin: '2024-03-20T08:20:00Z',
          createdAt: '2024-02-15T00:00:00Z',
          chatSessions: [
            {
              id: 'session4',
              title: 'Feature Request',
              createdAt: '2024-03-19T11:00:00Z',
              lastMessageAt: '2024-03-19T12:00:00Z',
              messages: [
                {
                  id: 'msg37',
                  content: "Would it be possible to add dark mode support?",
                  timestamp: '2024-03-19T11:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg38',
                  content: "Thank you for your suggestion! We're actually working on this feature and it should be available in the next release.",
                  timestamp: '2024-03-19T11:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg39',
                  content: "That's great to hear! When can we expect the release?",
                  timestamp: '2024-03-19T11:10:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg40',
                  content: "We're aiming for the end of this month. I'll make sure to notify you when it's available.",
                  timestamp: '2024-03-19T11:15:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg41',
                  content: "Will it include custom color themes?",
                  timestamp: '2024-03-19T11:20:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg42',
                  content: "Yes, users will be able to customize their theme colors.",
                  timestamp: '2024-03-19T11:25:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg43',
                  content: "What about system theme detection?",
                  timestamp: '2024-03-19T11:30:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg44',
                  content: "That's also planned for the initial release. The app will automatically match your system preferences.",
                  timestamp: '2024-03-19T11:35:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg45',
                  content: "Perfect! Can't wait for the release",
                  timestamp: '2024-03-19T11:40:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg46',
                  content: "We're excited to release it! I'll make sure to send you a notification when it's live.",
                  timestamp: '2024-03-19T11:45:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg47',
                  content: "Thanks for the information!",
                  timestamp: '2024-03-19T11:50:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg48',
                  content: "You're welcome! Let me know if you have any other feature requests.",
                  timestamp: '2024-03-19T11:55:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '5',
          username: 'charlie_davis',
          email: 'charlie.davis@example.com',
          status: 'active',
          lastLogin: '2024-03-18T14:15:00Z',
          createdAt: '2024-03-01T00:00:00Z',
          chatSessions: [
            {
              id: 'session5',
              title: 'Technical Support',
              createdAt: '2024-03-17T16:00:00Z',
              lastMessageAt: '2024-03-17T17:00:00Z',
              messages: [
                {
                  id: 'msg49',
                  content: "The dashboard is not loading properly on mobile devices",
                  timestamp: '2024-03-17T16:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg50',
                  content: "Could you please specify which mobile device and browser you're using?",
                  timestamp: '2024-03-17T16:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg51',
                  content: "iPhone 13, Safari browser",
                  timestamp: '2024-03-17T16:10:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg52',
                  content: "What version of iOS are you running?",
                  timestamp: '2024-03-17T16:15:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg53',
                  content: "iOS 16.5",
                  timestamp: '2024-03-17T16:20:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg54',
                  content: "Could you describe what exactly happens when you try to load the dashboard?",
                  timestamp: '2024-03-17T16:25:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg55',
                  content: "The page loads but charts are not displaying correctly",
                  timestamp: '2024-03-17T16:30:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg56',
                  content: "Have you tried clearing your browser cache and cookies?",
                  timestamp: '2024-03-17T16:35:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg57',
                  content: "Yes, I've tried that",
                  timestamp: '2024-03-17T16:40:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg58',
                  content: "Let's try accessing the dashboard in a private browsing window to rule out cache issues",
                  timestamp: '2024-03-17T16:45:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg59',
                  content: "Same issue in private browsing",
                  timestamp: '2024-03-17T16:50:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg60',
                  content: "I'll create a support ticket for our development team. They'll investigate this issue with Safari on iOS 16.5.",
                  timestamp: '2024-03-17T16:55:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '6',
          username: 'emma_taylor',
          email: 'emma.taylor@example.com',
          status: 'blocked',
          lastLogin: '2024-03-10T11:30:00Z',
          createdAt: '2024-03-05T00:00:00Z',
          chatSessions: [
            {
              id: 'session6',
              title: 'Account Security',
              createdAt: '2024-03-09T10:00:00Z',
              lastMessageAt: '2024-03-09T11:00:00Z',
              messages: [
                {
                  id: 'msg16',
                  content: 'I received a suspicious login attempt notification',
                  timestamp: '2024-03-09T10:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg17',
                  content: "I've reviewed the login attempt and it appears to be from an unknown location. I recommend changing your password immediately.",
                  timestamp: '2024-03-09T10:05:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '7',
          username: 'michael_johnson',
          email: 'michael.johnson@example.com',
          status: 'active',
          lastLogin: '2024-03-20T09:00:00Z',
          createdAt: '2024-03-10T00:00:00Z',
          chatSessions: [
            {
              id: 'session7',
              title: 'Data Export',
              createdAt: '2024-03-19T13:00:00Z',
              lastMessageAt: '2024-03-19T14:00:00Z',
              messages: [
                {
                  id: 'msg18',
                  content: 'How can I export my data in CSV format?',
                  timestamp: '2024-03-19T13:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg19',
                  content: 'You can find the export option in the Settings menu under "Data Management".',
                  timestamp: '2024-03-19T13:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg20',
                  content: 'Perfect, thank you!',
                  timestamp: '2024-03-19T13:10:00Z',
                  sender: 'user'
                }
              ]
            }
          ]
        },
        {
          id: '8',
          username: 'sarah_williams',
          email: 'sarah.williams@example.com',
          status: 'active',
          lastLogin: '2024-03-19T16:45:00Z',
          createdAt: '2024-03-12T00:00:00Z',
          chatSessions: [
            {
              id: 'session8',
              title: 'Integration Support',
              createdAt: '2024-03-18T15:00:00Z',
              lastMessageAt: '2024-03-18T16:00:00Z',
              messages: [
                {
                  id: 'msg21',
                  content: 'The webhook integration is not working as expected',
                  timestamp: '2024-03-18T15:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg22',
                  content: "Could you share the webhook URL and the error message you're receiving?",
                  timestamp: '2024-03-18T15:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg23',
                  content: "Here's the URL: https://example.com/webhook and I'm getting a 404 error",
                  timestamp: '2024-03-18T15:10:00Z',
                  sender: 'user'
                }
              ]
            }
          ]
        },
        {
          id: '9',
          username: 'david_miller',
          email: 'david.miller@example.com',
          status: 'blocked',
          lastLogin: '2024-03-14T13:20:00Z',
          createdAt: '2024-03-15T00:00:00Z',
          chatSessions: [
            {
              id: 'session9',
              title: 'Account Verification',
              createdAt: '2024-03-13T12:00:00Z',
              lastMessageAt: '2024-03-13T13:00:00Z',
              messages: [
                {
                  id: 'msg24',
                  content: "I haven't received my verification email",
                  timestamp: '2024-03-13T12:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg25',
                  content: "I've resent the verification email. Please check your spam folder as well.",
                  timestamp: '2024-03-13T12:05:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        },
        {
          id: '10',
          username: 'lisa_anderson',
          email: 'lisa.anderson@example.com',
          status: 'active',
          lastLogin: '2024-03-20T07:30:00Z',
          createdAt: '2024-03-18T00:00:00Z',
          chatSessions: [
            {
              id: 'session10',
              title: 'Custom Reports',
              createdAt: '2024-03-19T09:00:00Z',
              lastMessageAt: '2024-03-19T10:00:00Z',
              messages: [
                {
                  id: 'msg26',
                  content: 'How can I create a custom report with specific metrics?',
                  timestamp: '2024-03-19T09:00:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg27',
                  content: 'You can use our Report Builder tool. Go to Analytics > Custom Reports > New Report',
                  timestamp: '2024-03-19T09:05:00Z',
                  sender: 'assistant'
                },
                {
                  id: 'msg28',
                  content: 'Which metrics are available for custom reports?',
                  timestamp: '2024-03-19T09:10:00Z',
                  sender: 'user'
                },
                {
                  id: 'msg29',
                  content: "We support all standard metrics plus custom event tracking. Here's a list of available metrics...",
                  timestamp: '2024-03-19T09:15:00Z',
                  sender: 'assistant'
                }
              ]
            }
          ]
        }
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

  const handleViewSessions = (user: User) => {
    setSelectedUser(user);
    setIsSessionModalVisible(true);
  };

  const handleViewMessages = (session: ChatSession) => {
    setSelectedSession(session);
    setIsMessageModalVisible(true);
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
          <Button
            type="primary"
            icon={<Iconify icon="mdi:chat" />}
            onClick={() => handleViewSessions(record)}
          >
            View Sessions
          </Button>
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
    <>
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
            defaultPageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
        />
      </Card>

      <Modal
        title={`Chat Sessions - ${selectedUser?.username}`}
        open={isSessionModalVisible}
        onCancel={() => setIsSessionModalVisible(false)}
        footer={null}
        width={800}
      >
        <List
          dataSource={selectedUser?.chatSessions || []}
          renderItem={(session) => (
            <List.Item
              actions={[
                <Button
                  key="view"
                  type="primary"
                  onClick={() => handleViewMessages(session)}
                >
                  View Messages
                </Button>
              ]}
            >
              <List.Item.Meta
                title={session.title}
                description={`Created: ${new Date(session.createdAt).toLocaleString()}`}
              />
              <Text type="secondary">
                Last message: {new Date(session.lastMessageAt).toLocaleString()}
              </Text>
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title={`Messages - ${selectedSession?.title}`}
        open={isMessageModalVisible}
        onCancel={() => setIsMessageModalVisible(false)}
        footer={null}
        width={800}
      >
        <List
          dataSource={selectedSession?.messages || []}
          renderItem={(message) => (
            <List.Item>
              <List.Item.Meta
                title={message.sender === 'user' ? 'User' : 'Assistant'}
                description={new Date(message.timestamp).toLocaleString()}
              />
              <div style={{
                padding: '8px 16px',
                backgroundColor: message.sender === 'user' ? '#e6f7ff' : '#f6ffed',
                borderRadius: '8px',
                maxWidth: '70%'
              }}>
                {message.content}
              </div>
            </List.Item>
          )}
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: '0 16px'
          }}
        />
      </Modal>
    </>
  );
};

export default UserManagementPage; 