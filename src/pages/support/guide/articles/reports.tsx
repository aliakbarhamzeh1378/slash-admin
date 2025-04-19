import { Card, Space, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const Reports: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Reports & Analytics</Title>
        <Paragraph>
          Learn how to generate and analyze reports to gain insights into your project's performance.
        </Paragraph>
        <Paragraph>
          This section will cover:
          <ul>
            <li>Creating custom reports</li>
            <li>Understanding analytics dashboards</li>
            <li>Exporting data</li>
            <li>Setting up automated reports</li>
          </ul>
        </Paragraph>
      </Space>
    </Card>
  );
};

export default Reports;