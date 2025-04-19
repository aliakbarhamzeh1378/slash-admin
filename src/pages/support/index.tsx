import { Iconify } from '@/components/icon';
import { Button, Card, Col, List, Row, Statistic, Typography } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const SupportIndex: React.FC = () => {
  const navigate = useNavigate();

  const recentTickets = [
    { id: 1, title: 'Account Access Issue', status: 'Open', date: '2024-03-20' },
    { id: 2, title: 'Billing Question', status: 'Resolved', date: '2024-03-19' },
    { id: 3, title: 'Feature Request', status: 'In Progress', date: '2024-03-18' },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Support Dashboard</Title>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Open Tickets"
              value={5}
              prefix={<Iconify icon="mdi:ticket-outline" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Response Time"
              value="2.5h"
              prefix={<Iconify icon="mdi:clock-outline" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Knowledge Base Articles"
              value={42}
              prefix={<Iconify icon="mdi:book-open-page-variant" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Support Team Online"
              value={8}
              prefix={<Iconify icon="mdi:account-group" />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Support Tickets">
            <List
              dataSource={recentTickets}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key={`view-${item.id}`}
                      type="link"
                      onClick={() => navigate(`/support/tickets/${item.id}`)}
                    >
                      View Details
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={`Status: ${item.status} | Date: ${item.date}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="flex flex-col gap-4">
              <Button
                type="primary"
                icon={<Iconify icon="mdi:plus" />}
                onClick={() => navigate('/support/contact')}
              >
                Create New Ticket
              </Button>
              <Button
                icon={<Iconify icon="mdi:book-open" />}
                onClick={() => navigate('/support/guide')}
              >
                View Documentation
              </Button>
              <Button
                icon={<Iconify icon="mdi:frequently-asked-questions" />}
                onClick={() => navigate('/support/faq')}
              >
                Browse FAQs
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SupportIndex; 