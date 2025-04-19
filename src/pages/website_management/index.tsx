import { ApiOutlined, ExportOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import type React from 'react';

const { Title } = Typography;

const WebsiteManagementIndex: React.FC = () => {
  const recentActivity = [
    { key: '1', action: 'Website Settings Updated', user: 'Admin', time: '2 hours ago' },
    { key: '2', action: 'LLM Configuration Modified', user: 'System', time: '5 hours ago' },
    { key: '3', action: 'Data Export Completed', user: 'Admin', time: '1 day ago' },
    { key: '4', action: 'New API Key Generated', user: 'System', time: '2 days ago' },
  ];

  const columns = [
    { title: 'Action', dataIndex: 'action', key: 'action' },
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Website Management Dashboard</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Website Visits"
              value={8846}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="API Calls"
              value={93242}
              prefix={<ApiOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Data Exports"
              value={93}
              prefix={<ExportOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" style={{ marginBottom: '24px' }}>
        <Table
          dataSource={recentActivity}
          columns={columns}
          pagination={false}
          size="middle"
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="System Status">
            <p>✅ All systems operational</p>
            <p>✅ Database connection stable</p>
            <p>✅ API services running</p>
            <p>✅ Backup systems active</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions">
            <p>🔄 Update website settings</p>
            <p>⚙️ Configure LLM parameters</p>
            <p>📊 Generate analytics report</p>
            <p>🔑 Manage API keys</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WebsiteManagementIndex; 