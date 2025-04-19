import { Iconify } from '@/components/icon';
import { Button, Card, Col, List, Menu, Row, Typography } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Text, Paragraph } = Typography;

const guideSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: 'mdi:rocket-launch',
    articles: [
      {
        id: 'overview',
        title: 'Platform Overview',
        description: 'Learn about the key features and capabilities of our platform',
        path: '/support/guide/overview'
      },
      {
        id: 'account-setup',
        title: 'Account Setup',
        description: 'Step-by-step guide to setting up your account',
        path: '/support/guide/account-setup'
      },
      {
        id: 'first-project',
        title: 'First Project',
        description: 'Create and configure your first project',
        path: '/support/guide/first-project'
      }
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    icon: 'mdi:account-group',
    articles: [
      {
        id: 'team-roles',
        title: 'Team Roles',
        description: 'Understanding different user roles and permissions',
        path: '/support/guide/team-roles'
      },
      {
        id: 'inviting-users',
        title: 'Inviting Users',
        description: 'How to invite and manage team members',
        path: '/support/guide/inviting-users'
      },
      {
        id: 'access-control',
        title: 'Access Control',
        description: 'Setting up and managing access controls',
        path: '/support/guide/access-control'
      }
    ]
  },
  {
    id: 'features',
    title: 'Features & Tools',
    icon: 'mdi:tools',
    articles: [
      {
        id: 'dashboard',
        title: 'Dashboard Overview',
        description: 'Understanding your dashboard and analytics',
        path: '/support/guide/dashboard'
      },
      {
        id: 'project-management',
        title: 'Project Management',
        description: 'Managing projects and tasks effectively',
        path: '/support/guide/project-management'
      },
      {
        id: 'reports',
        title: 'Reports & Analytics',
        description: 'Creating and analyzing reports',
        path: '/support/guide/reports'
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: 'mdi:connection',
    articles: [
      {
        id: 'api',
        title: 'API Documentation',
        description: 'Integrate with our platform using our API',
        path: '/support/guide/api'
      },
      {
        id: 'third-party',
        title: 'Third-party Tools',
        description: 'Connect with your favorite tools and services',
        path: '/support/guide/integrations'
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        description: 'Set up webhooks for automated workflows',
        path: '/support/guide/webhooks'
      }
    ]
  }
];

const UserGuide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Title level={2}>User Guide</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Card className="sticky top-6">
            <Menu
              mode="inline"
              defaultSelectedKeys={['overview']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {guideSections.map((section) => (
                <Menu.ItemGroup
                  key={section.id}
                  title={
                    <span className="flex items-center gap-2">
                      <Iconify icon={section.icon} />
                      {section.title}
                    </span>
                  }
                >
                  {section.articles.map((article) => (
                    <Menu.Item
                      key={article.id}
                      onClick={() => navigate(article.path)}
                    >
                      {article.title}
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              ))}
            </Menu>
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <Card>
            <Title level={3}>Welcome to the User Guide</Title>
            <Paragraph>
              This comprehensive guide will help you get the most out of our platform.
              Whether you're a new user or an experienced one, you'll find detailed
              instructions and best practices here.
            </Paragraph>

            <Title level={4}>Quick Start</Title>
            <List
              dataSource={guideSections[0].articles}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button
                      key={`read-${item.id}`}
                      type="link"
                      onClick={() => navigate(item.path)}
                    >
                      Read More
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />

            <Title level={4}>Need More Help?</Title>
            <Paragraph>
              If you can't find what you're looking for in this guide, our support
              team is here to help. You can:
            </Paragraph>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Button
                  type="primary"
                  icon={<Iconify icon="mdi:email" />}
                  onClick={() => navigate('/support/contact')}
                  block
                >
                  Contact Support
                </Button>
              </Col>
              <Col xs={24} sm={12}>
                <Button
                  icon={<Iconify icon="mdi:frequently-asked-questions" />}
                  onClick={() => navigate('/support/faq')}
                  block
                >
                  View FAQs
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserGuide;