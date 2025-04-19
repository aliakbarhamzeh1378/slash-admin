import { Iconify } from '@/components/icon';
import { Card, Col, Row, Table, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const GuideAccessControl: React.FC = () => {
  const permissionColumns = [
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Default Roles',
      dataIndex: 'roles',
      key: 'roles',
    },
  ];

  const permissionData = [
    {
      key: '1',
      permission: 'View Projects',
      description: 'Ability to view project details and content',
      roles: 'All roles',
    },
    {
      key: '2',
      permission: 'Create Projects',
      description: 'Ability to create new projects',
      roles: 'Admin, Manager',
    },
    {
      key: '3',
      permission: 'Edit Projects',
      description: 'Ability to modify project settings and details',
      roles: 'Admin, Manager',
    },
    {
      key: '4',
      permission: 'Delete Projects',
      description: 'Ability to delete projects',
      roles: 'Admin',
    },
    {
      key: '5',
      permission: 'Manage Team',
      description: 'Ability to invite, remove, and manage team members',
      roles: 'Admin, Manager',
    },
    {
      key: '6',
      permission: 'View Reports',
      description: 'Ability to view analytics and reports',
      roles: 'Admin, Manager',
    },
    {
      key: '7',
      permission: 'Create Tasks',
      description: 'Ability to create tasks within projects',
      roles: 'Admin, Manager, Member',
    },
    {
      key: '8',
      permission: 'Edit Tasks',
      description: 'Ability to modify task details and status',
      roles: 'Admin, Manager, Member',
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Access Control and Permissions</Title>

      <Card className="mb-6">
        <Title level={3}>Understanding Access Control</Title>
        <Paragraph>
          Access control is a security feature that determines what actions users can perform within the platform.
          Our platform uses a role-based access control system, where permissions are grouped into roles that can be assigned to users.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="mb-6">
            <Title level={3}>Permission System</Title>
            <Paragraph>
              The permission system is the foundation of our access control. Each action in the platform is associated with a specific permission.
              Users can only perform actions if they have the corresponding permission through their assigned role.
            </Paragraph>

            <Table
              columns={permissionColumns}
              dataSource={permissionData}
              pagination={false}
              className="mt-4"
            />
          </Card>

          <Card className="mb-6">
            <Title level={3}>Managing Access Control</Title>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:shield-account" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Role Assignment</Title>
                  <Paragraph>
                    Assign roles to users based on their responsibilities. Each role comes with a predefined set of permissions.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:shield-lock" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Custom Permissions</Title>
                  <Paragraph>
                    For enterprise accounts, you can create custom permission sets to fine-tune access control for specific users or groups.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:folder-lock" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Project-Level Permissions</Title>
                  <Paragraph>
                    In addition to global roles, you can set project-specific permissions to control access to individual projects.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:history" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Permission History</Title>
                  <Paragraph>
                    Track changes to permissions and role assignments in the audit log for security and compliance purposes.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Access Control Best Practices">
            <div className="space-y-4">
              <div>
                <Title level={4}>Principle of Least Privilege</Title>
                <Paragraph>
                  Always assign the minimum level of access necessary for users to perform their duties.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Regular Audits</Title>
                <Paragraph>
                  Periodically review user roles and permissions to ensure they align with current responsibilities.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Role Hierarchy</Title>
                <Paragraph>
                  Understand the hierarchy of roles and how permissions cascade from higher to lower roles.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Temporary Access</Title>
                <Paragraph>
                  For temporary access needs, use time-limited permissions rather than permanent role changes.
                </Paragraph>
              </div>
            </div>
          </Card>

          <Card title="Security Considerations" className="mt-6">
            <div className="space-y-4">
              <div>
                <Title level={4}>Two-Factor Authentication</Title>
                <Paragraph>
                  Enable two-factor authentication for all users, especially those with elevated permissions.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Session Management</Title>
                <Paragraph>
                  Implement session timeouts and automatic logouts for inactive sessions.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>IP Restrictions</Title>
                <Paragraph>
                  Consider restricting access to specific IP addresses or ranges for enhanced security.
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GuideAccessControl; 