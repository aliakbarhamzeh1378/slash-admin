import { Iconify } from '@/components/icon';
import { Card, Col, Row, Table, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const GuideTeamRoles: React.FC = () => {
  const roleColumns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
    },
  ];

  const roleData = [
    {
      key: '1',
      role: 'Admin',
      description: 'Full access to all features and settings',
      permissions: 'All permissions',
    },
    {
      key: '2',
      role: 'Manager',
      description: 'Can manage projects and team members',
      permissions: 'Create/Edit projects, Manage team, View reports',
    },
    {
      key: '3',
      role: 'Member',
      description: 'Can work on assigned tasks and projects',
      permissions: 'View projects, Create/Edit tasks, Comment',
    },
    {
      key: '4',
      role: 'Viewer',
      description: 'Read-only access to projects',
      permissions: 'View projects and tasks',
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Understanding Team Roles</Title>

      <Card className="mb-6">
        <Title level={3}>Role-Based Access Control</Title>
        <Paragraph>
          Our platform uses a role-based access control system to manage permissions and access levels.
          Each role has specific permissions that determine what actions users can perform.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="mb-6">
            <Title level={3}>Available Roles</Title>
            <Table
              columns={roleColumns}
              dataSource={roleData}
              pagination={false}
              className="mt-4"
            />
          </Card>

          <Card className="mb-6">
            <Title level={3}>Managing Roles</Title>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:account-plus" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Assigning Roles</Title>
                  <Paragraph>
                    When inviting new team members, you can assign them a role based on their responsibilities
                    and the level of access they need.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:account-edit" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Changing Roles</Title>
                  <Paragraph>
                    You can change a team member's role at any time through the team management settings.
                    Changes take effect immediately.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:shield-account" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Custom Roles</Title>
                  <Paragraph>
                    For enterprise accounts, you can create custom roles with specific permission sets
                    to match your organization's needs.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Best Practices">
            <div className="space-y-4">
              <div>
                <Title level={4}>Principle of Least Privilege</Title>
                <Paragraph>
                  Assign the minimum level of access necessary for team members to perform their duties.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Regular Review</Title>
                <Paragraph>
                  Periodically review role assignments to ensure they align with current responsibilities.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Documentation</Title>
                <Paragraph>
                  Maintain documentation of role assignments and permission changes for audit purposes.
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GuideTeamRoles; 