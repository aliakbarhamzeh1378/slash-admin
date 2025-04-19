import { Iconify } from '@/components/icon';
import { Card, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const GuideOverview: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2}>Platform Overview</Title>

      <Card className="mb-6">
        <Title level={3}>Welcome to Our Platform</Title>
        <Paragraph>
          Our platform provides a comprehensive solution for managing your projects, teams, and resources.
          This guide will help you understand the key features and capabilities available to you.
        </Paragraph>
      </Card>

      <Card className="mb-6">
        <Title level={3}>Key Features</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Iconify icon="mdi:view-dashboard" />
              <Title level={4}>Dashboard</Title>
            </div>
            <Paragraph>
              Get a quick overview of your projects, tasks, and team performance with our intuitive dashboard.
            </Paragraph>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Iconify icon="mdi:account-group" />
              <Title level={4}>Team Management</Title>
            </div>
            <Paragraph>
              Easily manage your team members, assign roles, and track their contributions.
            </Paragraph>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Iconify icon="mdi:chart-bar" />
              <Title level={4}>Analytics</Title>
            </div>
            <Paragraph>
              Make data-driven decisions with comprehensive analytics and reporting tools.
            </Paragraph>
          </Card>
        </div>
      </Card>

      <Card>
        <Title level={3}>Getting Started</Title>
        <Paragraph>
          To get started with our platform, follow these steps:
        </Paragraph>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Set up your account and complete your profile</li>
          <li>Create your first project</li>
          <li>Invite team members and assign roles</li>
          <li>Start managing tasks and tracking progress</li>
        </ol>
      </Card>
    </div>
  );
};

export default GuideOverview; 