import { Card, Space, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const Integrations: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Third-party Tools</Title>
        <Paragraph>
          Learn how to integrate our platform with your favorite third-party tools and services.
        </Paragraph>
        <Paragraph>
          This section will cover:
          <ul>
            <li>Available integrations</li>
            <li>Setting up connections</li>
            <li>Data synchronization</li>
            <li>Custom integration options</li>
          </ul>
        </Paragraph>
      </Space>
    </Card>
  );
};

export default Integrations;